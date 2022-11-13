'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async() => {
    const movies = await fetchMovies();
    // playCard();

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
    // console.log(res.json());
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
        const movieDiv = document.getElementById("nowPlaying");
        const divCard = document.createElement("div");
        divCard.className = "container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center";
        divCard.style.backgroundImage = `url(${BACKDROP_BASE_URL+movie.backdrop_path})`;

        divCard.innerHTML = `
            <div class="triangle-right  z-50  absolute"></div>
            <div id="triangle-topright" class="ml-1.5 z-50  absolute">   
            </div>
            <div class="overlay">
                <div class="movieheader-text mr-40 text-xl">${movie.title}</div>
                <p class="moviegener-style text-lg text-white pt-64 ml-5 ">${movieGenre(movie)}</p>
                <div class="star-icon flex pt-5 pb-5 ml-5 text-white text-sm">${getRating(movie)}</div>
            </div>
        `;
        movieDiv.appendChild(divCard);

        // movieDiv.addEventListener("click", () => {
        //     movieDetails(movie);
        // });
        // CONTAINER.appendChild(movieDiv);
    });
};

function getRating(movie) {
    let rating = "";
    for (let i = 0; i < movie.vote_average; i++) {
        rating += `<i class="fas fa-star"></i>`;
    }
    return rating;
}

function movieGenre(movie) {
    let genre = "";
    for (let i = 0; i < movie.genre_ids.length; i++) {
        if (movie.genre_ids[i] === 28) {
            genre += "Action ";
        } else if (movie.genre_ids[i] === 12) {
            genre += "Adventure ";
        } else if (movie.genre_ids[i] === 16) {
            genre += "Animation ";
        } else if (movie.genre_ids[i] === 35) {
            genre += "Comedy ";
        } else if (movie.genre_ids[i] === 80) {
            genre += "Crime ";
        } else if (movie.genre_ids[i] === 99) {
            genre += "Documentary ";
        } else if (movie.genre_ids[i] === 18) {
            genre += "Drama ";
        } else if (movie.genre_ids[i] === 10751) {
            genre += "Family ";
        } else if (movie.genre_ids[i] === 14) {
            genre += "Fantasy ";
        } else if (movie.genre_ids[i] === 36) {
            genre += "History ";
        } else if (movie.genre_ids[i] === 27) {
            genre += "Horror ";
        } else if (movie.genre_ids[i] === 10402) {
            genre += "Music ";
        } else if (movie.genre_ids[i] === 9648) {
            genre += "Mystery ";
        } else if (movie.genre_ids[i] === 10749) {
            genre += "Romance ";
        } else if (movie.genre_ids[i] === 878) {
            genre += "Science Fiction ";
        } else if (movie.genre_ids[i] === 10770) {
            genre += "TV Movie ";
        } else if (movie.genre_ids[i] === 53) {
            genre += "Thriller ";
        } else if (movie.genre_ids[i] === 10752) {
            genre += "War ";
        } else if (movie.genre_ids[i] === 37) {
            genre += "Western ";
        }
    }
    return genre;
}

// You'll need to play with this function in order to add features and enhance the style.
// const renderMovie = (movie) => {
//     CONTAINER.innerHTML = `
//     <div class="row">
//         <div class="col-md-4">
//              <img id="movie-backdrop" src=${
//                BACKDROP_BASE_URL + movie.backdrop_path
//              }>
//         </div>
//         <div class="col-md-8">
//             <h2 id="movie-title">${movie.title}</h2>
//             <p id="movie-release-date"><b>Release Date:</b> ${
//               movie.release_date
//             }</p>
//             <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
//             <h3>Overview:</h3>
//             <p id="movie-overview">${movie.overview}</p>
//         </div>
//         </div>
//             <h3>Actors:</h3>
//             <ul id="actors" class="list-unstyled"></ul>
//     </div>`;
// };





document.addEventListener("DOMContentLoaded", autorun);