export default function createMarkup(photos) {
  return photos
    .map(({ urls, alt_description }) => {
      return `<li class="gallery__item">
                <img src="${urls.small}" alt="${alt_description}" class="gallery-img">
              </li>`;
    })
    .join('');
}
