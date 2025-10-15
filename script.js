const terminalText = document.getElementById("terminal-text");
const userInput = document.getElementById("user-input");

let step = 0;
let username = "";

function typeText(text, delay = 30) {
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      terminalText.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}

async function init() {
  await typeText("IRIS Secure Terminal v1.0\n");
  await typeText("Acesso restrito. Digite seu nome de usuário:\n");
  userInput.focus();
}

init();

userInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const value = userInput.value.trim();
    userInput.value = "";

    if (step === 0) {
      if (value === "THUrbi") {
        username = value;
        await typeText("\nUsuário aceito.\nDigite a senha:\n");
        step = 1;
      } else {
        await typeText("\nACESSO NEGADO ❌\n");
      }
    } else if (step === 1) {
      const passwords = ["RESET", "LIBERDADE", "TRANSCREVER"];
      if (passwords.includes(value)) {
        await typeText("\nAcesso concedido. Bem-vindo, " + username + ".\n");
        setTimeout(() => window.location.href = "iris.html", 1500);
      } else {
        await typeText("\nSenha incorreta. Sistema bloqueado.\n");
      }
    }
  }
});
// Ex.: revelar a pista quando o usuário clicar 3x na imagem
(function(){
  const fig = document.getElementById('iris-image-1');
  const img = document.getElementById('iris-img-1');
  let clicks = 0;

  img.addEventListener('click', () => {
    clicks++;
    // clique triplo pra ativar (ajusta como quiser)
    if (clicks >= 3) {
      const hidden = fig.getAttribute('data-hidden') === 'true';
      fig.setAttribute('data-hidden', hidden ? 'false' : 'true');
      // opcional: mostra a mensagem do data-clue no console (útil pra debug/puzzle)
      console.log('clue:', fig.dataset.clue);
      clicks = 0;
    }
    // reseta contagem se o usuário demorar muito
    setTimeout(() => clicks = 0, 700);
  });

  // função utilitária pra trocar a imagem via JS (se quiser ativar por puzzle)
  window.irisReplaceImage = function(id, newSrc, newAlt = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.src = newSrc;
    if (newAlt) el.alt = newAlt;
  };
})();
