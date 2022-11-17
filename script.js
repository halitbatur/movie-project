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
  const casts = await fetchMovieCredits(movie.id);
  const trailor = await fetchingMovieTrailor(movie.id);
  const similar = await fetchingSimilarMovies(movie.id);

  renderMovie(movieRes, casts, trailor.results, similar);
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
  return data;
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("grid-item");
    movieDiv.innerHTML = `<img id="image" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" /> <span class="yearOfRelease">${movie.release_date}</span> <p class="title">${movie.title}</p> <span class="rating"> <ion-icon name="star" class="star"></ion-icon> ${movie.vote_average}/10 </span>`;

    movieDiv.addEventListener("click", () => {

      movieDetails(movie);
    });
    gridContainer.appendChild(movieDiv);

  });
  CONTAINER.appendChild(gridContainer);
};

///single page

//fetching movie credits
const fetchMovieCredits = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/credits`);
  const res = await fetch(url);
  return res.json();
}

//fetching movie videos
//trailor
const fetchingMovieTrailor = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/videos`);
  const res = await fetch(url);
  return res.json();
}
//fetching similar movies
const fetchingSimilarMovies = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/similar`);
  const res = await fetch(url);
  return res.json();
}


// You'll need to play with this function in order to add features and enhance the style.
//rendering single page
const renderMovie = (movie, castsData, trailor, similar) => {
  const casts = castsData.cast.slice(0, 5);
  const similarMovies = similar.results.slice(0, 5);
  console.log(similarMovies)
  CONTAINER.innerHTML = `
    <div class=" w-full">
     <div class="flex p-12">
        <div class="grid-item mx-12 w-9/12">
            <img class="w-full h-full" src=${BACKDROP_BASE_URL + movie.poster_path}>
        </div>
        <div class="text-lg flex flex-col gap-2">
            <h2 class="text-[1.5rem] font-bold" >${movie.title}</h2>
            <p ><span class="text-xl font-bold mr-2">Release Date:</span> ${movie.release_date}</p>
            <p ><span class="text-xl font-bold mr-2">Rating:</span> ${movie.vote_average}</p>
            <p ><span class="text-xl font-bold mr-2">Runtime:</span> ${movie.runtime} Minutes</p>
            <p ><span class="text-xl font-bold mr-2">Genre:</span> ${movie.genres.map(genre => "   " + genre.name)}</p>
            <p ><span class="text-xl font-bold mr-2">Language:</span> ${movie.spoken_languages.map(lang => "   " + lang.english_name)}</p>
            <h3 class="text-3xl font-bold">Overview:</h3>
            <p class="text-lg">${movie.overview}</p>
          </div> 
    </div>
    </div>`;
  //? isWork
  //casts profile picture and their names
  const castsDiv = document.createElement("div");
  castsDiv.classList.add("flex", "flex-row", "justify-evenly", "py-24", "text-center");
  casts.map((cast) => {
    const castDiv = document.createElement("div");
    castDiv.innerHTML = `
    <img src="${PROFILE_BASE_URL + cast.profile_path}" class="rounded-full grid-item">
    <p class="mt-2 text-xl font-bold">${cast.original_name}</p>
    `
    castsDiv.appendChild(castDiv);
  })
  //trailor
  const keyUrl = trailor.map(key => key.key)
  const trailorDiv = document.createElement("div");
  trailorDiv.classList.add("flex", "flex-col", "items-center", "py-24", "text-center", "gap-1");
  trailorDiv.innerHTML = `
  <h1 class="text-4xl font-bold mb-4">Trailor</h1>
  <iframe src="https://www.youtube.com/embed/${keyUrl[0]}" height="400px" width="600px"></iframe>
  `
  //production company
  const CompanyDiv = document.createElement("div");
  CompanyDiv.classList.add("flex", "flex-col", "items-center", "py-24", "text-center", "gap-1");
  const companyTopic = document.createElement("h1");
  companyTopic.innerText = "Production Companies"
  companyTopic.classList.add("text-4xl", "font-bold");
  CompanyDiv.appendChild(companyTopic);
  const companyLogos = document.createElement("div");
  companyLogos.classList.add("flex", "mt-4");
  CompanyDiv.appendChild(companyLogos);

  movie.production_companies.map((company) => {
    const oneCompany = document.createElement("div");
    oneCompany.classList.add("w-[200px]", "text-center");
    oneCompany.innerHTML = `
    <img src="${BACKDROP_BASE_URL + company.logo_path}">
    <p class="text-xl font-bold">${company.name}</p>`
    companyLogos.appendChild(oneCompany);

  })

  //similar movies
  const similarMovieTitle = document.createElement("h1");
  similarMovieTitle.innerText = "Similar Movies"
  similarMovieTitle.classList.add("text-4xl", "font-bold", "text-center", "mb-4");
  const similarDiv = document.createElement("div");
  similarDiv.classList.add("flex", "gap-2");
  similarMovies.map((movie) => {
    const oneMovie = document.createElement("div");
    oneMovie.classList.add("text-center", "cursor-pointer");
    oneMovie.innerHTML = `
     <img src="${BACKDROP_BASE_URL + movie.poster_path}">
     <p class="mt-2 text-xl font-bold">${movie.title}</p>
    `
    similarDiv.addEventListener("click", () => {

      movieDetails(movie);
    });
    similarDiv.appendChild(oneMovie)

  })

  CONTAINER.appendChild(castsDiv);
  CONTAINER.appendChild(trailorDiv);
  CONTAINER.appendChild(CompanyDiv);
  CONTAINER.appendChild(similarMovieTitle);
  CONTAINER.appendChild(similarDiv);

};

/////end of ///single page//////////

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


///////////////////////////////////////////////////////

///Actors part
//for fetching popular actors
const fetchActors = async () => {
  let url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return await res.json();
};

const fetchActor = async (actor) => {
  let url = constructUrl(`person/${actor.id}`);
  const res = await fetch(url);
  //console.log(res.json());
  return await res.json();
};

const renderActors = async () => {
  const actors = await fetchActors()
  const actorList = document.querySelector("#Actors");
  const actorsDiv = document.createElement("div");
  actorsDiv.classList.add("grid", "grid-cols-5", "gap-y-4", "px-24", "py-12", "cursor-pointer", "text-center")
  actorList.addEventListener("click", () => {
    CONTAINER.innerHTML = '';
    actors.results.forEach((actor) => {
      const actorCard = document.createElement("div");

      actorsDiv.appendChild(actorCard);

      actorCard.innerHTML = `
      <img class="grid-item" src="${PROFILE_BASE_URL + actor.profile_path}">
   
      <p class="mt-2 text-xl font-bold">${actor.name}
      
      </p>
    
   `
      actorCard.addEventListener("click", () => {
        renderActor(actor);
      });
      CONTAINER.appendChild(actorsDiv);
    });

  });
};
// function to show single actor Info
const renderActor = async (actor) => {
  const actorInfo = await fetchActor(actor);
  CONTAINER.innerHTML = `
  <div class="ml-20 p-12">
  <div class=" mr-8 float-left ">
  <img class="rounded-3xl" src="${PROFILE_BASE_URL + actorInfo.profile_path}">
  </div>
  <div class="text-lg flex flex-col gap-2 ">
  <h2 class="text-xl flex flex-col gap-2 font-bold"> Name: ${actorInfo.name}</h2>
  <P> <span class="text-xl font-bold mr-2">Gender:</span> ${actorInfo.gender === 2 ? "Male" : "Female"}</P>
  
  <p><span class="text-xl font-bold mr-2">Popularity:</span> ${actorInfo.popularity}</p>  
  <p><span class="text-xl font-bold mr-2">Birthday:</span> ${actorInfo.birthday}</p>
  <p><span class="text-xl font-bold mr-2">Death Date:</span> ${actorInfo.deathday}</p>
  
  <h3 class="text-3xl font-bold">Biography:</h3>
  <p class="text-lg">${actorInfo.biography}</p>
</div> </div>  `
}

//end of actors part
/////////////////////////////////////

// genres part
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
//////////////////////////

// filter nav
const fetchFilterMovies = async (typeFilter) => {
  const url = constructUrl(`movie/${typeFilter}`);
  const res = await fetch(url);
  return res.json();
}

const FilterMovies = async (typeFilter) => {
  const movies = await fetchFilterMovies(typeFilter);
  renderMovies(movies.results);
}

const renderFilterMovies = () => {
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
}
// end of filter nav



// Rendering about page
const renderAbout = () => {
  const about = document.querySelector("#about");
  about.addEventListener("click", () => {
    CONTAINER.innerHTML = "";
    CONTAINER.innerHTML = `
    <div class="  pt-24 mb-20  px-20 ml-[100px] ">
    <div class="text-center">
    <h1 class="text-[#dcf836] md:text-6xl  text-3xl tracking-wide font-extrabold mb-7 ">Let's talk about TMDB</h1>
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
/////////////////////////////////////

// navbar menu for responsiving the navbar
const navbarMenu = () => {
  const main = document.querySelector("main");
  const list = document.querySelector("ul");
  const menuIcon = document.getElementById("menu-icon");
  return menuIcon.addEventListener("click", () => {
    // console.log(menuIcon.name);
    menuIcon.name === "menu" ? (menuIcon.name = "close", list.classList.add('top-[80px]'), list.classList.add('opacity-[100]', main.classList.add('mt-[350px]')))
      : (menuIcon.name = "menu", list.classList.remove('top-[80px]'), list.classList.remove('opacity-[100]'), main.classList.remove('mt-[350px]'))

  })
}

document.addEventListener("DOMContentLoaded", autorun(), renderFilterMovies(), renderAbout(), renderSearchMovies(), renderHome(), renderActors(), navbarMenu());




