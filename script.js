"use strict";
// Start of navBar
const toggleClass = (targetQuery, classToToggle) => {
  const target = document.querySelector(targetQuery);
  target.classList.toggle(classToToggle);
};

const hamburgerMenu = document.getElementById("hamburger-menu");
hamburgerMenu.addEventListener("click", () => {
  toggleClass("#navbar", "show");
  toggleClass("#hamburger-menu", "clicked");
});
const dropdownGenres = document.getElementById("dropdown-select-genres");

const dropdownFilter = document.getElementById("dropdown-select-filter");
dropdownGenres.addEventListener("click", () => {
  const dropdownMenuFilter = document.getElementById("dropdown-menu-filter");
  if (dropdownMenuFilter.classList.contains("active")) {
    toggleClass("#dropdown-menu-filter", "active");
    toggleClass(".caret-filter", "rotate");
  }
  toggleClass("#dropdown-menu-genres", "active");
  toggleClass(".caret-genres", "rotate");
});
dropdownFilter.addEventListener("click", () => {
  const dropdownMenuGenres = document.getElementById("dropdown-menu-genres");
  if (dropdownMenuGenres.classList.contains("active")) {
    toggleClass("#dropdown-menu-genres", "active");
    toggleClass(".caret-genres", "rotate");
  }
  toggleClass("#dropdown-menu-filter", "active");
  toggleClass(".caret-filter", "rotate");
});
const menuLi = document.querySelector(".menu li");
menuLi.addEventListener("click", () => {
  toggleClass(".menu li", "clicked");
});
const dropdownFilterLabels = document.querySelectorAll(
  ".dropdown-menu-filter li label"
);
dropdownFilterLabels.forEach((label) => {
  label.addEventListener("click", (e) => {
    const value = e.target.textContent;
    const selected = document.querySelector(".selected-filter");
    selected.textContent = value;
  });
});
// End of navBar

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const genres = await fetchMoviesGenres();
  renderMoviesGenres(genres.genres)
  const movies = await fetchMovies();
  renderMovies(movies.results);
  document.getElementById("searchInput").addEventListener('keydown', async(e)=>{
    if(e.key === "Enter"){
      const input = document.getElementById("searchInput");
      const inputVal = input.value;
      const searchRes = await searchForMovie(inputVal)
      displayMovieSearchResults(searchRes.results)
    }
  })
  document.getElementById('searchBtn').addEventListener('click', async ()=>{
    const input = document.getElementById("searchInput");
    const inputVal = input.value;
    const searchRes = await searchForMovie(inputVal)
    displayMovieSearchResults(searchRes.results)
  })
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchMoviesGenres = async () => { // to get all genres of movies, will return objs {id , name}
  const url = constructUrl(`/genre/movie/list`);
  const res = await fetch(url);
  return res.json();
}
// this function create button for each genre, add an event listner to change the content according to which genre the user clicks on
const renderMoviesGenres = (genres) =>{
  let dropDownListContent = document.getElementById("dropdown-menu-genres");
  genres.map((genre)=>{// objects of genres
    var genreElement = document.createElement('li');
    
    genreElement.innerHTML = `<input type="checkbox" name="${genre.name}" id="${genre.name}" />
    <label for="${genre.name}">${genre.name}</label>`
    genreElement.classList += "dropdown-item"

    genreElement.addEventListener('click', async ()=>{
      let x = await chooseByGenres(genre.id);
      displayMovieSearchResults(x.results)
  })
  dropDownListContent.appendChild(genreElement)
  })
}
const chooseByGenres = async (genreId) =>{
  const url = constructUrl(`discover/movie`)
  var urlWithQuery = new URL(url);
  urlWithQuery.searchParams.append('with_genres', genreId);
  const res = await fetch(urlWithQuery);
  return res.json();
}
const filterMovies = async () =>{
  const url = constructUrl(`discover/movie`)
  var urlWithQuery = new URL(url);
  urlWithQuery.searchParams.append('with_genres', genreId);
  const res = await fetch(urlWithQuery);
  return res.json();
}
const showMovieElement = (element) =>{
  if(element.classList.contains("hide")){
    element.classList.remove("hide");
    element.classList += (" show")
  }
}
const hideMovieElement = (element) =>{
  if(element.classList.contains("show")){
    element.classList.remove("show");
    element.classList += (" hide")
  }
}
const searchForMovie = async(input) =>{
  if(input === "" || input === " ") return ;
  const url = constructUrl(`search/movie`)
  var urlWithQuery = new URL(url);
  urlWithQuery.searchParams.append('query', input);
  const res = await fetch(urlWithQuery);
  return res.json();
}
const displayMovieSearchResults = async (results) =>{
  CONTAINER.innerHTML =""
  results.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList = `movieDiv`
    movieDiv.classList += " show ";
    for(let i=0; i<movie.genre_ids.length; i++){
      movieDiv.classList += ` ${movie.genre_ids[i]} `;//each movie element now have it's genre in the class name, we will use this while filtering
    }
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.original_title
    } poster">
        <h3>${movie.original_title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
}

document.addEventListener("DOMContentLoaded", autorun);
