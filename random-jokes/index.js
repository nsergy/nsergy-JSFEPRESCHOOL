console.log("random-jokes");

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
    }
    else {
        localStorage.setItem('lang', 'en');
    }

    if (localStorage.getItem('lang') === 'ru') {
        document.querySelector('.button').textContent = 'Нажми меня';
      }
      else {document.querySelector('.button').textContent = 'Push me';}

    lang.forEach(element => {element.classList.remove('active-lang');});
    lang.forEach(element => {
        if (element.dataset.lang === localStorage.getItem('lang')) {
            element.classList.add('active-lang');
        }
    });

    getQuotes();    
}

window.addEventListener('load', getLocalStorage);

async function getQuotes() {  
    if (localStorage.getItem('lang') === 'en') {
        const res = await fetch('https://api.icndb.com/jokes/random');  //С сайта
        const data = await res.json();
        outputJoke(data.value.joke);        
    }

    if (localStorage.getItem('lang') === 'ru') {
        const res = await fetch('./assets/quotes_ru.json');   //Из файла
        const data = await res.json(); 
        const index = Math.floor(Math.random() * data.length) 
        outputJoke(data[index].text + ` (${data[index].author})`);
    }

    document.querySelector('.image').style.transform = `rotatez(${Math.floor(Math.random() * 90) }deg)`;
    document.querySelector('.main').style.backgroundColor = `#${(Math.floor(Math.random() * 16777215)).toString(16)}`;
  }

  document.querySelector('.button').addEventListener('click', getQuotes);
  
  function outputJoke(data) {
    document.querySelector('.jokes').textContent = data;
  }

  const lang = document.querySelectorAll('.lang-link');

  function toggleLang(event) {
      if (event.target.dataset.lang === localStorage.getItem('lang')) {return;}
      lang.forEach(element => {element.classList.remove('active-lang');});
      event.target.classList.add('active-lang');
      localStorage.setItem('lang', event.target.dataset.lang);

      if (localStorage.getItem('lang') === 'ru') {
        document.querySelector('.button').textContent = 'Нажми меня';
      }
      else {document.querySelector('.button').textContent = 'Push me';}
      
      getQuotes();
  }

  lang.forEach(item => {item.addEventListener('click', toggleLang)});