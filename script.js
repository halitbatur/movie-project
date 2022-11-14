'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
  console.log(movies.results)
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
  // console.log(movies)
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("grid-item");
    movieDiv.innerHTML = `
    <img id="image"  src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" />
    <span class="yearOfRelease">${movie.release_date}</span>
    <p class="title">${movie.title}</p>
    <span class="rating">
    <ion-icon name="star" class="star"></ion-icon>
    ${movie.vote_average}/10
    </span>`

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
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path
    }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
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


// filter nav
const fetchFilterMovies = async (typeFilter) => {
  const url = constructUrl(`movie/${typeFilter}`);
  const res = await fetch(url);
  return res.json();
}

const FilterMovies = async (typeFilter) => {
  const movies = await fetchFilterMovies(typeFilter);
  renderMovies(movies.results);
}
const renderFilterMovies = () => {
  const popular = document.querySelector("#popular");
  popular.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("popular")
  })
  const topRated = document.querySelector("#top_rated");
  topRated.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("top_rated")
  })

  const nowPlaying = document.querySelector("#now_playing");
  nowPlaying.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("now_playing")
  })}