class Film {
  constructor(data) {
    this._title = data.title;
    this._originalTitle = data.originalTitle;
    this._releaseYear = data.releaseYear;
    this._cast = data.cast;
    this._description = data.description;
    this._duration = data.duration;
    this._amountOfSeasons = data.amountOfSeasons;
    this._amountOfEpisodes = data.amountOfEpisodes;
    this._genre = data.genre;
    this._ageLimit = data.ageLimit;
    this._premiereDate = data.premiereDate;
    this._dvdReleaseDate = data.dvdReleaseDate;
    this._rating = data.rating;
    this._averageRating = data.averageRating;
    this._country = data.country;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;

    this._comments = data.comments;
    this._poster = data.poster;
  }

  get element() {
    return this._element;
  }

  set onCommentsBlockClick(handler) {
    this._onCommentsBlockClick = handler;
  }

  get template() {
    const getDuration = () => {
      const hours = Math.trunc(this._duration / 60);
      const minutes = this._duration % 60;

      if (this._duration >= 60) {
        return `${hours}h${minutes ? ` ${minutes}m` : ``}`;
      } else {
        return `${minutes}m`;
      }
    };

    const filmTemplate = `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._averageRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._releaseYear}</span>
          <span class="film-card__duration">${getDuration()}</span>
          <span class="film-card__genre">${this._genre}</span>
        </p>
        <img src="${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments">${this._comments.length} comments</button>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">FAV</button>
        </form>
      </article>
    `;

    return filmTemplate;
  }

  _clickCommentsBlockHandler() {
    if (this._onCommentsBlockClick && typeof this._onCommentsBlockClick === `function`) {
      this._onCommentsBlockClick();
    }
  }

  _createElement(template) {
    const tmpElement = document.createElement(`div`);
    tmpElement.innerHTML = template;

    const element = tmpElement.firstElementChild;

    return element;
  }

  render() {
    this._element = this._createElement(this.template);
    this._bind();

    return this._element;
  }

  unrender() {
    this._unbind();
    this._element = null;
  }

  _bind() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.addEventListener(`click`, this._clickCommentsBlockHandler.bind(this));
  }

  _unbind() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.removeEventListener(`click`, this._clickCommentsBlockHandler);
  }
}

export default Film;
