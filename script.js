'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const actorPage = document.querySelector(".actor-page")


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

// This function fetch a list of all movie genres that exist and pushes it into an array
const getGenresList = async (arr) => {
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  arr.push(...data.genres);
};
// Constant that holds all the genres
const genresList = [];
getGenresList(genresList);

// This function takes an array with the movie genres IDs and converts them into genres names then returns them as a string
const genresIdToName = (arr) => {
  const genresNames = [];
  for (let genreID of arr) {
    const { id, name: genres } = genresList.find(
      (value) => value.id === genreID
    );
    genresNames.push(genres);
  }
  return genresNames.join(", ");
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieGenres = genresIdToName(movie.genre_ids);
    console.log(movieGenres);
    const movieDiv = document.createElement("div"); 
    CONTAINER.setAttribute('class', `grid  lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 auto-cols-auto max-w-5xl place-items-center mx-auto py-20 gap-4 cursor-pointer`)
    movieDiv.innerHTML = `
    <div class="mov bg-gray-700  relative overflow-hidden">
        <img class="hover:opacity-[30%] via-gray-300 to-white" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="films">
    <div class="flex pt-2 place-items-center justify-between mx-3 ">
        <div class="font-bold text-base text-white ">${movie.title}</div>
        <div class="vote text-white  bg-black ">${movie.vote_average}</div>
    </div>
    <div class=" ml-3 text-xs text-slate-300 font-bold  pt-1 ">${movieGenres}</div>
      <div class ="overview absolute left-0 right-0 bottom-0 text-black p-4 bg-gradient-to-r from-gray-300  to-white bg-opacity-75 ">
        <div class = "font-bold text-center text-xl pb-2">Overview</div> 
        <div>${movie.overview}</div> 
      </div>
    </div>
        `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
    
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
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
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};
//fetch actors
const actorsAutoRun = async () => {
  const actors = await fetchActors();
  console.log(actors);
  renderActors(actors.results);
};


const actorDetails = async (actor) => {
    const actorRes = await fetchActor(actor.id);
    renderActor(actorRes);
  };

const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};


const fetchActor = async (actorId) => {
    const url = constructUrl(`person/${actorId}`);
    const res = await fetch(url);
    return res.json();
  };


  const renderActors = (actors) => {
    actors.map((actor) => {
      const actorDiv = document.createElement("div");
      actorDiv.innerHTML = `
          <img class ="hover:opacity-[30%] via-gray-300 to-white"src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name}">
          <h2 class= "text-white text-center py-2">${actor.name}</h2>
          `;
      actorDiv.addEventListener("click", () => {
        actorDetails(actor);
      });
      CONTAINER.appendChild(actorDiv);
    });
  };

  const renderActor = (actor) => {
    CONTAINER.innerHTML = `
      <div class="row">
          <div class="col-md-4">
               <img id="actor-backdrop" src=${PROFILE_BASE_URL + actor.profile_path}>
          </div>
          <div class="col-md-8 text-white">
              <h2>${actor.name}</h2>
              </div>
      </div>`;
  };

  if(actorPage){
    actorPage.addEventListener("click", function (e) {
      e.preventDefault();
        CONTAINER.replaceChildren();
        actorsAutoRun();
      });
  }

document.addEventListener("DOMContentLoaded", autorun);
