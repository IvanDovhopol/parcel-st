const BASE_URL = 'https://api.unsplash.com';
const CLIENT_ID = 'U429LRjvlq8j84fGgwRm6DT8zfU6mGDvoZHBhR1os8c';

export default class UnsplashApi {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 10;

  getPhotos() {
    const url = `${BASE_URL}/search/photos?page=${this.#page}&query=${
      this.#query
    }&client_id=${CLIENT_ID}&per_page=${this.#perPage}`;

    return fetch(url).then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }

      return r.json();
    });
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
