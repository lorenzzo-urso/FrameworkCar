# FrameworkCar — Terra Comum / Compadre

> Diretório de trabalho da equipe para o **haCARthon — Desafio 1**.
> Versão consolidada e compartilhável. A partir daqui, o trabalho acontece
> **só neste diretório**.

---

## O que é a solução, em uma frase

> **Camada semântica aberta do território rural brasileiro (Terra Comum) +
> assistente que ajuda o produtor pelo WhatsApp (Compadre)** — o produtor
> regulariza o CAR sem sofrer; governo, cooperativas e agentes de IA raciocinam
> sobre o mesmo modelo de conhecimento.

Princípio de produto: **esconde a máquina pesada, ensina só o essencial.**

- **A cara (o que o jurado vê):** o **Compadre** — o produtor conversa pelo WhatsApp.
- **O motor (o que o jurado ouve):** a **Terra Comum** — ontologia + camada
  semântica + Agent Hub, construída sobre o RER open-source.

---

## Como navegar

| Pasta | O que tem |
|---|---|
| [`01-produto/`](01-produto/) | O que é a solução, por que cabe no Desafio 1, a narrativa (5 elementos fixos) |
| [`02-pesquisa/`](02-pesquisa/) | Persona Seu Raimundo + os 3 gargalos + o problema |
| [`03-frameworks/`](03-frameworks/) | Value Proposition, Jornada, Lean Canvas |
| [`04-arquitetura/`](04-arquitetura/) | Arquitetura em camadas + viabilidade honesta |
| [`05-entregas/`](05-entregas/) | As 3 entregas obrigatórias + o PRD do PoC |
| [`06-referencias/`](06-referencias/) | Bases de dados abertas, resumo do edital, riscos e pendências |
| [`poc/`](poc/) | **Código do PoC** — estrutura, contratos e regras para os 2 devs |

**Comece por:** [`01-produto/produto.md`](01-produto/produto.md).

### Para os devs / Claude Code

As 13 skills do haCARthon estão em `.claude/skills/` — abrindo este diretório no
Claude Code, os comandos `/hacarthon-*` ficam disponíveis. Comece com
`/hacarthon-status`. Contexto completo (incluindo o mapa de caminhos das skills)
em [`CLAUDE.md`](CLAUDE.md).

**Para construir o PoC:** leia o PRD em
[`05-entregas/poc-backend-prd.md`](05-entregas/poc-backend-prd.md) e as regras de
trabalho em [`poc/README.md`](poc/README.md). São 2 devs em paralelo — cada um é
dono de uma pasta, e os dois só se tocam nos `poc/contracts/`.

---

## Estado das 3 entregas obrigatórias

| Entrega | Formato | Status |
|---|---|---|
| 1. Ideação | Formulário na plataforma (10 campos) | ✅ Rascunho dos 10 campos — [`05-entregas/1-ideacao.md`](05-entregas/1-ideacao.md) (falta campo 1 reescrito + mentoria) |
| 2. Protótipo | Vídeo ≤2min no YouTube | ⬜ A fazer — [`05-entregas/2-roteiro-video.md`](05-entregas/2-roteiro-video.md) |
| 3. Pitch | PDF + áudio na plataforma | ⬜ A fazer — [`05-entregas/3-pitch.md`](05-entregas/3-pitch.md) |

> **PoC em construção:** PRD pronto em [`05-entregas/poc-backend-prd.md`](05-entregas/poc-backend-prd.md);
> estrutura de trabalho em [`poc/`](poc/).

---

## Pendências da equipe (ação humana)

Ver detalhe em [`06-referencias/riscos-e-pendencias.md`](06-referencias/riscos-e-pendencias.md).

- 🔴 Confirmar com a organização: limite do vídeo (2 vs. 3 min) e lives obrigatórias
- 🔴 Realizar a mentoria obrigatória (campo 10 da Ideação) e registrar o feedback
- 🟡 Reescrever o campo 1 (Brainstorm) com o processo real do time
- 🟡 Confirmar nomes definitivos (Terra Comum / Compadre são provisórios)
- 🟢 1 número oficial de CARs pendentes; parceiro do piloto (CATI-SP)

> Insumos já garantidos: base SFB de AL baixada, imóvel de demo do ambiente de
> teste do SICAR identificado (Sítio Três Rios), persona validada com 5 produtores.

---

## Nota sobre dados

Este diretório é compartilhável e a solução é **open-source**. Por isso, usa a
persona oficial **Seu Raimundo** (fictícia, do Briefing). Insights de produtor
real entram **anonimizados**. Nenhum dado pessoal identificável ou credencial de
teste deve ser adicionado aqui.
