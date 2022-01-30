console.log ('Баллов за самопроверку: не посчитано');

import i18Obj from './translate.js';

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


const langSwitch = document.querySelectorAll('.nav-lang-link');

function toggleLang(event) {
  langSwitch.forEach(itemLang => {itemLang.classList.remove('active-lang'); });
  event.target.classList.add('active-lang');
  getTranslate(event.target.dataset.lang);
}

langSwitch.forEach((item) => {item.addEventListener('click', toggleLang); });

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
  console.log(`Включаем тему ${elem.target.dataset.darklight}`)
  if (elem.target.dataset.darklight === 'toDay') {
    switchDay();
    console.log('Включена Светлая тема');
  }
  else {
    console.log('Включена Темная тема')
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