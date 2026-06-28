"""
sfb_recorte (B2) — recorta a Base SFB de Uso/Cobertura pelo polígono do imóvel.

O GeoPackage SFB é um MOSAICO do estado inteiro (não é indexado por CAR). Então:
dado o polígono do imóvel (vindo do B1 / consulta pública), recortamos o mosaico
e extraímos as classes que a análise de APP precisa:

  gridcode 1 = "Vegetação Nativa 2020"  -> vegetação existente
  gridcode 3 = "Corpos d'água"          -> rios/lagos (origem da faixa de APP)

Saída: GeoJSON já REPROJETADO para CRS métrico (UTM), pronto para o analise_app
(que mede área e faz buffer em metros). Não depende de auth do SICAR.

Uso:
    from sfb_recorte import recortar_sfb
    recortar_sfb(gpkg_path, imovel_geojson_4674)
"""

from pathlib import Path
import geopandas as gpd
import pyogrio
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

CLASSE_NATIVA = "Vegetação Nativa 2020"
CLASSE_AGUA = "Corpos d'água"


def _achar_layer_mosaico(gpkg_path: str) -> str:
    """O layer de cobertura começa com 'vetor_mosaico' (sufixo é a UF)."""
    for nome, _ in pyogrio.list_layers(gpkg_path):
        if str(nome).startswith("vetor_mosaico"):
            return nome
    raise ValueError("Layer de mosaico não encontrado no GeoPackage")


def recortar_sfb(gpkg_path: str, imovel_geojson: dict, layer: str | None = None) -> dict:
    """Recorta o mosaico pelo polígono do imóvel (em EPSG:4674) e devolve
    imóvel + vegetação nativa + corpos d'água em CRS métrico."""
    layer = layer or _achar_layer_mosaico(gpkg_path)
    imovel = shape(imovel_geojson)

    # lê só o que intersecta a bbox do imóvel (eficiente em arquivos grandes)
    g = gpd.read_file(gpkg_path, layer=layer, bbox=imovel.bounds)
    if g.empty:
        return {"erro": "Nenhuma feição do SFB na região do imóvel"}

    # recorta exatamente pelo polígono do imóvel
    imovel_gdf = gpd.GeoDataFrame(geometry=[imovel], crs=g.crs)
    clip = gpd.clip(g, imovel_gdf)

    # reprojeta para métrico (UTM local) — necessário p/ área e buffer em metros
    metrico = clip.estimate_utm_crs()
    clip_m = clip.to_crs(metrico)
    imovel_m = imovel_gdf.to_crs(metrico).geometry.iloc[0]

    def _uniao(classe):
        sub = clip_m[clip_m["Classe"] == classe]
        return unary_union(sub.geometry.values) if not sub.empty else None

    nativa = _uniao(CLASSE_NATIVA)
    agua = _uniao(CLASSE_AGUA)

    # áreas por classe (sanidade / diagnóstico)
    areas = (clip_m.assign(area_m2=clip_m.geometry.area)
             .groupby("Classe")["area_m2"].sum().round(1).to_dict())

    return {
        "crs_metrico": str(metrico),
        "imovel": mapping(imovel_m),
        "vegetacao_nativa": mapping(nativa) if nativa else None,
        "corpos_dagua": mapping(agua) if agua else None,
        "areas_por_classe_m2": areas,
    }


if __name__ == "__main__":
    import json, sys
    # teste manual: recorta uma bbox pequena de um gpkg passado por argumento
    gpkg = sys.argv[1]
    lyr = _achar_layer_mosaico(gpkg)
    info = pyogrio.read_info(gpkg, layer=lyr)
    xmin, ymin, xmax, ymax = info["total_bounds"]
    # bbox pequena no centro da extensão, como "imóvel" de teste
    cx, cy = (xmin + xmax) / 2, (ymin + ymax) / 2
    d = 0.02
    imovel = {"type": "Polygon", "coordinates": [[
        [cx - d, cy - d], [cx + d, cy - d], [cx + d, cy + d], [cx - d, cy + d], [cx - d, cy - d]]]}
    r = recortar_sfb(gpkg, imovel, layer=lyr)
    r.pop("imovel", None); r.pop("vegetacao_nativa", None); r.pop("corpos_dagua", None)
    print(json.dumps(r, ensure_ascii=False, indent=2))
