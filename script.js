"use strict";

let movieGenres = document.querySelector("#movieGenres");
let openMenu = document.getElementById("mega-menu-full");
function toggleItMovies() {
  return movieGenres.classList.toggle("hidden");
}
function toggleItFilter() {
  return document.getElementById("filterList").classList.toggle("hidden");
}
function toggleItNavbar() {
  return openMenu.classList.toggle("hidden");
}
window.addEventListener("click", ()=>{
  document.getElementById("render-search").classList.toggle("hidden")


const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const GENRE = document.querySelector(".genres")
const CONTAINER = document.querySelector(".container");
const CONTAINER2 = document.querySelector(".container2");
const ACTORS = document.querySelector("#actorsLink");
const SWIPER = document.querySelector(".swiper");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  const genres = await fetchGenres();
  console.log(genres)
  genresList(genres.genres);
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=&language=en-US&page=1&include_adult=false`
// console.log(SEARCH_URL)
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const credits = await fetchCredits(movie.id);
  const trailer = await fetchTrailer(movie.id);
  const comp = await movieRes.production_companies;
  const genre = await movieRes.genres;
  const director = await credits.crew;
  const official = trailer.results.find((item) =>
    item.name.includes("Official Trailer")
  );
  const genres = genre.map((g) => { 
    return `<li class="list-none inline-flex justify-between mr-1 text-xs">${g.name}</li>`
  }).join('')
  const directorJob = director.map((dir) => { 
    if (dir.job == "Director") {
      return `<h3 class="inline-block">${dir.name}</h3> ` 
    } 
  }).join('')
  console.log(directorJob + "hi")
  // const director = credits.crew.find((item) =>
  //   item.job.toLowerCase().includes("Director")
  // );
  const cast = credits.cast
    .slice(0, 5)
    .map((actor) => {
      if (actor.profile_path) {
        return `
        <li id="${
          actor.id
        }" class="actor text-white font-gotham text-500 cursor-pointer">
        <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="">
          <h1>${actor.name}</h1>
        </li>`;
      } else
        return `<li id="${actor.id}" class="actor text-white font-gotham text-500 cursor-pointer"><h1>${actor.name}</h1></li>`;
    })
    .join("");
  const companies = comp.map((com) => { 
    if (com.logo_path) {
    return `<li>${com.name}</li> 
            <img src="${BACKDROP_BASE_URL + com.logo_path}" alt="">` 
  } else return `<li>${com.name}</li>`
  }).join('')

  renderMovie({details: movieRes, cast: cast, official: official, companies: companies, genres: genres, director: directorJob });
  };


const actorDetails = async (actor) => {
  const details = await fetchPersonDetails(actor);
  renderActorPage(details);
};
const gridColumns = "grid grid-cols-3 gap-5 container mx-auto";
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const containerOfMoiveDiv = document.createElement("div");
    containerOfMoiveDiv.setAttribute("id","containerOfMoiveDiv")
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `<div class="transform transition duration-500 hover:scale-95">
    <img id="poster" class="moviePoster cursor-pointer rounded-sm" src="${
          BACKDROP_BASE_URL + movie.poster_path
        }" alt="${movie.title} poster">
        
        <h3 id="title" class="font-gotham font-700 text-white py-2">${movie.title}</h3>
        <p class="text-white"> <span style="font-size:100%;color:gold;">&starf;</span> ${movie.vote_average}</p>
        <p id="divOfDescription" class="text-white text-xs">${movie.overview}</p>
        `
        // movieDiv.addEventListener("mouseover",()=>{
        //   document.getElementById("divOfDescription").classList.toggle("hidden");
        // })

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
      containerOfMoiveDiv.appendChild(movieDiv)
    });

    const backdropDiv = document.createElement("div");
    backdropDiv.innerHTML = `<img class="cursor-pointer " src="${
      BACKDROP_BASE_URL + movie.backdrop_path
    }" alt="${movie.title} poster">`;
    CONTAINER.appendChild(movieDiv);
    // SWIPER.appendChild(backdropDiv);
  });
  CONTAINER.setAttribute('class',gridColumns);
};

const noGrid = "container mx-auto"

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movieDetails) => {
  const {details, cast,companies,director, genres,official ={} } = movieDetails;
  const {poster_path,title,release_date,runtime,overview,vote_average,vote_count,original_language} = details;
  CONTAINER.innerHTML = "";
  CONTAINER.innerHTML = `<header
  class="relative flex items-center justify-center h-screen mb-12 overflow-hidden"
>
  <div
    class="relative z-30 p-5 text-5xl font-gotham font-bold text-white bg-opacity-50 rounded-xl flex justify-start"
  >${title}</div>
  <video autoplay loop muted class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
    <source src="https://www.youtube.com/embed/${official.key}" type="video/mp4"/>
    Your browser does not support the video tag.
  </video>
</header>
    <div class="None">
    <iframe class="w-auto min-w-full min-h-full max-w-none" width="1060" height="1015" src="https://www.youtube.com/embed/${official.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
    <div class="flex flex-col gap-2"><div class="w-2/4">
             <img id="movie-backdrop class="cursor-pointer" src=${
               BACKDROP_BASE_URL + poster_path
             }>
        </div>
  
        <div class=" text-white w-4/5 font-gotham">
          <h2 id="movie-title class="text-white font-gotham text-2xl">${title}</h2>
            <p>${genres}<p>
            <h3 class="inline-block mr-2 font-bold">Director: ${director}</h3> 
            <p id="movie-release-date class="text-white"><b>Release Date:</b> ${release_date}</p>
            <p id="movie-runtime class="text-white"><b>Runtime:</b> ${runtime} Minutes</p>
            <p id="movie-rating class="text-yellow-300"><b></b> <span style="font-size:100%;color:yellow;">&starf;</span> ${Math.round(
              vote_average
            )}</p>
            <p id="vote-count class="text-yellow-300"><b>Vote Count:</b> ${vote_count}</p>
            <p id="vote-count"><b></b> ${original_language}</p>
            <ul class="w-1/4">${companies}<ul></ul>
           
        </div>
        </div>
        <h3 class="font-gotham">Overview</h3>
        <p id="movie-overview class="text-red">${overview}</p>
            <h3 class="flex justify-center">Actors</h3> 
            <ul id="actors" class="list-unstyled grid grid-cols-3 justify-center">${cast}</ul></div>
    </div>`;
  //   SWIPER.innerHTML = `<main class="grid grid-cols-3">
  //  <div> <img id="movie-backdrop class="cursor-pointer grid grid-cols-3" src=${
  //    BACKDROP_BASE_URL + backdrop_path
  //  }></div>`;

  const actorLinks = document.getElementsByClassName("actor");
  for (const actor of actorLinks) {
    actor.addEventListener("click", () => {
      actorDetails(actor.id);
    });
  }
  CONTAINER.setAttribute('class',noGrid)
};

const renderActorPage = (actor) => {
  const {also_known_as,biography,birthday,deathday,name,popularity,profile_path,gender} = actor;

  CONTAINER.innerHTML = "";
  const singleActorPage = document.createElement("div");

  singleActorPage.innerHTML = `<div class="text-white">  
    <img src=${PROFILE_BASE_URL + profile_path}>
    <h1>${name}</h1>
    <h1>birthday: ${birthday}</h1>
    <h1>${deathday ? `deathday: ${deathday}` : ""}</h1>
    <h1>popularity:${popularity}</h1>
    <h1>gender:${gender}</h1>
    <p>${biography}</p>
  </div>`;
  document.getElementById("actorsPage").appendChild(singleActorPage);
};

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");

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

const fetchCredits = async (movieId) => {
  const credits = constructUrl(`/movie/${movieId}/credits`);
  const res = await fetch(credits);
  return res.json();
};

const fetchTrailer = async (movieId) => {
  const trailer = constructUrl(`/movie/${movieId}/videos`);
  const res = await fetch(trailer);
  return res.json();
};

const fetchPersonDetails = async (personId) => {
  const PERSON_URL = constructUrl(`/person/${personId}`);
  const res = await fetch(PERSON_URL);
  return res.json();
};


const fetchGenres = async () => {
  const genres = constructUrl(`/genre/movie/list`);
  const res = await fetch(genres);
return res.json();
}


function genresList(genres) {
  // const genres = await fetchGenres();
  genres.forEach((g) => { 
const genreDiv = document.createElement("div");
    genreDiv.innerHTML = 
    `<a href="#" class="block p-3 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-black">
      ${g.name}
    </a>`
    GENRE.appendChild(genreDiv)
  });
}
const fetchMoviesByGenre = (genreId) => {

}

function searchShow(query){
  const search_URL = `https://api.themoviedb.org/3/search/movie?api_key=473329bca30a210d04b15f4cda32a5e7&language=en-US&query=${query}&page=1&include_adult=false`
fetch(search_URL)
.then((resp)=>resp.json())
.then((jsonData)=>{
  // const results = jsonData.results.map(movie =>movie.original_title)
  renderResults(jsonData.results)
  // console.log( jsonData)
  document.getElementById("errorMessage").innerHTML = ""
}).catch((error => {
  document.getElementById("errorMessage").innerHTML = error
}))
;
}
const genreTranslations ={
  28:"Action",
  12:"Adventure",
  16:"Animation",
  35:"Comedy",
  80:"Crime",
  99:"Documentary",
  18:"Drama",
  10751:"Family",
  14:"Fantasy",
  36:"History",
  27:"Horror",
  10402:"Music",
  9648:"Mystery",
  10749:"Romance",
  878:"Science Fiction",
  10770:"TV Movie",
  53:"Thriller",
  10752:"War",
  37:"Western"
}

function renderResults(results){
   const list =  document.getElementById("render-search")
   list.innerHTML = "";
   results.forEach(result => {
    const genresConverter = result.genre_ids.map((g) => genreTranslations[g])
     list.setAttribute("class","flex flex-col bg-white cursor-pointer")
    let element = document.createElement("li")
    element.addEventListener("click", ()=>{
      movieDetails(result)
      document.getElementById("render-search").classList.toggle("hidden")
    })
    const container = document.createElement("div")
    container.innerHTML = `
    <div class="flex w-full z-0">
    <img class=" h-16 w-16" src="${BACKDROP_BASE_URL}${result.backdrop_path}">
    <ul class="flex w-full flex-col">
    <li><span class=" flex flex-1 items-center">${result.original_title}</span></li>
    <li><span class=""><span style="font-size:100%;color:gold;">&starf;</span> ${result.vote_average}</span></li>
    <li><div class="flex"><p>${genresConverter}</p> </div></li>
    </ul>
    </div>
    `
    element.appendChild(container)
    list.appendChild(element)
  })
  }
window.onload = ()=> {
  const movieSearchBox = document.getElementById("movie-search-box")
  const movieSearchbtn = document.getElementById("movie-search-btn");
  movieSearchbtn.addEventListener("click", (event) =>{
    
    searchShow(movieSearchBox.value)

  })
}
const fetchingOfFilterMovies = async (typeFilter) => {
  const url = constructUrl(`movie/${typeFilter}`);
  const res = await fetch(url);
  return res.json();
}
const FilteredResult = async (typeFilter) => {
  const movies = await fetchingOfFilterMovies(typeFilter);
  renderMovies(movies.results);
}
const popularMovies = document.getElementById("PopularMovies");
popularMovies.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilteredResult("popular")
})

const topMovies = document.getElementById("TopMovies");
topMovies.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilteredResult("top_rated")
})

const airingMovies = document.getElementById("AiringMovies");
airingMovies.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilteredResult("now_playing")
})


document.addEventListener("DOMContentLoaded", autorun);
