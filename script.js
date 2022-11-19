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
const geners=async()=>{
  const gener= constructUrl(`genre/movie/list`);
  const a=await fetch(gener);
  return a.json();
}

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
const renderMovies = async (movies) => {
  const genre=await geners();
  const objectGenre={ 28: 'Action',
   12: 'Adventure',
   16: 'Animation',
   35: 'Comedy',
   80: 'Crime',
   99: 'Documentary',
   18: 'Drama',
   10751: 'Family',
   14: 'Fantasy',
   36:  'History',
   27:  'Horror',
   10402: 'Music',
   9648 : 'Mystery',
   10749: 'Romance',
   878 : 'Science Fiction',
   10770 : 'TV Movie',
   53 :'Thriller',
   10752 : 'War',
   37: 'Western'}
// console.log(objectGenre.name)
  // Here you should fetch all the generes
  // save them inside an object which have the key as id value as the genre name
  // genre { 15:"action", 14:" comedy"
  // inside 

  movies.map((movie) => {
    // loop over the genres and use each one to access the object adn retireve the name of the gnere
    // 14
    // genres['movie.genre']
    // inside the map loop over the genre ids and access the object to retreive the value aka the name of the genre
   const movieGenre=movie.genre_ids.map(id => objectGenre[id]).join(" ")
   
    const movieDiv = document.createElement("div");
    const discriptionDiv = document.createElement("div");
    movieDiv.setAttribute("class","bg-grey shadow-white shadow-[0px_0px_5px_0.5px_rgba(0,0,0,0.3)] border rounded-tl-2xl rounded-br-2xl  text-amber-50 text-xl relative")
    discriptionDiv.setAttribute("class",
    "discription absolute top-0 w-full h-full rounded-tl-2xl rounded-br-2xl  bg-black bg-opacity-70 text-white font-sans text-md p-2 opacity-0   hover:opacity-100  ")
    
    movieDiv.innerHTML = `
        <img class="rounded-tl-2xl " src="${BACKDROP_BASE_URL + movie.backdrop_path}" style="block" alt="${
      movie.title
    } poster">
    <div class="flex justify-between p-2">
   
    <h3 class="inline-flex">${movie.title}</h3>
   
    <div class="flex bg-amber-600 rounded-xl p-2">
    <img class="w-6 h-6" src="star.png">
    <h3 class="px-2"> ${movie.vote_average}</h3>
    </div>

    </div>
    <h3 class=" p-2 rounded-br-2xl bg-black ">${movieGenre}</h3>

        `;  
      
      discriptionDiv.innerHTML=`<p>${movie.overview}</p> 
      `
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
    movieDiv.appendChild(discriptionDiv)
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

document.addEventListener("DOMContentLoaded", autorun);
