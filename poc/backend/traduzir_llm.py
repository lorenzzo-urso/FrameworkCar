"""
traduzir_llm — põe a regra (que veio da ontologia) em linguagem simples.

IMPORTANTE: o LLM NÃO inventa a regra. Ele recebe a regra já resolvida pelo
grafo (com fonte legal) e só a reescreve em português simples, no tom do
Compadre. Isso preserva a rastreabilidade (P0-7).

Funciona com OU sem API key:
- Com ANTHROPIC_API_KEY: usa Claude Haiku para uma redação mais natural.
- Sem key: cai num template determinístico montado a partir dos dados da
  ontologia. O PoC roda de ponta a ponta nos dois casos.
"""

import os

MODELO = "claude-haiku-4-5-20251001"


def _fallback(dados, pendencias, beneficios) -> tuple[str, str]:
    """Redação por template — usa só os dados estruturados da ontologia."""
    nome = dados.get("nome_imovel", "seu imóvel")
    n = len(pendencias)
    if n == 0:
        traducao = f"Boa notícia! O {nome} não está com pendências no momento."
        return traducao, "Mantenha o cadastro atualizado."

    p0 = pendencias[0]
    plural = "avisos" if n > 1 else "aviso"
    traducao = (
        f"Olá! Dei uma olhada no {nome} e ele está com {n} {plural}. "
        f"O mais simples de resolver: {p0['explicacao']} "
        f"O que fazer: {p0['o_que_fazer']}"
    )
    if beneficios:
        lista = ", ".join(beneficios[:2])
        traducao += f" Assim que estiver tudo certo, o CAR em dia te dá acesso a: {lista}."

    if n > 1:
        proximo = f"Vamos resolver primeiro: {p0['rdfs_label'] if 'rdfs_label' in p0 else p0['tipo']}. Depois cuidamos do resto."
    else:
        proximo = f"Próximo passo: {p0['o_que_fazer']}"
    return traducao, proximo


def traduzir(dados: dict, pendencias: list, beneficios: list) -> tuple[str, str]:
    """Retorna (traducao, proximo_passo) em linguagem simples."""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return _fallback(dados, pendencias, beneficios)

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)

        contexto = {
            "imovel": dados.get("nome_imovel"),
            "pendencias": pendencias,
            "beneficios": beneficios,
        }
        prompt = (
            "Você é o Compadre, um assistente que ajuda o produtor rural a entender "
            "o CAR pelo WhatsApp. Fale simples, acolhedor, sem jargão. NUNCA invente "
            "regras ou números — use só o que está nos dados abaixo (eles vêm de uma "
            "ontologia do Código Florestal, são confiáveis).\n\n"
            f"DADOS:\n{contexto}\n\n"
            "Responda em JSON com duas chaves: 'traducao' (2-3 frases explicando os "
            "avisos e o que fazer) e 'proximo_passo' (uma frase com a ação imediata)."
        )
        msg = client.messages.create(
            model=MODELO,
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}],
        )
        import json
        txt = msg.content[0].text.strip()
        # tolera cercas de código
        if txt.startswith("```"):
            txt = txt.split("```")[1].lstrip("json").strip()
        out = json.loads(txt)
        return out["traducao"], out["proximo_passo"]
    except Exception:
        # qualquer falha de rede/parse cai no fallback — o demo nunca quebra
        return _fallback(dados, pendencias, beneficios)
