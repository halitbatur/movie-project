'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

//Fetching Actors and Single Actors //
const autorun2 = async () => {
  const actors = await fetchActors(); // added new for actors
  renderActors(actors.results); // added new for actors
};
const constructUrl = (path) => {
  return `${TMDB_BASE_URL }/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// Actor Details Function
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  const movieCredits = await fetchMovieCredits(actor.id);
  renderActor(actorRes, movieCredits);
};


// fetch Actors Function
const fetchActors = async () => {
  const url2 = constructUrl(`person/popular`);
  const res = await fetch(url2);
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
  //deletingContainerContent();
  const newDiv2 = document.createElement("div");
  newDiv2.classList.add(
    "grid",
    "grid-cols-1",
    "gap-6",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "lg:px-20"
  );
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.classList.add("actorContainer");
    actorDiv.innerHTML = `
      <div class= "w-80 mx-auto">
        <div class="image-container relative w-full border-8 border-black">
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${
      actor.name
    }" poster class=" home-actor-image opacity-100 block w-full h-auto">
        </div>
        <h1 class= "text-center text-2xl md:text-3xl font-bold font-mono bg-black text-white h-20 md:h-28 lg:h-36 xl:h-28 m-auto p-3">${
          actor.name
        }</h1>
     </div> `;
    actorDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    newDiv2.appendChild(actorDiv);
    CONTAINER.appendChild(newDiv2);
  });
};


const createNav = async () => {

  // create navbar
  let navBar = document.createElement('div');
  navBar.setAttribute('id', 'navBar');
  navBar.setAttribute('class', 'h-32 w-full flex p-2 justify-between');

  document.body.prepend(navBar);

  // insert nav bar HTML DOM nodes here
  navBar.innerHTML = `
    <button id="homeButton" class="text-white text-xl"><a href="index.html">Home</a></button>
    <button id="homeButton" class="text-white text-xl"><a href="actor.html">Actors List</a></button>

    <img class="w-20 h-20" src="img/NBAH.png" alt=""> 
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
  
    </ul>
</div>`;
};

document.addEventListener("DOMContentLoaded", autorun2);

