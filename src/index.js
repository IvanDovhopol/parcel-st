import { Notify } from 'notiflix/build/notiflix-notify-aio';
import clearPage from './js/clear-page';
import UnsplashApi from './js/unsplash-Api';
import createMarkup from './js/create-markup';
import refs from './js/refs';
import './sass/index.scss';

export const unsplashApi = new UnsplashApi();

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const callback = async (entries, observer) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      unsplashApi.incrementPage();
      observer.unobserve(entry.target);

      try {
        const { results } = await unsplashApi.getPhotos();

        const markup = createMarkup(results);
        refs.list.insertAdjacentHTML('beforeend', markup);

        if (unsplashApi.isShowLoadMore) {
          const target = document.querySelector('.gallery__item:last-child');
          io.observe(target);
        }
      } catch (error) {
        Notify.failure(error.message, 'Что-то пошло не так!');
        clearPage();
      }
    }
  });
};

const io = new IntersectionObserver(callback, options);

const handleSubmit = async e => {
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

  try {
    const { results, total } = await unsplashApi.getPhotos();

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
      // refs.loadMoreBtn.classList.remove('is-hidden');
      const target = document.querySelector('.gallery__item:last-child');
      io.observe(target);
    }
  } catch (error) {
    Notify.failure(error.message, 'Что-то пошло не так!');
    clearPage();
  }
};

refs.form.addEventListener('submit', handleSubmit);
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
