console.log("random-jokes");

async function getQuotes() {  
    const res = await fetch('https://api.icndb.com/jokes/random');  //С сайта
    //const res = await fetch('./assets/quotes_ru.json');   //Из файла
    const data = await res.json(); 
    console.log(data);
    console.log(data.value.joke); //С сайта
    //console.log(data[0].text);  //Из файла
    outputJoke(data.value.joke);
  }
  getQuotes();

  
  function outputJoke(data) {
    document.querySelector('.jokes').textContent = data;
  }

  const lang = document.querySelectorAll('.lang-link');

  function toggleLang() {
      console.log('сброс языка???');
      lang.forEach(element => {
          element.classList.remove('active-lang');
      })
  }

  lang.forEach(item => {item.addEventListener('click', toggleLang())});

  document.querySelector('.button').addEventListener('click', getQuotes);



