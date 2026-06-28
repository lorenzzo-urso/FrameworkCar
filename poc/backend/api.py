"""
api — a API do Compadre (P0-2).

Expõe o Agent Hub via HTTP:
- POST /conversa  -> roda o Compadre (SICAR -> ontologia -> LLM)
- GET  /agentes   -> lista os agentes carregados dos manifestos (P1-1b)

Rodar:  uvicorn api:app --reload
Docs:   http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent_hub import AgentHub
from traduzir_llm import escolher_provedor
from analise_app import analisar_geometria_fixture

app = FastAPI(
    title="Compadre / Terra Comum — PoC",
    description="Agente que traduz pendências do CAR raciocinando sobre a ontologia.",
)

# PoC: libera CORS para a interface web (poc/web/) chamar a API do navegador.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

hub = AgentHub()


class ConversaIn(BaseModel):
    numero_car: str
    mensagem: str


@app.get("/")
def raiz():
    return {
        "servico": "Compadre / Terra Comum",
        "provedor_llm": escolher_provedor(),
        "agentes": [a["name"] for a in hub.listar()],
    }


@app.get("/agentes")
def agentes():
    """Lista os agentes registrados no Hub (alimenta a UI da vitrine)."""
    return hub.listar()


@app.post("/conversa")
def conversa(inp: ConversaIn):
    """O produtor manda o número do CAR + mensagem; o Compadre responde."""
    return hub.run_agent("compadre", inp.numero_car, inp.mensagem)


@app.get("/analise/demo")
def analise_demo():
    """Análise própria de déficit de APP (P0-8). Lê a geometria do contrato
    `geometria.fixture.json` — produzido pelo B2 a partir do recorte do GeoPackage
    SFB (hoje seed sintético; vira real quando o gpkg de MG estiver pronto)."""
    return analisar_geometria_fixture()
