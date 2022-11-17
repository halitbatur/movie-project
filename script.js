'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");


function show_hide_genre() {  
  let click = document.querySelector("#genreList");  
  if(click.style.display ==="none") {  
     click.style.display ="block";  
  } else {  
     click.style.display ="none";  
  }   
}  
function show_hide_filter() {  
  let click = document.querySelector("#filterList");  
  if(click.style.display ==="none") {  
     click.style.display ="block";  
  } else {  
     click.style.display ="none";  
  }   
  let alink = document.querySelector(".genre-link");
  alink.addEventListener("click", async ()=> {
    // click.style.display="none";  //?
  })
}  

//start button collap
// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }

//end button collap


// Don't touch this function please
const autorun = async (filterType) => {
  const movies = await fetchMovies(filterType);
  console.log("Movies results ids",movies.results.map(e=> e.id));
  console.log("Movies results",movies.results.map(e=> e.original_title));
  CONTAINER.innerHTML = "";
  renderGenres();
  renderMovies(movies.results);
};
const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  console.log("URL",url);
  const res = await fetch(url);
  console.log("response",res);
  return res.json(); 
};
const renderGenres = async() =>{
  let genreList = await fetchGenres();
  let contentGenre = document.querySelector(".content-genre");  
  console.log("genre list rendering test",genreList.genres.map(e=>e.name));
  genreList.genres.map(genre => {    
    const aLink = document.createElement("a");
    aLink.style.cursor = "pointer";
    aLink.innerText = genre.name;
    contentGenre.append(aLink);
    aLink.addEventListener("click", async ()=> {
      contentGenre.style.display="none";
        console.log(genre.id);
        let res = await  moviesGenreList(genre.id);
        console.log(res.results.map(e=>e.genre_ids));
        
        renderMovies(res.results);
        // console.log(res);

    });    
  })
  
};
const moviesGenreList = async(genreId)=>{
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=542003918769df50083a13c415bbc602&with_genres=${genreId}
  `;
  const moviesList = await fetch(url);
  console.log(moviesList);
  return moviesList.json();
};


// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (filterType) => {
  const url = constructUrl(`movie/${filterType}`);
  console.log(url)
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = '';
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img class="h-20 w-40" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie,similar) => {
  CONTAINER.innerHTML = `
    <div class="movie-poster">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class = "movie-info">
            <h3 id="movie-title">${movie.title}</h3>
            <ul class = "movie-misc-info">
            <li class="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</li>
            <li class ="Movie-rate"><b>Ratings:</b> ${
              movie.vote_average
            }</li>
            <li class="Movie-genre"><b>Genre:</b> ${
              movie.genre_ids
            }</li>
            </ul>
            
            <p class ="Movie-lang"><b>Language:</b> ${
              movie.original_language
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <p id="movie-adult"><b>Adult:</b> ${movie.adult}</p>
            <p id="movie-overview">${movie.overview}</p>
        </div>
    `;
    runTrailer(movie)
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=542003918769df50083a13c415bbc602", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  //trailer part
  const fetchTrailer = async (movie) => {
    const url = constructUrl(`movie/${movie.id}/videos`);
    const res = await fetch(url);
    return res.json();
  }
  
  const runTrailer = async (movie) => {
    const relMovies = await fetchTrailer(movie);
    renderTrailer(relMovies.results[0].key);
  };
  
  const renderTrailer = (key) =>{
    const trailerDiv = document.createElement("div");
    trailerDiv.classList.add("trailer-container")
  
    trailerDiv.innerHTML = 
    `<h3 class="trailer-title">Watch the Trailer<h3><br>
    <iframe class="iframe-trailer" src="https://www.youtube.com/embed/${key}"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`
  
    CONTAINER.appendChild(trailerDiv);
  
  }

  

document.addEventListener("DOMContentLoaded", autorun("now_playing"));
