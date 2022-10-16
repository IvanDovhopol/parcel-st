import { Notify } from 'notiflix/build/notiflix-notify-aio';
import UnsplashApi from './js/unsplash-Api';
import createMarkup from './js/create-markup';
import refs from './js/refs';
import './sass/index.scss';

const unsplashApi = new UnsplashApi();

const hendleSubmit = e => {
  e.preventDefault();

  const {
    elements: { query },
  } = e.currentTarget;

  const searchQuery = query.value.trim().toLowerCase();

  if (!searchQuery) {
    return Notify.info('Введите что-нибудь в форму');
  }

  unsplashApi.query = searchQuery;
  clearPage();

  unsplashApi
    .getPhotos()
    .then(({ results, total }) => {
      if (total === 0) {
        return Notify.warning(
          `По вашему запросу "${searchQuery}" ничего не найдено!`
        );
      } else if (!searchQuery) {
        return Notify.info('Введите что-нибудь в форму');
      }

      const markup = createMarkup(results);
      refs.list.insertAdjacentHTML('beforeend', markup);

      unsplashApi.calculateTotalPages(total);
      Notify.success(`По вашему запросу найдено ${total} фото`);

      if (unsplashApi.isShowLoadMore) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      Notify.failure(error.message, 'Что-то пошло не так!');
      clearPage();
    });
};

refs.form.addEventListener('submit', hendleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  unsplashApi.incrementPage();

  if (!unsplashApi.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  unsplashApi
    .getPhotos()
    .then(({ results }) => {
      const markup = createMarkup(results);
      refs.list.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      Notify.failure(error.message, 'Что-то пошло не так!');
      clearPage();
    });
}

function clearPage() {
  unsplashApi.resetPage();
  refs.list.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
