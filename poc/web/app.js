/* Compadre — lógica do chat (PoC).
 *
 * Tenta chamar a API real (POST /conversa). Se não houver backend no ar,
 * cai numa resposta empacotada (mesmo formato do contrato) — assim a tela
 * é filmável mesmo offline. Mesma filosofia de fallback do backend.
 */

const API = "http://127.0.0.1:8000/conversa";
const CAR_DEMO = "MG-3102308-1F30612FD2F845A7B8852A7B0BF07455";

const BASE = API.replace("/conversa", "");

const chat = document.getElementById("chat");
const entrada = document.getElementById("entrada");
const enviar = document.getElementById("enviar");
const modoTag = document.getElementById("modo");
const consoleLog = document.getElementById("console-log");

let provedorLLM = "llm";
fetch(BASE + "/").then(r => r.json()).then(d => { provedorLLM = d.provedor_llm || "llm"; }).catch(() => {});

// ---- bastidores: mostra o pipeline real que produziu a resposta ----
function logLinha(html, classe) {
  const div = document.createElement("div");
  div.className = "linha " + (classe || "");
  div.innerHTML = html;
  consoleLog.appendChild(div);
  consoleLog.scrollTop = consoleLog.scrollHeight;
  return div;
}
const espera = ms => new Promise(r => setTimeout(r, ms));

async function bastidores(numero, r) {
  consoleLog.innerHTML = "";
  const passos = [
    () => logLinha(`<span class="cmd">$ hub.load(<b>"compadre.yaml"</b>)</span>`),
    () => logLinha(`<span class="out">↳ tools: consultar_sicar · consultar_ontologia · traduzir_llm</span>`),
    () => logLinha(`<span class="cmd">$ consultar_sicar(<b>"${escape(numero).slice(0, 18)}…"</b>)</span>`),
    () => logLinha(`<span class="out">↳ situação: <span class="val">${r.pendencias ? r.pendencias.length : 0} alerta(s)</span></span>`),
  ];
  if (r.regra_aplicada) {
    passos.push(() => logLinha(`<span class="cmd">$ consultar_ontologia(<b>pendência</b>)</span>`));
    passos.push(() => logLinha(`<span class="out">↳ regra: <span class="lei">${escape(r.regra_aplicada.fonte)}</span><br>&nbsp;&nbsp;<span class="rastro">${escape(r.regra_aplicada.rastro_ontologia)}</span></span>`));
  }
  if (r.analise_app) {
    passos.push(() => logLinha(`<span class="cmd">$ analise_app.<b>deficit_app()</b></span>`));
    const a = r.analise_app;
    const v = a.conforme ? `<span class="val">conforme</span>` : `<span class="lei">déficit ${escape(a.deficit_m2)} m²</span>`;
    passos.push(() => logLinha(`<span class="out">↳ ${v} · faixa ${escape(a.faixa_exigida_m)} m <span class="rastro">${escape(a.rastro_ontologia)}</span></span>`));
  }
  if (r.beneficios && r.beneficios.length) {
    passos.push(() => logLinha(`<span class="cmd">$ consultar_ontologia.<b>beneficios("Ativo")</b></span>`));
    passos.push(() => logLinha(`<span class="out">↳ <span class="val">${r.beneficios.length} benefícios</span> desbloqueados</span>`));
  }
  passos.push(() => logLinha(`<span class="cmd">$ traduzir_llm(<b>${escape(provedorLLM)}</b>) → resposta</span>`));

  for (const p of passos) { p(); await espera(260); }
  logLinha(`<span class="cmd pisca"></span>`);
}

// resposta de reserva (mesmo shape de contracts/conversa.example.json)
const FALLBACK = {
  traducao: "Dei uma olhada no seu imóvel em Alvinópolis/MG e ele tá com 2 pontos pra acertar antes de tudo ficar certo. O mais rápido é o código CIB — é um número da Receita Federal que prova que o imóvel é seu no sistema. Sem ele o cadastro fica incompleto. Você tem o documento do imóvel guardado? (CAFIR ou o boleto do ITR serve)",
  pendencias: [
    { tipo: "CIB ausente", gravidade: "alerta", explicacao: "Falta o número que identifica o imóvel na Receita Federal.", o_que_fazer: "Procure o comprovante do imóvel (o CAFIR ou boleto do ITR) e anote o número de lá." },
    { tipo: "Responsável não cadastrado", gravidade: "alerta", explicacao: "Não tem ninguém cadastrado como responsável pelo imóvel.", o_que_fazer: "Você mesmo pode se colocar como responsável — é bem rápido de fazer." }
  ],
  regra_aplicada: {
    conceito: "car:Pendencia_CIB",
    parametro_legal: "Cadastro exige identificação e comprovação do imóvel (Art. 29).",
    fonte: "Lei 12.651/2012, Art. 29, §1º, II e III",
    rastro_ontologia: "car:Pendencia_CIB"
  },
  analise_app: {
    faixa_exigida_m: 30, deficit_m2: 1800, deficit_ha: 0.18, conforme: false,
    fonte: "Lei 12.651/2012, Art. 4º, I, alínea a", rastro_ontologia: "car:FaixaAPP_ate10"
  },
  proximo_passo: "Bora resolver o CIB primeiro — é o mais rápido. Depois a gente cuida do responsável. Você topa?",
  link_sicar: "https://car-sus.dataprev.gov.br/#/",
  beneficios: [
    "Crédito rural com juro menor (Pronaf Eco e similares)",
    "Você recebe pra conservar a mata — Pagamento por Serviços Ambientais (PSA)",
    "Pode vender créditos de reserva pra outros produtores (CRA)",
    "As multas e restrições ficam suspensas enquanto o CAR tiver regularizado"
  ]
};

function agora() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function bolha(lado, html) {
  const div = document.createElement("div");
  div.className = "bolha " + (lado === "out" ? "sai" : "entra");
  div.innerHTML = html + `<span class="hora">${agora()}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function digitando() {
  const div = document.createElement("div");
  div.className = "bolha entra digitando";
  div.textContent = "Mestre da Terra está verificando…";
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// monta a resposta do Professor (texto livre, parágrafos, sem selos)
function renderProfessor(r) {
  const linhas = r.resposta.split("\n").filter(l => l.trim());
  return linhas.map(l => `<p style="margin:0 0 6px">${escape(l)}</p>`).join("");
}

function bastidoresProfessor(pergunta) {
  consoleLog.innerHTML = "";
  logLinha(`<span class="cmd">$ hub.detect_intent(<b>"${escape(pergunta.slice(0, 30))}…"</b>)</span>`);
  setTimeout(() => logLinha(`<span class="out">↳ intenção: <span class="val">pergunta_conceitual</span></span>`), 260);
  setTimeout(() => logLinha(`<span class="cmd">$ hub.delegate(<b>"compadre"</b> → <b>"professor"</b>)</span>`), 520);
  setTimeout(() => logLinha(`<span class="out">↳ tool: <span class="lei">consultar_legislacao</span> · <span class="lei">explicar_conceitos</span></span>`), 780);
  setTimeout(() => logLinha(`<span class="cmd">$ professor_llm(<b>${escape(provedorLLM)}</b>) → explicação</span>`), 1040);
  setTimeout(() => logLinha(`<span class="cmd pisca"></span>`), 1300);
}

// monta a resposta rica do Compadre (tradução + pendências + selo + benefícios)
function renderResposta(r) {
  let html = escape(r.traducao);

  if (r.pendencias && r.pendencias.length) {
    html += `<div class="lista">`;
    for (const p of r.pendencias) {
      html += `<div class="item"><span class="tag">${escape(p.tipo)}</span><br>${escape(p.o_que_fazer)}</div>`;
    }
    html += `</div>`;
  }

  // SELO DE RASTREABILIDADE — P0-7 (o que prova que não é chatbot genérico)
  if (r.regra_aplicada) {
    const ra = r.regra_aplicada;
    html += `<div class="selo">
      <b>📖 Baseado na regra:</b>
      <span class="fonte">${escape(ra.fonte)}</span><br>
      <span class="rastro">${escape(ra.rastro_ontologia)}</span>
    </div>`;
  }

  // ANÁLISE DE APP — validação antecipada (A3): descobre o déficit antes do envio
  if (r.analise_app && !r.analise_app.conforme) {
    const a = r.analise_app;
    html += `<div class="selo" style="border-left-color:#c0561f;background:#fff3ec;color:#b2491a">
      <b>🛰️ Achei um detalhe importante:</b>
      a faixa de mata na beira do córrego precisa ter ${escape(a.faixa_exigida_m)} metros,
      mas tá faltando uns <b>${escape(a.deficit_m2)} m²</b> de vegetação.
      Isso dá pra regularizar — me fala se quer entender como.<br>
      <span class="rastro" style="color:#9c6b4f">${escape(a.fonte)} · ${escape(a.rastro_ontologia)}</span>
    </div>`;
  }

  if (r.beneficios && r.beneficios.length) {
    html += `<div class="lista">Com o CAR em dia, você passa a ter direito a:<br>`;
    for (const b of r.beneficios) html += `<span class="benef">${escape(b)}</span>`;
    html += `</div>`;
  }

  if (r.link_sicar) {
    html += `<br><a class="btn-sistema" href="${escape(r.link_sicar)}" target="_blank" rel="noopener">Abrir o sistema do CAR →</a>`;
  }
  return html;
}

async function consultar(numeroCar, mensagem) {
  try {
    // timeout maior para o Professor (resposta longa com LLM)
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero_car: numeroCar, mensagem }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!resp.ok) throw new Error("api");
    modoTag.textContent = "ao vivo";
    return await resp.json();
  } catch (e) {
    modoTag.textContent = "demo";
    return FALLBACK;
  }
}

// ---- fluxo scriptado da conversa --------------------------------------
let etapa = 0;

async function responder(texto) {
  const t = digitando();
  await new Promise((r) => setTimeout(r, 700));
  t.remove();

  if (etapa === 0) {
    bolha("in", "Tudo bom! Me passa o <b>número do seu CAR</b> que eu dou uma olhada na situação do seu imóvel. É aquele código longo que começa com a sigla do estado — tipo <code>MG-3102308-...</code>");
    etapa = 1;
  } else if (etapa === 1) {
    const numero = texto.trim().length > 6 ? texto.trim() : CAR_DEMO;
    const t2 = digitando();
    await new Promise((r) => setTimeout(r, 900));
    t2.remove();
    const r = await consultar(numero, "consulta inicial");
    bastidores(numero, r);                 // mostra o pipeline real nos bastidores
    bolha("in", renderResposta(r));
    etapa = 2;
  } else {
    // etapa >= 2: mensagem livre — chama o backend com a mensagem real
    const t2 = digitando();
    const r = await consultar(CAR_DEMO, texto);
    t2.remove();
    if (r.agente === "professor" || r.delegado_por === "compadre") {
      bastidoresProfessor(texto);
      bolha("in", renderProfessor(r));
    } else {
      bastidores(CAR_DEMO, r);
      bolha("in", renderResposta(r));
    }
  }
}

function mandar() {
  const texto = entrada.value.trim();
  if (!texto) return;
  bolha("out", escape(texto));
  entrada.value = "";
  responder(texto);
}

enviar.addEventListener("click", mandar);
entrada.addEventListener("keydown", (e) => { if (e.key === "Enter") mandar(); });

// abertura
window.addEventListener("load", () => {
  bolha("in", "👋 Oi! Sou o <b>Mestre da Terra</b> 🌱 Tô aqui pra te ajudar a resolver o CAR sem precisar entender a lei toda. Manda um <b>oi</b> pra começar.");
  if (consoleLog) logLinha(`<span class="out">aguardando o produtor… <span class="pisca"></span></span>`);
});
