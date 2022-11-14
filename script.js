'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".containerr");

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
    const movieCredits = await creditDetails(movie.id);
    const relatedMoviesDiv = await relatedMovies(movie.id);
    // console.log(movie.id);

    const renderCreditHtml = renderCredits(movieCredits.cast);
    const relatedMoviesHTML = renderRelatedMovies(relatedMoviesDiv.results);
    renderMovie(movieRes, relatedMoviesHTML, renderCreditHtml);

    // renderRelatedMovies(relatedMoviesDiv.results);
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
    const lastCA = document.querySelector("#lastCard");

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

        divCard.addEventListener("click", () => {
            movieDetails(movie);
            lastCA.remove();
        });
        CONTAINER.appendChild(movieDiv);
    });
};

const creditDetails = async(movieId) => {
    const url = constructUrl(`movie/${movieId}/credits`);
    const res = await fetch(url);
    return res.json();
}
const relatedMovies = async(movie) => {
    const url = constructUrl(`movie/${movie}/similar`);
    const res = await fetch(url);
    return res.json();
}

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
const renderMovie = (movie, relatedMoviesHTML, renderCreditHtml) => {
    // console.log(movie);
    CONTAINER.innerHTML = `
     <div  class="bg-black w-full   absolute  ">
        <div class="flex mt-16 ml-10">
            <div class="mainmovie-div bg-gray-300 bg-no-repeat bg-cover bg-center "  style="background-Image: url(${BACKDROP_BASE_URL+movie.backdrop_path})">
                <div class="movie-triangle1 z-50  absolute"></div>
                <div class="movie-triangle2 z-50  absolute"></div>
            </div>

            <div class="red-circle w-9 h-9 bg-red-900 ml-36 mt-3 rounded-full "></div>
            <div class="line-1 rounded absolute "></div>

            <div class="mainmovie-div flex flex-col gap-24  bg-black ml-24 ">
                <div class="">
                    <p class="moviesparaghrap  mt-3  text-center text-5xl text-red-900 ">${movie.title}</p>
                </div>
                <div class="">
                    <p class="moviesparaghrap2 font-bold  text-center text-lg text-white ">${movie.overview}</p>
                </div>
                <div class="flex">
                    <p class="moviesparaghrap   text-center text-4xl mt-10 text-red-900 ">Ratings: ${getRating(movie)}</p>
                    <div class="star-icon flex mt-10 ml-5 text-white text-4xl"></div>
                </div>
            </div>

        </div>
        ${renderCreditHtml}

       
       

    ${relatedMoviesHTML}
       
    `;

};

//we need to call this function after the render movie is finished add this to the same div 

const renderCredits = (credits) => {
    return `
     <div class="mt-32">
            <p class="moviesparaghrap text-4xl text-white  ml-10">Movie Team</p>
            <div class="grid grid-cols-3 gap-10 ml-10 mr-10  mt-12">

                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center" style="background-Image: url(${BACKDROP_BASE_URL+credits[0].profile_path})">
                    <div class="triangle-right  z-50  absolute"></div>
                    <div id="triangle-topright" class="ml-1.5 z-50  absolute"></div>

                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl">
                        ${credits[0].name}
                        </div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">populararity : ${populararity(credits)}</p>                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">${credits[0].name}</p>

                    </div>
                     

                </div>


                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center"style="background-Image: url(${BACKDROP_BASE_URL+credits[1].profile_path})">
                    <div id="triangle1-topright" class="ml-96 z-50  absolute"></div>
                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl">
                        ${credits[1].name}
                        </div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">populararity : ${populararity(credits)}</p>
                    </div>
                </div>

                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center" style="background-Image: url(${BACKDROP_BASE_URL+credits[2].profile_path})">
                    <div class="triangle-left z-50  absolute"></div>
                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl">
                        ${credits[2].name}
                        </div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">populararity : ${populararity(credits)}</p>
                    </div>
                </div>


            </div>
        </div>
    `

}

function populararity(credits) {
    let populararity = 0;
    for (let i = 0; i < credits.length; i++) {
        populararity += credits[i].popularity;
        if (i === credits.length - 1) {
            populararity = populararity / credits.length;
            populararity = String(populararity).slice(0, 4);
        }

    }
    return populararity;
}


const renderRelatedMovies = (movie) => {


    // create as js element and then append each card with event listener
    return `
         <div class="mt-32">
                <p class="moviesparaghrap text-4xl text-white  ml-10">Related Movies</p>
                <div class="grid grid-cols-3 gap-10 ml-10 mr-10  mt-12">

                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center"style="background-Image: url(${BACKDROP_BASE_URL+movie[0].backdrop_path})" onClick="movieDetails(movie[0])">
                    <div class="triangle-right  z-50  absolute"></div>
                    <div id="triangle-topright" class="ml-1.5 z-50  absolute"></div>
                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl"></div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">${movie[0].title}</p>
                    </div>
                </div>


                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center" style="background-Image: url(${BACKDROP_BASE_URL+movie[1].backdrop_path})">
                    <div id="triangle1-topright" class="ml-96 z-50  absolute"></div>
                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl"></div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">${movie[1].title}</p>
                    </div>
                </div>

                <div class="container h-96 bg-gray-300 bg-no-repeat bg-cover bg-center" style="background-Image: url(${BACKDROP_BASE_URL+movie[2].backdrop_path})">
                    <div class="triangle-left z-50  absolute"></div>
                    <div class="movieoverlay">
                        <div class="movieheader-text text-4xl"></div>
                        <p class="moviegener-style text-lg text-white mt-64 ml-5  ">${movie[2].title}</p>
                    </div>
                </div>


            </div>
        </div>

    </div>

    `

}



document.addEventListener("DOMContentLoaded", autorun);