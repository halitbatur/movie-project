"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
  console.log(movies.results)
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
  const actors = await fetchActors();
  console.log("actors is : ", actors.results.slice(0, 5));
  // console.log("movieRes is : ", movieRes);

  renderMovie(movieRes, actors);
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
  const data = await res.json();
  // return await data.genres;
  return data;
};
// console.log(fetchMovie(122))

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  // console.log(movies)
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("grid-item");
    movieDiv.innerHTML = `
    <img id="image"  src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" />
    <span class="yearOfRelease">${movie.release_date}</span>
    <p class="title">${movie.title}</p>
    <span class="rating">
    <ion-icon name="star" class="star"></ion-icon>
    ${movie.vote_average}/10
    </span>`

    movieDiv.addEventListener("click", () => {

      movieDetails(movie);
    });
    gridContainer.appendChild(movieDiv);

  });
  CONTAINER.appendChild(gridContainer);
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, actorsData) => {
  const actors = actorsData.results.slice(0, 5);

  console.log("inside renderMoviefn: actors =", actors);
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
       
    </div>`;

  //? isWork

  // movie.production_companies[index].name

  const production_cps = movie.production_companies;
  const production_Row = document.createElement("div");
  production_Row.classList.add("row", "main-production_companies-row");
  CONTAINER.appendChild(production_Row);

  const cmHtml = document.createElement("h4");
  cmHtml.classList.add("h4", "block");
  cmHtml.innerHTML = `
     production companies:  
  `;
  production_Row.appendChild(cmHtml);
  // !  map
  production_cps.map((companie, index) => {
    const newDivRowData = document.createElement("p");
    newDivRowData.innerHTML = `
      <p>${companie.name}</p>
    `;
    production_Row.appendChild(newDivRowData);
  });

  const productionDiv = document.createElement("div");
  productionDiv.classList.add("productionDiv");
  productionDiv.innerHTML = `

    <br></br>
    <h4>original language: </h4>
    <p> ${movie.original_language}</p>
    <br></br>
    <h4>release datef</h4>
    <p>${movie.release_date}</p>

    <br></br>
    <h4>vote count</h4>
    <p>${movie.vote_count}</p>
    <br></br>
    <h4>movie rating</h4>
    <p>${movie.vote_average}</p>
    <br></br>
    <h4>directory name: </h4>
    <p>name</p>
  `;
  CONTAINER.appendChild(productionDiv);

  // const production_company =
};

// ! filter nav
const fetchFilterMovies = async (typeFilter) => {
  const url = constructUrl(`movie/${typeFilter}`);
  const res = await fetch(url);
  return res.json();
};

const FilterMovies = async (typeFilter) => {
  const movies = await fetchFilterMovies(typeFilter);
  renderMovies(movies.results);
}
const renderFilterMovies = () => {
  const popular = document.querySelector("#popular");
  popular.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("popular");
  });
  const topRated = document.querySelector("#top_rated");
  topRated.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("top_rated");
  });

  const nowPlaying = document.querySelector("#now_playing");
  nowPlaying.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("now_playing");
  });

  const upComing = document.querySelector("#upcoming");
  upComing.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    FilterMovies("upcoming")
  })
  return popular, topRated, nowPlaying, upComing;
}
// end of filter nav

// rendering Home page
const renderHome = () => {
  const home = document.querySelectorAll(".home");
  home.forEach((i) => {
    i.addEventListener("click", () => {
      CONTAINER.innerHTML = "";
      return autorun();
    });
  });
};

// Rendering about page
const renderAbout = () => {
  const about = document.querySelector("#about");
  about.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    CONTAINER.innerHTML = `
    <div class="  pt-12 mb-20  px-20 ml-[100px]">
    <div class="text-center">
    <h1 class="text-[#dcf836] md:text-6xl  text-3xl tracking-wide font-extrabold mb-7">Let's talk about TMDB</h1>
    <p class=" md:text-xl text-base   mx-auto  leading-8  ">The Movie Database (TMDB) is a 
    community built movie and TV database. Every piece of data has been added by our amazing 
    community dating back to 2008. TMDb's strong international focus and breadth of data is
     largely unmatched and something we're incredibly proud of. Put simply, we live and 
     breathe community and that's precisely what makes us different.
     Every year since 2008, the number of contributions to our database has increased. With over 400,000 developers and companies using our platform, TMDB has become a premiere source for metadata.
     We're international. While we officially support 39 languages we also have extensive regional data. Every single day TMDB is used in over 180 countries.</p>
    
   </div>
    </div>
    `;
  });
};

// searching for movies

const fetchSearch = async (nameOfMovie) => { //for fetching the search url
  const url = constructUrl("search/movie");
  const res = await fetch(`${url}&query=${nameOfMovie}`);
  return res.json();
}
const SearchMovies = async (nameOfMovie) => {
  const res = await fetchSearch(nameOfMovie);
  //if there is no movie under the name that is written in the input field
  if (res.results.length === 0) {
    const noMovies = document.querySelector("#noMovies");
    noMovies.style.display = "block"; //noMovies div is hidden in the html and  we wan to show the message that's why we change display none to display block
    document.addEventListener("click", () => { //to disappear the message
      noMovies.style.display = "none";
    })
  }
  //else if we have movies under the name show us 
  else {
    CONTAINER.innerHTML = "";
    renderMovies(res.results);
  }
}

const renderSearchMovies = () => {
  const searchForm = document.querySelector("#form-search");
  const inputValue = document.querySelector("#search-input");
  //to give functionality to the close icon
  document.querySelector(".close").addEventListener("click", () => {
    return searchForm.reset();
  })
  //giving the name of the movie to SearchMovies method
  return searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    SearchMovies(inputValue.value);
  })

}

//ending of search for movies

///////////////////////////////////////////////////////

// genre part
const fetchingGenre = async () => {
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  return data.genres;
}

const fetchingDiscover = async (genersId) => {
  const url = constructUrl("discover/movie");
  const res = await fetch(`${url}&with_genres=${genersId} `);
  const data = await res.json();
  return data.results;
}

const generes = async (genereId) => {
  const movies = await fetchingDiscover(genereId);
  console.log(movies)
  CONTAINER.innerHTML = "";
  renderMovies(movies);
}

//for rendering Generes movies
const renderGeners = async () => {
  const genersElements = document.querySelector("#geners");
  const typeOfgeners = await fetchingGenre();
  genersElements.addEventListener("click", (e) => {
    return typeOfgeners.forEach((i) => {
      if (i.name === e.target.innerText) {
        generes(i.id);
      }
    })
  })
}
console.log(renderGeners());



// end of genre /////////////////////////////////////


// navbar menu for responsiving the navbar
const navbarMenu = () => {
  const main = document.querySelector("main");
  const list = document.querySelector("ul");
  const menuIcon = document.getElementById("menu-icon");
  return menuIcon.addEventListener("click", () => {
    console.log(menuIcon.name);
    menuIcon.name === "menu"
      ? ((menuIcon.name = "close"),
        list.classList.add("top-[80px]"),
        list.classList.add("opacity-[100]", main.classList.add("mt-[350px]")))
      : ((menuIcon.name = "menu"),
        list.classList.remove("top-[80px]"),
        list.classList.remove("opacity-[100]"),
        main.classList.remove("mt-[350px]"));
  });
};


// !  yahia functionality
// TODO:  fetch 5 actors for single movei page
const fetchActors = async () => {
  const url = constructUrl("person/popular");
  const res = await fetch(url);
  return res.json();
};
//  TODO: get 5 actors detai

document.addEventListener("DOMContentLoaded", autorun(), renderFilterMovies(), renderAbout(), renderHome(), navbarMenu(), renderSearchMovies());

