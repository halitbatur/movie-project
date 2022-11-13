'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w200";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const fetchGenreName = async (genreId) => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  const data = await res.json();
  const genre = data.genres.find((genre) => genre.id === genreId);
  return genre.name;
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {

  movies.map(async (movie) => {
    const genreName = movie.genre_ids.map(async (genreId) => {
      return await fetchGenreName(genreId);
    });
    const genreNames = await Promise.all(genreName);

    const movieContainer = document.createElement("div");
    movieContainer.classList.add(
      "movie", "flex", "flex-col", "justify-center", "items-center",
      "max-w-xs", "rounded", "overflow-hidden", "bg-neutral-200",
      "cursor-pointer", "transition", "duration-500", "ease-in-out", "transform",
      "dark:bg-neutral-700", "dark:hover:bg-neutral-600",
      "hover:shadow-2xl", "hover:bg-neutral-400", "hover:-translate-y-1", "hover:scale-110",
    );
    movieContainer.innerHTML = `
      <img src="${BACKDROP_BASE_URL + movie.backdrop_path}"
        alt="${movie.title} poster" width="780" height="439">
      <h3 class="movie-title my-2 text-lg font-bold">
        ${movie.title}
      </h3>
      <p class="genre-names text-sm">
        Genres: ${genreNames.join(", ")}
      </p>
      <p class="movie-rating text-sm pb-4">
        Average vote: ${movie.vote_average}
      </p>
      <p class="description hidden absolute bottom-0 p-4 text-sm tracking-wide
          text-center bg-neutral-200 dark:bg-neutral-700 animate-fade-in-down">
        ${movie.overview}
      </p>
      `;
    movieContainer.addEventListener("click", () => {
      movieDetails(movie);
    });

    movieContainer.addEventListener("mouseover", () => {
      const description = movieContainer.querySelector(".description");
      description.classList.remove("hidden");
    });

    movieContainer.addEventListener("mouseout", () => {
      const description = movieContainer.querySelector(".description");
      description.classList.add("hidden");
    });

    CONTAINER.appendChild(movieContainer);
  });
};

const fetchVideoTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  const data = await res.json();
  const video = data.results.find((video) => video.type === "Trailer");
  return video.key;
};

const fetchMovieCredits = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  return data.cast;
};

const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);// 82104
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const fetchMovieDirectors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  const directors = data.crew.filter((crew) => crew.job === "Director");
  return directors;
};

const fetchSimilarMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const fetchMoviesParticipated = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  const data = await res.json();
  return data.cast;
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {

  const videoTrailer = await fetchVideoTrailer(movie.id);
  const movieCredits = await fetchMovieCredits(movie.id);
  const movieDirectors = await fetchMovieDirectors(movie.id);
  const similarMovies = await fetchSimilarMovies(movie.id);

  CONTAINER.innerHTML = `
    <div class="flex flex-col p-8 justify-center items-center rounded gap-8
      min-h-screen overflow-hidden bg-neutral-100 md:flex-row dark:bg-neutral-700">

      <!-- Movie poster -->

      <div class="w-full max-h-[65vh] md:w-1/2 md:min-h-full">
        <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.poster_path}
          class="w-full h-full object-contain md:object-cover rounded" alt="${movie.title} poster">
      </div>

      <!-- Movie details -->

      <div class="flex flex-col basis-2/3 justify-center items-center gap-4
        md:w-1/2 md:items-start">
        <h2 id="movie-title" class="text-2xl font-bold">${movie.title}</h2>

        <!-- Movie release date, runtime, language, rating -->

        <div class="flex flex-wrap justify-evenly items-center gap-4
          md:flex-row md:justify-start md:items-center">
          <p id="movie-release-date" class="text-sm"><b>Release Date:</b> ${movie.release_date}</p>
          <p id="movie-runtime" class="text-sm"><b>Runtime:</b> ${movie.runtime}</p>
          <p id="movie-language" class="text-sm"><b>Language:</b> ${movie.original_language.toUpperCase()}</p>
          <p id="movie-rating" class="text-sm"><b>Rating:</b> ${movie.vote_average}</p>
        </div>

        <!-- Movie overview -->

        <h3 class="text-2xl font-bold">Overview</h3>
        <p id="movie-overview">${movie.overview}</p>
        <iframe src="https://www.youtube.com/embed/${videoTrailer}" height="315"
          title="YouTube video player" frameborder="0" allowfullscreen
          allow="picture-in-picture" class="w-full"></iframe>
        </iframe>

        <!-- Related movies  -->

        <h3 class="text-2xl font-bold">Related Movies</h3>
        <div id="related-movies" class="flex flex-wrap w-full justify-center gap-4">
          ${similarMovies.slice(0, 6).map((movie) => {
    return `
              <div data-id="${movie.id}" class="related-movie flex flex-col
                basis-40 justify-center items-center rounded overflow-hidden
                bg-neutral-200 cursor-pointer transition duration-500 ease-in-out
                transform dark:bg-neutral-700 dark:hover:bg-neutral-600
                hover:shadow-2xl hover:bg-neutral-300 hover:-translate-y-1 hover:scale-110">
                <img src="${BACKDROP_BASE_URL + movie.poster_path}"
                  alt="${movie.title} poster" width="780" height="439">
                <h3 class="movie-title my-2 text-base font-bold text-center">
                  ${movie.title}
                </h3>
                <p class="movie-rating text-sm pb-4">
                  Average vote: ${movie.vote_average}
                </p>

              </div>
              `;
  }).join("")}
        </div>

        <h3 class="text-2xl font-bold">Credits</h3>
        <div id="movie-credits" class="flex flex-col gap-8 w-full justify-center items-center lg:items-start">

          <!-- Movie Director -->

          <div class="flex flex-col gap-4 w-full justify-center items-center lg:items-start">
            <h4 class="text-xl font-bold">Director</h4>
            <div class="flex flex-wrap justify-center gap-4">
              ${movieDirectors.map((director) => {
    return `
                  <div class="flex flex-col justify-center items-center gap-2">
                    <img src="${PROFILE_BASE_URL + director.profile_path}"
                      alt="${director.name} profile" width="100" height="100">
                    <p class="text-sm">${director.name}</p>
                  </div>
                  `;
  }).join("")}
            </div>
          </div>

          <!-- Movie cast -->

          <h4 class="text-xl font-bold">Cast</h4>
          <div class="flex flex-wrap gap-8 w-full justify-center items-center lg:justify-start">
            ${movieCredits.slice(0, 6).map((credit) => `
              <div id=${credit.id} class=" dark:hover:bg-neutral-600 hover:shadow-2xl hover:bg-neutral-300 hover:-translate-y-1 hover:scale-110 flex flex-col basis-32 gap-2 items-center" data-credit-id="${credit.id}">
                <img src="${PROFILE_BASE_URL + credit.profile_path}" alt="${credit.name} profile"
                  class="rounded object-cover md:w-24 md:h-24">
                <div class="font-medium">
                  <div>${credit.name}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">as ${credit.character}</div>
                </div>
              </div>
            `).join("")
    }
          </div>

          <!-- Movie production companies -->

          <h4 class="text-2xl font-bold">Production Companies</h4>
          <div class="flex flex-wrap gap-8 w-full justify-center items-center md:justify-start">
            ${movie.production_companies.map((company) =>
      company.logo_path ? `
                <div class="flex flex-col basis-32 gap-2 items-center">
                  <img src="${LOGO_BASE_URL + company.logo_path}" alt="${company.name} logo"
                    class="rounded object-scale-down h-12 md:h-24">
                  <div class="font-medium text-center">
                    <p>${company.name}</p>
                  </div>
                </div>
              ` : `
                <div class="h-full flex flex-col basis-32 gap-2 items-center">
                  <div class="font-medium text-center">
                    <p>${company.name}</p>
                  </div>
                </div>
              `
    ).join("")}
          </div> <!-- end of production companies -->

        </div> <!-- End of movie credits -->
      </div> <!-- End of movie details -->
    </div> <!-- End of container -->
    `;
  movieCredits.slice(0, 6).map((credit) => {
    const actorContainer = document.getElementById(credit.id);
    actorContainer.addEventListener("click", async () => {
      const actor = await fetchActor(credit.id); //actorID
      renderActor(actor)
    });

  });
};
const renderActor = async (actor) => {
  const movies = await fetchMoviesParticipated(actor.id);
  CONTAINER.innerHTML =
    `
    <div class="flex md:flex-row p-8 flex-col">

    <!-- Actor profile pic -->
    <div class="w-full max-h-[65vh] md:w-1/2 md:min-h-full">
        <img id="profile_path" src=${BACKDROP_BASE_URL + actor.profile_path}
            class="w-full h-full object-contain md:object-cover rounded" alt="${actor.name} ">
    </div>

    <!-- Actor details -->
    <div class="flex flex-col gap-4 ml-16 md:w-1/2 justify-center ">
        <p id="actor-name" class="text-base"><b>Name: </b>  ${actor.name} </p>
        <p id="actor-birthday" class="text-base"><b>Birthday: </b> ${actor.birthday}</p>
        <p id="actor-place_of_birth" class="text-base"><b>place_of_birth: </b> ${actor.place_of_birth}</p>
        <p id="movie-language" class="text-base"><b>Gender: </b>${actor.gender == 1 ? "Male" : "Female"}</p>
        <p id="movie-language" class="text-base"><b>Popularity: </b>${actor.popularity}</p>
        <p id="movie-language" class="text-base"><b>Death Day: </b>${actor.deathday}</p>
        <p id="actor-biography" class="text-base"><b>biography: </b> ${actor.biography}</p>
   
        <!-- participated in Movies -->

          <h3 class="text-2xl font-bold">Movies</h3>
        <div id="participated-movies" class="flex flex-wrap w-full justify-center gap-4">
          ${movies.slice(0, 6).map((movie) => {
      return `
              <div data-id="${movie.id}" class="participated-movie flex flex-col
                basis-40 justify-center items-center rounded overflow-hidden
                bg-neutral-200 cursor-pointer transition duration-500 ease-in-out
                transform dark:bg-neutral-700 dark:hover:bg-neutral-600
                hover:shadow-2xl hover:bg-neutral-300 hover:-translate-y-1 hover:scale-110">
                <img src="${BACKDROP_BASE_URL + movie.poster_path}"
                  alt="${movie.title} poster" width="700" height="439">
                <h3 class="movie-title my-2 text-base font-bold text-center">
                  ${movie.title}
                </h3>
                <p class="movie-rating text-sm pb-4">
                  Average vote: ${movie.vote_average}
                </p>

              </div>
              `;
    }).join("")}
        </div>
    </div>
</div> <!-- End of container -->`
};

document.addEventListener("DOMContentLoaded", autorun);
