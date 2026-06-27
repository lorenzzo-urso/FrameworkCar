"""
Testes da ontologia — travam as regras do Código Florestal contra regressão.
Roda sem pytest:  python test_ontologia.py
"""

from consultar_ontologia import Ontologia

onto = Ontologia()


def test_app_hidrica_faixas():
    # Lei 12.651/2012, Art. 4, I — limites de cada faixa
    assert onto.app_hidrica(8)["faixa_protegida_m"] == 30      # < 10 m
    assert onto.app_hidrica(10)["faixa_protegida_m"] == 50     # 10–50 m
    assert onto.app_hidrica(49)["faixa_protegida_m"] == 50
    assert onto.app_hidrica(50)["faixa_protegida_m"] == 100    # 50–200 m
    assert onto.app_hidrica(200)["faixa_protegida_m"] == 200   # 200–600 m
    assert onto.app_hidrica(700)["faixa_protegida_m"] == 500   # > 600 m


def test_reserva_legal_por_regiao():
    # Art. 12 — percentual depende da REGIÃO, não do bioma isolado
    # Fora da Amazônia Legal: sempre 20%
    assert onto.reserva_legal(amazonia_legal=False)["percentual_minimo"] == 20
    # Dentro da Amazônia Legal: varia por tipo de vegetação
    assert onto.reserva_legal(amazonia_legal=True, tipo_vegetacao="floresta")["percentual_minimo"] == 80
    assert onto.reserva_legal(amazonia_legal=True, tipo_vegetacao="cerrado")["percentual_minimo"] == 35
    assert onto.reserva_legal(amazonia_legal=True, tipo_vegetacao="campos gerais")["percentual_minimo"] == 20


def test_app_nascente():
    # Art. 4, IV — raio mínimo de 50 m
    assert onto.app_nascente()["raio_protegido_m"] == 50


def test_toda_regra_tem_fonte_e_rastro():
    # P0-7: nenhuma resposta pode vir sem fonte legal + rastro no grafo
    r = onto.app_hidrica(8)
    assert r["fonte"] and r["rastro_ontologia"].startswith("car:")
    r = onto.reserva_legal(amazonia_legal=False)
    assert r["fonte"] and r["rastro_ontologia"].startswith("car:")


def test_pendencia_cib():
    r = onto.regra_para_pendencia("CIB_ausente")
    assert "CIB" in r["explicacao"]
    assert r["o_que_fazer"]
    assert r["rastro_ontologia"] == "car:Pendencia_CIB"


def test_beneficios_car_ativo():
    bs = onto.beneficios("Ativo")
    assert len(bs) == 4
    assert all(b["fonte"] for b in bs)            # todo benefício tem fonte
    labels = {b["beneficio"] for b in bs}
    assert any("Pronaf" in l for l in labels)


def test_consulta_invalida_nao_quebra():
    assert "erro" in onto.reserva_legal(amazonia_legal=True, tipo_vegetacao="inexistente")
    assert "erro" in onto.regra_para_pendencia("xpto")


if __name__ == "__main__":
    testes = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    passou = 0
    for t in testes:
        t()
        print(f"  OK  {t.__name__}")
        passou += 1
    print(f"\n{passou}/{len(testes)} testes passaram.")
