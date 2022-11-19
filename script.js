'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");



function show_hide_genre() {  
  let click = document.querySelector("#genreList");  
  if(click.style.display ==="none") {  
     click.style.display ="block";  
  } else {  
     click.style.display ="none";  
  }   
  document.addEventListener('mouseup', function(e) {
    // var container = document.getElementById('container');
    if (!click.contains(e.target)) {
      click.style.display = 'none';
    }
});
}  
function show_hide_filter() {  
  let click = document.querySelector("#filterList");  
  if(click.style.display ==="none") {  
     click.style.display ="block";  
  } else {  
     click.style.display ="none";  
  }   
let aLink = document.querySelectorAll(".genre-link");
console.log(aLink[1]);
aLink.forEach(elem => elem.addEventListener("click",
() => {
   click.style.display = "none";
 }));
 document.addEventListener('mouseup', function(e) {
  // var container = document.getElementById('container');
  if (!click.contains(e.target)) {
    click.style.display = 'none';
  }
});

}  

//start button collap
// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }

//end button collap



// Don't touch this function please
const autorun = async (filterType) => {
  const movies = await fetchMovies(filterType);
  console.log("Movies results ids",movies.results.map(e=> e.id));
  console.log("Movies results",movies.results.map(e=> e.original_title));
  CONTAINER.innerHTML = "";
  renderGenres();
  renderMovies(movies.results);
};
const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  console.log("URL",url);
  const res = await fetch(url);
  console.log("response",res);
  return res.json(); 
};
const renderGenres = async() =>{
  let genreList = await fetchGenres();
  let contentGenre = document.querySelector(".content-genre");  
  console.log("genre list rendering test",genreList.genres.map(e=>e.name));
  genreList.genres.map(genre => {    
    const aLink = document.createElement("a");
    aLink.style.cursor = "pointer";
    aLink.innerText = genre.name;
    contentGenre.append(aLink);
    aLink.addEventListener("click", async ()=> {
      contentGenre.style.display="none";
        console.log(genre.id);
        let res = await  moviesGenreList(genre.id);
        console.log(res.results.map(e=>e.genre_ids));
        
        renderMovies(res.results);
        // console.log(res);

    });    
  })
  
};
const moviesGenreList = async(genreId)=>{
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=542003918769df50083a13c415bbc602&with_genres=${genreId}
  `;
  const moviesList = await fetch(url);
  console.log(moviesList);
  return moviesList.json();
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
const fetchMovies = async (filterType) => {
  const url = constructUrl(`movie/${filterType}`);
  console.log(url)
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




const renderMovies = (movies) => {
  CONTAINER.innerHTML = '';

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

        <img class="rounded-tl-2xl " src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
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

        <img class="h-20 w-40" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3 class="text-white">${movie.title}</h3>`;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
    movieDiv.appendChild(discriptionDiv)
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie,similar) => {
  CONTAINER.innerHTML = `
    <div class="movie-poster">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class = "movie-info">
            <h3 id="movie-title">${movie.title}</h3>
            <ul class = "movie-misc-info">
            <li class="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</li>
            <li class ="Movie-rate"><b>Ratings:</b> ${
              movie.vote_average
            }</li>
            <li class="Movie-genre"><b>Genre:</b> ${
              movie.genre_ids
            }</li>
            </ul>
            
            <p class ="Movie-lang"><b>Language:</b> ${
              movie.original_language
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <p id="movie-adult"><b>Adult:</b> ${movie.adult}</p>
            <p id="movie-overview">${movie.overview}</p>
        </div>
    `;
    runTrailer(movie)
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=542003918769df50083a13c415bbc602", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  //trailer part
  const fetchTrailer = async (movie) => {
    const url = constructUrl(`movie/${movie.id}/videos`);
    const res = await fetch(url);
    return res.json();
  }
  
  const runTrailer = async (movie) => {
    const relMovies = await fetchTrailer(movie);
    renderTrailer(relMovies.results[0].key);
  };
  
  const renderTrailer = (key) =>{
    const trailerDiv = document.createElement("div");
    trailerDiv.classList.add("trailer-container")
  
    trailerDiv.innerHTML = 
    `<h3 class="trailer-title">Watch the Trailer<h3><br>
    <iframe class="iframe-trailer" src="https://www.youtube.com/embed/${key}"allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`
  
    CONTAINER.appendChild(trailerDiv);
  
  }

  

document.addEventListener("DOMContentLoaded", autorun("now_playing"));
