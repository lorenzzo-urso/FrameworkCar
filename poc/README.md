# PoC — Terra Comum / Compadre

Prova de conceito do haCARthon. Especificação completa em
[`../05-entregas/poc-backend-prd.md`](../05-entregas/poc-backend-prd.md).

> **Objetivo:** provar o conceito, não entregar o produto. Muita coisa é mockada
> — e tudo bem. Ver a seção de Riscos no PRD.

---

## Como 2 devs trabalham aqui sem se atropelar

A regra de ouro: **vocês só se tocam nos contratos.** Cada um é dono da sua pasta,
mocka contra os arquivos de `contracts/`, e nunca edita a pasta do outro.

### Mapa de donos

| Pasta | Dono | O que faz |
|---|---|---|
| `backend/` | **Dev A (cérebro)** | Loader de manifesto, API `/conversa`, ontologia, LLM, rastreabilidade |
| `connectors/` | **Dev B (bordas)** | Conector SICAR, conector SFB |
| `web/` | **Dev B (bordas)** | Interface WhatsApp + Hub UI |
| `contracts/` | **OS DOIS** | Só muda com acordo dos dois — quebra os dois lados |

### As 2 costuras (e só essas)

```
connectors/  ──[ produz ]──>  contracts/pendencia.fixture.json  ──[ consome ]──>  backend/
backend/     ──[ produz ]──>  contracts/conversa.example.json   ──[ consome ]──>  web/
```

Enquanto cada um respeitar o formato dos contratos, podem codar em paralelo sem
esperar o outro.

### As 4 regras

1. **Contrato antes do código** — os arquivos de `contracts/` são congelados no
   Dia 1. Codar só depois que os dois concordarem com o formato.
2. **Fixture para todos** — Dev B não espera o SICAR de verdade; usa o fixture.
   Dev A não espera a UI; testa contra o `conversa.example.json`.
3. **Branch curta** — mergear no `main` a cada meio dia, em pedaços pequenos.
4. **Dono por pasta** — precisa mexer na pasta do outro? Avisa antes (são 2 pessoas).

### Para agentes (Claude Code): worktree por dev

Cada dev roda seu agente num **git worktree separado** — cópia física isolada do
repo. Dois agentes nunca escrevem no mesmo working directory; a integração é via
git. Cada pasta tem um `CLAUDE.md` com a regra local — o agente lê ao entrar nela.

---

## Quickstart

```bash
# Dev A
cd poc/backend && # ... sobe a API contra contracts/pendencia.fixture.json

# Dev B
cd poc/web && # ... sobe a UI contra contracts/conversa.example.json
```
