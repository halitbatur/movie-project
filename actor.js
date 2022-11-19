'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");


const autorun = async() => {
    const actors = await fethActors();

    renderActors(actors.results);

};



const constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};


const fethActors = async() => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    return res.json();
}

const actorDetail = async(actor) => {
    const actorRes = await fethActor(actor.id);
    console.log(actorRes);
    renderActor(actorRes);

}

const fethActor = async(actorId) => {
    const url = constructUrl(`person/${actorId}`);
    const res = await fetch(url);
    return res.json();
};

const renderActors = (actors) => {
    actors.map((actor) => {
        //const movieDiv = document.getElementById("nowPlaying");
        const divCard = document.createElement("div");
       

        divCard.innerHTML = `
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${
            actor.name
          }poster">
          <h3>${actor.name}</h3>`;
      divCard.addEventListener("click", () => {
        actorDetail(actor);
      });
      CONTAINER.appendChild(divCard);
    });
  }; 
           
const renderActor = (actor) => {
    CONTAINER.innerHTML = `
      <div class="actor-poster">
               <img id="movie-backdrop" src=${
                 BACKDROP_BASE_URL + actor.profile_path
               }>
          </div>
          <div class = "actor-info">
              <h3 id="Actor-name">${actor.name}</h3>
              <ul class = "actor-misc-info">
              <li class="actor-birth-date"><b>Birthday:</b> ${actor.birthday}
              </li>
              <li class ="actor-placeofbirth"><b>Place of Birth:</b> ${actor.place_of_birth}</li>
              <li class="actor-popularity"><b>Popularity:</b> ${
                actor.popularity
              }</li>
              </ul>
              
              <p class ="known for department"><b>Known for Department:</b> ${
                actor.known_for_department
              }</p>
              
              <p id="Bio"><b id="bio-head">Biography:</b><br>${actor.biography}</p>
          </div>
          
      
      
      `;
  };
  


document.addEventListener("DOMContentLoaded", autorun);