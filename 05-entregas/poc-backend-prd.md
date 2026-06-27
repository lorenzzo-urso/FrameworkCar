# PRD — PoC Backend: Terra Comum / Compadre

> haCARthon · Desafio 1 · Prazo: 2,5 dias
> Gerado com a skill `product-management:write-spec`. Contexto em
> [`04-arquitetura/arquitetura.md`](../04-arquitetura/arquitetura.md) e
> [`04-arquitetura/viabilidade.md`](../04-arquitetura/viabilidade.md).
>
> **Disciplina de escopo:** este PoC **prova o conceito**, não entrega o produto.
> Tudo que depende de sistemas externos (Hub web3 de outro time, CAR nacional,
> GEE) fica fora ou mockado. Não assumir nada sobre integrações que ainda não
> existem — provar o padrão do nosso lado é suficiente.

---

## Problema

O produtor rural recebe notificações do CAR em linguagem técnica inacessível, não
sabe o que fazer, e entra num ciclo de retificações custoso. Não existe hoje
nenhum sistema que pegue uma pendência do SICAR e a traduza em orientação
acionável no canal que o produtor já usa (WhatsApp). O PoC precisa provar que essa
tradução é possível, confiável e rastreável — não como um chatbot de adivinhação,
mas como um agente que raciocina sobre a ontologia do Código Florestal, **rodando
sobre o Agent Hub da Terra Comum**.

---

## Goals

1. **Demonstrar o fluxo end-to-end do Compadre** em menos de 2 minutos de vídeo:
   notificação de entrada → tradução → orientação → deep link para a etapa certa
2. **Provar a camada semântica:** a resposta do agente deve referenciar um
   conceito da ontologia (APP, RL, bioma), não apenas repetir o texto da notificação
3. **Provar o Agent Hub (em miniatura):** o Compadre é carregado como um manifesto
   de agente por um loader, e existe uma **tela do Hub (vitrine, para o pitch)**
   onde se vê os agentes e se clica no Compadre para abrir o WhatsApp — provando
   que a plataforma hospeda agentes, não é um app fechado. É o que sustenta o
   diferencial "construímos a estrada, não o táxi". **Só no pitch, nunca no vídeo.**
4. **Usar dado real:** a demo roda sobre imóvel do ambiente de testes oficial do
   SICAR (car-sus.dataprev.gov.br) e a base SFB de AL já baixada
5. **Ser defendível no pitch:** a arquitetura precisa ser explicável em 30
   segundos para o jurado que pergunta "mas isso não é só um ChatGPT?"

---

## Non-Goals

| Fora de escopo | Motivo |
|---|---|
| Lookup por CPF no SICAR | Sem API pública — mockado no vídeo |
| MapBiomas via GEE ao vivo | Exige Google Earth Engine — dado pré-computado por região |
| Agent Hub completo (registro dinâmico, MCP, multi-tenant) | Mínimo demonstrável é P1; o Hub completo é P2 |
| Segundo agente funcional (Auditor) | Entra como manifesto stub para provar o padrão N agentes — não roda de verdade |
| WhatsApp Business API real | Aprovação Meta demora — interface web simula o canal |
| Persistência de conversas / histórico | Fora do escopo do PoC; demo é stateless |
| Autenticação de usuário | Ambiente de teste; sem login real |

---

## Riscos críticos e mitigações

Três riscos podem afundar o projeto. Os dois primeiros são de **percepção do
jurado** (a ideia parecer fraca); o terceiro é **técnico** (o demo não rodar).

### Risco 1 — "Vocês me mostraram um chatbot e me contaram sobre uma plataforma"
O vídeo mostra o Compadre traduzindo; o Hub e a ontologia ficam em diagrama/mock.
Um jurado afiado vê o gap entre o que é mostrado e o que é vendido.
- **Mitigação:** **P0-7** torna a citação da regra obrigatória — a ontologia fica
  **visível na resposta** do Compadre, não só no diagrama. O raciocínio aparece.
- **Mitigação:** no pitch, a sequência Hub → clica no Compadre → abre o WhatsApp
  (P1-1) mostra fisicamente que o agente nasce na plataforma.

### Risco 2 — "Você precisa mesmo da ontologia? Um LLM com bom prompt faz isso"
Crítica legítima: para traduzir **um** imóvel, o LLM sozinho quase resolve.
- **Mitigação (honesta):** no PoC o valor da ontologia é mais **arquitetural** que
  funcional — ela brilha na escala (consistência, rastreabilidade, fonte única
  quando a lei muda, reuso entre N agentes). O argumento de defesa é esse, não
  "o LLM não conseguiria". A P0-7 prova a rastreabilidade que o LLM puro não tem
  (a regra vem do grafo, não é inventada).

### Risco 3 — O scraping do SICAR ao vivo não funciona (anti-bot, JS, captcha)
É o risco que **mata o demo inteiro**.
- **Mitigação:** regra de corte (Timeline) — se o conector SICAR não funcionar até
  o fim do Dia 1, **mockar com JSON estático** dos alertas do imóvel de teste e
  seguir. O vídeo **nunca** pode depender de conexão ao vivo.

---

## User Stories

### Persona: Seu Raimundo (produtor, via interface simulada)

- **US-01:** Como produtor, quero mandar o número do meu CAR e receber em linguagem
  simples o que está pendente, para não precisar entender o texto técnico do órgão
- **US-02:** Como produtor, quero que o Compadre me diga exatamente o que preciso
  ter em mãos para resolver cada pendência, para não perder tempo indo ao sistema
  sem estar preparado
- **US-03:** Como produtor, quero receber um link direto para a etapa certa do
  sistema, para não precisar navegar pelo SICAR sem saber onde estou
- **US-04:** Como produtor, quero saber quais benefícios o CAR regularizado
  desbloqueia, para entender por que vale a pena resolver agora

### Persona: Jurado / avaliador (via pitch + vídeo)

- **US-05:** Como jurado, quero ver a resposta do Compadre referenciar uma regra
  concreta do Código Florestal (ex: "faixa de APP de 30m para rio com menos de 10m
  de largura"), para entender que não é um chatbot genérico
- **US-06:** Como jurado técnico, quero ver que o Compadre é um agente carregado
  por uma plataforma (Hub), e que existe um segundo agente definido, para acreditar
  que o Agent Hub prometido no pitch é real e não vaporware

### Persona: Desenvolvedor terceiro (visão do Agent Hub)

- **US-07:** Como dev de uma cooperativa, quero definir um agente novo escrevendo
  um manifesto (nome, tools, regras) que consome a mesma ontologia, para criar uma
  solução sem reimplementar o conhecimento do CAR *(P2 — provado em miniatura no PoC)*

---

## Requisitos

### P0 — Must Have (sem isso não tem demo)

#### P0-1: Agent Hub mínimo (loader de manifestos)
- Carrega definições de agente a partir de arquivos de manifesto (YAML/JSON)
- Manifesto do Compadre segue o formato de [`04-arquitetura/arquitetura.md`](../04-arquitetura/arquitetura.md):
  ```yaml
  name: compadre
  description: ajuda o produtor a entender e corrigir o CAR
  tools:  [consultar_sicar, consultar_ontologia, traduzir_llm]
  rules:  [traduzir pendência, identificar regra, sugerir próximo passo]
  output: orientacao_produtor
  ```
- O loader resolve as `tools` declaradas e roteia a conversa pelo agente certo
- **Protocolo-agnóstico:** o manifesto descreve o agente sem assumir como um Hub
  externo o invoca (não cravar MCP nem nada acoplado a uma plataforma específica).
  O objetivo é **provar o conceito** do nosso lado — um agente plugável definido por
  manifesto — não integrar com nenhum Hub externo agora
- Critério: o Compadre é instanciado a partir do manifesto, não hard-coded — trocar
  o manifesto muda o comportamento sem mudar o código do loader

#### P0-2: API do Compadre
- Endpoint `POST /conversa` recebe `{ numero_car: string, mensagem: string }`
- O Hub (P0-1) resolve o agente Compadre, que orquestra:
  consulta SICAR → enriquece com ontologia → chama LLM → retorna resposta
- Resposta: `{ traducao, pendencias[], proximo_passo, link_sicar, beneficios[] }`
- Critério: resposta em menos de 10s para demo ao vivo

#### P0-3: Conector SICAR (consulta pública)
- Consulta `consulta.car.gov.br` pelo número do CAR do imóvel de teste
- Extrai: situação, alertas e pendências (as telas vistas no SICAR de teste)
- Critério: retorna pelo menos status e alertas do imóvel de demo

#### P0-4: Ontologia mínima do CAR
- Grafo RDF/OWL com os conceitos essenciais:
  - `APP` → tipos (hídrica, topo de morro, encosta, restinga, beira de mar)
  - `ReservaLegal` → percentuais por bioma (Amazônia 80%, Cerrado 35%, demais 20%)
  - `CodigoCAR` → estados: `Ativo`, `Pendente`, `Suspenso`, `Cancelado`
  - `Pendencia` → tipos: `CIB ausente`, `Sobreposição APP`, `RL insuficiente`,
    `Representante ausente`
  - `Beneficio` → `PronafEco`, `PSA`, `CRA`, `SuspensaoSancoes`
- Serialização: Turtle (`.ttl`) ou JSON-LD; triplestore leve (rdflib / Apache Jena)
- Critério: dado o tipo de pendência, retorna a regra aplicável e o benefício
  desbloqueável

#### P0-5: Módulo LLM (tradução)
- Prompt template: contexto da pendência + regra da ontologia + instrução de tom
- Input: pendência técnica do SICAR + conceito da ontologia
- Output: explicação em 2-3 frases + o que fazer + o que vai desbloquear
- Critério: "sobreposição de polígono em área de APP" → "Encontrei uma diferença
  na área de mata perto do seu rio. Isso precisa ser corrigido no mapa do seu imóvel."

#### P0-7: Rastreabilidade da regra (a prova anti-"é só um chatbot") ⭐
> **Por que é P0:** este é o requisito que fecha o gap "mostrar vs. contar" e
> derruba a crítica "isso é só um ChatGPT com prompt". Sem ele, o diferencial
> vira promessa. Ver [Riscos](#riscos-críticos-e-mitigações).
- Toda resposta do Compadre deve **citar a regra concreta** que veio da ontologia,
  não só traduzir o texto. Ex: *"a faixa de mata do seu rio precisa ter 30 metros,
  porque ele tem menos de 10 metros de largura (Código Florestal, APP hídrica)."*
- A resposta carrega o **rastro**: qual conceito da ontologia foi usado e qual
  parâmetro legal aplicado — visível na UI (ex: um selo "📖 baseado na regra X")
- Isto é o que diferencia raciocínio sobre ontologia de adivinhação sobre texto:
  a regra é **buscada no grafo**, o LLM só a coloca em linguagem simples
- Critério: para o imóvel de demo, a resposta exibe o parâmetro legal exato e o
  conceito da ontologia de onde ele veio — não um número inventado pelo LLM

#### P0-6: Interface web (WhatsApp simulado)
- Mobile-first, tela de chat com bolhas
- Input: campo de texto + botão enviar
- Output: bolha de resposta do Compadre com tradução, pendências, botão "Ir para o sistema"
- Critério: funciona no celular do avaliador sem instalação

---

### P1 — Nice to Have (enriquece o demo)

#### P1-1: Agent Hub UI (vitrine para o PITCH) ⭐ track paralelo
- Tela web "Terra Comum — Agent Hub" — construída pelo segundo dev em paralelo
- Lista os agentes como cards, lidos dos manifestos do P0-1:
  - **Compadre** (produtor) — **clicável → abre o fluxo do WhatsApp** (P0-6)
  - **Auditor** (OEMA), **Territorial** (governo), **Crédito** (cooperativa) —
    cards com o manifesto visível (tools, rules), **não rodam** (mockados)
- Botão "Criar novo agente" → form que escreve um manifesto YAML (não persiste —
  mockado, só demonstra o padrão)
- Label/diagrama "todos consomem a mesma ontologia do CAR"
- **A jogada de pitch:** mostrar o Hub → clicar no Compadre → abrir o WhatsApp.
  Prova visual de que o agente nasce na plataforma. Sustenta o diferencial
  táxi/estrada (inovação = desempate)
- ⚠️ **Fronteira:** esta tela aparece **só no pitch**, nunca no vídeo do protótipo
  (regra: backend nunca no vídeo — o vídeo é só Raimundo/WhatsApp)
- Critério: a transição Hub → Compadre → WhatsApp funciona como uma sequência
  navegável para gravar o trecho do pitch

#### P1-1b: Endpoint de listagem de agentes
- `GET /agentes` retorna os agentes carregados dos manifestos `[compadre, auditor, ...]`
- Alimenta a UI do P1-1
- Critério: retorna a lista lida dos arquivos de manifesto, não hard-coded

#### P1-2: Conector SFB (base AL)
- Lê o GeoPackage `AL_CAR_Uso_Cobertura_Solo.gpkg` (1,84 GB já baixado)
- Para o imóvel de demo: extrai cobertura do solo (mata nativa, pastagem, APP)
- Enriquece a resposta: "segundo a base oficial, essa área tem X% de mata nativa"
- Critério: retorna cobertura para o polígono do imóvel de AL

#### P1-3: Painel de benefícios
- JSON estático com programas reais: Pronaf Eco, PSA, CRA, PRA
- Matching por regra: CAR regularizado em bioma X → elegível para Y
- Aparece no final da resposta: "Com o CAR em dia, você pode acessar:"
- Critério: pelo menos 2 benefícios reais mapeados para o imóvel de demo

#### P1-4: Deep link contextual
- Por tipo de pendência, gera URL direto para a etapa certa do SICAR de teste
- Ex: pendência de CIB → link para etapa "Imóvel" do car-sus.dataprev.gov.br
- Critério: link abre na tela certa (validado manualmente antes do vídeo)

#### P1-5: RER adapter
- Sobe instância do RER via Docker Compose com dados de teste
- Expõe `GET /imovel/{sncr}` → dados básicos do imóvel
- Fonte alternativa ao SICAR quando a consulta pública falhar
- Critério: retorna dados para pelo menos 1 código SNCR do PDF de credenciais

---

### P2 — Futuro (não construir agora, mas a arquitetura não pode bloquear)

- **Agent Hub completo:** registro dinâmico de agentes, protocolo MCP, tools
  compartilhadas, multi-tenant. O loader do P0-1 é a semente
- **Auditor funcional:** o segundo agente roda de verdade sobre a ontologia
- **SIGEF real-time:** hoje mockado, depois via API pública
- **Persistência de sessão:** hoje stateless, depois histórico por CPF

---

## Arquitetura do PoC

```
Interface Web (mobile, WhatsApp simulado)
        │ POST /conversa
        ▼
Agent Hub mínimo (loader de manifestos)         ← prova do "protocolo, não produto"
        │  resolve o agente a partir do manifesto
        │  [compadre.yaml]   [auditor.yaml — stub P1]
        ▼
Agente Compadre (orquestra suas tools)
        │
        ├── consultar_sicar ──→ consulta.car.gov.br (consulta pública)
        │                       retorna: status + alertas + pendências
        │
        ├── consultar_ontologia → rdflib / Apache Jena (local)
        │                         input: tipo de pendência
        │                         output: regra + benefício desbloqueável
        │
        ├── traduzir_llm ─────→ Claude API
        │                       prompt: pendência + regra da ontologia
        │
        └── [P1] consultar_sfb → GeoPackage AL (cobertura do solo)
```

**Por que o Hub está no fluxo:** o Compadre não é o produto — é o **primeiro agente
carregado pela plataforma**. O mesmo loader que instancia o Compadre instancia
qualquer agente futuro (Auditor, Territorial, Crédito) sobre a mesma ontologia.
É a diferença entre construir um táxi e construir a estrada.

**Stack recomendado:**
- Backend: Python + FastAPI (rdflib já é Python, facilita integração)
- Hub/loader: leitura de YAML + dispatcher simples de tools (sem framework pesado)
- Ontologia: RDFLib + arquivo `.ttl` versionado no repo
- LLM: Claude Haiku 4.5 (rápido, barato, suficiente para tradução)
- Interface: HTML/CSS/JS puro ou React — sem framework pesado
- Deploy local para demo: `uvicorn` + `npm run dev`

---

## Fluxo principal (happy path do vídeo)

```
1. Raimundo abre a interface (mobile, simula WhatsApp)
2. Digita: "Oi, tenho uma pendência no meu CAR"
3. O Hub carrega o agente Compadre a partir do manifesto e roteia a conversa
4. Compadre pergunta: "Qual o número do seu CAR?"
5. Raimundo informa o número do imóvel de teste (AL ou Sítio Três Rios)
6. Compadre (tool consultar_sicar) → recebe alertas:
   - "Informe o código CIB do imóvel" (amarelo)
   - "Nenhum representante foi adicionado" (amarelo)
7. Compadre (tool consultar_ontologia): tipo=CIB_ausente → regra: documento de
   registro do imóvel
8. Compadre (tool traduzir_llm): "Seu imóvel está com dois avisos. O mais fácil:
   falta o código CIB — é o número da sua escritura. Você tem a escritura em mãos?"
9. Compadre lista o que falta + botão "Ir para a etapa certa" (deep link)
10. Final: "Com o CAR regularizado, você pode acessar o Pronaf Eco e o PSA."
```

---

## Métricas de sucesso do PoC

| Métrica | Critério mínimo | Critério ideal |
|---|---|---|
| Fluxo end-to-end funcionando | Sim, com dado mockado | Sim, com dado real do SICAR |
| Tempo de resposta | < 10s | < 5s |
| Ontologia referenciada na resposta | Pelo menos 1 conceito | Conceito + benefício |
| **Regra concreta citada (P0-7)** | Parâmetro legal exato visível | + selo de rastreabilidade na UI |
| Hub carrega agente por manifesto | Compadre | Compadre + Auditor listável |
| Vídeo dentro do limite | ≤ 2min | ≤ 1min45s |
| Arquitetura explicável | Diagrama no pitch | Dev explica em 30s sem slides |

---

## Questões em aberto

| Questão | Quem resolve | Bloqueante? |
|---|---|---|
| O scraping do `consulta.car.gov.br` retorna os alertas em HTML parseável? | Dev | ✅ Sim — testar antes de tudo |
| O imóvel de demo vai ser de AL ou Sítio Três Rios (RJ)? | Time | ✅ Sim — define qual GeoPackage usar no P1 |
| O formato do manifesto de agente fica em YAML ou JSON? | Dev | Não — YAML por legibilidade no pitch |
| Como o Hub web3 (outro time) consome/invoca um agente? | Time Hub | Não — **não assumir nada**; manifesto fica protocolo-agnóstico até haver alinhamento |
| Claude API para o LLM? | Dev | Não — Claude Haiku recomendado |
| O deep link do SICAR de teste é estável por número de recibo? | Dev | Não — fallback: link para a tela inicial |
| RER Docker sobe em quanto tempo na máquina de demo? | Dev | Não — P1, pode ser cortado |

---

## Timeline (2,5 dias)

| Dia | Foco | Entregável |
|---|---|---|
| **Dia 1 — manhã** | Setup: repo, FastAPI, rdflib, ontologia `.ttl`, loader de manifesto | Hub carrega o Compadre + grafo com 5 conceitos |
| **Dia 1 — tarde** | Conector SICAR + parsing dos alertas | `POST /conversa` retorna alertas reais do imóvel |
| **Dia 2 — manhã** | Integração LLM + prompt template | Resposta traduzida em linguagem simples |
| **Dia 2 — tarde** | Interface web mobile + deep link | Telas navegáveis prontas para gravar |
| **Dia 3 — manhã** | P1s (SFB, benefícios) + ensaio do vídeo | Vídeo gravado ≤ 2min |
| **Dia 3 — tarde** | Buffer + submissão | Entregas 1, 2 e 3 submetidas |

**Track paralelo (segundo dev — AI):** Agent Hub UI (P1-1) ao longo dos Dias 1–2,
independente do fluxo principal. Integra no Dia 2 à tarde (clique Compadre → WhatsApp).
Como é mock-pesado (só o Compadre roda), não bloqueia o caminho crítico.

> **Regra de corte:** se o Conector SICAR não funcionar até o fim do Dia 1, usar
> dado mockado (JSON estático com os alertas do imóvel de teste) e seguir. O vídeo
> não pode depender de conexão ao vivo.

> **Prioridade do Hub:** o loader de manifesto (P0-1) parece "infra extra", mas é
> barato (lê YAML + dispatcher) e é o que torna o diferencial verdadeiro. Não cortar.
