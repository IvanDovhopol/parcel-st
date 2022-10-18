import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] =
  'Client-ID U429LRjvlq8j84fGgwRm6DT8zfU6mGDvoZHBhR1os8c';

export default class UnsplashApi {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 30;
  #params = {
    params: {
      per_page: 30,
    },
  };

  async getPhotos() {
    const url = `/search/photos?page=${this.#page}&query=${this.#query}`;
    const { data } = await axios.get(url, this.#params);

    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
