
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const CONTAINER2 = document.querySelector(".container2");
const ACTORS = document.querySelector("#actorsLink");

let movieGenres = document.querySelector("#movieGenres");
let openMenu = document.getElementById("mega-menu-full");
function toggleIt() {
  return movieGenres.classList.toggle("hidden");
}
function toggleItNavbar() {
  return openMenu.classList.toggle("hidden");
}

const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

const autorun2 = async () => {
  const actors = await fetchActors();
  renderActors(actors.results);
  console.log(actors);
};

const fetchActors = async () => {
  const actorNames = constructUrl(`/person/popular`);
  const res = await fetch(actorNames);
  return res.json();
};
const fetchPersonDetails = async (personId) => {
  const PERSON_URL = constructUrl(`/person/${personId}`);
  const res = await fetch(PERSON_URL);
  return res.json();
};

const actorDetails = async (actor) => {
  const details = await fetchPersonDetails(actor);
  renderActorPage(details);
};

const renderActorPage = (actor) => {
  const {
    also_known_as,
    biography,
    birthday,
    deathday,
    name,
    popularity,
    profile_path,
    gender,
  } = actor;

  CONTAINER2.innerHTML = "";
  const singleActorPage = document.createElement("div");

  singleActorPage.innerHTML = `<div class="text-white">  
    <img src=${PROFILE_BASE_URL + profile_path}>
    <h1>${name}</h1>
    <h1>birthday: ${birthday}</h1>
    <h1>${deathday ? `deathday: ${deathday}` : ""}</h1>
    <h1>popularity:${popularity}</h1>
    <h1>gender:${gender}</h1>
    <p>${biography}</p>
  </div>`;
  document.getElementById("actorsPage").appendChild(singleActorPage);
};

const renderActors = (actors) => {
  actors.forEach((actor) => {
    console.log(actor);
    const actorsDiv = document.createElement("div");
    actorsDiv.innerHTML = `<div class="transform transition duration-500 hover:scale-95 hover:brightness-50">
            <img class="cursor-pointer" src="${
              BACKDROP_BASE_URL + actor.profile_path
            }" alt="${actor.name} poster"></div>
            <h3 class="text-white font-gotham text-500">${actor.name}</h3> 
            `;
    actorsDiv.addEventListener("click", () => {
      actorDetails(actor.id);
    });
    CONTAINER2.appendChild(actorsDiv);
  });
};

document.addEventListener("DOMContentLoaded", autorun2);
