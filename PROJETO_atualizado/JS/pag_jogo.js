const cardContainer = document.getElementById('tabuleiro'); 
const okButton = document.getElementById('okButton');
const startImage = document.getElementById('start');
const tempo = document.getElementById('tempo1')

const backImages_1 = [
    "../Imagens/inicial/gato%20(1).png",
    "../Imagens/inicial/gato%20(2).png",
    "../Imagens/inicial/gato%20(3).png",
    "../Imagens/inicial/gato%20(4).png",
    "../Imagens/jogo/gato (5).png",
    "../Imagens/jogo/gato (6).png",
    "../Imagens/jogo/gato (7).png",
    "../Imagens/jogo/gato (8).png",
    "../Imagens/jogo/gato (9).png",
    "../Imagens/jogo/gato (10).png",
];
const backImages1 = backImages_1.concat(backImages_1); //duplica as backcards

const frontImages1 = [
    "../Imagens/jogo/pata_nr_1.jpg",
    "../Imagens/jogo/pata_nr_2.jpg",
    "../Imagens/jogo/pata_nr_3.jpg",
    "../Imagens/jogo/pata_nr_4.jpg",
    "../Imagens/jogo/pata_nr_5.jpg",
    "../Imagens/jogo/pata_nr_6.jpg",
    "../Imagens/jogo/pata_nr_7.jpg",
    "../Imagens/jogo/pata_nr_8.jpg",
    "../Imagens/jogo/pata_nr_9.jpg",
    "../Imagens/jogo/pata_nr_10.jpg",
    "../Imagens/jogo/pata_nr_11.jpg",
    "../Imagens/jogo/pata_nr_12.jpg",
    "../Imagens/jogo/pata_nr_13.jpg",
    "../Imagens/jogo/pata_nr_14.jpg",
    "../Imagens/jogo/pata_nr_15.jpg",
    "../Imagens/jogo/pata_nr_16.jpg",
    "../Imagens/jogo/pata_nr_17.jpg",
    "../Imagens/jogo/pata_nr_18.jpg",
    "../Imagens/jogo/pata_nr_19.jpg",
    "../Imagens/jogo/pata_nr_20.jpg",
] 

let game = {
    startTime: null,
    timerInterval: null,
    started: false,
    pontos1: 0,
    trys1: 0,
    flippedCards: [],
    isComparing: false,
    startTime: null,
    timerInterval: null
};



function initialVals() {  // valores inciais quando se da load a pagina
    game.pontos1 = 0;
    game.trys1 = 0;
    game.startTime = '00:00';
    document.getElementById('pontos1').textContent = game.pontos1;
    document.getElementById('trys1').textContent = game.trys1;
    document.getElementById('tempo1').textContent = game.startTime;
}

function shuffleArray(array) {   //shuffle nas cartas
    // Iterate from the last element down to the second element
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random integer between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}


function createCard(id, backImage,frontImage) {  //cria as cartas e da um id a cada carta
    const container = document.createElement('div');
    container.classList.add('jogo-carta-container');   //jogo-carta-container
    const card = document.createElement('div');
    card.classList.add('container-card'); //container-card
    card.id = id;

    const front = document.createElement('div');
    front.classList.add('cards-front');  //card-front
    const frontImg = document.createElement('img');
    frontImg.src = frontImage;
    front.appendChild(frontImg);

    const back = document.createElement('div');
    back.classList.add('cards-back');  //card-back
    const backImg = document.createElement('img');
    backImg.src = backImage;
    back.appendChild(backImg);

    card.appendChild(front);
    card.appendChild(back);

    container.appendChild(card);

    container.addEventListener('click', function(event) {flipCard(card)});  //está aqui para ser atribuido a cada carta

    return container;
}

function addCards(backImages,frontImages) { // adiciona as cartas ao baralho
    const shuffledBack = shuffleArray(backImages)
    for (let i = 0; i < 20; i++) {
        let id = i + 1;
        let backImage =shuffledBack[i];
        let frontImage = frontImages[i];
        let card = createCard(id, backImage,frontImage);
        cardContainer.appendChild(card);
    }}

function flipCard(card) {

    if (card.classList.contains('flipped') || game.isComparing || !(game.started)) {  //se tiver a class flipped ou estiverem a ser comparadas 2 cartas n faz nada
        return; 
    }

    card.style.transform = "rotateY(180deg)"; //se nao, roda e adiciona a classe flip
    card.classList.add('flipped');

    game.flippedCards.push(card);

    if (game.flippedCards.length === 2) {
        game.isComparing = true;      // 2 cartas a serem comparadas, impede de se selecionar 3 ao mm tempo
        compareFlippedCards(game.flippedCards[0],game.flippedCards[1]);
    }

    function compareFlippedCards(card1,card2) { // verifica se as cartas sao iguais

        if (card1.querySelector('.cards-back img').src === card2.querySelector('.cards-back img').src) {   //card-back
            setTimeout(() => {
                card1.parentElement.style.visibility = "hidden"; //se forem, desparecem
                card2.parentElement.style.visibility = "hidden";
            }, 2000);
                game.pontos1 = game.pontos1 + 1;
                document.getElementById('pontos1').textContent = game.pontos1;
                document.getElementById('pontos1').classList.add('grow-shrink-color');  //animação quando + 1 ponto (adiciona classe)
                setTimeout(() => {
                    document.getElementById('pontos1').classList.remove('grow-shrink-color');
                }, 500);
                game.trys1 = game.trys1 + 1;
                document.getElementById('trys1').textContent = game.trys1;
    
                game.flippedCards = [];
                game.isComparing = false;

        } 
        else {  // se nao forem iguais
            game.trys1 = game.trys1 + 1;
            document.getElementById('trys1').textContent = game.trys1;
            setTimeout(function() {flipCardsBack(card1,card2)},1500); //cartas viram outra vez pra baixo
            
        }
    }
}

function flipCardsBack(card1, card2) {  //vira as cartas pra baixo
    card1.style.transform = "rotateY(0deg)";
    card1.classList.remove('flipped');
    card2.style.transform = "rotateY(0deg)";
    card2.classList.remove('flipped');
    game.flippedCards = [];
    game.isComparing = false;
}

function storeNumber() { //guarda o numero inserido no input
    let numberInput = document.getElementById('numb').value;
    let carta = document.getElementById(numberInput);
    if (carta) {
        flipCard(carta)  //se for valido, chama a flipCard
      }


}

function start() {
    if (game.started) return;
    game.started = true;
    startImage.classList.remove('start_animation');
    //startImage.style.display = 'none';
    game.startTime = Date.now();
    game.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let now = Date.now();
    let elapsedTime = Math.floor((now - game.startTime) / 1000);

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');

    tempo.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function stopTimer() {
    clearInterval(game.timerInterval);
}


function eventsListeners(){
    okButton.addEventListener('click',storeNumber);
    startImage.addEventListener('click',start);
}

function mainFunction(){

    eventsListeners();
    initialVals();
    addCards(backImages1,frontImages1);


}


window.onload = mainFunction