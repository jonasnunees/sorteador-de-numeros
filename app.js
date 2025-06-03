// Função principal chamada quando o usuário clica no botão "Sortear"
function sortear() {
    // Lê o valor do campo "quantidade" e converte para número inteiro
    const quantidade = obterValorNumerico("quantidade");

    // Lê o valor do campo "de" (início do intervalo) e converte para número inteiro
    const de = obterValorNumerico("de");

    // Lê o valor do campo "até" (fim do intervalo) e converte para número inteiro
    const ate = obterValorNumerico("ate");

    // Verifica se é possível sortear a quantidade desejada dentro do intervalo informado
    // Ex: tentar sortear 10 números únicos entre 1 e 5 é impossível
    if (!validarIntervalo(quantidade, de, ate)) {
        // Mostra um alerta ao usuário explicando o erro
        alert("Erro: A quantidade de números sorteados não pode ser maior que o intervalo definido.");

        // Reinicia a página, limpando todos os campos e voltando ao estado inicial
        reiniciar();

        // Encerra a função aqui para não continuar com o sorteio
        return;
    }

    // Realiza o sorteio dos números, garantindo que sejam únicos e dentro do intervalo
    const numerosSorteados = sortearNumeros(quantidade, de, ate);

    // Mostra o resultado na tela para o usuário
    exibirResultado(numerosSorteados);

    // Desativa o botão de sortear e ativa o botão de reiniciar
    alternarEstadoDosBotoes();
}

// Função que busca um valor em um campo de entrada (input) HTML e o converte em número inteiro
function obterValorNumerico(id) {
    // document.getElementById(id): localiza o elemento HTML pelo ID fornecido
    // .value: acessa o valor digitado pelo usuário nesse campo
    // parseInt(...): converte o valor de texto (string) em um número inteiro
    return parseInt(document.getElementById(id).value);
}

// Função que verifica se é possível sortear a quantidade de números desejada dentro do intervalo definido
function validarIntervalo(quantidade, min, max) {
    // Cálculo da quantidade total de números possíveis no intervalo (inclusive)
    // Ex: de 1 a 5 → (5 - 1 + 1) = 5 números possíveis
    // Verifica se a quantidade desejada é menor ou igual ao total possível
    return quantidade <= (max - min + 1);
}

// Função que sorteia uma quantidade (qtd) de números únicos dentro de um intervalo [min, max]
function sortearNumeros(qtd, min, max) {
    // Cria um array vazio para armazenar os números sorteados
    const numeros = [];

    // Continua sorteando até que a quantidade desejada de números seja atingida
    while (numeros.length < qtd) {
        // Gera um número aleatório dentro do intervalo especificado
        const numero = obterNumeroAleatorio(min, max);

        // Verifica se o número ainda não foi sorteado (para evitar repetições)
        if (!numeros.includes(numero)) {
            // Adiciona o número ao array
            numeros.push(numero);
        }
    }

    // Ordena os números em ordem crescente antes de retornar
    // A função (a, b) => a - b garante a ordenação numérica correta
    return numeros.sort((a, b) => a - b);
}

// Função que exibe os números sorteados na tela, dentro da tag <label> com ID "resultado"
function exibirResultado(numeros) {
    // Seleciona o elemento <label> que está dentro da div com ID "resultado"
    const labelResultado = document.querySelector("#resultado label");

    // Atualiza o texto da label com os números sorteados, separados por vírgula
    // Exemplo: "Números sorteados: 3, 7, 12"
    labelResultado.textContent = "Números sorteados: " + numeros.join(", ");
}

// Função que alterna o estado dos botões após o sorteio:
// Desativa o botão "Sortear" e ativa o botão "Reiniciar"
function alternarEstadoDosBotoes() {
    // Seleciona o botão "Sortear" pelo ID
    const btnSortear = document.getElementById("btn-sortear");

    // Desativa o botão para impedir novos sorteios
    btnSortear.disabled = true;

    // Remove a classe de botão ativo (azul)
    btnSortear.classList.remove("container__botao");

    // Adiciona a classe que deixa o botão desabilitado (cinza)
    btnSortear.classList.add("container__botao-desabilitado");

    // Seleciona o botão "Reiniciar" pelo ID
    const btnReiniciar = document.getElementById("btn-reiniciar");

    // Ativa o botão para permitir que o usuário reinicie o jogo
    btnReiniciar.disabled = false;

    // Remove a classe de botão desabilitado (cinza)
    btnReiniciar.classList.remove("container__botao-desabilitado");

    // Adiciona a classe que deixa o botão com aparência ativa (azul)
    btnReiniciar.classList.add("container__botao");
}

// Função que gera um número inteiro aleatório entre os valores min e max (inclusive)
function obterNumeroAleatorio(min, max) {
    // Math.random() gera um número decimal aleatório entre 0 (inclusive) e 1 (exclusivo)
    // Multiplicamos pelo tamanho do intervalo: (max - min + 1)
    // Exemplo: de 1 a 5 → (5 - 1 + 1) = 5 → gera algo entre 0 e 4.999...
    
    // Math.floor() arredonda o número para baixo, transformando-o em inteiro
    // Por fim, somamos o valor mínimo (min) para ajustar o intervalo
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função que reinicia a página, voltando tudo ao estado inicial
function reiniciar() {
  // window.location.reload() recarrega a página atual
  // Isso limpa todos os campos, zera os botões e remove os resultados
  window.location.reload();
}