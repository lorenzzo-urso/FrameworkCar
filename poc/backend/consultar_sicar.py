"""
consultar_sicar — tool que entrega as pendências de um imóvel.

⚠️ NO POC: stub que lê o contrato `contracts/pendencia.fixture.json`.
O conector real (scraping do consulta.car.gov.br) é responsabilidade do Dev B
em `connectors/` e deve produzir EXATAMENTE este mesmo formato. Enquanto ele
não existe, o backend roda contra o fixture (regra de corte do PRD).
"""

import json
from pathlib import Path

FIXTURE = Path(__file__).parents[1] / "contracts" / "pendencia.fixture.json"


def consultar_sicar(numero_car: str | None = None) -> dict:
    """Retorna situação + alertas do imóvel. No PoC, sempre o imóvel do fixture."""
    dados = json.loads(FIXTURE.read_text(encoding="utf-8"))
    dados.pop("_comment", None)
    return dados
