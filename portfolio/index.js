console.log ('Баллов за самопроверку: 80');
console.log('Не выполненные/не засчитанные пункты: сложные эффекты для кнопок при наведении и/или клике');
console.log('Все оставшиеся пункты выполнены');

import i18Obj from './translate.js';
let lang = 'en'; 
let theme = 'toNight';

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
  }
    
  if(localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    toggleStartThm(theme);
  } 
  
  if (document.querySelector('.thmActive').dataset.darklight === localStorage.getItem('theme')){
    document.querySelectorAll('[data-darkLight]').forEach(element => {
    element.classList.toggle('thmActive');
  })} 

  if (document.querySelector('.thmActive').dataset.darklight === 'toNight'){
  document.body.style.background = 'white';}

  if (document.querySelector('.active-lang').dataset.lang !== localStorage.getItem('lang')){
    document.querySelectorAll('.nav-lang-link').forEach(element => {
    element.classList.toggle('active-lang');
  })}    
}
window.addEventListener('load', getLocalStorage);


const hamburger = document.querySelector('.hamburger');

function toggleMenu() {
  hamburger.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);


const btnSwitch = document.querySelectorAll('.btn-switch');
const portfolioImages = document.querySelectorAll('.portfolio-item');

function toggleBtn(event) {  
  btnSwitch.forEach(itemBtn => {itemBtn.classList.remove('active'); });  
  event.target.classList.add('active'); 
  portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
}

btnSwitch.forEach((item) => {item.addEventListener('click', toggleBtn)});


const langSwitch = document.querySelector('.nav-lang-sw');

function toggleLang(event) {
  document.querySelectorAll('.nav-lang-link').forEach(itemLang => {itemLang.classList.remove('active-lang'); });
  event.target.classList.add('active-lang');
  getTranslate(event.target.dataset.lang);
  localStorage.setItem('lang', event.target.dataset.lang);
}

langSwitch.addEventListener('click', toggleLang);

function getTranslate(lang) {
  const langValue = document.querySelectorAll('[data-i18n]');
  langValue.forEach((value) => {
    value.textContent = i18Obj[lang][value.dataset.i18n]; 
    if (value.placeholder) {
      value.placeholder = i18Obj[lang][value.dataset.i18n];
      value.placeholder = i18Obj[lang][value.dataset.i18n];
      value.textContent = i18Obj[lang][value.dataset.i18n];
    }  
  });
}

const thmSwitch = document.querySelectorAll('[data-darkLight]');

function toggleThm (elem) {
  thmSwitch.forEach(element => {
    element.classList.toggle('thmActive');
  })
  
  if (elem.target.dataset.darklight === 'toDay') {
    switchDay();    
    localStorage.setItem('theme','toDay');
    document.body.style.background = 'white';
  }
  else {
    switchNight ();
    localStorage.setItem('theme', 'toNight');
    document.body.style.background = 'black';
  }  
}

function toggleStartThm (theme) {
  if (theme === 'toDay') {
    switchDay();
  }
  else {
    switchNight ();
  }  
}

thmSwitch.forEach(item => {item.addEventListener('click', toggleThm);})

function switchDay () {
  document.querySelectorAll('.theme').forEach(element => {
    element.classList.add('ligthTheme');
  })
}

function switchNight () {
  document.querySelectorAll('.theme').forEach(element => {
    element.classList.remove('ligthTheme');
  })
}