"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.createElement("div");
CONTAINER.classList.add("container");
const selectedGenras = [];
const mainContainer = document.querySelector(".mainContainer");
mainContainer.appendChild(CONTAINER);

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  const actors = await fetchActors(); // added new for actors
  genresDetails();
  renderMovies(movies.results);
  renderActors(actors.results); // added new for actors
};

// Function for URL & API key
// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// Movie Details Function
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const credits = await fetchCredits(movie.id); //added new to get actors & director
  const similarMovies = await fetchSimilarMovies(movie.id); //added new to get similar movies
  renderMovie(movieRes, credits, similarMovies);
};

// Fetch Movies Function
// This function is to fetch movies.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};


// Fetch single Movie Function
// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

//This is for fetching Credits (created new)
// Don't touch this function please. This function is to fetch credits for one movie.
const fetchCredits = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};

// fetching Similar Movies for each single movie page
//This is for fetching Similar Movies for each movie (created new)
const fetchSimilarMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};

// Render Movies Function
const renderMovies = (movies) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("grid", "grid-cols-1", "gap-6", "md:grid-cols-2", "lg:grid-cols-3","lg:px-20");

  movies.map((movie) => {
    //To Create genres' name for each movie based on genre_ids
    const movieGenreIdArray = movie.genre_ids;
    const genre = [];
    movieGenreIdArray.map((eachMovieGenreId) => {
      if (eachMovieGenreId === 27) {
        genre.push("Horror");
      } else if (eachMovieGenreId === 53) {
        genre.push("Thriller");
      } else if (eachMovieGenreId === 28) {
        genre.push("Action");
      } else if (eachMovieGenreId === 14) {
        genre.push("Fantasy");
      } else if (eachMovieGenreId === 878) {
        genre.push("Science Fiction");
      } else if (eachMovieGenreId === 9648) {
        genre.push("Mystery");
      } else if (eachMovieGenreId === 18) {
        genre.push("Drama");
      } else if (eachMovieGenreId === 12) {
        genre.push("Adventure");
      } else if (eachMovieGenreId === 80) {
        genre.push("Crime");
      } else if (eachMovieGenreId === 16) {
        genre.push("Animation");
      } else if (eachMovieGenreId === 36) {
        genre.push("History");
      } else if (eachMovieGenreId === 10752) {
        genre.push("War"); // Below this are all created new
      }else if (eachMovieGenreId === 35) {
        genre.push("Comedy");
      } else if (eachMovieGenreId === 99) {
        genre.push("Documentary");
      } else if (eachMovieGenreId === 10751) {
        genre.push("Family");
      } else if (eachMovieGenreId === 10402) {
        genre.push("Music");
      } else if (eachMovieGenreId === 10749) {
        genre.push("Romance");
      } else if (eachMovieGenreId === 10770) {
        genre.push("Tv Movie");
      } else if (eachMovieGenreId === 37) {
        genre.push("Western");
      }       
      return genre;
    });

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movieContainer");
    movieDiv.innerHTML = `
             <div class="image-container relative w-full border-8 border-black">
                <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster class="home-movie-image opacity-100 block w-full h-auto transition ease-in duration-500">
                <div class="middle transition ease-in duration-500 opacity-0 absolute -translate-y-2/4 -translate-x-2/4 text-justify w-72">
                    <div class="textonimage bg-black text-white text-xs w-full p-3"><b>Rating:</b> ${movie.vote_average} <br><b>Genres:</b> ${genre} <br><b>Description:</b> ${movie.overview}</div>
                </div>
              </div>
              <h1 class= "text-center md:text-4xl text-2xl font-bold font-mono bg-black text-white h-20 md:h-28 lg:h-36 xl:h-28 m-auto p-3">${movie.title}</h1>`;
    
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    
    newDiv.appendChild(movieDiv);
    CONTAINER.appendChild(newDiv);
  });
};



// Render Single Movie Function
const renderMovie = (movie, credits, similarMovies) => {

    //console.log(movie)
    //console.log(similarMovies)  

    let movieGenres = movie.genres
    let movieGenresIdArray =[]

    movieGenres.map( eachGenre =>{
        movieGenresIdArray.push(eachGenre.id)
        return movieGenresIdArray
    })

    console.log(movieGenresIdArray)
    let similarMoviesResults = similarMovies.results
    //console.log(similarMoviesResults)
    let SimilarMoviesGenresId = similarMoviesResults.map( eachObject => eachObject.genre_ids)


  CONTAINER.innerHTML = `
    <div class="row bg-black text-white mx-auto w-full">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>

        <div class="col-md-8 bg-black text-white w-full">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3 class="pt-6"><b>Overview:</b></h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        
        <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
                <li><a href="/"> ${credits.cast[0].name} </a></li>
                <li><a href="/"> ${credits.cast[1].name} </a></li>
                <li><a href="/"> ${credits.cast[2].name} </a></li>
                <li><a href="/"> ${credits.cast[3].name} </a></li>
                <li><a href="/"> ${credits.cast[4].name} </a></li>
            </ul>

        <div class="m-auto"> 
            <p id="movie-language"><b>Movie Language:</b> ${movie.original_language} </p>
        </div>

        <div class="m-auto flex"> 
            <p id="related-movies"><b>Related Movies:</b></p>
            <ul>
              <li> ${similarMovies.results[1].title} </li>
              <li> ${similarMovies.results[2].title} </li>
              <li> ${similarMovies.results[3].title} </li>
              <li> ${similarMovies.results[4].title} </li>
              <li> ${similarMovies.results[5].title} </li>
              <li> ${similarMovies.results[6].title} </li>
            </ul>
        
        </div>
            
        <div>
            <p id="production-company"><b>Production Company:</b> ${movie.production_companies[0].name}</p>
            <img id="production-company-logo" src=${BACKDROP_BASE_URL + movie.production_companies[0].logo_path}/>
        </div>
            
        
        <div class="movie-trailer pt-10 w-full text-center mx-auto">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/d4m9WCxb-J8" title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>

        <div class="pt-20">
        <p id="director-name"> <b>Director's Name</b>   </p>
        </div>

        <div class="pt-20">
        <p id="movie-rating"> <b>Movie Ratings </b>  ${movie.vote_average} </p>
        <p id="recieved-votes"> <b> Recieved Votes: </b> ${movie.vote_count} votes</p>
        </div>
    </div>`;
};

//Director's name ${credits.crew[15].name}

// FETCH GENRES AND IMPLEMENT THE FILTERING BASED ON GENDER
const fetchGenresName = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};
const genresDetails = async () => {
  const genre = await fetchGenresName();
  renderGenres(genre.genres);
};

// FITCH FILTERD GENRAS
const fetchGenresFilterd = async () => {
  const url =
    constructUrl(`discover/movie`) + `&with_genres=${selectedGenras.join(",")}`;
  const res = await fetch(url);
  return res.json();
};
const getFilterdMoviesByGenres = async () => {
  const genres = await fetchGenresFilterd();
  rendermoviesBasedOnGenres(genres.results);
};
const rendermoviesBasedOnGenres = (movies) => {

  while (CONTAINER.firstChild) {
    CONTAINER.firstChild.remove();
  }

  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    CONTAINER.classList.add("grid", "grid-cols-1", "gap-6", "md:grid-cols-2", "lg:grid-cols-3", "lg:px-20");
    movieDiv.setAttribute("id", "movieCard");
    
    //To Create genres' name for each movie based on genre_ids
    const movieGenreIdArray = movie.genre_ids;
    const genre = [];
    movieGenreIdArray.map((eachMovieGenreId) => {
      if (eachMovieGenreId === 27) {
        genre.push("Horror");
      } else if (eachMovieGenreId === 53) {
        genre.push("Thriller");
      } else if (eachMovieGenreId === 28) {
        genre.push("Action");
      } else if (eachMovieGenreId === 14) {
        genre.push("Fantasy");
      } else if (eachMovieGenreId === 878) {
        genre.push("Science Fiction");
      } else if (eachMovieGenreId === 9648) {
        genre.push("Mystery");
      } else if (eachMovieGenreId === 18) {
        genre.push("Drama");
      } else if (eachMovieGenreId === 12) {
        genre.push("Adventure");
      } else if (eachMovieGenreId === 80) {
        genre.push("Crime");
      } else if (eachMovieGenreId === 16) {
        genre.push("Animation");
      } else if (eachMovieGenreId === 36) {
        genre.push("History");
      } else if (eachMovieGenreId === 10752) {
        genre.push("War"); 
      }else if (eachMovieGenreId === 35) {
        genre.push("Comedy");
      } else if (eachMovieGenreId === 99) {
        genre.push("Documentary");
      } else if (eachMovieGenreId === 10751) {
        genre.push("Family");
      } else if (eachMovieGenreId === 10402) {
        genre.push("Music");
      } else if (eachMovieGenreId === 10749) {
        genre.push("Romance");
      } else if (eachMovieGenreId === 10770) {
        genre.push("Tv Movie");
      } else if (eachMovieGenreId === 37) {
        genre.push("Western");
      }       
      return genre;
    });

  
    movieDiv.innerHTML = `
            <div class="image-container relative w-full border-8 border-black">
                <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster class="home-movie-image opacity-100 block w-full h-auto transition ease-in duration-500">
                <div class="middle transition ease-in duration-500 opacity-0 absolute -translate-y-2/4 -translate-x-2/4 text-justify w-72">
                    <div class="textonimage bg-black text-white text-xs w-full p-3"><b>Rating:</b> ${movie.vote_average} <br><b>Genres:</b> ${genre}  <br><b>Description:</b> ${movie.overview}</div>
                </div>
              </div>
              <h1 class= "text-center md:text-4xl text-2xl font-bold font-mono bg-black text-white h-20 md:h-28 lg:h-36 xl:h-28 m-auto p-3">${movie.title}</h1>`;
    
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    CONTAINER.appendChild(movieDiv);
    mainContainer.appendChild(CONTAINER);
  });
};

const renderGenres = (genre) => {
  const listContainer = document.getElementById("genreList");

  genre.forEach((ele) => {
    const listElement = document.createElement("li");
    const licontent = document.createElement("p");
    listElement.classList.add("text-sm", "hover:bg-gray-100", "text-gray-700", "block", "px-4", "py-2");
    licontent.innerText = `${ele.name}`;

    listElement.addEventListener("click", () => {
      if (selectedGenras.length === 0) {
        selectedGenras.push(ele.id);
      } else {
        if (selectedGenras.includes(ele.id)) {
          selectedGenras.forEach((id, indx) => {
            if (id === ele.id) {
              selectedGenras.splice(indx, 1);
            }
          });
        } else {
          selectedGenras.push(ele.id);
        }
      }
      getFilterdMoviesByGenres();
    });

    listElement.appendChild(licontent);
    listElement.setAttribute("id", ele.name);
    listContainer.appendChild(listElement);
  });
};

//Fetching Actors and Single Actors //

// Actor Details Function
const actorDetails = async (actor) => {
    const actorRes = await fetchActor(actor.id);
    const movieCredits = await fetchMovieCredits(actor.id)
    renderActor(actorRes, movieCredits);
  };

// fetch Actors Function
const fetchActors = async () => {
    const url2 = constructUrl(`person/popular`);
    const res = await fetch(url2);
    return res.json();
  }; 

//fetch Movie Credits Function for each Actor
const fetchMovieCredits = async (actorId) => {
    const url2 = constructUrl(`person/${actorId}/movie_credits`);
    const res = await fetch(url2);
    return res.json();
  };  
  
//fetch Single Actor Function
const fetchActor = async (actorId) => {
    const url2 = constructUrl(`person/${actorId}`);
    const res = await fetch(url2);
    return res.json();
  };
  
// renderActors Function
const renderActors = (actors) => {
   // console.log(actors)
   const newDiv2 = document.createElement('div')
   newDiv2.classList.add("grid","grid-cols-1","gap-6","md:grid-cols-2","lg:grid-cols-3","lg:px-20")
   actors.map( (actor) => {

       const actorDiv = document.createElement("div");
       actorDiv.classList.add('actorContainer')
       actorDiv.innerHTML = `
        <div class= "w-80 mx-auto">
          <div class="image-container relative w-full border-8 border-black">
            <img src="${PROFILE_BASE_URL  + actor.profile_path}" alt="${actor.name}" poster class=" home-movie-image opacity-100 block w-full h-auto transition ease-in duration-500">
            <div class="middle transition ease-in duration-500 opacity-0 absolute -translate-y-2/4 -translate-x-2/4 text-justify w-72">
            <div class="textonimage bg-black text-white text-xs w-full p-3"><b>Id:</b> ${actor.id} <br><b>Genres:</b>??<br><b>Description:</b> ??</div>
            </div>
          </div>
          <h1 class= "text-center text-2xl md:text-3xl font-bold font-mono bg-black text-white h-20 md:h-28 lg:h-36 xl:h-28 m-auto p-3">${actor.name}</h1>
       </div> `
       actorDiv.addEventListener("click", () => {
         actorDetails(actor);
       });

    newDiv2.appendChild(actorDiv)
    CONTAINER.appendChild(newDiv2);
   });
};

//render Single Actor Function
const renderActor = (actor, movieCredits) => {
//console.log(actor, movieCredits)

CONTAINER.innerHTML = `
 <div class="row bg-white text-black mx-auto w-full">
     <div class="col-md-4">
          <img id="actor-backdrop" src=${PROFILE_BASE_URL + actor.profile_path}>
     </div>

     <div class="col-md-8 bg-white text-black w-full">
         <h2 id="actor-name"><b>Name:</b> ${actor.name}</h2>
         <p id="actor-gender"><b>Gender:</b> ${actor.gender}</p>
         <p id="actor-popularity"><b>Popularity:</b> ${actor.popularity} </p>
         <p id="actor-birthday"><b>Birthday:</b> ${actor.birthday} </p>
         <p id="actor-deathday"><b>Deathday:</b> ${actor.deathday} </p>
         <h3 class="pt-6"><b>Biography:</b></h3>
         <p id="actor-biography">${actor.biography}</p>
     </div>
     
     <h3>List of Movies the Actor Participated in:</h3>
     <ul id="list-of-movies-actor-participated-in" class="list-unstyled" >
          <li> 
             <a href="#"> ${movieCredits.cast[0].title}</a>
          </li>
             
          <li> 
             <a href="#"> ${movieCredits.cast[1].title}</a>
          </li>
             
          <li> 
             <a href="#"> ${movieCredits.cast[2].title} </a>
          </li>
             
          <li> 
             <a href="#">${movieCredits.cast[3].title} </a>
          </li>
             
          <li> 
             <a href="#"> ${movieCredits.cast[4].title}</a>
          </li>

          <li> 
             <a href="#"> ${movieCredits.cast[5].title}</a>
          </li>

          <li> 
            <a href="#"> ${movieCredits.cast[6].title}</a>
           </li>
      </ul> 
 </div>`;
};  


document.addEventListener("DOMContentLoaded", autorun);