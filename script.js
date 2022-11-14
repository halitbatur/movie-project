'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// let genreList;

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
  // use promise.all to fetch all needed urls here?
  const movieRes = await fetchMovie(movie.id);

  renderMovie(movieRes);
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

const fetchSimilar = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};

const fetchActors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};



const fetchGenre = async () => {
  const url = constructUrl(`/genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};

const movieGenres = async (genId) => {
  let genreList = await fetchGenre();

  // genId is array of genre ids from each specific movie
  // console.log('gen list', genreList);


  let myList = [];

  for(let i = 0; i < genId.length; i++) {

    for(let j = 0; j < genreList.genres.length; j++) {

      if(genreList.genres[j].id === genId[i]) {
        myList.push(genreList.genres[j].name);
      }
    }
  }

  console.log('my list', myList);
  return myList;
}

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {

  movies.map(async (movie, index) => {

    let myGenreList = await movieGenres(movie.genre_ids);
    myGenreList = myGenreList.toString();


    const movieDiv = document.createElement("div");
    let descriptionDiv = document.createElement("div");

    movieDiv.setAttribute('class', `movieWrapper`);
    movieDiv.innerHTML = `
        <div class="movieContainer">
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" class="movieImage">
          <p class="movieDescription">${movie.overview}</p>
        </div>
        <h3>${movie.title}</h3>
        <h3>Rating: ${movie.vote_average}</h3>
        <h3>${myGenreList}</h3>
        `;


    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    // append divs here
    CONTAINER.appendChild(movieDiv);
    movieDiv.appendChild(descriptionDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {


  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <h3>language:</h3>
            <p id="movie-language">${movie.original_language}</p>
            <h3>The Production Company:</h3>          
            <ul>${movie.production_companies.map((item)=> {
              return (`
              ${item.name}
              ${`<img src = "${PROFILE_BASE_URL + item.logo_path}"`}
              `
              )
            })}</ul>
            <h3>${movie.vote_average}</h3>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
            <h3>Similar Movies:</h3>
            <div id="similar"></div>
    </div>`;
    

  

    let similarMovies = await fetchSimilar(movie.id);

           
    // only get 5 items
    similarMovies = similarMovies.results.slice(0, 5);
    

    similarMovies.map((movie, index) => {

      const similarDiv = document.createElement("div");
      similarDiv.innerHTML = `
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
        movie.title
      } poster">
          <h3>${movie.title}</h3>`;
       CONTAINER.appendChild(similarDiv);
       similarDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    });
    
};



document.addEventListener("DOMContentLoaded", autorun);











