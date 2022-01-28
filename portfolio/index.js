console.log ('68.5 баллов за самопроверку');

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