console.log ('68.5 баллов за самопроверку');

const hamburger = document.querySelector('.hamburger');

function toggleMenu() {
  hamburger.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);