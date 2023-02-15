import axios from 'axios';

const API_KEY = '33639596-28aa77ea2f93f41ef738293ad';
const BASE_URL = 'https://pixabay.com/api/';
const PARAM = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
// const options = {
//   headers: {
//     key: API_KEY,
//     image_type: photo,
//     orientation: horizontal,
//     safesearch: true,
//   },
// };


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

async fetchImages() {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${PARAM}&page=${this.page}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
            console.log(error);
  }
   // this.incrementPage();
}
  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}