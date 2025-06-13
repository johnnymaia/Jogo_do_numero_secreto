let listaDeNumerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Armazena referências para melhorar desempenho
const inputNumero = document.querySelector("input");
const botaoReiniciar = document.getElementById("reiniciar");

function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    if (campo) { // Garante que o elemento existe
        campo.textContent = texto; // Usar textContent para segurança e performance

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel(); // Interrompe qualquer fala anterior
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = "pt-BR";
            utterance.rate = 1.2;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Web Speech API não suportada neste navegador.");
        }
    } else {
        console.warn(`Erro: Elemento com a tag "${tag}" não encontrado no DOM.`);
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}.`);
}

// Exibe a mensagem inicial ao carregar a página
exibirMensagemInicial();

function verificarChute() {
    const chute = parseInt(inputNumero.value);

    // Validação do input: verifica se é um número, está no range e não é nulo/vazio
    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela("p", `Por favor, digite um número válido entre 1 e ${numeroLimite}.`);
        limparCampo();
        return;
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns, você acertou!");
        const palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela(
            "p",
            `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`
        );
        botaoReiniciar.removeAttribute("disabled"); // Habilita o botão de reiniciar
    } else {
        const dica = chute > numeroSecreto ? "menor" : "maior";
        exibirTextoNaTela("p", `O número secreto é ${dica}.`);
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    // Se todos os números possíveis já foram sorteados, reinicia a lista
    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
        console.log("Todos os números foram sorteados. A lista foi reiniciada.");
    }

    let numeroEscolhido;
    // Garante que o número escolhido ainda não está na lista de números sorteados
    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));

    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(`Número secreto sorteado: ${numeroEscolhido}. Lista atual: [${listaDeNumerosSorteados}]`);
    return numeroEscolhido;
}

function limparCampo() {
    inputNumero.value = "";
    inputNumero.focus(); // Coloca o foco de volta no campo de input
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    tentativas = 1; // Reseta as tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    botaoReiniciar.setAttribute("disabled", true); // Desabilita o botão de reiniciar
    limparCampo(); // Limpa o campo de input
}
