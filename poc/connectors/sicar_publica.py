"""
sicar_publica (B1) — situação + geometria do imóvel pelo número do CAR.

A consulta pública (consulta.car.gov.br) expõe situação + polígono do imóvel —
NÃO as pendências internas (CIB, representante), que exigem login Gov.br.

Estado atual (honesto):
- A chamada real à consulta pública depende de confirmar o endpoint JSON da SPA
  (via DevTools) OU baixar o shapefile do município em consulta.car.gov.br e
  filtrar pelo código do CAR. Isso está marcado em `_consulta_publica_real()`.
- Enquanto isso, retorna o FALLBACK: situação do fixture de pendências + um
  polígono de amostra (Alvinópolis/MG). Mesma filosofia de fallback do projeto.

Saída: { numero_car, uf, situacao, geometria (EPSG:4674), fonte }
A geometria alimenta o B2 (recorte do SFB) e, depois, a análise de APP.
"""

import json
from pathlib import Path

FIXTURE_PEND = Path(__file__).parents[1] / "contracts" / "pendencia.fixture.json"
GEO_SAMPLE = Path(__file__).parent / "dados_demo" / "imovel_sample_mg.geojson"


def _consulta_publica_real(numero_car: str) -> dict:
    """TODO (B1-real): buscar situação + polígono na consulta pública.
    Caminhos viáveis (sem auth):
      1. Replicar o endpoint XHR que a SPA de consulta.car.gov.br chama (DevTools).
      2. Baixar o shapefile AREA_IMOVEL do município em consulta.car.gov.br e
         filtrar pelo campo do código do recibo.
    Levanta NotImplementedError até o endpoint ser confirmado."""
    raise NotImplementedError("Endpoint da consulta pública a confirmar (DevTools / shapefile do município)")


def consultar_publica(numero_car: str) -> dict:
    """Retorna situação + geometria. Tenta o real; cai no fallback honesto."""
    try:
        return {**_consulta_publica_real(numero_car), "fonte": "consulta_publica"}
    except NotImplementedError:
        pend = json.loads(FIXTURE_PEND.read_text(encoding="utf-8"))
        geo = json.loads(GEO_SAMPLE.read_text(encoding="utf-8"))
        geo.pop("_comment", None)
        return {
            "numero_car": numero_car,
            "uf": pend.get("uf"),
            "situacao": pend.get("situacao"),
            "geometria": geo,             # EPSG:4674 (lat/lon)
            "fonte": "fallback",          # placeholder — não é o polígono real
        }


if __name__ == "__main__":
    r = consultar_publica("MG-3102308-1F30612FD2F845A7B8852A7B0BF07455")
    r2 = {k: v for k, v in r.items() if k != "geometria"}
    print(json.dumps(r2, ensure_ascii=False, indent=2))
    print("geometria:", r["geometria"]["type"], "com", len(r["geometria"]["coordinates"][0]), "vértices")
