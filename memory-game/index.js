console.log('memory-game');

let deck = []; // Массива карт
let levelGame = 0; // Сложность игры
let totalSteps = 0; // Количество шагов за игру
let flippedCards = 0; // Количество перевернутых карт
let card1 = 0;
let card2 = 0;
let playingField = document.getElementById('playing-field');
let memoryCard = document.getElementById('memory-card');
let cardFace = document.getElementById('card-face');
let cardShirt = document.getElementById('card-shirt');

window.addEventListener('load', restoreSetting);

function restoreSetting () {
    if (localStorage.getItem('levelGame')) {
        resetActiveItem(); 
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.level === localStorage.getItem('levelGame')){
                item.classList.add('active');
            }
        })
    }
    else {
        localStorage.setItem('levelGame', 12);
    }
    newGame();
    
}

function newGame () {
    setDeckSize(localStorage.getItem('levelGame'));
    localStorage.setItem('totalSteps', 0);
    localStorage.setItem('flippedCards', 0);
    flippedCards = 0;
    card1 = 0;
    card2 = 0;
}

function resetActiveItem() {
    document.querySelectorAll('.nav-item').forEach(activeSwitch => {activeSwitch.classList.remove('active')});
}

document.querySelectorAll('.nav-item').forEach(item => {item.addEventListener('click', getLevelGame)})

function getLevelGame (element) {
    resetActiveItem();
    element.target.classList.add('active');
    clearDesk();
    levelGame = element.target.dataset.level;
    localStorage.setItem('levelGame', levelGame);
    newGame();
}

function setDeckSize(levelGame) {
    //console.log('Выбрана игра на ' + levelGame + ' карточек');  
    if (levelGame < 18) {        
        playingField.style.width = '500px';
    }
    else {playingField.style.width = '600px';} 
    getArray();
    //console.log(deck);
    shuffleDeck();
    //console.log(deck);
    let i = 0;
    while (i < localStorage.getItem('levelGame')) {              
        const face = `<img class="card-face" src="./assets/svg/face/${deck[i]}.svg" alt="image">`;
        const shirt = `<img class="card-shirt" src="./assets/svg/shirt/shirt2.svg" alt="image">`;
        playingField.insertAdjacentHTML('beforeend', `<div class="memory-card" id="memory-card" data-block="0" data-item="${deck[i]}">${face}${shirt}</div>`);
        i++;
    }
    
}

function clearDesk() {
    let element = document.getElementById('playing-field');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const cards = document.querySelectorAll('.playing-field');

function flipCard(event) {
    //console.log(event.target);
    if (!event.target.matches('img')) return;
    //console.log(event.target.parentNode);

    if (flippedCards >= 2) {
        unFlip();
        return;
    }
        
    if (!event.target.parentNode.classList.contains('flip')){
        event.target.parentNode.classList.add('flip');
        //console.log('перевернули карту');
        
        localStorage.setItem('totalSteps', (localStorage.getItem('totalSteps') * 1) + 1);
        if (card1 === 0) {
            card1 = event.target.parentNode.dataset.item;
        }
        else if (card2 === 0) {
            card2 = event.target.parentNode.dataset.item; 
            checkEndGame();      
        };
    };    
    
    checkFlippedCards();
    //console.log(flippedCards + ' перевернутых не заблокированных');
}

cards.forEach(card => {card.addEventListener('click', flipCard)});

function checkFlippedCards() {
    flippedCards = 0;
    document.querySelectorAll('.flip').forEach(flipped => {
        if (flipped.dataset.block === '0') {
        flippedCards = flippedCards + 1;
        //console.log(flippedCards);
        }
    });
    return(flippedCards);
}

function checkEndGame () {
    if (card1 === card2) {
        localStorage.setItem('flippedCards', 0);
        document.querySelectorAll('.memory-card').forEach(element => {
            if (element.classList.contains('flip')) {
                element.dataset.block = '1';
                localStorage.setItem('flippedCards', localStorage.getItem('flippedCards')*1 + 1);
            }
        })
        if (localStorage.getItem('flippedCards') === localStorage.getItem('levelGame')) {
            alert('Вы выиграли затратив ' + localStorage.getItem('totalSteps') + ' шагов');    
        }
    }
}

function unFlip() {
    document.querySelectorAll('.memory-card').forEach(element => {
        if (element.dataset.block === '0') {
            element.classList.remove('flip');
        }
    });   
    flippedCards = 0;
    card1 = 0;
    card2 = 0;
}

function getArray () {
    deck = [];
    for (let j = 0; j < 2; j++) {
        for (let i = localStorage.getItem('levelGame') / 2; i > 0; i--) {
            deck.unshift(i);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}