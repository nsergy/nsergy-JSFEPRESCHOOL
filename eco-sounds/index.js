console.log('js30#1.1-eco-sounds');

let isPlay = false;
let sound = 'forest';
const audio = new Audio();


window.addEventListener('load', pushLocalStorage);

function pushLocalStorage () {
    localStorage.setItem('isPlay', isPlay);
    localStorage.setItem('sound', 'forest');
    audio.src = `./assets/audio/${localStorage.getItem('sound')}.mp3`;    
}

const singer = document.querySelectorAll('[data-item]');
singer.forEach(item => {item.addEventListener('click', toggleSinger)});

function toggleSinger(element) {
    singer.forEach(activeSwitch => {activeSwitch.classList.remove('active')});
    element.target.classList.add('active');
    localStorage.setItem('sound', element.target.dataset.item);
    audio.src = `./assets/audio/${localStorage.getItem('sound')}.mp3`;
    audio.currentTime = 0;
    audio.pause();
    document.getElementById('main').style.backgroundImage = `url('./assets/img/${localStorage.getItem('sound')}.jpg')`;
    togglePlayer();
}

const btnPlayStop = document.querySelector('.player-btn');
btnPlayStop.addEventListener('click', togglePlayer);

function togglePlayer() {
    if (!audio.paused) {
        localStorage.setItem('isPlay', false);
        audio.pause();
        btnPlayStop.src = "./assets/svg/pause.svg";
    } 
    else {
        audio.play();
        btnPlayStop.src = "./assets/svg/play.svg";
        localStorage.setItem('isPlay', true);
    }

}