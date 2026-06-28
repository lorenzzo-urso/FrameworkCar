"""
traduzir_llm — põe a regra (que veio da ontologia) em linguagem simples.

IMPORTANTE: o LLM NÃO inventa a regra. Ele recebe a regra já resolvida pelo
grafo (com fonte legal) e só a reescreve em português simples, no tom do
Compadre. Isso preserva a rastreabilidade (P0-7).

Provider-agnóstico — escolhido por variável de ambiente, sem amarrar o código:
  LLM_PROVIDER = anthropic | openai | auto   (default: auto)
    - auto: usa Anthropic se houver ANTHROPIC_API_KEY; senão OpenAI se houver
      OPENAI_API_KEY; senão cai no template (sem rede).
Modelos configuráveis por env:
  ANTHROPIC_MODEL (default claude-haiku-4-5-20251001)
  OPENAI_MODEL    (default gpt-4o-mini)

O PoC roda de ponta a ponta nos três casos (anthropic / openai / template).
"""

import os
import json

try:
    from dotenv import load_dotenv
    load_dotenv()  # carrega backend/.env se existir (nunca commitado)
except Exception:
    pass

ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


# ----- escolha de provider -------------------------------------------------

def escolher_provedor() -> str:
    """Retorna 'anthropic', 'openai' ou 'fallback' conforme env + keys."""
    pref = os.getenv("LLM_PROVIDER", "auto").lower()
    tem_anthropic = bool(os.getenv("ANTHROPIC_API_KEY"))
    tem_openai = bool(os.getenv("OPENAI_API_KEY"))

    if pref == "anthropic":
        return "anthropic" if tem_anthropic else "fallback"
    if pref == "openai":
        return "openai" if tem_openai else "fallback"
    # auto
    if tem_anthropic:
        return "anthropic"
    if tem_openai:
        return "openai"
    return "fallback"


# ----- prompt compartilhado ------------------------------------------------

def _montar_prompt(dados, pendencias, beneficios, analise_app=None) -> str:
    contexto = {
        "imovel": dados.get("nome_imovel"),
        "pendencias": pendencias,
        "beneficios": beneficios,
        "analise_app": analise_app,
    }
    instrucao_app = ""
    if analise_app and not analise_app.get("conforme"):
        instrucao_app = (
            "\n\nIMPORTANTE sobre a analise_app: essa é uma ESTIMATIVA calculada "
            "com dados abertos (não é uma notificação oficial). Apresente como "
            "observação — 'encontrei', 'calculei', 'pode estar' — nunca como "
            "infração decretada. Sempre oriente a confirmar com técnico ou órgão "
            "antes de tomar qualquer decisão."
        )
    return (
        "Você é o Compadre, um assistente que ajuda o produtor rural a entender "
        "o CAR pelo WhatsApp. Fale simples, acolhedor, sem jargão. NUNCA invente "
        "regras ou números — use só o que está nos dados abaixo (eles vêm de uma "
        "ontologia do Código Florestal, são confiáveis)."
        + instrucao_app
        + f"\n\nDADOS:\n{json.dumps(contexto, ensure_ascii=False)}\n\n"
        "Responda APENAS um JSON com duas chaves: 'traducao' (2-3 frases explicando "
        "os avisos e o que fazer) e 'proximo_passo' (uma frase com a ação imediata)."
    )


def _parse_json(txt: str) -> tuple[str, str]:
    txt = txt.strip()
    if txt.startswith("```"):
        txt = txt.split("```")[1].lstrip("json").strip()
    out = json.loads(txt)
    return out["traducao"], out["proximo_passo"]


# ----- providers -----------------------------------------------------------

def _call_anthropic(prompt: str) -> tuple[str, str]:
    import anthropic
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    msg = client.messages.create(
        model=ANTHROPIC_MODEL,
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}],
    )
    return _parse_json(msg.content[0].text)


def _call_openai(prompt: str) -> tuple[str, str]:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model=OPENAI_MODEL,
        max_tokens=500,
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": prompt}],
    )
    return _parse_json(resp.choices[0].message.content)


# ----- fallback (sem rede) -------------------------------------------------

def _fallback(dados, pendencias, beneficios, analise_app=None) -> tuple[str, str]:
    nome = dados.get("nome_imovel", "seu imóvel")
    n = len(pendencias)

    # Parte 1: pendências do cadastro
    if n == 0:
        traducao = f"Boa notícia! O {nome} não está com pendências de cadastro no momento."
        proximo = "Mantenha o cadastro atualizado."
    else:
        p0 = pendencias[0]
        plural = "avisos" if n > 1 else "aviso"
        traducao = (
            f"Olá! Dei uma olhada no {nome} e ele está com {n} {plural} no cadastro. "
            f"O mais simples de resolver: {p0['explicacao']} "
            f"O que fazer: {p0['o_que_fazer']}"
        )
        if beneficios:
            lista = ", ".join(beneficios[:2])
            traducao += f" Assim que estiver tudo certo, o CAR em dia te dá acesso a: {lista}."
        proximo = (
            f"Vamos resolver primeiro: {p0['tipo']}. Depois cuidamos do resto."
            if n > 1 else f"Próximo passo: {p0['o_que_fazer']}"
        )

    # Parte 2: análise de APP (evidência separada da interpretação)
    if analise_app and not analise_app.get("conforme"):
        deficit_ha = analise_app.get("deficit_ha", 0)
        faixa = analise_app.get("faixa_exigida_m", 30)
        fonte = analise_app.get("fonte", "Código Florestal")
        traducao += (
            f" Também fiz um cálculo com os dados abertos da sua região: "
            f"a área de mata perto do curso d'água pode estar com uns {deficit_ha:.2f} ha "
            f"a menos do que a lei pede — a faixa exigida é de {faixa} m ({fonte}). "
            f"Isso é uma estimativa minha, não uma notificação oficial. "
            f"Vale confirmar com um técnico ou a EMATER antes de tomar qualquer decisão."
        )

    return traducao, proximo


# ----- entrada pública -----------------------------------------------------

def traduzir(dados: dict, pendencias: list, beneficios: list,
             analise_app: dict | None = None) -> tuple[str, str]:
    """Retorna (traducao, proximo_passo). Escolhe o provider e, em qualquer
    falha de rede/parse, cai no template — o demo nunca quebra."""
    provedor = escolher_provedor()
    if provedor == "fallback":
        return _fallback(dados, pendencias, beneficios, analise_app)

    prompt = _montar_prompt(dados, pendencias, beneficios, analise_app)
    try:
        if provedor == "anthropic":
            return _call_anthropic(prompt)
        if provedor == "openai":
            return _call_openai(prompt)
    except Exception:
        pass
    return _fallback(dados, pendencias, beneficios, analise_app)
