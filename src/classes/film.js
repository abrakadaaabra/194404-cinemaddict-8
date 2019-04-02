import FilmComponent from "./film-component";
import moment from "moment";

class Film extends FilmComponent {
  constructor(data) {
    super(data);

    this._onCommentsBlockClick = null;

    this._clickCommentsBlockHandler = this._clickCommentsBlockHandler.bind(this);
  }

  get _template() {

    const filmTemplate = `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._averageRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseYear).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.duration(this._duration, `minutes`).hours()}h ${moment.duration(this._duration, `minutes`).minutes()}m</span>
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

  set onCommentsBlockClick(handler) {
    this._onCommentsBlockClick = handler;
  }

  _clickCommentsBlockHandler() {
    if (this._onCommentsBlockClick && typeof this._onCommentsBlockClick === `function`) {
      this._onCommentsBlockClick();
    }
  }

  _addEventHandlers() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.addEventListener(`click`, this._clickCommentsBlockHandler);
  }

  _removeEventHandlers() {
    const comments = this._element.querySelector(`.film-card__comments`);
    comments.removeEventListener(`click`, this._clickCommentsBlockHandler);
  }

  updateElement() {
    const newElement = this._createElement();

    this._removeEventHandlers();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._addEventHandlers();
  }
}

export default Film;
