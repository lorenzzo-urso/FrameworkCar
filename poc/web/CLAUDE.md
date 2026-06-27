# `web/` — Dev B (a cara: interface)

Você é dono do que o jurado vê: a interface do Compadre e a vitrine do Hub.

## O que você constrói (requisitos do PRD)

- **P0-6** Interface WhatsApp simulado — chat mobile, bolhas, campo de texto,
  botão "Ir para o sistema"
- **P1-1** Hub UI (vitrine) — tela "Terra Comum — Agent Hub" com cards de agentes;
  o card do Compadre é clicável e abre o fluxo do WhatsApp
- **P1-3** Painel de benefícios — mostra os programas que o CAR regularizado libera

## Sua costura com o resto

```
você CONSOME  →  contracts/conversa.example.json  (vem do backend, Dev A)
```

Renderize a UI contra `contracts/conversa.example.json`. **Não chame o SICAR
direto** e **não espere** a API de Dev A ficar pronta — monte tudo contra o
exemplo e troque pela API real quando ela existir.

## Regras de fronteira (CRÍTICAS)

1. **Não edite `backend/` nem `connectors/`.**
2. **Vídeo vs. pitch — a regra mais importante do projeto:**
   - A tela do **WhatsApp** (P0-6) → vai no **vídeo do protótipo**.
   - A tela do **Hub** (P1-1) → vai **só no pitch**, NUNCA no vídeo.
   - O vídeo mostra só o Raimundo resolvendo o CAR. Backend/Hub/ontologia não
     aparecem no vídeo — senão a nota de usabilidade cai.
3. **Mostre a rastreabilidade (P0-7):** quando a resposta tiver `regra_aplicada`,
   exiba um selo tipo "📖 baseado na regra X". É o que prova que não é um chatbot
   genérico — não esconda esse campo.
4. **Não mude `contracts/conversa.example.json` sozinho** (ver `contracts/README.md`).

## Stack sugerido

HTML/CSS/JS puro ou React. Mobile-first. Sem framework pesado — é um PoC.
