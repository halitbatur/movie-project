'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");



// let genreList;

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
  // use promise.all to fetch all needed urls here?
  const movieRes = await fetchMovie(movie.id);

  const similarMovies = await fetchSimilar(movie.id);
  const credits = await fetchCredits(movie.id);
  renderMovie(movieRes, similarMovies, credits);



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

const fetchSimilar = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};


const fetchCredits = async (movieId) => {

  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};


const fetchGenre = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};

const fetchSearch = async (searchInput) => {

  // encodes the string to give it proper syntax for the url

  let encoded = encodeURIComponent(searchInput);
  let url = constructUrl(`search/multi`);

  // have to add this to the end of the url
  url = url + `&query=${encoded}`;


  const res = await fetch(url);
  return res.json();
};



const filterMovieGenres = async (genId, genreList) => {

  // genId is array of genre ids from each specific movie
  // genreList is the entireList we fetched earlier


  let myList = [];

  for(let i = 0; i < genId.length; i++) {

    for(let j = 0; j < genreList.genres.length; j++) {

      if(genreList.genres[j].id === genId[i]) {
        myList.push(genreList.genres[j].name);

        // we only need the first one that matches
        // break keyword will terminate the execution of the loop and start over from the outer loop
        break;

      }
    }
  }


  return myList;
}


const createNav = async () => {

  // create navbar
  let navBar = document.createElement('div');
  navBar.setAttribute('id', 'navBar');
  navBar.setAttribute('class', 'h-32 w-full flex p-2 justify-between');

  document.body.prepend(navBar);

  // insert nav bar HTML DOM nodes here
  navBar.innerHTML = `
  <div class="navbar">
  <ul> 
    <li><a class="active" href="index.html"><b>HOME</b></a></li>
    <li><a href="index.html">Movies</a></li> 
    <li><a href="actor.html">Actor list</a></li> 

  </ul> 
</div> 
    
    <div>
    <input class="rounded-2xl w-72 p-2" id="search" type="text" minlength="1" placeholder="search for a movie or an actor">
    <button id="searchButton" class="text-white">search</button>
    </div>
    `;

  let searchButton = document.getElementById('searchButton');
  searchButton.setAttribute("class", "mt-8 mr-4 text-white")

  searchButton.addEventListener('click', async (e) => {

    let searchInput = document.getElementById('search');
    searchInput = searchInput.value;
    let media = await fetchSearch(searchInput);

    // call function to create and display media page
    // this part is for the search bar to display actors and movies search results
    renderMedia(media);
  });

  // home button runs the same function that is invoked when the app is first loaded
  // this gets the home page with an updated fetched list of movies
  let homeButton = document.getElementById('homeButton');
  homeButton.addEventListener('click', autorun);

}

// create nav bar
createNav();

// render movies and actors
const renderMedia = async (media) => {

  // remove all DOM elements to show fresh results
  CONTAINER.innerHTML =``;

  console.log(media);

  // loop through all results and create DOM elements and display relevant data
  media.results.map((item) => {
    // console.log(item);
    // logic for getting the different data for actors since all results are mixed together in the array

    let title = item.name ? item.name : item.title;
    let image = item.profile_path ? item.profile_path : item.backdrop_path
    ? item.backdrop_path : item.poster_path;

    // create elements here
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
    
        <div class="movieContainer">
        <img src="${BACKDROP_BASE_URL + image}" alt="${title} poster" class="movieImage">
        </div>
        <h3>${title}</h3>
        `;

        // this will call the movie page for details of each individual movie
        // you'll have to add some logic in the renderMovie function to filter out actor pages
        itemDiv.addEventListener("click", () => {
          movieDetails(item);
        });

      // append items here
      CONTAINER.appendChild(itemDiv);
  });

};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = async (movies) => {

  // removes all HTML nodes when home button is clicked
  CONTAINER.innerHTML = ``;

  // fetch the entire genrelist of movies from the api and store it in genreList
  let genreList = await fetchGenre();

  movies.map(async (movie, index) => {

    // get the filtered list for the movie and then turn it into a string
    let myGenreList = await filterMovieGenres(movie.genre_ids, genreList);
    myGenreList = myGenreList.toString();

    // create divs



    const movieDiv = document.createElement("div");
    let descriptionDiv = document.createElement("div");

    movieDiv.setAttribute('class', `movieWrapper`);


    // all elements for each movie on the home page go here

    movieDiv.innerHTML = `
        <div class="movieContainer">
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" class="movieImage">
          <p class="movieDescription">${movie.overview}</p>
        </div>
        <h3>${movie.title}</h3>
        <h3>Rating: ${movie.vote_average}</h3>
        <h3>${myGenreList}</h3>
        `;


    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    // append divs here
    CONTAINER.appendChild(movieDiv);
    movieDiv.appendChild(descriptionDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.

const renderMovie = async (movie, similarMovies, credits) => {

  // movie.production_companies.map((item) => {
  //   console.log(item);
  // })

  console.log(credits.crew);


  const directors=credits.crew.filter(function(crew){
     return crew.job === "Director";
     
  }
  );
  console.log(directors);


  CONTAINER.setAttribute("class", "flex  p-12 items-center")

  CONTAINER.innerHTML = `
    <div class="">
        <div class="">
             <img class="rounded-2xl mb-2" id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="">
            <h2 class="text-2xl mb-4" id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p class="mb-2" id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3 class="font-bold mt-2">Rating: <p class="font-semibold">${movie.vote_average}</p></h3>
            <h3 class="font-bold mt-2">Overview:</h3>
            <p class="" id="movie-overview">${movie.overview}</p>

            <h3 class="font-bold mt-2">Language: <p class="font-semibold">${movie.original_language}</p></h3>
            <h3 class="mt-2 font-bold">Production Company:${movie.production_companies.map((item) => {
              let logo = item.logo_path ? `<img class="rounded-xl mt-2" src=${PROFILE_BASE_URL + item.logo_path}>` : "no logo available";
              return (`
                ${item.name}
                ${logo}
              `);
            })}</h3>


        </div>
        <div>
        <p class="font-bold mt-4" id="moviedirector"> Director: ${directors[0].name}</p>
            <h3 class="mt-2 font-bold">Cast</h3>
            <div class="flex gap-4 w-full mt-1" id="actors" class="list-unstyled"></div>
            <h3 class="mt-8 font-bold">Similar Movies:</h3>
            <div class="flex gap-4 w-full mt-1" id="similar"></div>
    </div>

    `;


    const actorCredits = document.getElementById('actors');
    credits = credits.cast.slice(0, 5);

    credits.map((actor,index) => {
      let actorItem = document.createElement('div');
      actorItem.innerHTML = `
      ${actor.name}
      <img id="actor-backdrop" src=${PROFILE_BASE_URL + actor.profile_path}>
      `;
      

      actorCredits.append(actorItem);
    });

    

    const similarDiv = document.getElementById('similar');

    // only get 5 items
    similarMovies = similarMovies.results.slice(0, 5);

    similarMovies.map((movie, index) => {
      let similarChild = document.createElement("div");
      similarChild.innerHTML = `


      




        <img class='rounded-2xl' src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster">
        <h3>${movie.title}</h3>`;

        similarDiv.addEventListener("click", () => {
          movieDetails(movie);
        });

        similarDiv.appendChild(similarChild);
    });

    
};

document.addEventListener("DOMContentLoaded", autorun);




