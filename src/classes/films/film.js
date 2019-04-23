import FilmComponent from "./film-component";
import moment from "moment";

/**
 * Класс карточки фильма
 * @class Film
 * @extends {FilmComponent}
 */
class Film extends FilmComponent {

  /**
   * Создает экземпляр карточки фильма
   * @param {Object} data - данные о фильме
   */
  constructor(data) {
    super(data);

    this._onCommentsBlockClick = null;
    this._onAddToWatchlist = null;
    this._onAddToFavorite = null;
    this._onMarkAsWatched = null;

    this._clickCommentsBlockHandler = this._clickCommentsBlockHandler.bind(this);
    this._clickAddToWatchlistButton = this._clickAddToWatchlistButton.bind(this);
    this._clickAddToFavoriteButton = this._clickAddToFavoriteButton.bind(this);
    this._clickMarkAsWatchedButton = this._clickMarkAsWatchedButton.bind(this);
  }

  /**
   * Возвращает шаблон карточки фильма
   * @return {string}
   */
  get _template() {

    const filmTemplate = `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._averageRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.duration(this._duration, `minutes`).hours()}h ${moment.duration(this._duration, `minutes`).minutes()}m</span>
          <span class="film-card__genre">${this._genre.join(`, `)}</span>
        </p>
        <img src="${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments">${this._comments.length} comments</button>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" ${this._inWatchlist ? `style="border: 1px solid #f5df00;"` : ``}>WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" ${this._isWatched ? `style="border: 1px solid #f5df00;"` : ``}>WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" ${this._isFavorite ? `style="border: 1px solid #f5df00;"` : ``}>FAV</button>
        </form>
      </article>
    `;

    return filmTemplate;
  }

  /**
   * Задает колбэк открытия блока комментариев
   * @param {Function} callback - колбэк
   */
  set onCommentsBlockClick(callback) {
    this._onCommentsBlockClick = callback;
  }

  /**
   * Задает колбэк добавления в список фильмов к просмотру
   * @param {Function} callback - колбэк
   */
  set onAddToWatchlist(callback) {
    this._onAddToWatchlist = callback;
  }

  /**
   * Задает колбэк добавления в список избранных фильмов
   * @param {Function} callback - колбэк
   */
  set onAddToFavorite(callback) {
    this._onAddToFavorite = callback;
  }

  /**
   * Задает колбэк добавления в список просмотренных фильмов
   * @param {Function} callback - колбэк
   */
  set onMarkAsWatched(callback) {
    this._onMarkAsWatched = callback;
  }

  /**
   * Обработчик клика по блоку комментариев
   */
  _clickCommentsBlockHandler() {
    if (typeof this._onCommentsBlockClick === `function`) {
      this._onCommentsBlockClick();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список к просмотру
   * @param {event} event - событие клика
   */
  _clickAddToWatchlistButton(event) {
    event.preventDefault();

    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }

    const addToWatchlistButton = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    addToWatchlistButton.style.border = this._inWatchlist ? `1px solid #f5df00` : ``;
  }

  /**
   * Обработчик клика по кнопке добавления в список избранного
   * @param {event} event - событие клика
   */
  _clickAddToFavoriteButton(event) {
    event.preventDefault();

    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite();
    }

    const addToFavoriteButton = this._element.querySelector(`.film-card__controls-item--favorite`);
    addToFavoriteButton.style.border = this._isFavorite ? `1px solid #f5df00` : ``;
  }

  /**
   * Обработчик клика по кнопке добавления в список просмотренных фильмов
   * @param {event} event - событие клика
   */
  _clickMarkAsWatchedButton(event) {
    event.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }

    const markAsWatchedButton = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    markAsWatchedButton.style.border = this._isWatched ? `1px solid #f5df00` : ``;
  }

  /**
   * Навешивает обработчики событий на элементы карточки фильма
   */
  _addEventHandlers() {
    const comments = this._element.querySelector(`.film-card__comments`);
    const addToWatchlistButton = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const addToFavoriteButton = this._element.querySelector(`.film-card__controls-item--favorite`);
    const markAsWatchedButton = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);

    comments.addEventListener(`click`, this._clickCommentsBlockHandler);
    addToWatchlistButton.addEventListener(`click`, this._clickAddToWatchlistButton);
    addToFavoriteButton.addEventListener(`click`, this._clickAddToFavoriteButton);
    markAsWatchedButton.addEventListener(`click`, this._clickMarkAsWatchedButton);
  }

  /**
   * Удаляет обработчики событий с элементов карточки фильма
   */
  _removeEventHandlers() {
    const comments = this._element.querySelector(`.film-card__comments`);
    const addToWatchlistButton = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const addToFavoriteButton = this._element.querySelector(`.film-card__controls-item--favorite`);
    const markAsWatchedButton = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);

    comments.removeEventListener(`click`, this._clickCommentsBlockHandler);
    addToWatchlistButton.removeEventListener(`click`, this._clickAddToWatchlistButton);
    addToFavoriteButton.removeEventListener(`click`, this._clickAddToFavoriteButton);
    markAsWatchedButton.removeEventListener(`click`, this._clickMarkAsWatchedButton);
  }

  /**
   * Полностью обновляет карточку фильма в DOM
   */
  updateElement() {
    const newElement = this._createElement();

    this._removeEventHandlers();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._addEventHandlers();
  }
}

export default Film;
