"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const genreContainer = document.querySelector(".con-genre");
const genre_id = 12;
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies(12);
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// creating the url api link for the get the type of movies like (action , drama , ...so on)
const constructGener = (genreId) => {
  return `${TMDB_BASE_URL}/discover/movie?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (id) => {
  const url = constructGener(id);
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
    movieDiv.innerHTML = " ";
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
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

// render action,comedy,war ... movie type texts in the footer with
//giving them functionaility to it by calling changeGenre function
const renderGenerInFooter = (genres) => {
  console.log(genres);
  genres.genres.map((genre) => {
    console.log(genre.name);
    const liGenre = document.createElement("li");
    liGenre.innerHTML = `${genre.name}`;
    liGenre.addEventListener("click", function () {
      changeGenre(genre.id);
    });
    genreContainer.appendChild(liGenre);
  });
};

// re-render movies in the hoem page
const changeGenre = async (id) => {
  const genreRes = await fetchMovies(id);
  CONTAINER.innerHTML = " ";
  renderMovies(genreRes.results);
};

const fetchGener = async (gener) => {
  const url = constructUrl(gener);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  renderGenerInFooter(data);
};

fetchGener("genre/movie/list");

document.addEventListener("DOMContentLoaded", autorun);
