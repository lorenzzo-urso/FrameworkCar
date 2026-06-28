"""
sfb_recorte (B2) — recorta o GeoPackage SFB de MG pelo polígono do imóvel.

O GeoPackage MG_CAR_Uso_Cobertura_Solo.gpkg (SFB/SNIF, maio 2025) tem camadas
separadas por tema (diferente da estrutura vetor_mosaico do dataset AL):

  HIDROGRAFIA      — cursos d'água e corpos hídricos (CLASSE numérica)
  VEGETACAO_2020   — cobertura vegetal 2020/2021 (Classe = 'VEGETACAO_2021')

Dado o polígono do imóvel em EPSG:4674, recorta as duas camadas e devolve
imovel + vegetação nativa + corpos d'água reprojetados para CRS métrico (UTM).

Uso como módulo:
    from sfb_recorte import recortar_sfb
    recortar_sfb(gpkg_path, imovel_geojson_4674)

Uso direto (gera contracts/geometria.fixture.json):
    python sfb_recorte.py
"""

from pathlib import Path
import json

import geopandas as gpd
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

# ---------------------------------------------------------------------------
# Estrutura do GeoPackage MG (SFB/SNIF maio 2025)
# ---------------------------------------------------------------------------
LAYER_HIDRO = "HIDROGRAFIA"
LAYER_VEG = "VEGETACAO_2020"

# Classes de HIDROGRAFIA relevantes para APP hídrica (rios e lagos)
CLASSES_AGUA = {1, 2, 3, 4}     # rios/igarapés, lagos, açudes/reservatórios, canais

# Classe de vegetação nativa em VEGETACAO_2020
CLASSE_NATIVA = "VEGETACAO_2021"

# Largura de rio assumida — o SFB não classifica largura; usamos 8m (APP "Até 10m"
# → faixa de 30m pelo Art. 4º do Código Florestal)
LARGURA_RIO_M_ASSUMIDA = 8


def recortar_sfb(gpkg_path: str, imovel_geojson: dict) -> dict:
    """Recorta o GeoPackage SFB pelo polígono do imóvel (EPSG:4674).

    Retorna dicionário no formato do contrato geometria.fixture.json:
      crs_metrico, largura_rio_m_assumida, imovel, corpos_dagua, vegetacao_nativa
    """
    imovel_shp = shape(imovel_geojson)
    bbox = imovel_shp.bounds      # (minx, miny, maxx, maxy) em graus

    imovel_gdf = gpd.GeoDataFrame(geometry=[imovel_shp], crs="EPSG:4674")

    # -- HIDROGRAFIA ----------------------------------------------------------
    hidro = gpd.read_file(gpkg_path, layer=LAYER_HIDRO, bbox=bbox)
    if not hidro.empty:
        hidro_filt = hidro[hidro["CLASSE"].isin(CLASSES_AGUA)]
        hidro_clip = gpd.clip(hidro_filt, imovel_gdf) if not hidro_filt.empty else hidro_filt
    else:
        hidro_clip = hidro

    # -- VEGETACAO_2020 -------------------------------------------------------
    veg = gpd.read_file(gpkg_path, layer=LAYER_VEG, bbox=bbox)
    if not veg.empty:
        veg_filt = veg[veg["Classe"] == CLASSE_NATIVA]
        veg_clip = gpd.clip(veg_filt, imovel_gdf) if not veg_filt.empty else veg_filt
    else:
        veg_clip = veg

    # -- Reprojecta para UTM métrico ------------------------------------------
    crs_metrico = imovel_gdf.estimate_utm_crs()
    imovel_m = imovel_gdf.to_crs(crs_metrico).geometry.iloc[0]

    def _uniao_utm(gdf):
        if gdf.empty:
            return None
        return unary_union(gdf.to_crs(crs_metrico).geometry.values)

    agua_geom = _uniao_utm(hidro_clip)
    veg_geom = _uniao_utm(veg_clip)
    if veg_geom:
        veg_geom = veg_geom.intersection(imovel_m)

    # -- Diagnóstico de área --------------------------------------------------
    areas = {}
    if not veg_clip.empty:
        veg_clip_m = veg_clip.to_crs(crs_metrico)
        areas["VEGETACAO_2021_m2"] = round(float(veg_clip_m.geometry.area.sum()), 1)
    if not hidro_clip.empty:
        hidro_clip_m = hidro_clip.to_crs(crs_metrico)
        areas["HIDROGRAFIA_m2"] = round(float(hidro_clip_m.geometry.area.sum()), 1)

    return {
        "crs_metrico": str(crs_metrico),
        "largura_rio_m_assumida": LARGURA_RIO_M_ASSUMIDA,
        "imovel": mapping(imovel_m),
        "corpos_dagua": mapping(agua_geom) if agua_geom and not agua_geom.is_empty else None,
        "vegetacao_nativa": mapping(veg_geom) if veg_geom and not veg_geom.is_empty else None,
        "areas_por_classe_m2": areas,
    }


if __name__ == "__main__":
    ROOT = Path(__file__).parents[2]
    GPKG = ROOT / "Dados" / "Regularização Ambiental - Uso do Solo" / "MG_CAR_Uso_Cobertura_Solo.gpkg"
    IMOVEL_DEMO = Path(__file__).parent / "dados_demo" / "imovel_sample_mg.geojson"
    FIXTURE_OUT = Path(__file__).parent.parent / "contracts" / "geometria.fixture.json"

    if not GPKG.exists():
        raise FileNotFoundError(f"GeoPackage não encontrado: {GPKG}")

    print(f"[B2] imóvel demo: {IMOVEL_DEMO}")
    imovel_json = json.loads(IMOVEL_DEMO.read_text(encoding="utf-8"))
    imovel_json.pop("_comment", None)

    print(f"[B2] lendo GeoPackage: {GPKG.name}")
    resultado = recortar_sfb(str(GPKG), imovel_json)

    # Anota origem no fixture
    resultado["_comment"] = (
        f"Gerado por sfb_recorte.py (B2) sobre {GPKG.name}. "
        f"Imóvel demo: Alvinópolis/MG (dados_demo/imovel_sample_mg.geojson). "
        f"CRS métrico: {resultado['crs_metrico']}. "
        f"largura_rio_m_assumida={LARGURA_RIO_M_ASSUMIDA} "
        f"(SFB não classifica largura; APP 'Até 10m' -> faixa 30m, Art. 4º CF)."
    )

    # Reordena chaves para leitura humana
    saida = {
        "_comment":             resultado["_comment"],
        "crs_metrico":          resultado["crs_metrico"],
        "largura_rio_m_assumida": resultado["largura_rio_m_assumida"],
        "areas_por_classe_m2":  resultado.get("areas_por_classe_m2", {}),
        "imovel":               resultado["imovel"],
        "corpos_dagua":         resultado["corpos_dagua"],
        "vegetacao_nativa":     resultado["vegetacao_nativa"],
    }

    FIXTURE_OUT.write_text(json.dumps(saida, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[B2] fixture escrito em: {FIXTURE_OUT}")

    # -- Resumo --
    from shapely.geometry import shape as _shape
    imovel_area = _shape(saida["imovel"]).area
    print(f"\n=== RESUMO ===")
    print(f"  imóvel área    : {imovel_area:,.0f} m²  ({imovel_area/10000:.2f} ha)")
    if saida["corpos_dagua"]:
        agua_area = _shape(saida["corpos_dagua"]).area
        print(f"  corpos d'água  : {agua_area:,.0f} m²  ({saida['corpos_dagua']['type']})")
    else:
        print("  corpos d'água  : AUSENTE na bbox do imóvel")
    if saida["vegetacao_nativa"]:
        veg_area = _shape(saida["vegetacao_nativa"]).area
        print(f"  vegetação nativa: {veg_area:,.0f} m²  ({100*veg_area/imovel_area:.1f}% do imóvel)")
    else:
        print("  vegetação nativa: AUSENTE na bbox do imóvel")
    areas = saida.get("areas_por_classe_m2", {})
    if areas:
        print(f"  cobertura (m²) : {areas}")
