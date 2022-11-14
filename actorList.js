'use strict';
//..
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");


// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};




// ____________________________________actor rendering___________________________-
//Fetching Actors and Single Actors //
const actorsPage = async () => {
  const actors = await fetchActors(); 
  renderActors(actors.results); 
};
// adding function to fetch actors in actor list page
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  console.log(url);
  const res = await fetch(url);
  return res.json();
  // .log(res.json())   wont work here 
};
const renderActors = (actors) => {
  
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    // const actorDiv2 = document.getElementById("actorPageContainer");
    actorDiv.innerHTML = `
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name
      } poster">
          <h3>${actor.name}</h3>`;
    actorDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    CONTAINER.appendChild(actorDiv);
  });
};
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  renderActor(actorRes);
};

// Single Actor fetch
const fetchActor = async (actorId) => {
  const url= constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  return res.json();
};
const renderActor = (actor) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div ><img src=${PROFILE_BASE_URL + actor.profile_path}></div>
        
            <div >
            <h2 id="actor-name"><b>Name:</b> ${actor.name}</h2>
            <p id="actor-gender"><b>Gender:</b> ${actor.gender}</p>
            <p id="actor-popularity"><b>Popularity:</b> ${actor.popularity} </p>
            <p id="actor-birthday"><b>Birthday:</b> ${actor.birthday} </p>
            <p id="actor-deathday"><b>Deathday:</b> ${actor.deathday} </p>
            <h3 class="pt-6"><b>Biography:</b></h3>
            <p id="actor-biography">${actor.biography}</p>
        </div>
        <div >  `;
};



document.addEventListener("DOMContentLoaded", actorsPage);