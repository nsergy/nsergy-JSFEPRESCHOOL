console.log ('68.5 баллов за самопроверку');

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
