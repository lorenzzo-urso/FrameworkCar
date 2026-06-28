# Entrega 3 — Pitch (slides + script de narração)

> Gerado pela skill `hacarthon-pitch` — estado do projeto em 27/jun/2026.
>
> ⚠️ O áudio é gravado **dentro da plataforma** — use este script como roteiro
> para a gravação ao vivo. Reescreva com o tom natural da equipe antes de gravar.
>
> Itens obrigatórios do edital cobertos: nome da solução, público-alvo, problema,
> o que é, como funciona, modelo de negócios, diferencial competitivo.

---

## Slide 1 — CAPA

**Texto do slide:**
```
COMPADRE
O CAR pelo WhatsApp.

Sustentado pela Terra Comum
— o chão digital aberto do território rural.

[ haCARthon · Desafio 1 ]
```

**Script de narração:**
> "8,2 milhões de imóveis cadastrados no CAR. E nenhum sistema sabe dizer ao produtor,
> em português, o que está errado no dele. Somos a Terra Comum. E o Compadre é quem
> resolve isso."

---

## Slide 2 — O PROBLEMA

**Texto do slide:**
```
A notificação chegou.
Raimundo não entendeu uma palavra.

"sobreposição de polígono em área de APP,
necessária retificação cadastral"

→ guardou na gaveta
→ ligou pro técnico (que cobra e demora)
→ crédito rural ficou bloqueado
```

**Script de narração:**
> "Quando o órgão ambiental manda uma notificação para o Seu Raimundo, ela chega assim:
> 'sobreposição de polígono em área de APP, necessária retificação cadastral.' Raimundo
> não entende uma palavra. Ele tem medo de multa, guarda o papel na gaveta, e liga pro
> técnico — que cobra, demora, e às vezes também erra. Resultado: o crédito rural fica
> bloqueado esperando.
>
> Esse ciclo se repete para milhões de produtores. São três problemas sobrepostos: a
> linguagem técnica que paralisa, a dificuldade de georreferenciamento, e o vai-e-vem
> de retificações porque o dado autodeclarado erra. Validamos isso com 5 produtores
> reais de São Paulo, Rio Grande do Sul, Bahia e Minas Gerais: em todos os 5 casos,
> WhatsApp é a principal ferramenta digital; 4 em 5 pagaram técnico para fazer o CAR.
> O problema não é falta de dados — é falta de contexto e tradução."

---

## Slide 3 — PÚBLICO-ALVO

**Texto do slide:**
```
Seu Raimundo
Pequeno e médio produtor rural

WhatsApp ████████████  5/5 produtores
Pagou técnico ████████  4/5 produtores
"Falta de info" ████████  4/5 produtores

Canal de chegada: CATI · EMATER · cooperativas
(capilaridade nacional, confiança do produtor)
```

**Script de narração:**
> "O nosso usuário principal é o Seu Raimundo — o pequeno produtor que depende da
> propriedade para o sustento da família. Ele toma decisões com base na confiança:
> vizinhos, extensionistas, gerentes de banco. O canal que já usa é o WhatsApp.
> Validamos isso com produtores reais.
>
> Para chegar até ele em escala, não vamos direto ao produtor — usamos o elo que
> ele já confia: o extensionista da CATI, da EMATER, ou da cooperativa. Eles têm
> capilaridade nacional e interesse direto em ter o produtor regularizado."

---

## Slide 4 — A SOLUÇÃO

**Texto do slide:**
```
COMPADRE                    TERRA COMUM
─────────────               ────────────────────────
O que Raimundo vê           O motor que ninguém vê

Traduz a notificação        Ontologia do Código Florestal
em português simples        + dados abertos (SIGEF, SFB, MapBiomas)

Guia passo a passo          Calcula o diagnóstico
até o SICAR                 sem login no SICAR

Canal: WhatsApp             Construída sobre o RER
                            (Bem Público Digital do governo)
```

**Script de narração:**
> "A solução tem duas faces. O Compadre é o que o Raimundo vê: um assistente no
> WhatsApp que lê a notificação do órgão, traduz em linguagem simples, explica o
> que falta, e direciona o produtor para a etapa certa do SICAR. Ele não substitui
> o SICAR — fica na frente, preparando o produtor para chegar pronto.
>
> A Terra Comum é o motor invisível: uma camada semântica aberta construída sobre
> o RER open-source do governo. Ela integra SIGEF, MapBiomas e a Base de Referência
> de Uso do Solo do SFB — a mesma base que o analista do órgão usa para validar.
> Ao usar a mesma base nas duas pontas, eliminamos a divergência que gera o ciclo
> de retificações."

---

## Slide 5 — COMO FUNCIONA

**Texto do slide:**
```
1. Raimundo manda a notificação no WhatsApp

2. Compadre traduz:
   "Tem uma diferença na área perto do seu rio.
    A lei pede 30m de mata ciliar aqui."
   [ Lei 12.651/2012, Art. 4, I, a — rastreável ]

3. Terra Comum já calculou:
   "Encontrei uns 4 ha a menos do que a lei pede
    — é uma estimativa, não uma notificação."

4. Compadre abre o link direto na etapa certa
   do SICAR. Raimundo chega preparado.
```

**Script de narração:**
> "Veja como funciona na prática. O Raimundo recebe a notificação e manda para o
> Compadre no WhatsApp. O Compadre traduz: 'Encontraram uma diferença na área de
> mata perto do seu rio. A lei pede uma faixa de 30 metros — essa é a regra do
> Código Florestal, artigo 4.'
>
> Mas a Terra Comum não para aí. Ela já calculou o diagnóstico próprio a partir
> dos dados abertos do SFB: encontrou 4 hectares de mata ciliar a menos do que a
> lei pede — e apresenta isso como estimativa, não como notificação oficial,
> orientando o produtor a confirmar com um técnico antes de qualquer decisão. Por
> fim, o Compadre abre o link direto na etapa certa do SICAR. O Raimundo chega
> sabendo o que corrigir.
>
> Demonstramos isso com dado real: imóvel real de Alvinópolis, Minas Gerais —
> déficit de 4,19 hectares detectado automaticamente, com a regra legal rastreável,
> sem nenhuma autenticação no sistema do governo."

---

## Slide 6 — MODELO DE NEGÓCIO

**Texto do slide:**
```
Produtor: NUNCA paga.
Núcleo: open-source (Apache 2.0).

Sustentação:

B2B  Cooperativas de crédito
     Assinatura da API → carteira elegível,
     risco diluído, crédito verde qualificado

B2G  Governo (por projeto / parceria)
     Agente territorial + análise por estado
     → reduz ciclo de retificação

Efeito-rede
     Terceiros constroem agentes na mesma camada
     → mais uso → melhor inferência → mais valor
```

**Script de narração:**
> "O produtor nunca paga — e o núcleo da plataforma é código aberto. Como a Terra
> Comum se sustenta? Por dois caminhos.
>
> O primeiro é B2B com cooperativas de crédito e bancos rurais. Eles assinam a
> API da camada semântica para qualificar carteiras de crédito verde e reduzir o
> risco de inadimplência em propriedades não regularizadas. É recorrente e tem
> incentivo direto.
>
> O segundo é B2G com governo: estados e o governo federal pagam por agentes
> territoriais e análises por região, que ajudam a priorizar intervenções e
> reduzir o ciclo de retificação nos órgãos.
>
> E há um terceiro componente estrutural: quanto mais organizações constroem
> agentes sobre a mesma camada, mais valioso o protocolo fica para todos — o
> modelo se fortalece com o uso."

---

## Slide 7 — DIFERENCIAL COMPETITIVO

**Texto do slide:**
```
"Outros times constroem um táxi.
Nós construímos a estrada."

① Protocolo, não produto
   1 camada semântica → N agentes → N personas
   Compadre (produtor) · Auditor (OEMA)
   Crédito (cooperativa) · Territorial (governo)

② Raciocina sobre ontologia, não sobre texto
   A regra vem do grafo — rastreável, consistente
   Quando a lei muda: 1 nó. Todos os agentes corretos.
   [ Primeira ontologia pública do CAR ]

③ Descobre o problema — não raspa
   Diagnóstico com dado aberto, sem login no SICAR
   Já demonstrado: 4,19 ha em Alvinópolis/MG
```

**Script de narração:**
> "Qual é a diferença entre nós e a resposta óbvia ao Desafio 1? A resposta
> óbvia é um chatbot que ajuda o Raimundo com o CAR. Essa resposta vai existir
> — e vários times vão entregá-la. Nós entregamos outra coisa.
>
> Primeiro: protocolo, não produto. Uma camada semântica aberta onde qualquer
> agente — para o produtor, para o analista do órgão, para o banco, para o
> governo — raciocina sobre o mesmo conhecimento. Benefícios individuais e
> coletivos em uma única arquitetura.
>
> Segundo: raciocinamos sobre ontologia, não sobre texto. A regra legal vem
> do grafo, não do LLM. Ela é rastreável, citável e consistente. Quando a lei
> muda, muda-se um nó — todos os agentes ficam corretos automaticamente. Não
> existe implementação pública de ontologia para o CAR. Somos os primeiros.
>
> Terceiro: a Terra Comum descobre o problema — não raspa o que o governo
> aponta. Ela calcula o diagnóstico de forma independente, com dados abertos,
> sem autenticação. Já demonstramos com dado real: 4,19 hectares de déficit
> de mata ciliar detectados automaticamente em imóvel de Minas Gerais. Antes
> de qualquer notificação do governo."

---

## Slide 8 — ENCERRAMENTO

**Texto do slide:**
```
Terra Comum
Infraestrutura cognitiva do território.
Construída para ser de todos.

[ github.com/lorenzzo-urso/FrameworkCar ]

Piloto: CATI · EMATER · cooperativas
       [ parceiro a confirmar ]

"Não construímos um táxi.
Construímos a estrada."
```

**Script de narração:**
> "O teto real não é o CAR. É qualquer decisão que depende de entender um
> território: concessão de crédito, precificação de carbono, licenciamento,
> seguro agrícola, política pública de uso do solo.
>
> A Terra Comum é código aberto — qualquer estado, qualquer país com legislação
> similar ao CAR pode rodar em cima. Já está no GitHub. O próximo passo é um
> piloto com um parceiro de extensão rural — CATI ou cooperativa — para validar
> o fluxo com produtores reais.
>
> O Raimundo merece entrar no SICAR sabendo o que fazer. E o Brasil merece uma
> infraestrutura territorial que pertence a todos. Obrigado."

---

## Autoavaliação — cobertura dos itens obrigatórios

| Slide | Item obrigatório | Coberto? | Risco |
|---|---|---|---|
| 1. Capa | Nome da solução | ✅ | — |
| 2. Problema | Problema | ✅ | — |
| 3. Público-alvo | Público-alvo | ✅ | — |
| 4. Solução | O que é | ✅ | — |
| 5. Como funciona | Como funciona | ✅ | Verificar se é claro sem jargão |
| 6. Modelo | Modelo de negócio | ✅ | Confirmar B2B/B2G antes da gravação |
| 7. Diferencial | Diferencial competitivo | ✅ | Usar "4,19 ha" sem jargão |
| 8. Encerramento | CTA + próximos passos | ✅ | Confirmar URL do GitHub + parceiro |

**3 pontos que mais influenciam a nota:**
1. **Slide 5 (como funciona)** — o número "4,19 ha em Alvinópolis/MG" é o argumento
   mais concreto do pitch inteiro; não deixar cair na narração
2. **Slide 7 (diferencial)** — "táxi vs. estrada" precisa aparecer de forma natural,
   não recitada
3. **Slide 6 (modelo)** — o jurado vai perguntar "e como se sustenta?" — ter uma
   resposta de 30 segundos na ponta da língua

**Pendências antes de gravar:**
- [ ] Confirmar URL do repositório público no GitHub
- [ ] Confirmar parceiro do piloto (CATI-SP ou cooperativa)
- [ ] Medir a duração da narração completa — meta: encaixar no tempo da plataforma
- [ ] Gravar o áudio dentro da plataforma (não é arquivo separado)
- [ ] Exportar os slides como PDF antes de enviar
