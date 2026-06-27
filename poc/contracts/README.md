# `contracts/` — a costura entre os dois devs

Estes arquivos são **contratos congelados**. São o único ponto onde o trabalho de
Dev A e Dev B se encontra.

## Os dois contratos

| Arquivo | Quem produz | Quem consome |
|---|---|---|
| `pendencia.fixture.json` | `connectors/` (Dev B) | `backend/` (Dev A) |
| `conversa.example.json` | `backend/` (Dev A) | `web/` (Dev B) |

## Regra de mudança

⚠️ **Mudar um contrato quebra os dois lados.** Por isso:

1. Não altere um arquivo aqui sozinho.
2. Para propor mudança: avise o outro dev, combinem o novo formato, e atualizem
   **juntos** — de preferência num commit só.
3. Quem consome deve sempre poder rodar contra o fixture, mesmo que a peça real
   do outro lado ainda não exista.

## Por que isso destrava o paralelismo

Com o contrato congelado, Dev A testa a API contra `pendencia.fixture.json` sem
esperar o conector SICAR de Dev B ficar pronto. E Dev B monta a UI contra
`conversa.example.json` sem esperar a ontologia de Dev A. Ninguém bloqueia ninguém.
