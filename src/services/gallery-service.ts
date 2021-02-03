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

async function http<T>(query: string, currentPage: number): Promise<T> {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return await response.data.hits;
}

const fetchGallery = (query: string, currentPage: number) =>
  http<IResponeObj[]>(query, currentPage);

export default fetchGallery;
