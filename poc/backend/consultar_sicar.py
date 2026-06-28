"""
consultar_sicar — tool que entrega os dados do imóvel ao agente.

A1 (integração): a SITUAÇÃO e a GEOMETRIA vêm do conector B1
(connectors/sicar_publica), que é o que vira real quando o endpoint da consulta
pública for confirmado. As PENDÊNCIAS internas (CIB, representante) continuam do
fixture — lookup ao vivo delas exige auth Gov.br (Horizonte 2).
"""

import json
import sys
from pathlib import Path

FIXTURE = Path(__file__).parents[1] / "contracts" / "pendencia.fixture.json"
CONNECTORS = Path(__file__).parents[1] / "connectors"

# permite importar o conector B1 (sem puxar geopandas — B1 fallback só usa json)
if str(CONNECTORS) not in sys.path:
    sys.path.insert(0, str(CONNECTORS))


def consultar_sicar(numero_car: str | None = None) -> dict:
    """Situação + geometria via B1; alertas via fixture."""
    pend = json.loads(FIXTURE.read_text(encoding="utf-8"))
    pend.pop("_comment", None)

    alvo = numero_car or pend.get("numero_car")
    dados = {
        "numero_car": alvo,
        "nome_imovel": pend.get("nome_imovel"),
        "municipio": pend.get("municipio"),
        "uf": pend.get("uf"),
        "situacao": pend.get("situacao"),
        "bioma": pend.get("bioma"),
        "alertas": pend.get("alertas", []),
    }

    # A1: enriquece situação + geometria pelo conector B1
    try:
        from sicar_publica import consultar_publica
        b1 = consultar_publica(alvo)
        dados["situacao"] = b1.get("situacao", dados["situacao"])
        dados["geometria"] = b1.get("geometria")
        dados["fonte_geo"] = b1.get("fonte")
    except Exception:
        dados["fonte_geo"] = "indisponivel"

    return dados
