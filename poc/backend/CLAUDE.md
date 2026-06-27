# `backend/` — Dev A (o cérebro)

Você é dono do raciocínio do Compadre: o que ele entende e como responde.

## O que você constrói (requisitos do PRD)

- **P0-1** Loader de manifesto — instancia o agente a partir de `agents/compadre.yaml`
- **P0-2** API `POST /conversa` — orquestra: pendência → ontologia → LLM → resposta
- **P0-4** Ontologia mínima — `ontologia/car.ttl` (APP, RL, bioma, pendência, benefício)
- **P0-5** Módulo LLM — traduz a pendência técnica em linguagem simples
- **P0-7** ⭐ Rastreabilidade — toda resposta cita a regra concreta vinda da ontologia

## Sua costura com o resto

```
você CONSOME  →  contracts/pendencia.fixture.json  (vem do Dev B)
você PRODUZ   →  contracts/conversa.example.json    (vai pro Dev B)
```

- Rode a API contra `contracts/pendencia.fixture.json`. **Não espere** o conector
  SICAR real de Dev B — o fixture é a sua fonte até a integração.
- A resposta da sua API tem que bater com o formato de `contracts/conversa.example.json`.

## Regras

1. **Não edite `connectors/` nem `web/`.** São do Dev B.
2. **Não mude `contracts/` sozinho.** Precisa de acordo (ver `contracts/README.md`).
3. **P0-7 é inegociável:** o campo `regra_aplicada` sempre preenchido com o
   parâmetro legal real e o rastro da ontologia. A regra vem do grafo, **nunca**
   é inventada pelo LLM. Esse é o diferencial inteiro.
4. **Escopo de PoC:** ontologia mínima basta. Não modele o Código Florestal inteiro.

## Stack sugerido

Python + FastAPI + rdflib. LLM: Claude Haiku 4.5. Ontologia em Turtle (`.ttl`).
