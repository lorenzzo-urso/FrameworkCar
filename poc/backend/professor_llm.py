"""
professor_llm — agente educacional do CAR.

Mais livre que o Compadre: o LLM pode elaborar, dar exemplos e usar
analogias. A ontologia ancora as regras legais — ele explica, não inventa.

Reutiliza a mesma lógica de provider do traduzir_llm (anthropic/openai/auto).
"""

import os
import json

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001")
OPENAI_MODEL    = os.getenv("OPENAI_MODEL",    "gpt-4o-mini")


def _escolher_provedor() -> str:
    pref = os.getenv("LLM_PROVIDER", "auto").lower()
    tem_anthropic = bool(os.getenv("ANTHROPIC_API_KEY"))
    tem_openai    = bool(os.getenv("OPENAI_API_KEY"))
    if pref == "anthropic":
        return "anthropic" if tem_anthropic else "fallback"
    if pref == "openai":
        return "openai" if tem_openai else "fallback"
    if tem_anthropic:
        return "anthropic"
    if tem_openai:
        return "openai"
    return "fallback"


def _montar_prompt(pergunta: str, contexto_onto: dict) -> str:
    return (
        "Você é o Professor — especialista no Cadastro Ambiental Rural (CAR) e no "
        "Código Florestal Brasileiro (Lei 12.651/2012). Seu papel é explicar de forma "
        "clara, acolhedora e acessível para qualquer pessoa: produtor rural, técnico "
        "agrícola ou analista ambiental.\n\n"
        "REGRAS:\n"
        "- Use os dados da ONTOLOGIA abaixo como âncora para regras e números legais. "
        "Sempre cite a fonte (artigo/lei) quando mencionar uma regra.\n"
        "- Pode elaborar ALÉM dos dados: contexto histórico, analogias do dia a dia, "
        "exemplos práticos com nomes de lugares reais — mas jamais invente números "
        "ou artigos de lei.\n"
        "- Adapte o nível de linguagem: se a pergunta parecer de um produtor, fale "
        "simples; se for de um técnico, pode ser mais preciso.\n"
        "- Se a pergunta estiver fora do escopo do CAR/Código Florestal, diga isso "
        "gentilmente e sugira onde buscar.\n"
        "- Nunca dê parecer jurídico definitivo — oriente, não decida.\n"
        "- Responda em texto corrido, sem JSON.\n\n"
        f"ONTOLOGIA (fonte das regras):\n"
        f"{json.dumps(contexto_onto, ensure_ascii=False, indent=2)}\n\n"
        f"PERGUNTA:\n{pergunta}"
    )


def _call_anthropic(prompt: str) -> str:
    import anthropic
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    msg = client.messages.create(
        model=ANTHROPIC_MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text


def _call_openai(prompt: str) -> str:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model=OPENAI_MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return resp.choices[0].message.content


def _fallback(pergunta: str, contexto_onto: dict) -> str:
    app_nasc = contexto_onto.get("app_nascente")
    raio = app_nasc["raio_protegido_m"] if app_nasc else "–"
    n_pend = len(contexto_onto.get("pendencias", []))
    n_ben  = len(contexto_onto.get("beneficios", []))
    return (
        f'Olá! Sou o Professor do CAR. Sua pergunta foi: "{pergunta}".\n\n'
        f"Tenho {n_pend} tipos de pendência e {n_ben} benefícios mapeados. "
        f"Exemplo rápido: a APP de uma nascente exige raio de {raio} m de "
        f"preservação (Lei 12.651/2012, Art. 4, IV). Para respostas completas, "
        f"configure uma chave de API de LLM no ambiente."
    )


def perguntar(pergunta: str, ontologia) -> str:
    """Recebe uma pergunta em texto livre; retorna explicação educacional."""
    contexto = ontologia.contexto_completo()
    provedor = _escolher_provedor()
    if provedor == "fallback":
        return _fallback(pergunta, contexto)
    prompt = _montar_prompt(pergunta, contexto)
    try:
        if provedor == "anthropic":
            return _call_anthropic(prompt)
        if provedor == "openai":
            return _call_openai(prompt)
    except Exception:
        pass
    return _fallback(pergunta, contexto)
