'use strict'
const urlApi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// attendre que la page soit chargée
window.addEventListener('load', function() {
    // cacher le contenu et afficher le loader
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';
 
    // masquer le loader après 4 secondes
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        document.querySelector('.load-main').style.display = 'none';
    }, 4000);
 });
 


async function obtenirFilms() {
  let films = [];
  let page = 1;
  while(films.length < 300) {
    const response = await fetch(urlApi + page);
    const data = await response.json();
    const results = data.results;
    console.log(results);
    
    // Ajoute les films à la liste totale
    films = [...films, ...results];
    
    page++;
  }
  
  afficherFilms(films);
}

obtenirFilms();

const mainMovies = document.querySelector("#main-movies")

const afficherFilms = (films)=>{
    films.forEach(element => {
        let box = document.createElement('div')
        box.classList.add('box')
        box.innerHTML = `
        <img src="${IMGPATH + element.poster_path}">
        <div class="overlay">
            <h2>${element.original_title}</h2>
            <span>${element.vote_average}</span>
            <h3>overview</h3>
            <p>
              ${element.overview}
            </p>
        </div>
        `;
        mainMovies.appendChild(box);
    });
}

const btn = document.querySelector("#search");

btn.addEventListener('input', async function(event) {
  event.preventDefault(); // empêche la soumission du formulaire

  const inputValue = event.target.value.trim();

  if (inputValue !== "") {
    const response = await fetch(SEARCHAPI + inputValue);
    const data = await response.json();
    const results = data.results;

    // Effacer les résultats précédents
    mainMovies.innerHTML = "";

    // Afficher les nouveaux résultats
    afficherFilms(results);
  }
  else {
    // Effacer les résultats précédents
    mainMovies.innerHTML = "";

    // Afficher tous les films
    obtenirFilms();
  }
})
