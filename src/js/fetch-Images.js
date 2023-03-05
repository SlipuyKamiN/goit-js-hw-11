export class FetchImages {
  constructor() {}

  searchParams = new URLSearchParams({
    key: '34149856-a909975f1401d97f20254d2ad',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
  });

  fetch(q) {
    return fetch(`https://pixabay.com/api/?${this.searchParams}&q=${q}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(console.log);
  }
  incrementPage() {
    this.searchParams.page += 1;
  }
  resetPage() {
    this.searchParams.page = 1;
  }
}
