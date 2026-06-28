"""
demo_ontologia — prova o ponto.

Roda a tool consultar_ontologia contra o imóvel de teste (Lote 56 e 57 da
Quadra nº 13, Alvinópolis/MG) e mostra que cada resposta carrega a regra
concreta + a fonte legal + o rastro no grafo. É a evidência de "raciocina
sobre ontologia, não adivinha sobre texto".

Rodar:  python demo_ontologia.py
"""

import json
from consultar_ontologia import Ontologia


def bloco(titulo, resultado):
    print(f"\n{'='*70}\n{titulo}\n{'-'*70}")
    print(json.dumps(resultado, ensure_ascii=False, indent=2))


def main():
    onto = Ontologia()
    print("Ontologia carregada:", len(onto.g), "triplas\n")
    print("IMÓVEL DE DEMO: Lote 56 e 57 da Quadra nº 13 — Alvinópolis/MG — bioma Mata Atlântica")
    print("Pendências reais do SICAR de teste: CIB ausente, representante ausente")

    # 1. A pendência que o produtor recebeu (CIB) — traduzida com fonte
    bloco(
        "1) Pendência recebida: 'Informe o código CIB do imóvel'",
        onto.regra_para_pendencia("CIB_ausente"),
    )

    # 2. APP hídrica — se o imóvel tem curso d'água, rio pequeno (< 10 m) -> 30 m
    bloco(
        "2) Enriquecimento: se o imóvel tem curso d'água. Faixa de APP de um rio de 8 m",
        onto.app_hidrica(largura_rio_m=8),
    )

    # 3. Se houver nascente no sítio, o raio de proteção
    bloco(
        "3) E se o sítio tiver uma nascente? Raio de APP",
        onto.app_nascente(),
    )

    # 4. Reserva Legal — RJ está FORA da Amazônia Legal -> 20%
    bloco(
        "4) Reserva Legal exigida (RJ está fora da Amazônia Legal)",
        onto.reserva_legal(amazonia_legal=False),
    )

    # 5. O que o CAR regularizado desbloqueia
    bloco(
        "5) Benefícios que o CAR ativo desbloqueia",
        onto.beneficios(situacao_car="Ativo"),
    )

    # Contraprova: dentro da Amazônia Legal, área de floresta -> 80%
    bloco(
        "CONTRAPROVA) Mesmo imóvel, se fosse floresta na Amazônia Legal -> 80%",
        onto.reserva_legal(amazonia_legal=True, tipo_vegetacao="floresta"),
    )

    print(f"\n{'='*70}")
    print("PONTO PROVADO: cada resposta veio do grafo, com fonte legal rastreável.")
    print("O LLM (P0-5) só vai traduzir isto em linguagem simples — não inventa a regra.")
    print("="*70)


if __name__ == "__main__":
    main()
