# Entrega 1 — Ideação (rascunho final, 10 campos)

> Gerado pela skill `hacarthon-entrega-ideacao` — estado do projeto em 27/jun/2026.
> Incorpora: 5 produtores reais entrevistados, análise P0-8 com dado real de MG
> (Alvinópolis, 4,19 ha de déficit), Agent Hub rodando com manifesto YAML,
> princípio evidência/interpretação implementado.
>
> ⚠️ O formulário exige que as respostas reflitam o entendimento da equipe —
> **reescreva com as palavras do time antes de colar na plataforma**,
> especialmente os campos 1 e 10.

---

## Campo 1 — BRAINSTORM

**Versão curta**
O time partiu de três direções: assistente para o produtor, painel para o governo e
infraestrutura de dados abertos. A ideia que venceu foi a única que resolvia o
individual e o coletivo ao mesmo tempo — o Compadre como prova, a Terra Comum como
plataforma. Ganhou porque não termina num produto fechado: é a estrada, não o táxi.

**Versão expandida**
No início do haCARthon exploramos caminhos distintos: um assistente conversacional
simples para o produtor, um painel analítico para os órgãos ambientais e uma camada
de integração de dados abertos. Cada ideia resolvia parte do Desafio 1 — mas nenhuma
resolvia o requisito explícito de "benefícios individuais e coletivos" ao mesmo tempo.
A virada veio quando percebemos que o problema não é falta de dados — SIGEF,
MapBiomas, Base SFB e RER já existem e são públicos. O problema é falta de contexto:
os dados estão fragmentados e escritos numa linguagem que o Seu Raimundo não consegue
usar. A solução escolhida foi a única que atacava os três gargalos ao mesmo tempo e
não terminava num app para uma persona só. O Compadre (o que o produtor vê no
WhatsApp) sobre a Terra Comum (a camada semântica aberta que qualquer agente pode
consumir). Venceu porque multiplica — uma estrada serve qualquer veículo.

> ⚠️ **Reescrever com o que realmente aconteceu:** um momento de virada, uma ideia
> descartada pelo time, quem sugeriu o quê. Esse é o campo mais humano do formulário
> — os avaliadores usam para calibrar autenticidade.

`[Jurado] Critério: autenticidade + pertinência | Nota est.: 8/10 | Para subir: incluir 1 ideia descartada com nome e o momento real de virada na discussão`

---

## Campo 2 — PROBLEMA

**Versão curta**
O Seu Raimundo recebe uma notificação do órgão ambiental em linguagem técnica, não
entende uma palavra, tem medo de multa e paga técnico para resolver. O crédito rural
fica bloqueado. Validamos isso com 5 produtores reais: WhatsApp como principal
ferramenta em todos os 5 casos; 4 em 5 pagaram técnico ou consultor; 2 em 5 gastaram
mais de 5 horas só no processo do CAR.

**Versão expandida**
O CAR é pré-requisito para crédito rural, PSA, isenção fiscal e suspensão de sanções
ambientais — mas o processo de declaração e correção é inacessível para o pequeno
produtor. A raiz não é falta de acesso ao sistema: é falta de contexto e tradução.
Quando a notificação do órgão diz "sobreposição de polígono em área de APP,
necessária retificação cadastral", o Seu Raimundo guarda o papel na gaveta. O medo
de multa paralisa; a solução que encontra é pagar técnico — que cobra e demora. O
ciclo de retificações se repete porque o dado autodeclarado erra, o órgão rejeita, o
produtor não sabe corrigir. Validamos esse padrão com 5 produtores reais de SP, RS,
BA e MG: WhatsApp como principal ferramenta digital em todos os 5 casos; 4 em 5
pagaram técnico ou consultor; 2 em 5 gastaram mais de 5 horas no processo do CAR;
"falta de informação" foi a barreira mais citada. São três gargalos sobrepostos:
exclusão digital e técnica (não consegue georreferenciar APP e Reserva Legal
sozinho), ciclo de retificações infinitas (vai-e-vem com os OEMAs) e ruído na
comunicação Estado-produtor (notificação técnica gera medo em vez de orientação).
Com 8,2 milhões de imóveis no CAR e estimativa de 30–40% com análise pendente ou
com erro, o problema opera em escala nacional.

`[Jurado] Critério: Relevância do problema | Nota est.: 9/10 | Para subir: confirmar % oficial de CARs com análise pendente no Painel de Regularização Ambiental`

---

## Campo 3 — SOLUÇÃO

**Versão curta**
O Compadre traduz notificações do CAR em português simples pelo WhatsApp e prepara
o produtor para cada etapa — usando as mesmas bases de dados que o analista usa para
validar. Por trás, a Terra Comum calcula o próprio diagnóstico: já detectou 4,19 ha
de déficit de mata ciliar em imóvel real de MG, com a regra legal rastreável — sem
precisar de autenticação no SICAR.

**Versão expandida**
A solução tem duas faces. O **Compadre** é o que o produtor vê: um assistente no
WhatsApp que lê a notificação do órgão, traduz em linguagem simples ("tem uma
diferença na área perto do seu rio"), explica o que falta e abre o link direto na
etapa certa do sistema. Não substitui o SICAR — fica na frente dele, preparando o
produtor para chegar pronto. A **Terra Comum** é o motor invisível: camada semântica
aberta construída sobre o RER open-source do governo, integrando SIGEF, MapBiomas e
a Base de Referência de Uso do Solo do SFB — a mesma base que os analistas dos
OEMAs usam para validar. Ao usar a mesma base de referência nas duas pontas
(produção e validação), eliminamos a divergência que causa o ciclo de retificações.

O diferencial técnico que mais importa: a Terra Comum **descobre** o problema, não
apenas repete o que o governo aponta. Já demonstramos com dado real: sobre o
GeoPackage SFB de Minas Gerais, o sistema calculou automaticamente um déficit de
4,19 ha de mata ciliar em imóvel real de Alvinópolis/MG — citando a regra legal
exata (Lei 12.651/2012, Art. 4º, I, alínea a) com rastro da ontologia. Tudo isso
sem nenhuma autenticação no SICAR. O produtor não vê a máquina; só recebe a
resposta na língua dele.

> **No vídeo, o jurado verá:** o Seu Raimundo mandando uma notificação do órgão
> pro Compadre no WhatsApp, recebendo a tradução em português simples, entendendo
> o que falta e sendo direcionado para a etapa certa do sistema.

`[Jurado] Critério: Pertinência + Inovação | Nota est.: 9/10 | Para subir: mostrar no vídeo a cena exata de tradução da notificação + o resultado do diagnóstico próprio ("encontrei isso na sua área")`

---

## Campo 4 — PÚBLICO-ALVO

**Versão curta**
Pequenos e médios produtores rurais — o Seu Raimundo — que usam WhatsApp como
principal ferramenta digital e dependem de extensionistas (CATI/EMATER) para
assuntos ambientais. Confirmado com 5 produtores reais de 4 estados: WhatsApp
presente em todos os 5 casos. O canal de distribuição é o extensionista, não o
governo direto.

**Versão expandida**
O público primário são pequenos e médios produtores rurais — o Seu Raimundo do
Briefing. Ele depende da propriedade para o sustento familiar, não tem domínio de
plataformas digitais e toma decisões com base na confiança: vizinhos, sindicatos,
extensionistas agrícolas, gerentes de banco. Validamos esse perfil com 5 produtores
reais de SP, RS, BA e MG (agrofloresta, orgânicos, silvicultura, café): WhatsApp
como principal ferramenta digital em todos os 5; "falta de informação" como
principal barreira em 4 de 5; 4 em 5 pagaram técnico para fazer o CAR. A principal
barreira não é a plataforma — é entender o que a regra pede e ter segurança de estar
fazendo certo.

Escolhemos esse público porque é onde a mudança tem mais impacto: cada retificação
eliminada na origem reduz o retrabalho nos órgãos e libera benefícios que o produtor
nem sabe que tem direito. O canal de distribuição não é governo direto — é o
extensionista (CATI, EMATER) e a cooperativa, que o Raimundo já confia e que têm
capilaridade nacional. Benefício indireto imediato: analistas dos OEMAs, que
recebem cadastros mais limpos, com a mesma base de referência — menos ciclos de
retificação.

`[Jurado] Critério: Relevância | Nota est.: 9/10 | Para subir: dado de % de produtores rurais que usam WhatsApp vs. que acessaram o SICAR ao menos uma vez`

---

## Campo 5 — IMPACTO

**Versão curta**
Individual: o Raimundo entende o que fazer, corrige sem pagar técnico e descobre
que o CAR regularizado desbloqueia crédito e PSA. Coletivo: cada CAR correto na
origem reduz um ciclo de retificação nos órgãos, e a plataforma aberta multiplica
o impacto — governo, cooperativas e pesquisadores constroem agentes na mesma camada.

**Versão expandida**
**Impacto individual (Seu Raimundo):** entende o que a notificação pede sem medo,
porque o Compadre distingue o que encontrou nos dados do que isso significa — sem
decretar infração. Corrige o CAR sem pagar técnico. Chega ao sistema preparado,
com os dados certos. Descobre os benefícios que o CAR regularizado desbloqueia:
Pronaf Eco, PSA, CRA, suspensão de sanções. O CAR deixa de ser ameaça e vira porta
de oportunidade. Prova técnica já construída: o sistema detectou 4,19 ha de déficit
de mata ciliar em imóvel real de MG, com a regra legal citada e rastro rastreável —
antes de qualquer notificação do governo.

**Impacto coletivo (sistema):** cada CAR correto na origem elimina um ciclo de
retificação — menos retrabalho para os analistas dos OEMAs, dados mais confiáveis
na base nacional, melhor conformidade com o Código Florestal. Como a Terra Comum é
uma plataforma aberta (Bem Público Digital), o impacto se multiplica: governo usa a
mesma camada para priorizar intervenção territorial; cooperativas de crédito
qualificam carteiras de crédito verde; pesquisadores e Embrapa constroem agentes
especializados sobre o mesmo conhecimento. Uma única arquitetura resolve o individual
e o coletivo — que é exatamente o que o Desafio 1 pede.

`[Jurado] Critério: Pertinência (individual + coletivo é requisito explícito do enunciado) | Nota est.: 9/10 | Para subir: métrica de baseline — tempo médio atual de uma retificação no SICAR`

---

## Campo 6 — DIFERENCIAL

**Versão curta**
Outros times estão construindo um táxi. Nós estamos construindo a estrada. O
Compadre é a prova; a Terra Comum é o protocolo aberto. Quatro diferenciais
verificáveis: raciocina sobre ontologia (não sobre texto), descobre o problema em
vez de raspá-lo, serve N personas com 1 camada, e é construído sobre a mesma
infraestrutura do governo.

**Versão expandida**
A resposta óbvia ao Desafio 1 é um chatbot que ajuda o Raimundo. Essa resposta
existe — e outros times vão entregá-la. Nós entregamos outra coisa: o substrato
aberto para que qualquer agente entenda o território rural. O diferencial em quatro
camadas verificáveis:

**(1) Raciocina sobre ontologia, não sobre texto.** Não é RAG. A resposta cita a
regra concreta que veio do grafo — "faixa de 30m, para rios com menos de 10m de
largura, Lei 12.651/2012, Art. 4º, I, a" — com rastro da ontologia. Quando a lei
muda, muda-se um nó; todos os agentes ficam corretos automaticamente. Não existe
implementação pública de ontologia para o CAR — somos os primeiros.

**(2) Descobre o problema, não o raspa.** Em vez de perguntar ao governo "o produtor
tem pendência?", a Terra Comum calcula o diagnóstico com dado aberto, sem
autenticação. Já demonstramos: déficit de 4,19 ha de mata ciliar detectado em imóvel
real de Alvinópolis/MG, a partir do GeoPackage SFB, sem login no SICAR.

**(3) Protocolo, não produto.** Uma camada semântica → múltiplos agentes → múltiplas
personas. O mesmo conhecimento serve o Compadre (produtor), o Auditor (OEMA), o
Territorial (governo) e o Crédito (cooperativa). Benefícios individuais e coletivos
em uma única arquitetura.

**(4) Sobre a infraestrutura do governo.** Construído sobre o RER open-source e a
Base SFB — não recriamos do zero, ampliamos com inteligência o que já é de todos.

`[Jurado] Critério: Inovação ⭐ (desempate) | Nota est.: 9/10 | Para subir: o diferencial (2) — "4,19 ha detectado em imóvel real de MG" — é o mais concreto e o menos dito; usar esse número sem jargão`

---

## Campo 7 — VIABILIDADE

**Versão curta**
Legal: código aberto, dados CC, construído sobre o RER (DPG do governo). Tecnológico:
SIGEF, MapBiomas e Base SFB públicos e já integrados — GeoPackage de MG baixado e
rodando, análise de déficit funcionando. RER sobe em Docker. Operacional: WhatsApp é
o canal do produtor (5/5 na pesquisa); CATI/EMATER têm capilaridade nacional.

**Versão expandida**
**Legal:** solução código aberto (exigência do edital atendida). Usa bases públicas
com licença Creative Commons (Base SFB, MapBiomas). Construída sobre o RER, Bem
Público Digital do governo federal — sem conflito de propriedade intelectual.

**Tecnológico:** todas as bases já existem, são públicas e já foram integradas.
SIGEF com API pública. MapBiomas com dados históricos por estado. Base de Referência
de Uso do Solo do SFB: GeoPackage de MG (MG_CAR_Uso_Cobertura_Solo.gpkg) baixado,
processado e rodando — o sistema já calcula déficit de APP sobre dado real. RER
self-hostável via Docker com REST API. Camada semântica usando LLM comercial
disponível. Interface navegável real funcionando. Demo com imóvel do ambiente de
testes oficial do SICAR (car-sus.dataprev.gov.br).

**Operacional:** canal CATI/EMATER com capilaridade nacional e já é o elo de
confiança do produtor (confirmado: 4 em 5 produtores entrevistados recorrem a
extensionista ou técnico). O módulo pré-preenchido do SICAR prova que o governo já
faz o cruzamento de dados que a solução usa — entregamos pelo canal certo.

`[Jurado] Critério: Pertinência + Inovação | Nota est.: 9/10 | Para subir: confirmar parceiro do piloto [A CONFIRMAR — CATI-SP ou cooperativa]`

---

## Campo 8 — IMPLEMENTAÇÃO

**Versão curta**
Hackathon: PoC com fluxo real de tradução, ontologia do CAR, análise de déficit com
dado real de MG e Agent Hub carregando o Compadre por manifesto. Piloto (3–6 meses):
Terra Comum sobre RER real + WhatsApp Business + parceiro CATI ou cooperativa.
Escala (12–24 meses): integração CAR nacional e Agent Hub aberto a terceiros.

**Versão expandida**
**Hackathon (construído em 2,5 dias):** interface navegável simulando WhatsApp com
fluxo real de tradução de pendência; ontologia mínima do CAR (APP, RL, biomas,
parâmetros do Código Florestal) em Turtle RDF; Agent Hub carregando o Compadre por
manifesto YAML — trocar o manifesto muda o agente sem mexer no código; análise de
déficit de APP rodando sobre dado real (GeoPackage SFB de MG, déficit de 4,19 ha
detectado em imóvel de Alvinópolis/MG com regra legal rastreável); separação
evidência/interpretação implementada na resposta do agente; demo com imóvel do
ambiente de testes oficial do SICAR.

**Piloto (3–6 meses):** Terra Comum sobre instância própria do RER com dados reais;
integração SIGEF + MapBiomas + Base SFB por estado; WhatsApp Business API com
aprovação Meta; 2 agentes funcionais (Compadre + Auditor); parceria com extensionista
ou cooperativa para chegada ao produtor `[parceiro a confirmar]`.

**Escala (12–24 meses):** integração com CAR nacional; Agent Hub aberto — qualquer
dev ou órgão publica agentes; primeiras assinaturas B2B (cooperativas de crédito) e
B2G (estados). A ontologia evolui como commons mantida pela comunidade.

`[Jurado] Critério: Relevância | Nota est.: 9/10 | Para subir: nomear o parceiro do piloto`

---

## Campo 9 — CÓDIGO ABERTO

**Versão curta**
A Terra Comum é DPG por design: ontologia + camada semântica + Agent Hub publicados
no GitHub com licença aberta. Qualquer estado ou país que use o RER pode rodar em
cima. É o Android do domínio CAR — qualquer um publica agentes na mesma plataforma,
partindo do mesmo conhecimento base.

**Versão expandida**
A Terra Comum não é um app que pode ser compartilhado — é infraestrutura desenhada
para ser pública desde o primeiro dia. O núcleo (ontologia + camada semântica + Agent
Hub) será publicado no GitHub com licença Apache 2.0. Qualquer estado brasileiro que
queira adaptar ao seu contexto pode fazer isso; qualquer país com legislação ambiental
similar pode criar a ontologia do seu código florestal e reutilizar o mesmo Agent Hub.
A ontologia será alinhada ao AGROVOC (vocabulário agrícola da FAO) e às bases da
Embrapa (OntoAgroHidro, Agrotermos) — facilitando reutilização internacional e
colaboração com instituições reconhecidas. Países como Bolívia e Colômbia, que têm
cadastros ambientais similares ao CAR, são candidatos naturais à adoção.

O efeito-rede é estrutural: quanto mais organizações contribuem com agentes e dados,
melhor o modelo para todos — o incentivo à adoção está na arquitetura. É o "Android
do domínio CAR": qualquer desenvolvedor, órgão ou pesquisador publica agentes na
mesma plataforma e parte do mesmo conhecimento base. Construído sobre o RER — ele
mesmo um Bem Público Digital — a Terra Comum é a camada de inteligência que o RER
não tem, e que qualquer instância do RER no mundo pode adotar.

`[Jurado] Critério: Inovação | Nota est.: 9/10 | Para subir: nomear Bolívia e Colômbia + FAO/AGROVOC — prova que o argumento de DPG global é real, não genérico`

---

## Autoavaliação — estado atual (28/jun/2026)

| Campo | Critério | Nota est. |
|---|---|---|
| 1. Brainstorm | Autenticidade | 8/10 |
| 2. Problema | Relevância | 9/10 |
| 3. Solução | Pertinência + Inovação | 9/10 |
| 4. Público-alvo | Relevância | 9/10 |
| 5. Impacto | Pertinência | 9/10 |
| 6. Diferencial | Inovação ⭐ | 9/10 |
| 7. Viabilidade | Pertinência | 9/10 |
| 8. Implementação | Relevância | 9/10 |
| 9. Código Aberto | Inovação | 9/10 |
| **Média** | | **~8,9/10** |
