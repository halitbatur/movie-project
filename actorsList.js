
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const CONTAINER2 = document.querySelector(".container2");
const ACTORS = document.querySelector('#actorsLink');

const constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  };

const autorun2 = async () => {
    const actors = await fetchActors();
    renderActors(actors.results);
    console.log(actors)
  }

 const fetchActors = async () => {
    const actorNames = constructUrl(`/person/popular`);
    const res = await fetch(actorNames);
    return res.json()
  }



    const renderActors = (actors) => {
      actors.map((actor) => {
        const actorsDiv = document.createElement("div");
        actorsDiv.classList.add;
        actorsDiv.innerHTML = `
            <img class="cursor-pointer" src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${
          actor.name
        } poster">
            <h3>${actor.name}</h3>`;
        // movieDiv.addEventListener("click", () => {
        //   movieDetails(movie);
        // });
        CONTAINER2.appendChild(actorsDiv);
      });
    };
    


document.addEventListener("DOMContentLoaded", autorun2);