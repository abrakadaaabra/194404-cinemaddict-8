import Component from "../component";
import moment from "moment";
import {
  VISUALLY_HIDDEN_CLASS
} from "../utils/utils";

/**
 * Класс карточки фильма
 * @class Film
 * @extends {Component}
 */
class Film extends Component {

  /**
   * Создает экземпляр карточки фильма
   * @param {Object} data - данные о фильме
   * @param {boolean} hideControls - нужно ли скрывать контроллы карточки фильма (для самых комментируемых и топовых фильмов)
   */
  constructor(data, hideControls) {
    super();

    this._title = data.title;
    this._releaseDate = data.releaseDate;
    this._description = data.description;
    this._duration = data.duration;
    this._genre = data.genre;
    this._averageRating = data.averageRating;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;
    this._comments = data.comments;
    this._poster = data.poster;
    this._popup = null;
    this._hideControls = hideControls;

    this._onOpenPopup = null;
    this._onAddToWatchlist = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;

    this._commentsCounterClickHandler = this._commentsCounterClickHandler.bind(this);
    this._addToWatchlistButtonClickHandler = this._addToWatchlistButtonClickHandler.bind(this);
    this._markAsWatchedButtonClickHandler = this._markAsWatchedButtonClickHandler.bind(this);
    this._addToFavoriteButtonClickHandler = this._addToFavoriteButtonClickHandler.bind(this);
  }

  /**
   * Возвращает шаблон карточки фильма
   * @return {string}
   */
  get _template() {
    const highlightedBorderStyle = `style="border: 1px solid #f5df00;"`;

    return `
      <article class="film-card ${this._hideControls ? `film-card--no-controls` : ``}">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._averageRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
          <span class="film-card__duration">${moment.duration(this._duration, `minutes`).hours()}:${moment.duration(this._duration, `minutes`).minutes()}</span>
          <span class="film-card__genre">${this._genre.join(`, `)}</span>
        </p>
        <img src="${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <button class="film-card__comments">${this._comments.length} comments</button>
        <form class="film-card__controls ${this._hideControls ? VISUALLY_HIDDEN_CLASS : ``}">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" ${this._inWatchlist ? `${highlightedBorderStyle}` : ``}>WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" ${this._isWatched ? `${highlightedBorderStyle}` : ``}>WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" ${this._isFavorite ? `${highlightedBorderStyle}` : ``}>FAV</button>
        </form>
      </article>
    `;
  }

  /**
   * Возвращает экземпляр попапа с информацией о фильме
   * @return {FilmPopup}
   */
  get popup() {
    return this._popup;
  }

  /**
   * Записывает в поле ссылку на экземпляр попапа с информацией о фильме
   * @param {FilmPopup} popupInstance - экземпляр попапа
   */
  set popup(popupInstance) {
    this._popup = popupInstance;
  }

  /**
   * Задает колбэк открытия попапа
   * @param {Function} callback - колбэк
   */
  set onOpenPopup(callback) {
    this._onOpenPopup = callback;
  }

  /**
   * Задает колбэк добавления в список фильмов к просмотру
   * @param {Function} callback - колбэк
   */
  set onAddToWatchlist(callback) {
    this._onAddToWatchlist = callback;
  }

  /**
   * Задает колбэк добавления в список просмотренных фильмов
   * @param {Function} callback - колбэк
   */
  set onMarkAsWatched(callback) {
    this._onMarkAsWatched = callback;
  }

  /**
   * Задает колбэк добавления в список избранных фильмов
   * @param {Function} callback - колбэк
   */
  set onAddToFavorite(callback) {
    this._onAddToFavorite = callback;
  }

  /**
   * Частично обновляет элемент карточки фильма в DOM
   */
  updateElement() {
    this._updateCardControls();
    this._updateComments();
  }

  /**
   * Обновляет кнопки добавления фильма в списки (к просмотру, просмотренные, избранные)
   */
  _updateCardControls() {
    const addToWatchlistButtonElement = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const markAsWatchedButtonElement = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    const addToFavoriteButtonElement = this._element.querySelector(`.film-card__controls-item--favorite`);

    this._toggleButtonElementBorder(addToWatchlistButtonElement, this._inWatchlist);
    this._toggleButtonElementBorder(markAsWatchedButtonElement, this._isWatched);
    this._toggleButtonElementBorder(addToFavoriteButtonElement, this._isFavorite);
  }

  /**
   * Переключает состояние кнопки добавления фильма в списки
   * @param {HTMLElement} buttonElement - DOM-элемент кнопки
   * @param {boolean} condition - проверяемое свойство, от которого зависит состояние кнопки
   */
  _toggleButtonElementBorder(buttonElement, condition) {
    buttonElement.style.border = condition ? `1px solid #f5df00` : `0 none`;
  }

  /**
   * Обновляет счетчик комментариев
   */
  _updateComments() {
    const commentsCounterElement = this._element.querySelector(`.film-card__comments`);

    commentsCounterElement.innerHTML = `${this._comments.length} comments`;
  }

  update(data) {
    this._comments = data.comments;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;
  }

  /**
   * Навешивает обработчики событий на элементы карточки фильма
   */
  _addEventHandlers() {
    const commentsCountElement = this._element.querySelector(`.film-card__comments`);
    const addToWatchlistButtonElement = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const markAsWatchedButtonElement = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    const addToFavoriteButtonElement = this._element.querySelector(`.film-card__controls-item--favorite`);

    commentsCountElement.addEventListener(`click`, this._commentsCounterClickHandler);
    addToWatchlistButtonElement.addEventListener(`click`, this._addToWatchlistButtonClickHandler);
    markAsWatchedButtonElement.addEventListener(`click`, this._markAsWatchedButtonClickHandler);
    addToFavoriteButtonElement.addEventListener(`click`, this._addToFavoriteButtonClickHandler);
  }

  /**
   * Удаляет обработчики событий с элементов карточки фильма
   */
  _removeEventHandlers() {
    const commentsCountElement = this._element.querySelector(`.film-card__comments`);
    const addToWatchlistButtonElement = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    const markAsWatchedButtonElement = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    const addToFavoriteButtonElement = this._element.querySelector(`.film-card__controls-item--favorite`);

    commentsCountElement.removeEventListener(`click`, this._commentsCounterClickHandler);
    addToWatchlistButtonElement.removeEventListener(`click`, this._addToWatchlistButtonClickHandler);
    markAsWatchedButtonElement.removeEventListener(`click`, this._markAsWatchedButtonClickHandler);
    addToFavoriteButtonElement.removeEventListener(`click`, this._addToFavoriteButtonClickHandler);
  }

  /**
   * Обработчик клика по блоку комментариев
   */
  _commentsCounterClickHandler() {
    if (typeof this._onOpenPopup === `function`) {
      this._onOpenPopup();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список к просмотру
   * @param {event} event - событие клика
   */
  _addToWatchlistButtonClickHandler(event) {
    event.preventDefault();

    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список просмотренных фильмов
   * @param {event} event - событие клика
   */
  _markAsWatchedButtonClickHandler(event) {
    event.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список избранного
   * @param {event} event - событие клика
   */
  _addToFavoriteButtonClickHandler(event) {
    event.preventDefault();

    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite();
    }
  }

}

export default Film;
