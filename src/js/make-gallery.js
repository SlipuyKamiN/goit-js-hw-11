import { FetchImages } from './fetch-Images';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
};

const getImages = new FetchImages();

const makeMarkup = ({ hits }) => {
  return hits
    .map(img => {
      return `<div class="photo-card">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${img.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
};
const renderMarkup = imgs => {
  const markup = makeMarkup(imgs);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

getImages.fetch('toyota').then(imgs => {
  renderMarkup(imgs);
});
