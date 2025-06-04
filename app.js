// Array para armazenar os nomes dos amigos
let amigos = [];

// Elementos do DOM (cache para melhor performance)
const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoSorteio = document.getElementById("resultado");
const botaoSortear = document.querySelector(".button-draw");
const botaoReiniciar = document.querySelector(".button-reset");
const botaoLimpar = document.querySelector(".button-limpar"); // Adicionado o botão de limpar
const mensagemErro = document.getElementById("mensagemErro"); // Elemento para exibir mensagens de erro

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = "block";
        // Opcional: esconder a mensagem após alguns segundos
        setTimeout(() => {
            mensagemErro.style.display = "none";
            mensagemErro.textContent = "";
        }, 3000); // Esconde a mensagem após 3 segundos
    }
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const nome = inputAmigo.value.trim();

    // Limpa mensagens de erro anteriores
    if (mensagemErro) {
        mensagemErro.style.display = "none";
        mensagemErro.textContent = "";
    }

    if (nome) {
        if (amigos.includes(nome)) {
            exibirMensagemErro("Este nome já foi adicionado!");
        } else {
            amigos.push(nome);

            // Criar elemento de lista e adicionar ao DOM
            const li = document.createElement("li");
            li.textContent = nome;
            listaAmigos.appendChild(li);

            // Limpar o campo de entrada
            inputAmigo.value = "";
            inputAmigo.focus();
        }
    } else {
        exibirMensagemErro("Por favor, digite um nome válido!");
    }
}

// Função para sortear apenas um nome da lista
function sortearAmigo() {
    if (amigos.length === 0) {
        exibirMensagemErro("Adicione pelo menos um amigo para realizar o sorteio!");
        return;
    }

    // Sortear um nome aleatório da lista
    const sorteado = amigos[Math.floor(Math.random() * amigos.length)];

    // Limpar e ocultar a lista de nomes
    listaAmigos.innerHTML = ""; // Garante que a lista visual esteja vazia
    listaAmigos.style.display = "none";

    // Exibir apenas o nome do sorteado
    resultadoSorteio.innerHTML = `<li>O amigo sorteado foi: <strong> ${sorteado} </strong></li>`;

    // Desativar o botão "Sortear amigo" e ativar "Reiniciar Sorteio"
    botaoSortear.disabled = true;
    botaoSortear.style.opacity = "0.5";

    botaoReiniciar.disabled = false;
    botaoReiniciar.style.opacity = "1";

    botaoLimpar.disabled = true; // Desativa o botão limpar após o sorteio
    botaoLimpar.style.opacity = "0.5";
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    // Restaurar a lista de nomes no DOM
    listaAmigos.innerHTML = "";
    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
    listaAmigos.style.display = "block"; // Torna a lista visível novamente

    // Limpar o resultado do sorteio
    resultadoSorteio.innerHTML = "";

    // Reativar o botão "Sortear amigo" e desativar "Reiniciar Sorteio"
    botaoSortear.disabled = false;
    botaoSortear.style.opacity = "1";

    botaoReiniciar.disabled = true;
    botaoReiniciar.style.opacity = "0.5";

    botaoLimpar.disabled = false; // Ativa o botão limpar novamente
    botaoLimpar.style.opacity = "1";

    inputAmigo.focus(); // Coloca o foco no input
}

// Função para limpar a lista de amigos e reiniciar o estado
function limparLista() {
    amigos = []; // Esvazia o array de amigos
    listaAmigos.innerHTML = ""; // Remove os itens do DOM
    resultadoSorteio.innerHTML = ""; // Limpa o resultado do sorteio

    // Garante que a lista esteja visível se o sorteio foi feito antes de limpar
    listaAmigos.style.display = "block";

    // Reativa/desativa os botões para o estado inicial
    botaoSortear.disabled = false;
    botaoSortear.style.opacity = "1";

    botaoReiniciar.disabled = true;
    botaoReiniciar.style.opacity = "0.5";

    botaoLimpar.disabled = false; // O botão limpar sempre deve estar ativo (ou ativado quando há amigos)
    botaoLimpar.style.opacity = "1";

    inputAmigo.value = ""; // Limpa o campo de entrada
    inputAmigo.focus(); // Coloca o foco no input

    // Esconde a mensagem de erro se estiver visível
    if (mensagemErro) {
        mensagemErro.style.display = "none";
        mensagemErro.textContent = "";
    }
}

// Adicionar listeners de eventos ao DOM (melhor prática que onclick no HTML)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button-add").addEventListener("click", adicionarAmigo);
    botaoSortear.addEventListener("click", sortearAmigo);
    botaoReiniciar.addEventListener("click", reiniciarSorteio);
    botaoLimpar.addEventListener("click", limparLista);
});
