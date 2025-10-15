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
