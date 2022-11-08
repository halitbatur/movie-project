'use strict';

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
    const movieContainer = document.createElement("div");
    movieContainer.classList.add(
      "movie", "flex", "flex-col", "justify-center", "items-center",
      "max-w-xs", "rounded", "overflow-hidden", "bg-neutral-200",
      "cursor-pointer", "transition", "duration-500", "ease-in-out", "transform",
      "dark:bg-neutral-700", "dark:hover:bg-neutral-600",
      "hover:shadow-2xl", "hover:bg-neutral-400", "hover:-translate-y-1", "hover:scale-110",

    );
    movieContainer.innerHTML = `
      <img src="${BACKDROP_BASE_URL + movie.backdrop_path}"
        alt="${movie.title} poster">
      <h3 class="movie-title my-2 text-lg font-bold text-opacity-75
        hover:text-opacity-100 transition duration-500 ease-in-out cursor-pointer">
        ${movie.title}
      </h3>
      `;
    movieContainer.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieContainer);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div>
      <div>
        <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
      </div>
      <div>
        <h2 id="movie-title">${movie.title}</h2>
        <p id="movie-release-date"><b>Release Date:</b>${movie.release_date}</p>
        <p id="movie-runtime"><b>Runtime:</b>${movie.runtime} Minutes</p>
        <h3>Overview:</h3>
        <p id="movie-overview">${movie.overview}</p>
      </div>
    </div>
    `;
};

document.addEventListener("DOMContentLoaded", autorun);
