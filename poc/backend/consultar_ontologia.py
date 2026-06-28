"""
consultar_ontologia — a tool que raciocina sobre o grafo do CAR.

Este é o coração do diferencial (P0-7): toda resposta carrega o RASTRO
(o conceito da ontologia usado) e a FONTE (o artigo legal). A regra vem do
grafo, nunca é inventada pelo LLM — o LLM só põe em linguagem simples.

Uso:
    from consultar_ontologia import Ontologia
    onto = Ontologia()  # carrega ontologia/car.ttl
    onto.app_hidrica(largura_rio_m=8)
    onto.app_nascente()
    onto.reserva_legal(amazonia_legal=False)
    onto.regra_para_pendencia("CIB_ausente")
    onto.beneficios(situacao_car="Ativo")
"""

from pathlib import Path
from rdflib import Graph, Namespace, RDFS, Literal
from rdflib.namespace import DCTERMS

CAR = Namespace("https://terracomum.org/car#")
TTL_PADRAO = Path(__file__).parent / "ontologia" / "car.ttl"


class Ontologia:
    def __init__(self, caminho_ttl: Path = TTL_PADRAO):
        self.g = Graph()
        self.g.parse(caminho_ttl, format="turtle")

    # ----- helpers -------------------------------------------------------

    def _str(self, sujeito, propriedade):
        v = self.g.value(sujeito, propriedade)
        return str(v) if v is not None else None

    def _rastro(self, sujeito) -> str:
        """Caminho legível do conceito no grafo — a prova de que veio da ontologia."""
        nome = str(sujeito).split("#")[-1]
        return f"car:{nome}"

    # ----- APP hídrica  (Lei 12.651/2012, Art. 4, I) ---------------------

    def app_hidrica(self, largura_rio_m: float) -> dict:
        """Dada a largura do curso d'água, retorna a faixa de mata exigida + fonte."""
        for faixa in self.g.subjects(object=CAR.FaixaAPP):
            lo = float(self.g.value(faixa, CAR.larguraRioMin))
            hi = float(self.g.value(faixa, CAR.larguraRioMax))
            # faixa: [lo, hi)  — exceto a última, que é aberta no topo
            if lo <= largura_rio_m < hi or (hi >= 999999 and largura_rio_m >= lo):
                return {
                    "pergunta": f"Qual a faixa de APP para um rio de {largura_rio_m} m?",
                    "faixa_protegida_m": int(self.g.value(faixa, CAR.faixaProtegidaMetros)),
                    "explicacao": self._str(faixa, RDFS.comment),
                    "fonte": self._str(faixa, DCTERMS.source),
                    "rastro_ontologia": self._rastro(faixa),
                }
        return {"erro": f"Nenhuma faixa encontrada para largura {largura_rio_m} m"}

    # ----- APP de nascente  (Lei 12.651/2012, Art. 4, IV) ----------------

    def app_nascente(self) -> dict:
        """Retorna o raio de proteção de nascente/olho d'água perene + fonte."""
        for n in self.g.subjects(object=CAR.FaixaAPPNascente):
            return {
                "pergunta": "Qual o raio de APP de uma nascente?",
                "raio_protegido_m": int(self.g.value(n, CAR.raioProtegidoMetros)),
                "explicacao": self._str(n, RDFS.comment),
                "fonte": self._str(n, DCTERMS.source),
                "rastro_ontologia": self._rastro(n),
            }
        return {"erro": "Regra de APP de nascente não encontrada"}

    # ----- Reserva Legal  (Lei 12.651/2012, Art. 12) ---------------------

    def reserva_legal(self, amazonia_legal: bool, tipo_vegetacao: str = "floresta") -> dict:
        """Percentual de RL depende da REGIÃO (Amazônia Legal) + tipo de vegetação.
        Fora da Amazônia Legal é sempre 20%, qualquer que seja a vegetação."""
        if amazonia_legal:
            q = """
            PREFIX car:  <https://terracomum.org/car#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX dct:  <http://purl.org/dc/terms/>
            SELECT ?regra ?pct ?comentario ?fonte WHERE {
                ?regra car:amazoniaLegal true ;
                       car:tipoVegetacao ?veg ;
                       car:percentualMinimo ?pct ;
                       rdfs:comment ?comentario ;
                       dct:source ?fonte .
                FILTER (LCASE(STR(?veg)) = LCASE(?alvo))
            }
            """
            binding = {"alvo": Literal(tipo_vegetacao)}
            contexto = f"Amazônia Legal, área de {tipo_vegetacao}"
        else:
            q = """
            PREFIX car:  <https://terracomum.org/car#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX dct:  <http://purl.org/dc/terms/>
            SELECT ?regra ?pct ?comentario ?fonte WHERE {
                ?regra car:amazoniaLegal false ;
                       car:percentualMinimo ?pct ;
                       rdfs:comment ?comentario ;
                       dct:source ?fonte .
            }
            """
            binding = {}
            contexto = "demais regiões do País (fora da Amazônia Legal)"

        for row in self.g.query(q, initBindings=binding):
            return {
                "pergunta": f"Qual o percentual de Reserva Legal — {contexto}?",
                "percentual_minimo": int(row.pct),
                "explicacao": str(row.comentario),
                "fonte": str(row.fonte),
                "rastro_ontologia": self._rastro(row.regra),
            }
        return {"erro": f"Regra de RL não encontrada para {contexto}"}

    # ----- Pendências ----------------------------------------------------

    def regra_para_pendencia(self, codigo: str) -> dict:
        """Dado o código da pendência, retorna explicação + o que fazer + fonte."""
        q = """
        PREFIX car: <https://terracomum.org/car#>
        SELECT ?p ?explicacao ?oQueFazer ?fonte WHERE {
            ?p car:codigo ?cod ;
               car:explicacao ?explicacao ;
               car:oQueFazer ?oQueFazer .
            OPTIONAL { ?p <http://purl.org/dc/terms/source> ?fonte }
            FILTER (?cod = ?alvo)
        }
        """
        for row in self.g.query(q, initBindings={"alvo": Literal(codigo)}):
            return {
                "codigo": codigo,
                "explicacao": str(row.explicacao),
                "o_que_fazer": str(row.oQueFazer),
                "fonte": str(row.fonte) if row.fonte else None,
                "rastro_ontologia": self._rastro(row.p),
            }
        return {"erro": f"Pendência '{codigo}' não mapeada na ontologia"}

    # ----- Contexto completo (para o Professor) --------------------------

    def contexto_completo(self) -> dict:
        """Despeja todo o conhecimento da ontologia para uso livre pelo Professor."""
        ctx: dict = {"app_hidrica": [], "app_nascente": None,
                     "reserva_legal": [], "pendencias": [], "beneficios": []}

        for faixa in self.g.subjects(object=CAR.FaixaAPP):
            lo = self.g.value(faixa, CAR.larguraRioMin)
            hi = self.g.value(faixa, CAR.larguraRioMax)
            fpm = self.g.value(faixa, CAR.faixaProtegidaMetros)
            ctx["app_hidrica"].append({
                "largura_rio_min_m": float(lo) if lo else None,
                "largura_rio_max_m": float(hi) if hi else None,
                "faixa_protegida_m": int(fpm) if fpm else None,
                "explicacao": self._str(faixa, RDFS.comment),
                "fonte": self._str(faixa, DCTERMS.source),
                "rastro_ontologia": self._rastro(faixa),
            })

        for n in self.g.subjects(object=CAR.FaixaAPPNascente):
            ctx["app_nascente"] = {
                "raio_protegido_m": int(self.g.value(n, CAR.raioProtegidoMetros)),
                "explicacao": self._str(n, RDFS.comment),
                "fonte": self._str(n, DCTERMS.source),
            }

        q_rl = """
        PREFIX car: <https://terracomum.org/car#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dct:  <http://purl.org/dc/terms/>
        SELECT ?regra ?pct ?comentario ?fonte ?amaz ?veg WHERE {
            ?regra car:percentualMinimo ?pct ;
                   rdfs:comment ?comentario .
            OPTIONAL { ?regra dct:source ?fonte }
            OPTIONAL { ?regra car:amazoniaLegal ?amaz }
            OPTIONAL { ?regra car:tipoVegetacao ?veg }
        }"""
        for row in self.g.query(q_rl):
            ctx["reserva_legal"].append({
                "percentual_minimo": int(row.pct),
                "amazonia_legal": bool(row.amaz) if row.amaz else False,
                "tipo_vegetacao": str(row.veg) if row.veg else "qualquer",
                "explicacao": str(row.comentario),
                "fonte": str(row.fonte) if row.fonte else None,
            })

        q_pend = """
        PREFIX car: <https://terracomum.org/car#>
        PREFIX dct: <http://purl.org/dc/terms/>
        SELECT ?p ?cod ?expl ?oqf ?fonte WHERE {
            ?p car:codigo ?cod ;
               car:explicacao ?expl ;
               car:oQueFazer ?oqf .
            OPTIONAL { ?p dct:source ?fonte }
        }"""
        for row in self.g.query(q_pend):
            ctx["pendencias"].append({
                "codigo": str(row.cod),
                "explicacao": str(row.expl),
                "o_que_fazer": str(row.oqf),
                "fonte": str(row.fonte) if row.fonte else None,
            })

        ctx["beneficios"] = self.beneficios("Ativo")
        return ctx

    # ----- Benefícios ----------------------------------------------------

    def beneficios(self, situacao_car: str = "Ativo") -> list:
        """Lista os benefícios desbloqueados para a situação do CAR."""
        q = """
        PREFIX car:  <https://terracomum.org/car#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dct:  <http://purl.org/dc/terms/>
        SELECT ?b ?label ?descricao ?fonte WHERE {
            ?b a car:Beneficio ;
               rdfs:label ?label ;
               car:descricao ?descricao ;
               car:exigeSituacao ?sit .
            OPTIONAL { ?b dct:source ?fonte }
            FILTER (?sit = ?alvo)
        }
        ORDER BY ?label
        """
        out = []
        for row in self.g.query(q, initBindings={"alvo": Literal(situacao_car)}):
            out.append({
                "beneficio": str(row.label),
                "descricao": str(row.descricao),
                "fonte": str(row.fonte) if row.fonte else None,
                "rastro_ontologia": self._rastro(row.b),
            })
        return out
