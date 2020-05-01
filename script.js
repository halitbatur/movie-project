const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185'
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'
const CONTAINER = document.querySelector('.container');


autorun = async() => {
    movies = await fetchMovies()
    renderMovies(movies.results)
}


constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`
}


movieDetails = async(movie) => {
    movieRes = await fetchMovie(movie.id)
    renderMovie(movieRes);
}


fetchMovies = async() => {
    const url = constructUrl(`movie/now_playing`)
    res = await fetch(url)
    return res.json()
}


fetchMovie = async(movieId) => {
    const url = constructUrl(`movie/${movieId}`)
    const res = await fetch(url);
    return res.json()
}


renderMovies = (movies) => {
    movies.map(movie => {
        movieDiv = document.createElement('div')
        movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL+movie.backdrop_path}" alt="${movie.title} poster">
        <h3>${movie.title}</h3>`
        movieDiv.addEventListener("click", () => {
            movieDetails(movie);
        });
        CONTAINER.appendChild(movieDiv);
    })
}


renderMovie = (movie) => {
    CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
}



document.addEventListener("DOMContentLoaded", autorun);