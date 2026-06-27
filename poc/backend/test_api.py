"""
Testes da orquestração do Hub (sem subir servidor). Roda sem pytest:
    python test_api.py
"""

from agent_hub import AgentHub

hub = AgentHub()


def test_hub_carrega_dois_agentes():
    nomes = {a["name"] for a in hub.listar()}
    assert "compadre" in nomes
    assert "auditor" in nomes   # vitrine (P1-1)


def test_compadre_operacional_auditor_nao():
    agentes = {a["name"]: a for a in hub.listar()}
    assert agentes["compadre"]["operacional"] is True
    assert agentes["auditor"]["operacional"] is False  # tool analise_espacial não existe


def test_conversa_retorna_contrato():
    r = hub.run_agent("compadre", "RJ-3304300-XXX", "oi, tenho pendência")
    # campos do contrato conversa.example.json
    for campo in ["traducao", "pendencias", "regra_aplicada", "proximo_passo", "link_sicar", "beneficios"]:
        assert campo in r, f"falta o campo {campo}"


def test_p07_regra_rastreavel():
    r = hub.run_agent("compadre", "RJ-3304300-XXX", "oi")
    ra = r["regra_aplicada"]
    assert ra is not None
    assert ra["fonte"]                                  # tem fonte legal
    assert ra["rastro_ontologia"].startswith("car:")    # rastro no grafo


def test_conversa_traz_pendencias_e_beneficios():
    r = hub.run_agent("compadre", "RJ-3304300-XXX", "oi")
    assert len(r["pendencias"]) == 2                    # CIB + representante
    assert len(r["beneficios"]) >= 2


def test_auditor_nao_executa_no_poc():
    r = hub.run_agent("auditor", "RJ-3304300-XXX", "oi")
    assert "erro" in r


if __name__ == "__main__":
    testes = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for t in testes:
        t()
        print(f"  OK  {t.__name__}")
    print(f"\n{len(testes)}/{len(testes)} testes passaram.")
