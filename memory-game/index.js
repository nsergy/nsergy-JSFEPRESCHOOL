console.log('memory-game');

let deck = []; // Массива карт (сложность игры)
let levelGame = 0;

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
    levelGame = element.target.dataset.level;
    localStorage.setItem('levelGame', levelGame);
    setDeckSize(levelGame);
}

function setDeckSize(levelGame) {
    console.log('Выбрана игра на ' + levelGame + ' карточек');
}
