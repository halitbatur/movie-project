'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";



const autorun = async() => {
    const movies = await fethActors();

    renderMovies(movies.results);

};


const constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};


const fethActors = async() => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    // console.log(res.json());
    return res.json();
}

const renderActors = (actors) => {
    actors.map((actor) => {


    });

}


document.addEventListener("DOMContentLoaded", autorun);