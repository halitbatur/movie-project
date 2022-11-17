const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const actorPage = document.querySelector(".actor-page")



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

// This function fetch a list of all movie genres that exist and pushes it into an array
const getGenresList = async (arr) => {
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  arr.push(...data.genres);
};
// Constant that holds all the genres
const genresList = [];
getGenresList(genresList);

// This function takes an array with the movie genres IDs and converts them into genres names then returns them as a string
const genresIdToName = (arr) => {
  const genresNames = [];
  for (let genreID of arr) {
    const { id, name: genres } = genresList.find(
      (value) => value.id === genreID
    );
    genresNames.push(genres);
  }
  return genresNames.join(", ");
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieGenres = genresIdToName(movie.genre_ids);
    console.log(movieGenres);
    const movieDiv = document.createElement("div"); 
    CONTAINER.setAttribute('class', `grid  lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 auto-cols-auto max-w-5xl  mx-auto py-20 gap-4 cursor-pointer`)
    movieDiv.innerHTML = `
    <div class="mov bg-gray-700  relative overflow-hidden">
        <img class="hover:opacity-[30%] via-gray-300 to-white" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="films">
    <div class="flex pt-2 place-items-center justify-between mx-3 ">
        <div class="font-bold text-base text-white ">${movie.title}</div>
        <div class="vote text-white  bg-black ">${movie.vote_average.toFixed(1)}</div>
    </div>
    <div class=" ml-3 text-xs text-slate-300 font-bold  pt-1 ">${movieGenres}</div>
      <div class ="overview absolute left-0 right-0 bottom-0 text-black p-4 bg-gradient-to-r from-gray-300  to-white bg-opacity-75 ">
        <div class = "font-bold text-center text-xl pb-2">Overview</div> 
        <div>${movie.overview}</div> 
      </div>
    </div>
        `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
    
  });
};

//Relating Movies fetching

const autorunSim = async (movie) => {
  const simMovies = await fetchSimilarMov(movie);
  renderMovies(simMovies.results.slice(0, 5));
};

const fetchSimilarMov = async (movie) => {
  const url = constructUrl(`movie/${movie.id}/similar`);
  const res = await fetch(url);
  return res.json();
}




// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `<section class="flex justify-center mx-auto bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 py-20 overflow-hidden">
  <div class="mx-10 ">
    <div class="imageMovieSingle">
         <img src=${BACKDROP_BASE_URL + movie.backdrop_path}>
    </div>
  </div>
  <div class=" info flex flex-col leading-9  p-10 text-white  align-items-center py-2 ">
        <h2 class="text-2xl mb-6 font-bold">${movie.title}</h2>
        <p class="text-violet-300">Release Date: <span class="text-white"> ${movie.release_date}</span></p>
        <p class="text-violet-300">Runtime: <span class="text-white"> ${movie.runtime} Minutes </span></p>
        <p class="text-violet-300">Movie Language: <span class="text-white">${movie.original_language.toUpperCase()}</span></p>
        <p class="text-violet-300">Rating: <span class="text-white">${movie.vote_average.toFixed(1)}</span></p>
        <p class="text-violet-300">Votes: <span class="text-white">${movie.vote_count}</span></p>
        <p class="my-2 text-xl text-violet-300">Overview:</p>
        <p>${movie.overview}</p>
        <h3 class="text-violet-300">Actors:</h3>
        <p class="text-violet-300">Production: <span class="text-white">${movie.production_companies[0].name}</span></p>
        <img src=${BACKDROP_BASE_URL + movie.production_companies[0].logo_path}>
        <h3 class="text-violet-300">Actors:</h3>
</div>
</section>
<br><hr>
`;
autorunSim(movie)

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
  let direction = document.createElement('a')
  direction.href = "index.html"
  genres.map((genre)=>{// objects of genres
    var genreElement = document.createElement('li');
    
    genreElement.innerHTML = `
    <input type="checkbox" name="${genre.name}" id="${genre.name}" />
    <label for="${genre.name}">${genre.name}</label>`
    genreElement.classList += "dropdown-item"

    genreElement.addEventListener('click', async ()=>{

      let x = await chooseByGenres(genre.id);
      displayMovieSearchResults(x.results)
  })
  direction.appendChild(genreElement)
  dropDownListContent.appendChild(direction)
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

//fetch actors

const actorsAutoRun = async () => {
  const actors = await fetchActors();
  console.log(actors);
  renderActors(actors.results);
};


const actorDetails = async (actor) => {
    const actorRes = await fetchActor(actor.id);
    renderActor(actorRes);
  };

const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};


const fetchActor = async (actorId) => {
    const url = constructUrl(`person/${actorId}`);
    const res = await fetch(url);
    return res.json();
  };


  const renderActors = (actors) => {
    actors.map((actor) => {
      const actorDiv = document.createElement("div");
      actorDiv.innerHTML = `
      <div class = "actor  my-8  mx-auto">
          <img class ="hover:opacity-[30%] via-gray-300 to-white"src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name}">
          <h2 class= "text-white bg-gray-700 text-center py-2">${actor.name}</h2>
      </div>
          `;
      actorDiv.addEventListener("click", () => {
        actorDetails(actor);
      });
      CONTAINER.appendChild(actorDiv);
    });
  };

  function Gender(actor){
    if(actor.gender == 1){
        return "Female"
    } else if(actor.gender == 2){
      return "Male"
    }
  }
  function deathDay(actor){
    if (actor.deathday != null){
      return `${actor.deathday}`
    }else if(actor.deathday == null){
      return " - "
    }
  }

  const renderActor = (actor) => {
    CONTAINER.innerHTML = `
    <section class="flex justify-center mx-auto bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 py-20">
      <div class="mx-10 ">
          <div class="image">
               <img  src=${PROFILE_BASE_URL + actor.profile_path}>
          </div>
      </div>
          <div class=" info flex flex-col leading-9  p-10 text-white  align-items-center py-2 ">
              <p class=" text-xl mb-6 font-bold">${actor.name}</p>
              <p class="text-violet-300"> Gender: <span class="text-white">${Gender(actor)}</span></p>
              <p class="text-violet-300">Birthday: <span class="text-white">${actor.birthday} </span></p>
              <p class="text-violet-300"> Death day: <span class="text-white"> ${deathDay(actor)}</span></p>
              <p class="text-violet-300">Popularity: <span class="text-white">${actor.popularity}</span></p>
              <h3 class="mt-2 text-violet-300 ">Biography:</h3>
              <p>${actor.biography}</p>
              </div>
    </section>
      `;
  };

  if(actorPage){
    actorPage.addEventListener("click", function (e) {
      e.preventDefault();
        CONTAINER.replaceChildren();
        actorsAutoRun();
      });
  }




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
document.addEventListener("DOMContentLoaded", autorun);
