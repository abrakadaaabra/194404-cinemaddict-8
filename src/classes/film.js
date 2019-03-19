import FilmComponent from "./film-component";

class Film extends FilmComponent {
  constructor(data) {
    super(data);

    this._clickCommentsBlockHandler = this._clickCommentsBlockHandler.bind(this);
  }

  set onCommentsBlockClick(handler) {
    this._onCommentsBlockClick = handler;
  }

  get _template() {
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

  _createListeners() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.addEventListener(`click`, this._clickCommentsBlockHandler);
  }

  _removeListeners() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.removeEventListener(`click`, this._clickCommentsBlockHandler);
  }
}

export default Film;
