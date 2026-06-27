# Regras para qualquer agente trabalhando em `poc/`

Você está num PoC de hackathon com **2 devs em paralelo**. Antes de editar qualquer
coisa, entenda em qual pasta você está e quem é o dono dela.

## Antes de começar — leia a regra local

Cada pasta tem seu próprio `CLAUDE.md` com a regra específica. **Leia o `CLAUDE.md`
da pasta onde você vai trabalhar** antes de editar.

| Você vai mexer em... | Leia primeiro |
|---|---|
| `backend/` | [`backend/CLAUDE.md`](backend/CLAUDE.md) — Dev A, o cérebro |
| `connectors/` | [`connectors/CLAUDE.md`](connectors/CLAUDE.md) — Dev B, bordas |
| `web/` | [`web/CLAUDE.md`](web/CLAUDE.md) — Dev B, bordas |
| `contracts/` | [`contracts/README.md`](contracts/README.md) — exige acordo dos dois |

## Regras invioláveis (valem em qualquer pasta)

1. **Não edite a pasta de outro dono.** Se a sua tarefa precisa mudar a pasta do
   outro, **pare e avise** — não atravesse a fronteira sozinho.
2. **Não mude um arquivo de `contracts/` por conta própria.** Eles são a costura
   entre os dois devs; mudar um quebra o outro lado. Ver `contracts/README.md`.
3. **Mocka, não espera.** Se o seu código depende da peça do outro dev, use o
   fixture em `contracts/`. Nunca bloqueie esperando a integração.
4. **Isolamento por worktree.** Se você é um agente, trabalhe no worktree do seu
   dev. Não assuma que é o único agente no repositório.
5. **Escopo de PoC.** Prova o conceito, não constrói o produto. Não adicione
   features que não estão no PRD. Mockar é aceitável e esperado.

## A arquitetura em uma linha

```
web/  →  backend/ (API /conversa)  →  ontologia + LLM
                  ↑
            connectors/ (SICAR, SFB)
```

Detalhes no PRD: [`../05-entregas/poc-backend-prd.md`](../05-entregas/poc-backend-prd.md).
