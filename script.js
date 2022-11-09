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

const fetchGenreName = async (genreId) => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  const data = await res.json();
  const genre = data.genres.find((genre) => genre.id === genreId);
  return genre.name;
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {

  movies.map(async (movie) => {
    const genreName = movie.genre_ids.map(async (genreId) => {
      return await fetchGenreName(genreId);
    });
    const genreNames = await Promise.all(genreName);

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
        alt="${movie.title} poster" width="780" height="439">
      <h3 class="movie-title my-2 text-lg font-bold">
        ${movie.title}
      </h3>
      <p class="genre-names text-sm">
        Genres: ${genreNames.join(", ")}
      </p>
      <p class="movie-rating text-sm pb-4">
        Average vote: ${movie.vote_average}
      </p>
      <p class="description hidden absolute bottom-0 p-4 text-sm tracking-wide
          text-center bg-neutral-200 dark:bg-neutral-700 animate-fade-in-down">
        ${movie.overview}
      </p>
      `;
    movieContainer.addEventListener("click", () => {
      movieDetails(movie);
    });

    movieContainer.addEventListener("mouseover", () => {
      const description = movieContainer.querySelector(".description");
      description.classList.remove("hidden");
    });

    movieContainer.addEventListener("mouseout", () => {
      const description = movieContainer.querySelector(".description");
      description.classList.add("hidden");
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
