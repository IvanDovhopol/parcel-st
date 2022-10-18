import { unsplashApi } from '../index';

export default function clearPage() {
  unsplashApi.resetPage();
  refs.list.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
