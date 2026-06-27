"""
agent_hub — o Agent Hub mínimo (P0-1).

Prova o conceito "protocolo, não produto": o Compadre não é hard-coded —
é CARREGADO a partir de um manifesto YAML. O mesmo loader instancia qualquer
agente (Auditor, Territorial...) que declare suas tools. Trocar o manifesto
muda o agente sem mexer no código do Hub.

Protocolo-agnóstico: não assume nada sobre um Hub externo (web3 ou outro).
"""

from pathlib import Path
import yaml

from consultar_sicar import consultar_sicar
from consultar_ontologia import Ontologia
from traduzir_llm import traduzir

AGENTS_DIR = Path(__file__).parent / "agents"


class AgentHub:
    """Carrega manifestos de agente e resolve suas tools por nome."""

    def __init__(self):
        # registro de tools disponíveis na plataforma
        self.ontologia = Ontologia()
        self.registry = {
            "consultar_sicar": consultar_sicar,
            "consultar_ontologia": self.ontologia,
            "traduzir_llm": traduzir,
        }
        self.agentes = {}
        for manifesto in AGENTS_DIR.glob("*.yaml"):
            self._carregar(manifesto)

    def _carregar(self, caminho: Path):
        m = yaml.safe_load(caminho.read_text(encoding="utf-8"))
        nome = m["metadata"]["name"]
        # valida que toda tool declarada existe no registry
        declaradas = m["spec"].get("tools", [])
        faltando = [t for t in declaradas if t not in self.registry]
        self.agentes[nome] = {
            "manifesto": m,
            "tools_ok": not faltando,
            "tools_faltando": faltando,
        }

    # ----- P1-1b: listar agentes (alimenta a UI do Hub) ------------------

    def listar(self) -> list:
        out = []
        for nome, a in self.agentes.items():
            m = a["manifesto"]
            out.append({
                "name": nome,
                "description": m["metadata"].get("description", ""),
                "tools": m["spec"].get("tools", []),
                "ontology_concepts": m["spec"].get("ontology", {}).get("concepts", []),
                "operacional": a["tools_ok"],
            })
        return out

    # ----- P0-2: executar um agente --------------------------------------

    def run_agent(self, nome: str, numero_car: str, mensagem: str) -> dict:
        if nome not in self.agentes:
            return {"erro": f"Agente '{nome}' não registrado no Hub"}
        if nome != "compadre":
            # outros agentes existem como manifesto (vitrine), mas não rodam no PoC
            return {"erro": f"Agente '{nome}' é demonstrativo — não executável no PoC"}
        return self._pipeline_compadre(numero_car, mensagem)

    def _pipeline_compadre(self, numero_car: str, mensagem: str) -> dict:
        """Orquestração do Compadre: SICAR -> ontologia -> LLM. Cada passo usa
        uma tool declarada no manifesto."""
        sicar = self.registry["consultar_sicar"]
        onto = self.registry["consultar_ontologia"]

        dados = sicar(numero_car)
        alertas = dados.get("alertas", [])

        pendencias_out = []
        regra_primaria = None
        for alerta in alertas:
            r = onto.regra_para_pendencia(alerta["tipo"])
            if "erro" in r:
                continue
            pendencias_out.append({
                "tipo": alerta["tipo"],
                "gravidade": alerta.get("gravidade", "alerta"),
                "explicacao": r["explicacao"],
                "o_que_fazer": r["o_que_fazer"],
            })
            if regra_primaria is None:
                regra_primaria = r

        beneficios_full = onto.beneficios(situacao_car="Ativo")
        beneficios = [b["beneficio"] for b in beneficios_full]

        traducao, proximo_passo = traduzir(dados, pendencias_out, beneficios)

        # P0-7: a regra aplicada, rastreável, sempre presente
        if regra_primaria:
            regra_aplicada = {
                "conceito": regra_primaria["rastro_ontologia"],
                "parametro_legal": regra_primaria["explicacao"],
                "fonte": regra_primaria["fonte"],
                "rastro_ontologia": regra_primaria["rastro_ontologia"],
            }
        else:
            regra_aplicada = None

        return {
            "traducao": traducao,
            "pendencias": pendencias_out,
            "regra_aplicada": regra_aplicada,
            "proximo_passo": proximo_passo,
            "link_sicar": "https://car-sus.dataprev.gov.br/#/",
            "beneficios": beneficios,
        }
