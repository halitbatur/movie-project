'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const traileCONTAINER = document.querySelector(".trailer");
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
  const actorRes = await fetchActors(movie.id);
  const movieTrailer = await fetchMovie(movie.id+"/videos");
  const movieSimilar = await fetchReleatedMovies(movie.id);
  renderMovie(movieRes,actorRes,movieTrailer.results,movieSimilar.results);
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

const fetchActors = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};

const fetchReleatedMovies = async (id) => {
  const url = constructUrl(`movie/${id}/similar`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};



//..........................................style.........................................................

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
const renderMovie = (movie, actors, videos,releated) => {
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
            <h3>Find your best Actor</h3>
            <ul id="actors" class="list-unstyled">
            </ul>
            <ul id="similar" class="list-unstyled">
            </ul>
    </div>
    <div>
    <iframe class="movie-trailer" src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key:videos[0].key}" 
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen></iframe>  </div>`;
  
    `;  
  //   const similarList = document.getElementById("similar")
  //   similarList.append(renderSimilarMovies(similarMovies))
  // };
  
  // const renderSimilarMovies = (similarMovies) =>  {
  //   similarMovies.cast.slice(0, 5).map((similarMovies) => {
  //     const actorDiv = document.createElement("ul");
  //     actorDiv.innerHTML = `
  //         <li>${similarMovies.name}</li>
  //         <img src="${BACKDROP_BASE_URL + similarMovies.profile_path}" alt="${similarMovies.name} poster" style="width:48px ">`;
  //     actorDiv.addEventListener("click", () => {displaySingleActorPage();});
  //     CONTAINER.appendChild(actorDiv);
  //   });



    const actorList = document.getElementById("actors")
    actorList.append(renderActors(actors))
  
   
    
    const releatedList = document.getElementById("releated")
    releatedList.append(renderReleatedMovies(releated))

    traileCONTAINER.innerHTML = ` <div>
    <iframe class="movie-trailer" src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key:videos[0].key}" 
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen></iframe>  </div>`;


  };
  //__________________________      renderActors  __________________________________________________
  const renderActors = (actors) =>  {
      actors.cast.slice(0, 5).map((actor) => {
      const actorDiv = document.createElement("ul");
      actorDiv.innerHTML = `
          <li>${actor.name}</li>
          <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster" style="width:48px ">`;
      actorDiv.addEventListener("click", () => {displaySingleActorPage();});
      CONTAINER.appendChild(actorDiv);
    });


    const displaySingleActorPage = () => {
      CONTAINER.innerHTML = `
        <div class="">
            <div class="">
                <h1>Hello I'm Ahmad Hassoun</h1>
            </div>`;
    };

  } 

  const renderReleatedMovies = (releateds) =>  {
    releateds.similar.slice(0, 5).map((relate) => {
    const relateDiv = document.createElement("ul");
    relateDiv.innerHTML = `
        <li>${actor.name}</li>
        <img src="${BACKDROP_BASE_URL + relate.backdrop_path}" alt="${  relate.title } poster">`;

          relateDiv.addEventListener("click", () => {
      //displaySingleActorPage();
    });
    CONTAINER.appendChild(relateDiv);
  });

}


document.addEventListener("DOMContentLoaded", autorun);
