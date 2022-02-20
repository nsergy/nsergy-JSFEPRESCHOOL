console.log('memory-game');

let deck = []; // Массива карт
let levelGame = 0; // Сложность игры
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
    setDeckSize(localStorage.getItem('levelGame'));
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
    setDeckSize(levelGame);
}

function setDeckSize(levelGame) {
    console.log('Выбрана игра на ' + levelGame + ' карточек');  
    getArray();
    console.log(deck);
    shuffleDeck();
    console.log(deck);
    let i = 0;
    while (i < localStorage.getItem('levelGame')) {              
        const face = `<img class="card-face" src="./assets/svg/face/${deck[i]}.svg" alt="image">`;
        const shirt = `<img class="card-shirt" src="./assets/svg/shirt/shirt2.svg" alt="image">`;
        playingField.insertAdjacentHTML('beforeend', `<div class="memory-card">${face}${shirt}</div>`);
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
    //console.log('flip');
    //console.log(event.target.parentNode);
    event.target.parentNode.classList.toggle('flip');
}

cards.forEach(card => {card.addEventListener('click', flipCard)});

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