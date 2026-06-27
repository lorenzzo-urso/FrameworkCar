# backend/ — o cérebro do Compadre (Dev A)

O raciocínio do Compadre: recebe uma pendência do CAR, **busca a regra na
ontologia** (com fonte legal), e devolve em linguagem simples — preservando a
rastreabilidade. O LLM só traduz; a regra vem sempre do grafo.

Especificação completa no [PRD](../../05-entregas/poc-backend-prd.md).

---

## Arquitetura

```
POST /conversa
      │
      ▼
AgentHub (carrega o agente do manifesto YAML)      agent_hub.py     [P0-1]
      │
      ├─ consultar_sicar   → pendências do imóvel    consultar_sicar.py  (stub→Dev B)
      ├─ consultar_ontologia → regra + fonte legal   consultar_ontologia.py [P0-4]
      └─ traduzir_llm      → linguagem simples        traduzir_llm.py    [P0-5]
      │
      ▼
resposta (bate com contracts/conversa.example.json, com regra_aplicada) [P0-7]
```

| Arquivo | Papel |
|---|---|
| `ontologia/car.ttl` | Ontologia do CAR — regras do Código Florestal (verificadas na Lei 12.651/2012) |
| `consultar_ontologia.py` | Consulta o grafo: APP, RL, pendências, benefícios — sempre com fonte + rastro |
| `agents/compadre.yaml` | Manifesto do agente produtor (executável) |
| `agents/auditor.yaml` | Manifesto vitrine (prova N agentes; não roda no PoC) |
| `agent_hub.py` | Carrega manifestos, resolve tools, orquestra o pipeline |
| `consultar_sicar.py` | **Stub** que lê o contrato; o conector real é do Dev B em `connectors/` |
| `traduzir_llm.py` | Tradução via Anthropic/OpenAI/template (escolhido por env) |
| `api.py` | FastAPI: `POST /conversa`, `GET /agentes`, `GET /` |

---

## Setup

```bash
cd poc/backend
python -m venv .venv
.venv/Scripts/activate          # Windows; no Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
```

---

## Provedor de LLM (opcional)

Funciona **sem nenhuma key** — cai num fallback de template que usa os dados da
ontologia. Para usar um LLM de verdade:

```bash
cp .env.example .env
```

Edite o `.env` (nunca vai pro git):

```
LLM_PROVIDER=openai          # anthropic | openai | auto
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

| `LLM_PROVIDER` | Comportamento |
|---|---|
| `anthropic` | usa Claude (precisa de `ANTHROPIC_API_KEY`) |
| `openai` | usa OpenAI (precisa de `OPENAI_API_KEY`) |
| `auto` (default) | Anthropic se houver key; senão OpenAI; senão template |

Seja qual for o provider, **a regra e a fonte legal vêm da ontologia** — o LLM só
reescreve. Trocar de fornecedor não afeta a rastreabilidade.

---

## Rodar

```bash
# API
.venv/Scripts/python.exe -m uvicorn api:app --reload
#   http://127.0.0.1:8000/docs   (Swagger)
#   GET /            -> provedor_llm ativo + agentes
#   GET /agentes     -> Compadre (operacional) + Auditor (vitrine)
#   POST /conversa   -> {"numero_car": "...", "mensagem": "..."}

# Demo da ontologia (prova o ponto, contra o imóvel de teste)
.venv/Scripts/python.exe demo_ontologia.py
```

Exemplo de chamada:

```bash
curl -X POST http://127.0.0.1:8000/conversa \
  -H "Content-Type: application/json" \
  -d '{"numero_car":"RJ-3304300-XXX","mensagem":"oi, tenho uma pendencia"}'
```

---

## Testes

```bash
.venv/Scripts/python.exe test_ontologia.py   # 7 testes — regras do Código Florestal
.venv/Scripts/python.exe test_api.py         # 6 testes — orquestração do Hub
```

(Rodam sem pytest e sem API key.)

---

## Fronteiras (contrato com o Dev B)

- **Consome** `../contracts/pendencia.fixture.json` (saída do conector SICAR — Dev B).
  O `consultar_sicar.py` é um stub que lê esse fixture; o conector real produz o
  mesmo formato.
- **Produz** respostas no formato `../contracts/conversa.example.json` (consumido
  pela interface web — Dev B).

Mudar qualquer um desses contratos exige acordo entre os dois devs
(ver [`../contracts/README.md`](../contracts/README.md)).

---

## O que é real × stub no PoC

| Componente | Estado |
|---|---|
| Ontologia + consulta | ✅ Real, verificada na lei, testada |
| Hub / loader de manifesto | ✅ Real (carrega e valida YAML) |
| API `/conversa` e `/agentes` | ✅ Real |
| Tradução LLM | ✅ Real (Anthropic/OpenAI) + fallback template |
| Conector SICAR | 🟡 Stub lê o fixture — conector real é do Dev B |
| Agente Auditor | 🟡 Manifesto vitrine — não executável (prova N agentes) |
