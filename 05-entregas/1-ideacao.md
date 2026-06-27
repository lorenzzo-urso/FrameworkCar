# Entrega 1 — Ideação (rascunho)

> Formulário na plataforma, 7 temas. As perguntas exatas só aparecem na submissão —
> adaptar a redação ao texto de cada pergunta. Cada campo tem versão curta e
> expandida.

---

## 1. Problema
**Curta:** O produtor recebe avisos do CAR em linguagem técnica que não entende,
tem medo de multa e depende de técnico pago. Muitos desistem ou erram.

**Expandida:** Para o Seu Raimundo, o CAR é uma obrigação assustadora. Ele recebe
uma notificação do órgão ambiental — "sobreposição de polígono em área de APP" — e
não entende uma palavra. Tem medo de multa, guarda o papel e liga para um técnico,
que cobra e demora. Enquanto isso, o crédito rural fica bloqueado. O problema não é
falta de informação: é falta de **contexto e tradução**. A linguagem do Código
Florestal é inacessível, a plataforma do SICAR é hostil a quem usa só WhatsApp, e o
ciclo de correções se repete sem fim.

## 2. Solução
**Curta:** O Compadre é um assistente de WhatsApp que ajuda o produtor a entender e
regularizar o CAR em linguagem simples — escondendo a complexidade e ensinando só o
essencial.

**Expandida:** O **Compadre** conversa com o produtor pelo WhatsApp e o guia para
entender, declarar e corrigir o CAR sem decifrar linguagem técnica nem pagar
despachante. Traduz as notificações do órgão, pré-preenche os limites do imóvel com
dados públicos e mostra o que falta — passo a passo. Por trás, a **Terra Comum**,
uma camada de dados aberta, conecta CAR, SIGEF, MapBiomas e o Código Florestal num
modelo que "entende" o território. O produtor não vê essa máquina — só recebe a
resposta na língua dele.

> **No vídeo, o jurado verá:** o Seu Raimundo mandando "oi" no WhatsApp, recebendo a
> tradução de uma pendência, confirmando os limites num mapa pré-preenchido, e
> descobrindo os programas que o CAR regularizado libera. (Telas navegáveis.)

## 3. Público-alvo
**Curta:** Pequenos e médios produtores rurais (perfil Seu Raimundo) — dependem da
terra e usam WhatsApp como principal ferramenta digital.

**Expandida:** **Primário:** pequenos e médios produtores — o Seu Raimundo — com
dificuldade em plataformas digitais, que confiam em pessoas próximas. No Brasil há
**8,2 milhões de imóveis no CAR**, parte com pendências `[% a confirmar]`. **Canal:**
extensionistas (CATI/EMATER) e cooperativas. **Secundário:** analistas dos órgãos
estaduais, que recebem cadastros mais limpos.

## 4. Impacto
**Individual:** o produtor entende o que fazer, corrige o CAR sem intermediário
pago, deixa o medo de multa e descobre benefícios concretos (crédito, PSA, suspensão
de sanções). Menos custo, menos tempo, menos medo.

**Coletivo:** cada CAR corrigido na origem reduz o ciclo de retificações que
sobrecarrega os órgãos e melhora a confiabilidade da base nacional. A mesma camada
aberta serve governo (priorizar intervenção) e cooperativas (crédito verde com risco
melhor avaliado). Regularização facilitada apoia o cumprimento do Código Florestal.

## 5. Viabilidade
**Curta:** Usa dados abertos (SICAR público, SIGEF, MapBiomas, Código Florestal) e é
construída sobre o RER open-source. Código aberto. Protótipo conceitual navegável.

**Expandida:** A solução não parte do zero: usa bases abertas existentes — SICAR/
consulta pública, SIGEF/INCRA, MapBiomas, parâmetros do Código Florestal e,
principalmente, a **Base de Referência de Uso e Cobertura do Solo do SFB**
(Serviço Florestal Brasileiro, atualizada 03/2025) — a mesma que os analistas dos
OEMAs usam para validar o CAR. Pré-preencher com ela elimina a divergência de base
que causa o ciclo de retificações. A solução é construída sobre o **RER**
open-source do governo (REST API + PostGIS), que **não tem** a camada semântica nem
os agentes que adicionamos. O que criamos por cima é a **ontologia + camada semântica
+ Agent Hub**. Toda a solução é **código aberto**. No hackathon, demonstramos o
agente do produtor com telas navegáveis e dados de teste; a arquitetura é apresentada
como diagrama. *Escopo honesto:* instância própria do RER com dados de teste — não o
sistema nacional ao vivo.

## 6. Diferencial

**Curta:** Outros times criarão um assistente. Nós criamos a estrada — a camada
semântica aberta sobre a qual qualquer agente pode entender o território rural.
O Compadre é a prova; a Terra Comum é o protocolo.

**Expandida:** A resposta óbvia ao Desafio 1 é um chatbot que ajuda o Raimundo.
Essa resposta resolve o individual — mas não o coletivo. A Terra Comum faz
diferente: em vez de construir um produto fechado para uma persona, construímos
o **substrato aberto** para que qualquer organização — governo, cooperativa,
pesquisador, OEMA — crie agentes que entendem o território rural. O Compadre
(o agente do produtor) é só o primeiro. A mesma camada semântica serve o
analista do órgão, o gestor de crédito da cooperativa e o formulador de política
pública — cada um com seu agente, todos compartilhando o mesmo conhecimento.

> **A analogia:** outros times estão construindo um táxi. Nós estamos
> construindo a estrada.

Três diferenciais verificáveis:
1. **Raciocina sobre ontologia, não sobre texto** — não há implementação pública
   de ontologia para o CAR; somos os primeiros
2. **Protocolo, não produto** — 1 camada semântica → N agentes → N personas →
   benefícios individuais e coletivos em uma única arquitetura
3. **Construído sobre o RER e a base SFB** — a mesma infraestrutura e os mesmos
   dados que o governo já usa; não recriamos do zero, ampliamos

## 6. Tempo de implementação
- **Hackathon:** protótipo navegável do Compadre + ontologia/grafo mínimos + diagrama
- **Piloto (3-6 meses):** Terra Comum sobre o RER, 1-2 agentes, teste via CATI-SP ou
  cooperativa `[parceiro a confirmar]`
- **Escala (12-24 meses):** integração com o CAR nacional, Agent Hub aberto, primeiras
  assinaturas B2B/B2G

## 7. Benefícios
Para o produtor: o CAR vira porta de oportunidade, regularizado em linguagem que ele
entende, sem custo, com acesso a crédito e programas. Para o sistema público: dados
confiáveis, menos retrabalho, mais conformidade com o Código Florestal. E porque a
Terra Comum é **aberta (Bem Público Digital)**, não é um app fechado: é
infraestrutura sobre a qual governo, cooperativas, pesquisadores e a Embrapa
constroem seus próprios agentes — multiplicando o impacto.

---

## Autoavaliação (olhar do jurado)
| Critério | Nota | Ponto fraco a resolver |
|---|---|---|
| Pertinência temática | 9/10 | Coletivo pode soar grande demais — ancorar no produtor |
| Relevância do problema | 8/10 | Falta % oficial de CARs pendentes |
| Usabilidade e design | 9/10 | Provar simplicidade no vídeo |
| Inovação ⭐ | 9/10 | Jurado precisa "pegar" o conceito sem jargão |

**3 ações para subir:** (1) 1 número oficial de CARs pendentes; (2) confirmar
parceiro do piloto; (3) no vídeo, mostrar a simplicidade (Raimundo resolvendo em
minutos).
