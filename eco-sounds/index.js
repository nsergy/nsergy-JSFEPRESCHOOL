console.log('js30#1.1-eco-sounds');

let isPlay = false;
let sound = 'forest';
const audio = new Audio();

const singer = document.querySelectorAll('[data-item]');

singer.forEach(item => {item.addEventListener('click', toggleSinger)});

function toggleSinger(element) {
    singer.forEach(activeSwitch => {activeSwitch.classList.remove('active')});
    element.target.classList.add('active');
    localStorage.setItem('sound', element.target.dataset.item);
    audio.src = `./assets/audio/${localStorage.getItem('sound')}.mp3`;
    audio.currentTime = 0;
    audio.play();
    btnPlayStop.src = "./assets/svg/play.svg";
    localStorage.setItem('isPlay', true);
    document.getElementById('main').style.backgroundImage = `url('./assets/img/${localStorage.getItem('sound')}.jpg')`;
}

const btnPlayStop = document.querySelector('.player-btn');

btnPlayStop.addEventListener('click', togglePlayer);

function togglePlayer() {
    if (localStorage.getItem('isPlay') === 'true') {
        localStorage.setItem('isPlay', false);
        audio.pause();
        btnPlayStop.src = "./assets/svg/pause.svg";
    }
    else {
        localStorage.setItem('isPlay', true);
        audio.play();
        btnPlayStop.src = "./assets/svg/play.svg";
    }
}