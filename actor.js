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

