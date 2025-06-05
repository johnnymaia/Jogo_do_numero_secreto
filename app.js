let listaDeNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto;
let tentativas = 1;
let historicoChutes = [];

// Armazena referências para melhorar desempenho e legibilidade
const inputNumero = document.querySelector(".container__input");
const botaoReiniciar = document.getElementById("reiniciar");
const campoTitulo = document.querySelector("h1");
const campoParagrafo = document.querySelector("p.texto__paragrafo");
const contadorTentativas = document.getElementById("contadorTentativas");
const listaHistorico = document.getElementById("historicoDeChutes");
const containerConteudo = document.querySelector(".container__conteudo"); // Para efeito de sucesso

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
    exibirTextoNaTela("p.texto__paragrafo", `Escolha um número entre 1 e ${numeroLimite}`);
    atualizarContadorTentativas();
    limparHistorico();
}

// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
});

function atualizarContadorTentativas() {
    contadorTentativas.textContent = `Tentativas: ${tentativas}`;
}

function adicionarChuteAoHistorico(chute, acertou) {
    const item = document.createElement("li");
    item.textContent = `Você chutou ${chute}.`;
    if (acertou) {
        item.classList.add("historico__acerto");
        item.textContent += " (Acertou!)";
    } else {
        item.classList.add("historico__erro");
    }
    listaHistorico.prepend(item); // Adiciona ao topo da lista
    historicoChutes.push(chute);
}

function limparHistorico() {
    listaHistorico.innerHTML = "";
    historicoChutes = [];
}

function verificarChute() {
    let chute = parseInt(inputNumero.value);

    // Remove a classe de erro visual do input
    inputNumero.classList.remove("input__invalido");

    // Validação do input
    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela("p.texto__paragrafo", `Digite um número válido entre 1 e ${numeroLimite}`);
        inputNumero.classList.add("input__invalido"); // Adiciona classe de erro visual
        limparCampo();
        return;
    }

    adicionarChuteAoHistorico(chute, chute === numeroSecreto);

    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela(
            "p.texto__paragrafo",
            `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        );
        botaoReiniciar.removeAttribute("disabled");
        inputNumero.setAttribute("disabled", true); // Desabilita o input após acertar
        
        // Adiciona classe para efeito visual de sucesso
        containerConteudo.classList.add("container__conteudo--sucesso");

    } else {
        let dica = chute > numeroSecreto ? "menor" : "maior";
        exibirTextoNaTela("p.texto__paragrafo", `O número secreto é ${dica}`);
        tentativas++;
        atualizarContadorTentativas(); // Atualiza o contador na tela
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
    console.log(`Números sorteados: ${listaDeNumerosSorteados}`); // Para debug
    return numeroEscolhido;
}

function limparCampo() {
    inputNumero.value = "";
    inputNumero.focus();
}

function reiniciarJogo() {
    // Remove classe de sucesso, se presente
    containerConteudo.classList.remove("container__conteudo--sucesso"); 

    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    botaoReiniciar.setAttribute("disabled", true);
    inputNumero.removeAttribute("disabled"); // Habilita o input novamente
    limparCampo();
}
