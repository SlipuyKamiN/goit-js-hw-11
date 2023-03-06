import { FetchImages } from './fetch-Images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  submitBtn: document.querySelector('#submit-btn'),
  loadMoreBtn: document.querySelector('#load-more-btn'),
};

const getImages = new FetchImages();
const showNotification = {
  success(quantity) {
    Notify.success(`Hooray! We found ${quantity} images.`);
  },
  noMatchingImages() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  },
  noSearchQuery() {
    Notify.failure('Please input your search query!');
  },
  endOfResults() {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  },
};
const makeMarkup = ({ hits }) => {
  return hits
    .map(img => {
      return `<div class="photo-card">
      <a class="photo-link" href="${img.largeImageURL}">
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
    </a>
</div>
`;
    })
    .join('');
};
const renderMarkup = imgs => {
  const markup = makeMarkup(imgs);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  let gallery = new SimpleLightbox('.gallery a');
};
const scrollPage = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const handleSearchSubmit = event => {
  event.preventDefault();
  const { searchQuery } = event.target.elements;

  if (searchQuery.value === '') {
    showNotification.noSearchQuery();
    return;
  }

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  getImages.setQuery(searchQuery.value);
  getImages
    .fetch()
    .then(imgs => {
      if (imgs.totalHits === 0) {
        showNotification.noMatchingImages();
        return;
      }

      showNotification.success(imgs.totalHits);
      renderMarkup(imgs);
      scrollPage();
      refs.loadMoreBtn.classList.remove('is-hidden');
      getImages.resetPage();
    })
    .catch(console.log);
};
const handleLoadMoreBtnClick = () => {
  getImages.incrementPage();
  getImages
    .fetch()
    .then(imgs => {
      if (imgs.hits.length < 40) {
        showNotification.endOfResults();
        refs.loadMoreBtn.classList.add('is-hidden');
      }
      renderMarkup(imgs);
      scrollPage();
    })
    .catch(console.log());
};

refs.form.addEventListener('submit', handleSearchSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
