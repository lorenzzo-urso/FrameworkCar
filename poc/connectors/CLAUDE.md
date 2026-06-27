# `connectors/` — Dev B (as bordas: dados externos)

Você é dono de tudo que busca dado fora: SICAR e SFB.

## O que você constrói (requisitos do PRD)

- **P0-3** Conector SICAR — consulta `consulta.car.gov.br` pelo número do CAR e
  extrai situação + alertas + pendências
- **P1-2** Conector SFB — lê o GeoPackage `AL_CAR_Uso_Cobertura_Solo.gpkg` e extrai
  cobertura do solo do imóvel de demo

## Sua costura com o resto

```
você PRODUZ  →  contracts/pendencia.fixture.json  (vai pro backend, Dev A)
```

O conector SICAR tem que devolver **exatamente** o formato de
`contracts/pendencia.fixture.json`. Enquanto o scraping real não funciona, esse
fixture já é a saída esperada — o backend de Dev A roda contra ele.

## Regras

1. **Não edite `backend/` nem `web/`.**
2. **Mocka primeiro (regra de corte do PRD):** o scraping ao vivo do SICAR é o
   maior risco do projeto (anti-bot, JS, captcha). Se não funcionar até o fim do
   Dia 1, **o fixture é a entrega** — e seguimos. O vídeo nunca depende de
   conexão ao vivo.
3. **Não mude o formato de `pendencia.fixture.json` sozinho** — o backend depende
   dele. Mudança exige acordo (ver `contracts/README.md`).
4. O GeoPackage de 1,84 GB **não vai pro git** (já está no `.gitignore` da raiz).

## Stack sugerido

Python. SICAR: requests + BeautifulSoup (ou Playwright se exigir JS).
SFB: GDAL/ogr2ogr ou geopandas para ler o `.gpkg`.
