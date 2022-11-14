import constructUrl from './utils/urls.js';
import renderMovies from './components/movies.js';
import renderHome from './components/home.js';

// This function is to fetch movies. You may need to add it or change some part in it in order
// to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl('movie/now_playing');
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderHome(movies.results);
  renderMovies(movies.results);
};

document.addEventListener('DOMContentLoaded', autorun);
