/* Compadre — lógica do chat (PoC).
 *
 * Tenta chamar a API real (POST /conversa). Se não houver backend no ar,
 * cai numa resposta empacotada (mesmo formato do contrato) — assim a tela
 * é filmável mesmo offline. Mesma filosofia de fallback do backend.
 */

const API = "http://127.0.0.1:8000/conversa";
const CAR_DEMO = "RJ-3304300-C34F7184E63C4CCBBBF04FF840098E53";

const chat = document.getElementById("chat");
const entrada = document.getElementById("entrada");
const enviar = document.getElementById("enviar");
const modoTag = document.getElementById("modo");

// resposta de reserva (mesmo shape de contracts/conversa.example.json)
const FALLBACK = {
  traducao: "Olá! Dei uma olhada no Sítio Três Rios e ele está com 2 avisos. O mais simples de resolver: falta o código CIB — o número que identifica o imóvel na Receita Federal e liga o CAR ao registro. Você tem o comprovante do imóvel em mãos?",
  pendencias: [
    { tipo: "CIB_ausente", gravidade: "alerta", explicacao: "Falta o código CIB do imóvel.", o_que_fazer: "Pegue o comprovante (CAFIR/ITR) e informe o número do CIB." },
    { tipo: "representante_ausente", gravidade: "alerta", explicacao: "Nenhum representante foi adicionado.", o_que_fazer: "Você pode se adicionar como representante." }
  ],
  regra_aplicada: {
    conceito: "car:Pendencia_CIB",
    parametro_legal: "Cadastro exige identificação e comprovação do imóvel (Art. 29).",
    fonte: "Lei 12.651/2012, Art. 29, §1º, II e III",
    rastro_ontologia: "car:Pendencia_CIB"
  },
  proximo_passo: "Vamos resolver primeiro o CIB. Depois cuidamos do representante.",
  link_sicar: "https://car-sus.dataprev.gov.br/#/",
  beneficios: ["CRA — Cota de Reserva Ambiental", "Crédito rural (ex.: Pronaf Eco)", "PSA — Pagamento por Serviços Ambientais", "Suspensão de sanções"]
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
  div.textContent = "Compadre está digitando…";
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  if (r.beneficios && r.beneficios.length) {
    html += `<div class="lista">Com o CAR em dia, você desbloqueia:<br>`;
    for (const b of r.beneficios) html += `<span class="benef">${escape(b)}</span>`;
    html += `</div>`;
  }

  if (r.link_sicar) {
    html += `<br><a class="btn-sistema" href="${escape(r.link_sicar)}" target="_blank" rel="noopener">Ir para o sistema →</a>`;
  }
  return html;
}

async function consultar(numeroCar, mensagem) {
  try {
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero_car: numeroCar, mensagem }),
    });
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
    bolha("in", "Opa, tudo bem? Eu sou o Compadre 🌱 Me manda o <b>número do seu CAR</b> que eu vejo como está a situação do seu imóvel.");
    etapa = 1;
  } else if (etapa === 1) {
    const numero = texto.trim().length > 6 ? texto.trim() : CAR_DEMO;
    const t2 = digitando();
    await new Promise((r) => setTimeout(r, 900));
    t2.remove();
    const r = await consultar(numero, "consulta inicial");
    bolha("in", renderResposta(r));
    etapa = 2;
  } else {
    bolha("in", "Tô aqui pra ajudar com o que precisar do seu CAR 👍");
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
  bolha("in", "👋 Oi! Sou o <b>Compadre</b>, te ajudo a resolver o CAR sem complicação. Manda um “oi” pra começar.");
});
