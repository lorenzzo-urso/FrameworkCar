"""
analise_app — análise própria de déficit de APP hídrica (P0-8).

O diferencial construível: em vez de raspar a pendência do governo, a Terra Comum
DESCOBRE o problema cruzando geometria + dado aberto + ontologia.

  faixa de APP exigida  ← vem da ONTOLOGIA (consultar_ontologia.app_hidrica)
  buffer da água por essa faixa  ∩ imóvel  − água   = APP que devia ser mata
  APP que devia ser mata  −  vegetação nativa        = DÉFICIT de mata ciliar

Não depende de autenticação no SICAR — usa só geometria + a regra do grafo.

Duas fontes de geometria:
- amostra sintética (dados_demo/imovel_demo.geojson) — `analisar_amostra()`
- contrato real (contracts/geometria.fixture.json), produzido pelo B2 a partir
  do GeoPackage SFB recortado pelo imóvel — `analisar_geometria_fixture()`

`_calcular` aceita água como LINHA (amostra) ou POLÍGONO (saída real do B2).
"""

import json
from pathlib import Path
from shapely.geometry import shape

from consultar_ontologia import Ontologia

AMOSTRA = Path(__file__).parent / "dados_demo" / "imovel_demo.geojson"
CONTRATO_GEO = Path(__file__).parents[1] / "contracts" / "geometria.fixture.json"


def _calcular(imovel, agua, veg, faixa_m: float) -> dict:
    """Núcleo geométrico (coordenadas em metros). água/veg podem ser None."""
    if agua is None or agua.is_empty:
        return {"area_app_exigida_m2": 0.0, "deficit_m2": 0.0, "conforme": True,
                "observacao": "Sem corpo d'água no recorte — sem exigência de APP hídrica."}

    # APP exigida = faixa marginal da água, dentro do imóvel, fora da própria água
    app_exigida = agua.buffer(faixa_m).intersection(imovel).difference(agua)
    deficit = app_exigida.difference(veg) if (veg and not veg.is_empty) else app_exigida

    return {
        "area_app_exigida_m2": round(app_exigida.area, 1),
        "deficit_m2": round(deficit.area, 1),
        "conforme": deficit.area < 1.0,
    }


def _resultado(regra: dict, largura: float, calc: dict) -> dict:
    out = {
        "largura_rio_m": largura,
        "faixa_exigida_m": regra["faixa_protegida_m"],
        "area_app_exigida_m2": calc["area_app_exigida_m2"],
        "deficit_m2": calc["deficit_m2"],
        "deficit_ha": round(calc["deficit_m2"] / 10_000, 4),
        "conforme": calc["conforme"],
        "regra": regra["explicacao"],
        "fonte": regra["fonte"],
        "rastro_ontologia": regra["rastro_ontologia"],
    }
    if "observacao" in calc:
        out["observacao"] = calc["observacao"]
    return out


def analisar_app(geo: dict, onto: Ontologia | None = None) -> dict:
    """Amostra sintética: imovel + curso_dagua (linha) + vegetacao_existente."""
    onto = onto or Ontologia()
    largura = float(geo["largura_rio_m"])
    regra = onto.app_hidrica(largura)
    imovel = shape(geo["imovel"])
    agua = shape(geo["curso_dagua"])
    veg = shape(geo["vegetacao_existente"])
    return _resultado(regra, largura, _calcular(imovel, agua, veg, regra["faixa_protegida_m"]))


def analisar_recorte(recorte: dict, largura_rio_m: float = 8, onto: Ontologia | None = None) -> dict:
    """Saída do B2 (sfb_recorte): imovel + corpos_dagua + vegetacao_nativa, em
    CRS métrico. `largura_rio_m` é assumida (o SFB não classifica largura)."""
    onto = onto or Ontologia()
    regra = onto.app_hidrica(largura_rio_m)
    imovel = shape(recorte["imovel"])
    agua = shape(recorte["corpos_dagua"]) if recorte.get("corpos_dagua") else None
    veg = shape(recorte["vegetacao_nativa"]) if recorte.get("vegetacao_nativa") else None
    res = _resultado(regra, largura_rio_m, _calcular(imovel, agua, veg, regra["faixa_protegida_m"]))
    res["crs_metrico"] = recorte.get("crs_metrico")
    return res


def analisar_amostra() -> dict:
    geo = json.loads(AMOSTRA.read_text(encoding="utf-8"))
    geo.pop("_comment", None)
    return analisar_app(geo)


def analisar_geometria_fixture() -> dict:
    """Lê o contrato geometria.fixture.json (produzido pelo B2) e analisa.
    Seed é sintético; B2 sobrescreve com o recorte real do MG quando pronto."""
    geo = json.loads(CONTRATO_GEO.read_text(encoding="utf-8"))
    geo.pop("_comment", None)
    largura = float(geo.get("largura_rio_m_assumida", 8))
    return analisar_recorte(geo, largura_rio_m=largura)


if __name__ == "__main__":
    r = analisar_geometria_fixture()
    print(json.dumps(r, ensure_ascii=False, indent=2))
    if not r["conforme"]:
        print(f"\n>> Deficit de {r['deficit_m2']} m2 de mata ciliar "
              f"(a lei exige {r['faixa_exigida_m']} m; {r['fonte']}).")
