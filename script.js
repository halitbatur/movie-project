'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const ACTORSLINK = document.querySelector(".Actors-link");
const HOMELINK = document.querySelector(".Home-link");
const MOVIESLINK = document.querySelector(".movies-link");
const dropdown = document.querySelector(".dropdown-content")

//fetching movies

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  console.log(movies.results)
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

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
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
            <p id="movie-genre"><b>Genre:</b> ${movie.genres[0].name}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};


document.addEventListener("DOMContentLoaded", autorun);

// Fetching Actors

const runActors = async () => {
  const actors = await fetchActors();
  console.log(actors);
  renderActors(actors.results);
};


const constructUrlActor = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

const actorDetails = async (actor) => {
    const actorRes = await fetchActor(actor.id);
    renderActor(actorRes);
  };

const fetchActors = async () => {
  const url = constructUrlActor(`person/popular`);
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
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${
        actor.name
      } poster">
          <h3>${actor.name}</h3>`;
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
          <div class="col-md-8">
              <h2 id="actor-name">${actor.name}</h2>
              </div>
      </div>`;
  };
  
  if(ACTORSLINK){
    ACTORSLINK.addEventListener("click", function (e) {
      e.preventDefault();
      CONTAINER.replaceChildren();
      runActors();
    });
  }

//loading genres

const runGenres = async () => {
  const genres = await fetchGenres();
  console.log(genres.genres);
  renderGenres(genres.genres);
};

const constructUrlGenre = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

const fetchGenres = async () => {
  const url = constructUrlGenre(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};

const renderGenres = (genres) => {
  genres.map((genre) => {
    const genresDiv = document.createElement("a");
    genresDiv.classList.add("genre-link");
    genresDiv.innerHTML = `${genre.name}`;
    dropdown.appendChild(genresDiv);
  });

};

document.addEventListener("DOMContentLoaded", runGenres);

// fetching movies with genres

