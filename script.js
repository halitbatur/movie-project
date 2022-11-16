'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".grid");
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
  renderGenres(movies.results)
  console.log(renderGenres())
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
 console.log(a)
  return a.json();
}

const renderGenres=async(movie)=>{
// let gen=await geners();
// const movieRes = await fetchMovie(movie.id);
// console.log(gen.genres.map(e=>e.id))
// console.log(movie.id)
// // gen.genres.map(e=>{

// // }
// // )
}

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  console.log(movieRes.genres.map(d=>{console.log(d.name)}))
  renderMovie(movieRes);
};

const movieGenres = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json()
 // console.log(movieRes.genres.map(d=>{console.log(d.name)}))
};
// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
console.log(fetchMovies())
// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json()
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {

  movies.map((movie) => {
// let genr=[];

//      movieGenres(movie.id).then(data=>data.genres.map(d=>genr.push(d.name)))
// console.log( movieGenres(movie.id).then(data=>data.genres.map(d=>d.name)))

// console.log(genr)
 
    
    const movieDiv = document.createElement("div");
    const discriptionDiv = document.createElement("div");
    movieDiv.setAttribute("class"," shadow-2xl border border-yellow-900 rounded-tl-2xl rounded-br-2xl  text-amber-50 text-xl relative")
    discriptionDiv.setAttribute("class",
    "f absolute top-0 w-full h-full rounded-tl-2xl rounded-br-2xl  bg-black bg-opacity-40 text-white font-sans text-md p-2 opacity-0   hover:opacity-100  ")
    
    movieDiv.innerHTML = `
        <img class="rounded-tl-2xl " src="${BACKDROP_BASE_URL + movie.backdrop_path}" style="block" alt="${
      movie.title
    } poster">
    <h3 class="p-2">${movie.title}</h3>
  

        `;  
      
       // <h3>${fetchgener(movie.genre_ids)}</h3>
      discriptionDiv.innerHTML=`<p>${movie.overview}</p> 
      <h3> Rating : ${movie.vote_average}</h3>
      `
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
      console.log(movie)
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
