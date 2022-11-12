'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async() => {
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
const movieDetails = async(movie) => {
    const movieRes = await fetchMovie(movie.id);

    renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async() => {
    const url = constructUrl(`movie/now_playing`);
    const res = await fetch(url);
    console.log(res.json());
    return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async(movieId) => {
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
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

function addPlaynow() {
    fetch("https://api.themoviedb.org/3/movie/725201/recommendations?api_key=e3ba83efee8dd4f97c52f27960082fa6&language=en-US&page=1")
        .then(response => response.json())
        .then(data => {
            console.log(data.results[1].poster_path);
            const recommendation = document.getElementById("recommendation");
            const description = document.createElement("div");
            description.className = "flex flex-col  justify-center absolute";
            // data.results[1].overview;

            recommendation.innerHTML = `
            <div class="w-80 h-96 bg-red-800 opacity-70 absolute ">
            </div>
            <div class="flex flex-col  justify-center absolute">
                <p class="moviesparaghrap w-72 ml-5 mt-7 z-50 text-center text-lg text-white ">"${data.results[0].overview}"</p>
            </div> 
            <img class="object-cover w-80 h-96 "  src="${BACKDROP_BASE_URL+data.results[0].poster_path}" alt="second image">

            `;

            const recommendation2 = document.getElementById("recommendation2");
            recommendation2.innerHTML = `
            <p class="moviesparaghrap  mt-64 ml-5 z-50 text-center text-7xl text-white absolute ">${data.results[0].title}</p>
            <img class="object-cover h-96 " style="width:650px" src="${BACKDROP_BASE_URL+data.results[0].poster_path}" alt="">
            `



        })
        // const playnow = document.querySelector("#playnow");
        // playnow.addEventListener("click", () => {

    // });
}

addPlaynow();

// document.addEventListener("DOMContentLoaded", autorun);