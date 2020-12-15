import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '18944189-177b692c9d9a1e8dfd1f135d6';
const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.headers.common['Aithorization'] = 'Bearer 18944189-177b692c9d9a1e8dfd1f135d6'

const fetchGallery = (query, currentPage) => {
  return axios
    .get(
      `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

fetchGallery.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default fetchGallery;
