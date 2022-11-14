import { CONTAINER, BACKDROP_BASE_URL } from '../utils/constants.js';
import constructUrl from '../utils/urls.js';

const fetchMoviesParticipated = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  const data = await res.json();
  return data.cast;
};

const renderActor = async (actor) => {
  const movies = await fetchMoviesParticipated(actor.id);
  CONTAINER.innerHTML = `
    <div class="flex md:flex-row p-8 flex-col bg-neutral-100">

    <!-- Actor profile pic -->
    <div class="w-full max-h-[65vh] md:w-1/2 md:min-h-full">
        <img id="profile_path" src=${BACKDROP_BASE_URL + actor.profile_path}
            class="w-full h-full object-contain md:object-cover h-auto rounded"
            alt="${actor.name} ">
    </div>

    <!-- Actor details -->
    <div class="flex flex-col gap-4 ml-16 md:w-1/2 justify-center basis-2/3 ">
        <p id="actor-name" class="text-base"><b>Name: </b>  ${actor.name} </p>
        <p id="actor-birthday" class="text-base">
          <b>Birthday: </b> ${actor.birthday}
        </p>

        <p id="actor-place_of_birth" class="text-base">
          <b>place_of_birth: </b> ${actor.place_of_birth}
        </p>
        <p id="movie-language" class="text-base">
          <b>Gender: </b>${actor.gender === 1 ? 'Male' : 'Female'}
        </p>
        <p id="movie-language" class="text-base">
          <b>Popularity: </b>${actor.popularity}
        </p>
        <p id="movie-language" class="text-base">
          <b>Death Day: </b>${actor.deathday}
        </p>
        <p id="actor-biography" class="text-base">
          <b>biography: </b> ${actor.biography.length > 500
    ? `${actor.biography.slice(0, 500)} ...
        <a class='text-blue-700' href=#>READ MORE</a>
      `
    : actor.biography
}
        </p>

        <!-- participated in Movies -->

          <h3 class="text-2xl font-bold">Movies</h3>
        <div id="participated-movies" class="flex flex-wrap w-full justify-center gap-4">
          ${movies.slice(0, 6).map((movie) => `
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
            `).join('')}
        </div>
    </div>
</div> <!-- End of container -->`;
};

export default renderActor;
