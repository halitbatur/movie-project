import { TMDB_BASE_URL } from './constants.js';

// Don't touch this function please
const constructUrl = (path) => `${TMDB_BASE_URL}/${path}?api_key=${atob(
  'NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=',
)}`;

export default constructUrl;
