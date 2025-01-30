let listaDeNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Armazena referências para melhorar desempenho
const inputNumero = document.querySelector("input");
const botaoReiniciar = document.getElementById("reiniciar");

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;

  // Interrompe qualquer fala anterior e inicia uma nova
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Web Speech API não suportada neste navegador.");
  }
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(inputNumero.value);

  // Validação do input
  if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
    exibirTextoNaTela("p", `Digite um número válido entre 1 e ${numeroLimite}`);
    limparCampo();
    return;
  }

  if (chute === numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    exibirTextoNaTela(
      "p",
      `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
    );
    botaoReiniciar.removeAttribute("disabled");
  } else {
    let dica = chute > numeroSecreto ? "menor" : "maior";
    exibirTextoNaTela("p", `O número secreto é ${dica}`);
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  if (listaDeNumerosSorteados.length >= numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  let numeroEscolhido;
  do {
    numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
  } while (listaDeNumerosSorteados.includes(numeroEscolhido));

  listaDeNumerosSorteados.push(numeroEscolhido);
  console.log(`Número secreto sorteado: ${numeroEscolhido}`);
  return numeroEscolhido;
}

function limparCampo() {
  inputNumero.value = "";
  inputNumero.focus();
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  exibirMensagemInicial();
  botaoReiniciar.setAttribute("disabled", true);
  limparCampo();
}
