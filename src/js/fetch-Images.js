export class FetchImages {
  constructor() {
    this.searchParams = {
      key: '34149856-a909975f1401d97f20254d2ad',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
      q: '',
      endOfResults: false,
    };
  }

  fetch() {
    const { key, image_type, orientation, safesearch, page, q, per_page } =
      this.searchParams;

    return fetch(
      `https://pixabay.com/api/?key=${key}&image_type=${image_type}&orientation${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}&q=${q}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  incrementPage() {
    this.searchParams.page += 1;
  }
  resetPage() {
    this.searchParams.page = 1;
  }
  setQuery(q) {
    this.searchParams.q = q;
  }
  getQuery() {
    return this.searchParams.q;
  }
  setEndOfResults(boolean) {
    this.searchParams.endOfResults = boolean;
  }
}
