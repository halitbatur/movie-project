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
  const actorRes = await fetchActor(movie.id);
  const movieTrailer = await fetchMovie(movie.id + "/videos");
  const relatedFilms = await fetchRelatedFilms(movie.id);
  renderMovie(movieRes, actorRes, movieTrailer.results, relatedFilms);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

const fetchActor = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


const fetchRelatedFilms = async (id) => {
  const url = constructUrl(`movie/${id}/similar`);
  const res = await fetch(url);
  return res.json();
}

//..........................................style.........................................................

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.style="display: flex; width:30%;  flex-wrap: wrap;" ;
    movieDiv.setAttribute("class", "all-movies");
    movieDiv.innerHTML = `
          <div class="movieList flex flex-col rounded shadow-lg justify-center item-center  my-3 ">
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
      } poster" class="movieImg" >
        <h3 class="text-center text-2xl font-bold my-10 ">${movie.title}</h3>
        </div>
        `;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// rendring the details inside this HTML
const renderMovie = (movie, actors, videos, relatedFilms) => {
  CONTAINER.innerHTML = `
          
          <section>
          <div class="flex flex-col w-full rounded-lg p-10 shadow-2xl mt-20">

          <div class="w-full flex justify-center items-center text-dark text-4xl font-bold my-4">
          <h1 class="text-6xl font-bold text-center font-serif">The Trailer of the Movie</h1> 
          </div>
          <div class="flex justify-center w-full h-96 px-10 py-4" style=";
          height: 27rem;">
          <iframe class="movie-trailler shadow-lg flex movie-trailer w-2/4 justify-center h-full " src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key : videos[0].key}" 
          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen></iframe>
              </div> 
          </div>
          
        
        <div class="flex flex-row justify-center w-full my-32 text-white  shadow-2xl rounded-lg bg-red-600 p-24">
        <div class="w-2/4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path} class="singleMovie h-full border-2 ">
        </div>


        <div class="w-2/4 ml-5">
            <h2 id="movie-title" class="text-3xl font-bold text-center my-2">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
    }</p>
           <p id="movie-release-date"><b>Movie Language</b> ${movie.original_language.toUpperCase()

    }</p>
           <p id="movie-release-date"><b>Vote count:</b> ${movie.vote_count

    }</p>

    
            <p id="movie-runtime"><b>movie rating</b> ${movie.vote_average}</p>
             <p id="movie-runtime"><b>movie production company name and logo</b> ${movie.production_companies[3]
    } </p>
              <p id="movie-runtime"><b>director name:</b> ${movie.runtime} Minutes</p>

           
    
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>

        </div>
       <div class="flex flex-col w-full justify-center item-center my-24 shadow-2xl bg-white text-dark w-full">
       <div>
       <h3 class="text-6xl font-bold text-center font-serif mt-5">Movie's Actors</h3>
       </div>
       <div>
       <ul id="actors" class="flex flex-wrap rounded-lg justify-center item-center space-x-6 my-2 ">
       </ul> 
       </div>
       </div>
       

       <div class="similarMovies flex flex-col w-full justify-center bg-red-600 item-center my-24 shadow-2xl">
       <div class="">
       <h3 class="text-6xl font-bold text-white text-center font-serif mt-5 ">Similar Films</h3>
       <ul id="similarFilms" class="flex flex-wrap shadow-2xl rounded-lg justify-center item-center space-x-6 my-2">
       </ul>
       </div>
       </div>

           
      </div>
   
  </section>
    `;
  renderActors(actors)
  renderSimilarFilms(relatedFilms)
};

//Film's Actors
const renderActors = (actors) => {
  const actorList = document.querySelector("#actors")
  actors.cast.slice(0, 5).map((actor) => {
    const actorDiv = document.createElement("ul");
    actorDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster" style="width:200px" class="actorImg rounded-lg pt-5">
        <li class="text-2xl text-b py-2 font-serif font-bold my-3 text-center">${actor.name}</li>`;
    actorDiv.addEventListener("click", () => { displaySingleActorPage(); });
    actorList.appendChild(actorDiv);
  });
}


//Similar Films 

const renderSimilarFilms = (similarFilms) => {
  const relatedFilmsList = document.querySelector("#similarFilms")
  similarFilms.results.slice(0, 5).map((film) => {
    const filmDiv = document.createElement("ul");
    filmDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + film.poster_path}" alt="${film.title} poster" style="width:300px" class="shadow-2xl rounded-lg mt-5">
        <li class="bg-white text-2xl text-black py-2 font-serif font-bold my-3 text-center">${film.original_title}</li>`;
    filmDiv.addEventListener("click", () => { displaySingleAMoviePage(); });
    relatedFilmsList.appendChild(filmDiv);
  });

}
const displaySingleActorPage = () => {
  CONTAINER.innerHTML = `
      <div class="row">
          <div class="col-md-4">
               <h1>welcome, you are in actor page</h1>
          </div>`;
};

const displaySingleAMoviePage = () => {
  CONTAINER.innerHTML = `
      <div class="row">
          <div class="col-md-4">
               <h1>welcome, you are in Movie page</h1>
          </div>`;
};
document.addEventListener("DOMContentLoaded", autorun);
