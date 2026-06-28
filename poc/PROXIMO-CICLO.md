# Próximo ciclo — o que falta para o PoC ficar redondo

> Handoff. Nada aqui é urgente — fechar quando o Lorenzzo decidir abrir o próximo
> ciclo. Cada item tem **o que fazer**, **onde**, e **como saber que ficou pronto**.

---

## Onde estamos (já pronto ✅)

| Camada | Estado |
|---|---|
| Ontologia do CAR (`backend/ontologia/car.ttl`) | ✅ verificada na Lei 12.651/2012 |
| Camada semântica (`consultar_ontologia.py`) | ✅ regra + fonte + rastro |
| Análise de déficit de APP (`analise_app.py`, P0-8) | ✅ roda na **amostra** sintética |
| Agent Hub + manifestos (`agent_hub.py`, `agents/`) | ✅ 4 agentes (Compadre ativo) |
| API (`api.py`) | ✅ `/conversa`, `/agentes`, `/analise/demo` |
| LLM multi-provider (`traduzir_llm.py`) | ✅ anthropic/openai/template |
| Interface web (`web/`) | ✅ chat Compadre + vitrine Hub |
| Testes | ✅ 17/17 |

O que NÃO é real ainda: a busca pelo número do CAR (stub lê o fixture) e a
análise roda sobre **geometria de amostra**, não sobre o imóvel real.

---

## Decisão que destrava tudo (RESOLVIDA)

✅ **Imóvel de demo definido:** Lote 56 e 57 da Quadra nº 13 — Alvinópolis/**MG**
(`MG-3102308-1F30612FD2F845A7B8852A7B0BF07455`).
🔄 **GeoPackage SFB de MG em download** (lento). Quando terminar, salvar em
`Dados/Regularização Ambiental - Uso do Solo/MG_CAR_Uso_Cobertura_Solo.gpkg` e
rodar o B2 sobre o polígono real → a análise de déficit deixa de ser sintética.

Até lá, a análise roda sobre a amostra sintética no contrato `geometria.fixture.json`.

---

## Dev B — o que construir (`connectors/`)

### B1. Conector da consulta pública — situação + geometria
- **Onde:** `connectors/sicar_publica.py`
- **O quê:** dado o número do CAR, retornar `situação` + `geometria` (polígono do
  imóvel) chamando os endpoints JSON por trás de `consulta.car.gov.br`.
  (Inspecionar as chamadas XHR da SPA no DevTools → replicar via `requests`.)
- **Não** tenta pegar pendências internas (CIB/representante) — essas ficam no
  fixture; lookup ao vivo exige auth Gov.br (Horizonte 2).
- **Pronto quando:** retorna situação + polígono de um imóvel real pelo número,
  no mesmo espírito do contrato. Se o endpoint bloquear (anti-bot), documentar e
  manter o fixture — não travar o PoC.

### B2. Recorte do GeoPackage SFB — cobertura do solo do imóvel
- **Onde:** `connectors/sfb_recorte.py`
- **O quê:** dado o polígono do imóvel, recortar o `.gpkg` do SFB do estado e
  devolver a **vegetação nativa existente** dentro/no entorno do imóvel (a
  geometria que o `analise_app` usa como `vegetacao_existente`).
- **Stack:** `geopandas`/`fiona` ou `ogr2ogr` para recortar; reprojetar para UTM
  (metros) antes de medir área.
- **Pronto quando:** dado um polígono, retorna a cobertura recortada em GeoJSON
  métrico que o `analise_app.analisar_app()` consome sem alteração.

### B3. (opcional, web) Mostrar a análise na interface
- **Onde:** `web/` — um card/seção no chat ou na vitrine com o déficit de APP.
- **Consome:** `GET /analise/demo` (ou o endpoint real quando existir).
- **Pronto quando:** a tela mostra "déficit de X m², regra Y" de forma legível.

---

## Dev A — integração (próximo ciclo)

### A1. Plugar o conector real no lugar do stub
- **Onde:** `agent_hub.py` (registry) + `consultar_sicar.py`
- **O quê:** usar `connectors/sicar_publica.py` para situação + geometria;
  manter as pendências vindo do fixture (até haver parceria).
- **Pronto quando:** `POST /conversa` reflete a situação real do número informado.

### A2. Análise de APP sobre dado real (tirar a amostra)
- **Onde:** `analise_app.py` + um novo endpoint `POST /analise`
- **O quê:** receber geometria (B1) + cobertura (B2) em vez do
  `dados_demo/imovel_demo.geojson`. O cálculo já está pronto — só trocar a fonte.
- **Pronto quando:** `POST /analise` calcula o déficit do imóvel real.

### A3. Compadre mostrar o déficit na conversa
- **Onde:** `agent_hub.py` (`_pipeline_compadre`)
- **O quê:** adicionar a análise de APP (P0-8) ao fluxo, de modo que a resposta
  inclua "descobri um déficit de mata ciliar de X m²". É o diferencial na cara.
- **Pronto quando:** a conversa traz a análise junto das pendências, com rastro.
- ⚠️ Mudar o formato da resposta = atualizar `contracts/conversa.example.json`
  (com acordo dos dois — ver `contracts/README.md`).

---

## Contrato novo a criar (quando A2 entrar)

Hoje há 2 contratos (`pendencia.fixture.json`, `conversa.example.json`). A análise
vai precisar de mais um:
- `contracts/geometria.fixture.json` — formato do polígono + curso d'água + cobertura
  que B1/B2 produzem e o `analise_app` consome. Congelar antes de codar A2.

---

## Horizonte 2 (fora do PoC — só com parceria)

- Pendências internas (CIB, representante, validação OEMA) ao vivo → integração
  institucional (MGI/SFB/Dataprev) ou RER com dados reais.
- Instância própria do RER via Docker com dados de teste.
- MapBiomas via Google Earth Engine (cobertura ao vivo por polígono).
- Deep links contextuais por etapa do SICAR (P1-4).

---

## Checklist rápido

- [ ] Decidir estado do imóvel de demo + ter o GeoPackage SFB dele
- [ ] B1 — conector consulta pública (situação + geometria)
- [ ] B2 — recorte do GeoPackage SFB (cobertura)
- [ ] B3 — (opcional) análise na interface web
- [ ] A1 — plugar conector real no lugar do stub
- [ ] A2 — análise de APP sobre dado real (`POST /analise`)
- [ ] A3 — Compadre mostra o déficit na conversa
- [ ] Congelar `contracts/geometria.fixture.json` antes de A2
