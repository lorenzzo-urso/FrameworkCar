# FrameworkCar — contexto para agentes e devs

Diretório de trabalho da equipe para o **haCARthon — Desafio 1**. Versão limpa e
compartilhável. A partir daqui, o trabalho acontece **só neste diretório**.

Comece por [`README.md`](README.md). Visão do produto em
[`01-produto/produto.md`](01-produto/produto.md).

---

## A solução em uma linha

**Terra Comum** (camada semântica aberta do território — ontologia + Agent Hub,
sobre o RER open-source) + **Compadre** (agente que ajuda o produtor a fazer o CAR
pelo WhatsApp). Princípio: **esconde a máquina pesada, ensina só o essencial.**

- A cara (vídeo): Compadre · O motor (pitch): Terra Comum.
- Persona: **Seu Raimundo** (oficial do Briefing).
- Desafio 1; continua válido pelo mandato "benefícios individuais e coletivos".

---

## Mapa do diretório

| Pasta | Conteúdo |
|---|---|
| `01-produto/` | produto, desafio-e-fit, narrativa (5 elementos fixos) |
| `02-pesquisa/` | persona Seu Raimundo + problema + 3 gargalos |
| `03-frameworks/` | value-proposition, jornada (+ storyboard), lean-canvas |
| `04-arquitetura/` | arquitetura (camadas + Hub + RER), viabilidade |
| `05-entregas/` | 1-ideacao (rascunho), 2-roteiro-video (a fazer), 3-pitch (a fazer) |
| `06-referencias/` | bases-de-dados, edital-resumo, riscos-e-pendencias |

---

## Skills (.claude/skills/)

As 13 skills do haCARthon estão em `.claude/skills/`. Comece toda sessão com
**`/hacarthon-status`**. Fluxo:

```
status → pesquisa-produtor → convergencia → {value-proposition, user-journey, lean-canvas}
       → narrativa → ideacao → roteiro-prototipo → pitch → banca → checklist-entrega
```

**`hacarthon-entrega-ideacao`** — skill nova para o formulário real da plataforma
(10 campos). Usar no lugar de `hacarthon-ideacao` na hora da submissão final.

Estado atual: etapas até **narrativa + ideação (rascunho)** concluídas. Próximo:
**roteiro do vídeo** (`05-entregas/2-roteiro-video.md`).

### ⚠️ Mapa de caminhos para as skills

As skills foram escritas para um layout anterior e citam caminhos `dados/...` que
**não existem aqui**. Equivalências nesta estrutura:

| A skill diz... | Aqui é... |
|---|---|
| `dados/raimundo-research.md` | [`02-pesquisa/persona-e-problema.md`](02-pesquisa/persona-e-problema.md) |
| `dados/edital-resumo.md` | [`06-referencias/edital-resumo.md`](06-referencias/edital-resumo.md) |
| `dados/estrategia.md`, `dados/ideia2.md` | [`01-produto/produto.md`](01-produto/produto.md) + [`01-produto/desafio-e-fit.md`](01-produto/desafio-e-fit.md) |
| `mapa de oportunidadesa.txt` | (histórico — não consta aqui) |
| outputs de VPC / jornada / canvas / narrativa | `03-frameworks/` e `01-produto/narrativa.md` |

Documentos de produto/decisão já refletem a versão atual — **não reintroduzir**
"Painel de Potencial", "Score do CAR" nem persona "Paulo"; usar Terra Comum /
Compadre / Seu Raimundo.

---

## Regras invioláveis

1. **Open-source / Bem Público Digital.** Sem dados pessoais identificáveis de
   produtor real, sem credenciais de teste neste diretório. Persona oficial
   Raimundo; insights reais anonimizados.
2. **Backend só no pitch, nunca no vídeo.** O vídeo mostra o Compadre/Raimundo —
   nunca ontologia, SPARQL ou diagrama. Usabilidade é julgada pela experiência do produtor.
3. **RER:** dizer "construído sobre o RER open-source" (instância própria) — nunca
   "consultamos o sistema nacional por CPF".
4. **Vídeo ≤2min** (limite de segurança até confirmar a regra com a organização).
5. **Mencionar ao menos uma base de dados aberta** em qualquer descrição da solução.
6. **Inovação é o desempate** — diferencial merece resposta cuidadosa.

Pendências abertas em [`06-referencias/riscos-e-pendencias.md`](06-referencias/riscos-e-pendencias.md).
