import { CONTAINER } from '../utils/constants.js';
import renderMovies from './movies.js';

const renderHome = (movies) => {
  const navbar = document.querySelector('.navbar');
  navbar.innerHTML = `
<select id = "filter" >
<option> Filter Movies By </option>
<option> popularity </option>
<option> relase date </option>
<option> top rated </option>
</select> `;
  const filter = document.getElementById('filter');

  // when client clicked on select element
  // if default value is changed
  filter.addEventListener('change', () => {
    // if value switched by client
    switch (filter.value) {
      case 'popularity':
        // do somthing with  , "add" value
        movies.sort((a, b) => {
          const keyA = a.popularity;
          const keyB = b.popularity;
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      case 'relase date':
        // do somthing with  , "remove" value
        movies.sort((a, b) => {
          const keyA = new Date(a.release_date);
          const keyB = new Date(b.release_date);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      case 'top rated':
        // do somthing with  , "add" value
        movies.sort((a, b) => {
          const keyA = a.vote_average;
          const keyB = b.vote_average;
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        break; // then take break
      default:
        break;
    }
    CONTAINER.innerHTML = '';
    renderMovies(movies);
  });
};

export default renderHome;
