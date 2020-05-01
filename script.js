const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185'
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'
const container = document.querySelector('.container');


autorun = async() => {
    movies = await fetchMovies()
    renderMovies(movies.results)
}

constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`
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
    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        const movieImage = document.createElement("img");
        movieImage.src = `${BACKDROP_BASE_URL}${movie.backdrop_path}`;
        const movieTitle = document.createElement("h3");
        movieTitle.textContent = `${movie.title}`;
        movieImage.addEventListener("click", () => {
            movieDetails(movie);
        });
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieImage);
        container.appendChild(movieDiv);
    })
}

renderMovie = (movie) => {
    container.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date">${movie.release_date}</p>
            <p id="movie-runtime">${movie.overview}</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;

    // const backdrop = document.createElement('img')
    // const title = document.createElement('h2')
    // const releaseDate = document.createElement('p')
    // const runtime = document.createElement('p')
    // const overview = document.createElement('p')
    // const overviews = document.createElement('h3')
    // const row = document.getElementById('row')
    // console.log(row);


    // backdrop.src = BACKDROP_BASE_URL + movie.backdrop_path
    // title.innerText = movie.title
    // releaseDate.innerText = movie.release_date
    // runtime.innerText = movie.runtime + " minutes"
    // overview.innerText = movie.overview
    // overviews.innerText = "OverView"

    // const backdropDiv = document.createElement('div')
    // backdropDiv.class = "col-md-4"
    // backdropDiv.appendChild(backdrop)
    // const detailsDiv = document.createElement('div')
    // detailsDiv.class = "col-md-8"
    // detailsDiv.appendChild(title)
    // detailsDiv.appendChild(releaseDate)
    // detailsDiv.appendChild(runtime)
    // detailsDiv.appendChild(overviews)
    // detailsDiv.appendChild(overview)


    // row.append(backdropDiv)
    // row.appendChild(detailsDiv)
}

movieDetails = async(movie) => {
    movieRes = await fetchMovie(movie.id)
    renderMovie(movieRes);
}

document.addEventListener("DOMContentLoaded", autorun);