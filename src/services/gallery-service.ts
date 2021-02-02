import axios from 'axios';

const API_KEY = '18944189-177b692c9d9a1e8dfd1f135d6';
const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.headers.common['Aithorization'] = 'Bearer 18944189-177b692c9d9a1e8dfd1f135d6'

interface IResponeObj {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  previewURL: string;
  [key: string]: any;
}

type fetchType = (query: string, currentPage: number) => Promise<IResponeObj[]>;

const fetchGallery: fetchType = (query, currentPage) => {
  return axios
    .get(
      `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => {
      console.log(response.data.hits);
      return response.data.hits;
    });
};

export default fetchGallery;
