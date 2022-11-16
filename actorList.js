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
    actorDiv.style="display: flex; width:30%;  flex-wrap: wrap;" ;
    // const actorDiv2 = document.getElementById("actorPageContainer");
    actorDiv.innerHTML = `
    <div class="movieList flex flex-col shadow-lg justify-center item-center  my-3 ">
          <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name
      } poster"  class="lastImg" >
          <h3 class="text-center text-2xl font-bold my-10 ">${actor.name}</h3>`;
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
    <div class="flex flex-wrap my-32 rounded-3xl shadow-lg">
        <div class="w-1/4 "><img src=${PROFILE_BASE_URL + actor.profile_path} class="w-96 rounded-lg"></div>
        
            <div class="w-3/4 mt-10">
            <h2 id="actor-name" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600">Name:</b> ${actor.name}</h2>
            <p id="actor-gender" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600">Gender:</b> ${actor.gender}</p>
            <p id="actor-popularity" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600">Popularity:</b> ${actor.popularity} </p>
            <p id="actor-birthday" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600">Birthday:</b> ${actor.birthday} </p>
            <p id="actor-deathday" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600">Deathday:</b> ${actor.deathday} </p>
            <h1 class="pt-6" class="text-2xl  font-bold ml-10 my-2"><b class="text-red-600 text-3xl ml-10 my-2">Biography:</b></h1>
            <p id="actor-biography" class="text-2xl  font-bold ml-10 my-2">${actor.biography}</p>
        </div>
        <div >  `;
        
};



document.addEventListener("DOMContentLoaded", actorsPage);