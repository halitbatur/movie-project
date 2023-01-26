'use strict';
//declaration 
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
  // console.log(movies)
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
    CONTAINER.appendChild(movieDiv);

  });
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path
    }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
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


// filter nav
// this is the filter nav
const fetchFilterMovies = async (typeFilter) => {
  const url = constructUrl(`movie/${typeFilter}`);
  const res = await fetch(url);
  return res.json();
}

const FilterMovies = async (typeFilter) => {
  const movies = await fetchFilterMovies(typeFilter);
  renderMovies(movies.results);
}
const popular = document.querySelector("#popular");
popular.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilterMovies("popular")
})
const topRated = document.querySelector("#top_rated");
topRated.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilterMovies("top_rated")
})

const nowPlaying = document.querySelector("#now_playing");
nowPlaying.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilterMovies("now_playing")
})

const upComing = document.querySelector("#upcoming");
upComing.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  FilterMovies("upcoming")
})
// end of filter nav

// rendering Home page
const renderHome = () => {
  const home = document.querySelectorAll(".home");
  home.forEach((i) => {
    i.addEventListener("click", () => {
      CONTAINER.innerHTML = "";
      return autorun();
    })
  })
}

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
    `
  })

}

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

// navbar menu for responsiving the navbar
const navbarMenu = () => {
  const main = document.querySelector("main");
  const list = document.querySelector("ul");
  const menuIcon = document.getElementById("menu-icon");
  return menuIcon.addEventListener("click", () => {
    console.log(menuIcon.name);
    menuIcon.name === "menu" ? (menuIcon.name = "close", list.classList.add('top-[80px]'), list.classList.add('opacity-[100]', main.classList.add('mt-[350px]')))
      : (menuIcon.name = "menu", list.classList.remove('top-[80px]'), list.classList.remove('opacity-[100]'), main.classList.remove('mt-[350px]'))

  })
}

document.addEventListener("DOMContentLoaded", autorun(), renderAbout(), renderSearchMovies(), renderHome(), navbarMenu());
