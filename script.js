'use strict';



let movieGenres = document.querySelector("#movieGenres");
let openMenu = document.getElementById("mega-menu-full");
function toggleIt() {
  return movieGenres.classList.toggle("hidden");

}
  function toggleItNavbar(){

    return openMenu.classList.toggle("hidden");
  }



//                     -----------------------

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
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
  const credits = await fetchCredits(movie.id);
  // console.log(credits);
  const cast = credits.cast.slice(0,5).map((actor) => { 
  if (actor.profile_path) {
  return `<li>${actor.name}</li> 
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="">` 
} else return `<li>${actor.name}</li>`
}).join('')
  console.log(cast)
  renderMovie({details: movieRes, cast: cast});
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


const fetchCredits = async (movieId) => {
  const credits = constructUrl(`/movie/${movieId}/credits`);
  const res = await fetch(credits);
  return res.json();
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
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
const renderMovie = (movieDetails) => {
 const {details,cast} = movieDetails
 const{poster_path,title,release_date,runtime,overview} = details
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop class="cursor-pointer bg-red" src=${
               BACKDROP_BASE_URL + poster_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
            release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${overview}</p>
        </div>
        </div>
            <h3>Actors:</h3> 
            <ul id="actors" class="list-unstyled">${cast}</ul>
    </div>`;
};

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");


document.addEventListener("DOMContentLoaded", autorun);

