// Obtém todas as divs dentro do elemento com a classe 'board'. Cada div representa uma célula do jogo da velha.
// Juntando tudo: ('.board > div') significa: "Encontre todos os elementos div que são filhos diretos de
// elementos que tem a classe 'board'".
const celulas = document.querySelectorAll('.board > div');

// Obtém o elemento HTML que exibirá as mensagens do jogo (quem venceu, empate, etc.).
const elementoMensagem = document.querySelector('.mensagem');

// Obtém o botão que será usado para reiniciar o jogo. 
const botaoReiniciar = document.querySelector('.reset-button');

// Define qual jogador começa. 'X' sempre começa.
var jogadorAtual = 'x';

// Variável para controlar se o jogo terminou ou não. Começa como falso (o jogo não acabou).
var jogoAcabou = false;

// Representa o estado atual do tabuleiro. É um array com 9 posições, uma para cada célula.
// Inicialmente, todas as posições estão vazias (' ').
const tabuleiro = ["","","","","","","","",""];

// Array que contém todas as combinações de células que levam á vitória.
const combinacoesVitoria = [
    [0,1,2], [3,4,5], [6,7,8], // Linhas
    [0,3,6], [1,4,7], [2,5,8], // Colunas
    [0,4,8], [2,4,6],          // Diagonais
];

// Função para verificar se o jogador atual venceu o jogo.
function verificarVitoria() {
    // percorre cada combinação de vitória possível.
    for (const combinacao of combinacoesVitoria) {
        //  Desestrutura a combinação atual em três variáveis: a, b e c (índice das células).
        const [a, b,c] = combinacao;

        // Verifica se a três células da combinação atual têm o símbolo do jogador atual.
        // Tabuleiro[a] && ... : Garante que a primeira célula (tabuleiro[a]) *não está vazia*
        // Antes de verificar as outras. Isso evita erros.
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            // Se as três células forem iguais (e não vazias), retorna verdadeiro (o jogador venceu).
            return true;
        }
    }
    // Se nenhuma combinação vencedora for encontrada, retorna falso (o jogador não venceu).
    return false;
}

// Função para verificar se o jogo empatou.
function verificaEmpate() {
    // .every() verifica se *todos* os elementos do array passam em um teste. // Array é um tipo de objeto global usado para armazenar dados. 
    // Neste caso, verifica se *todas* as células do tabuleiro estão preenchidas (são diferentes de ' ').
    return tabuleiro.every(celula => celula !== '');
}

// Função que é chamada quando uma célula é clicada.
function tratarCliqueCelula(evento) {
    // Se o jogo já acabou, não faz nada (impede que o jogo continue após a vitória/empate).
    if (jogoAcabou) {
        return;
    }  
    
    //  Obtém a célula que foi clicada (o elemento HTML).
    const celula = evento.target;

    // Obtém o índice da célula clicada (de 0 a 8).
    // Array.from(células) transforma o NodeList (células) em um Array.
    // .indexOf() encontra a posição da célula dentro do array.
    const indiceCelula = Array.from(celulas).indexOf(celula);

    // Se a célula já estiver preenchida, não faz nada (impede que o jogador jogue em uma célula ocupada).
    if (tabuleiro[indiceCelula] !== '') {
        return;
    }

    // Marca a célula no tabuleiro como símbolo do jogador atual ('X' ou 'O').
    tabuleiro[indiceCelula] = jogadorAtual;

    // Adiciona a classe 'x' ou 'o' ao elemento HTML da célula para mostrar visualmente o símbolo.
    celula.classList.add(jogadorAtual.toLowerCase()); // Adiciona 'x' ou 'o'

    // Verifica se o jogador atual venceu após a jogada.
    if (verificarVitoria()){ 
        // Se venceu, exibe a mensagem de vitoria e define 'jogoAcabou' como ve
        // jQuery é uma biblioteca de código JS e sua função é simplificar linhas de código e pode melhorar o front.
        elementoMensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAcabou = true;
        return; // Sai da função, pois o jogo acabou.
    }

    // Verifica se o jogo empatou após a jogada.
    if (verificaEmpate()) {
        // Se empatou, exibe a mensagem de empate e define "jogoAcabou" como verdadeiro
        elementoMensagem.textContent = 'Empate!';
        jogoAcabou = true;
        return; // Sai da função. 
    }

    // Alterna para o próximo jogador ('X' vira 'O', 'O' vira 'X').
    jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
}

// Função para adicionar o evento de clique a cada célula.
function anexarOuvintesClique() {
    // Percorre cada célula do tabuleiro.
    celulas.forEach(celula => {
        // Adiciona um 'ouvinte de evento' a cada célula.
        // 'click' é o tipo de evento (quando a célula é clicada).
        // tratarCliqueCelula é a função que será chamada quando o evento 'click' ocorrer.
        celula.addEventListener('click', tratarCliqueCelula);
    });
};

// Função para reiniciar o jogo.
function reiniciarJogo() {
    // Limpa o tabuleiro (o array 'tabuleiro').
    for (let i = 0; i < tabuleiro.length; i++) {
        tabuleiro[i] = ''; // Define cada célula como vazia.
        celulas[i].classList.remove('x', 'o'); //Remove as classes 'x' e 'o' de cada célula.
    }

    // Reinicia o jogador atual para 'x'.
    jogadorAtual = 'x';

    // Define   jogoAcabou' como falso (o jogo remoceça).
    jogoAcabou = false;

    // Limpa a mensagem de vitória/empate.
    elementoMensagem.textContent = '';
}

// Adiciona um ouvinte de evento ao botão de reiniciar.
// Quando o botão for clicado, a função 'reiniciarJogo'
botaoReiniciar.addEventListener('click', reiniciarJogo);

// Chama a função para adicionar ouvintes de clique às célullas (inicia o jogo).
anexarOuvintesClique();

/**Funções */