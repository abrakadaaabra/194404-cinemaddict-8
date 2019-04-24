import Component from "../component";
import AdapterComment from "../adapters/adapter-comment";
import moment from "moment";

import {
  isControlKey,
  isCmdKey,
  isEnterKey,
  isEscapeKey
} from '../utils/keyboard-utils';

import {
  getEmoji,
  VISUALLY_HIDDEN_CLASS,
  convertHtmlToText
} from "../utils/utils";

const MAX_RATING_SCORE = 9;

/**
 * Класс попапа с подробной информацией о фильме
 * @class FilmDetailsPopup
 * @extends {Component}
 */
class FilmPopup extends Component {

  /**
   * Создает экземпляр попапа фильма
   * @param {Object} data - данные о фильме
   */
  constructor(data) {
    super();

    this._title = data.title;
    this._originalTitle = data.originalTitle;
    this._releaseDate = data.releaseDate;
    this._director = data.director;
    this._writers = data.writers;
    this._cast = data.cast;
    this._description = data.description;
    this._duration = data.duration;
    this._genre = data.genre;
    this._ageLimit = data.ageLimit;
    this._rating = data.rating;
    this._averageRating = data.averageRating;
    this._country = data.country;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;
    this._watchingDate = data.watchingDate;

    this._comments = data.comments;
    this._poster = data.poster;

    this._onSubmitComment = null;
    this._onDeleteComment = null;
    this._onSubmitRating = null;
    this._onAddToWatchlist = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;
    this._onClose = null;

    this._commentEmojiChangeHandler = this._commentEmojiChangeHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._deleteCommentButtonClickHandler = this._deleteCommentButtonClickHandler.bind(this);
    this._userRatingInputClickHandler = this._userRatingInputClickHandler.bind(this);
    this._addToWatchlistButtonClickHandler = this._addToWatchlistButtonClickHandler.bind(this);
    this._markAsWatchedButtonClickHandler = this._markAsWatchedButtonClickHandler.bind(this);
    this._addToFavoriteButtonClickHandler = this._addToFavoriteButtonClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._popupKeydownHandler = this._popupKeydownHandler.bind(this);

  }

  /**
   * Возвращает шаблон комментариев к фильму
   * @return {string}
   */
  get _commentsTemplate() {
    return this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${getEmoji([comment.emoji])}</span>
        <div>
          <p class="film-details__comment-text">${convertHtmlToText(comment.text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
          </p>
        </div>
      </li>
    `).join(``);
  }

  /**
   * Возвращает шаблон выбора оценки фильма
   * @return {string}
   */
  get _ratingPickerTemplate() {
    let inputs = ``;

    for (let i = 1; i <= MAX_RATING_SCORE; i++) {
      inputs += `
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"${this._rating === i ? ` checked` : ``} value="${i}" id="rating-${i}">
          <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
        `;
    }

    return inputs;
  }

  /**
   * Возвращает шаблон попапа фильма
   * @return {string}
   */
  get _template() {

    const getCast = () => this._cast.join(`, `);
    const getWriters = () => this._writers.join(`, `);
    const getGenres = () => this._genre.map((genre) => `
      <span class="film-details__genre">${genre}</span>
    `).join(``);

    const getWatchedStatus = () => {
      let watchedStatus = ``;
      if (this._isWatched) {
        watchedStatus = `already watched`;
      }
      if (this._inWatchlist) {
        watchedStatus = `will watch`;
      }
      return watchedStatus;
    };

    const filmDetailsPopupTemplate = `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._poster}" alt="${this._title}">

              <p class="film-details__age">${this._ageLimit}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._title}</h3>
                  <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._averageRating}</p>
                  <p class="film-details__user-rating">Your rate ${this._rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${getWriters()}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${getCast()}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${moment.duration(this._duration, `minutes`).asMinutes()} min</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${getGenres()}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">${this._description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${this._inWatchlist ? ` checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? ` checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? ` checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
            <ul class="film-details__comments-list">${this._commentsTemplate}</ul>
            <div class="film-details__new-comment">
              <div>
                <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                  <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                </div>
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
              </label>
            </div>
          </section>
          <section class="film-details__user-rating-wrap ${VISUALLY_HIDDEN_CLASS}">
            <div class="film-details__user-rating-controls">
              <span class="film-details__watched-status ${this._isWatched ? ` film-details__watched-status--active` : ``}">${getWatchedStatus()}</span>
              <button class="film-details__watched-reset" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._title}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>
                <div class="film-details__user-rating-score">${this._ratingPickerTemplate}</div>
              </section>
            </div>
          </section>
        </form>
      </section>
    `;

    return filmDetailsPopupTemplate;
  }

  /**
   * Возвращает обновленные данные о фильме
   * @return {object}
   */
  get _userData() {
    return {
      rating: this._rating,
      comments: this._comments,
      isFavorite: this._isFavorite,
      isWatched: this._isWatched,
      inWatchlist: this._inWatchlist
    };
  }

  /**
   * Задает колбэк отправки комментария о фильме
   * @param {Function} callback - колбэк
   */
  set onSubmitComment(callback) {
    this._onSubmitComment = callback;
  }

  /**
   * Задает колбэк отправки комментария о фильме
   * @param {Function} callback - колбэк
   */
  set onDeleteComment(callback) {
    this._onDeleteComment = callback;
  }

  /**
   * Задает колбэк отправки оценки фильма
   * @param {Function} callback - колбэк
   */
  set onSubmitRating(callback) {
    this._onSubmitRating = callback;
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
   * Задает колбэк закрытия попапа фильма
   * @param {Function} callback - колбэк
   */
  set onClose(callback) {
    this._onClose = callback;
  }

  unblockCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji`);

    input.disabled = false;
    emojiPicker.disabled = false;
  }

  unblockRatingPicker() {
    const inputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    inputs.forEach((input) => (input.disabled = false));
  }

  /**
   * Сбрасывает форму добавления комментариев в изначальное состояние
   */
  resetNewCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    const neutralFaceEmojiItem = this._element.querySelector(`.film-details__emoji-item:nth-of-type(2)`);
    const emojiPickerLabel = this._element.querySelector(`.film-details__add-emoji-label`);

    input.value = ``;
    input.blur();
    neutralFaceEmojiItem.checked = true;
    emojiPickerLabel.innerHTML = getEmoji();
  }

  showErrorInCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);

    this.unblockCommentForm();
    this._shake(input);
    input.style.borderColor = `red`;
  }

  showErrorInRatingPicker() {
    const ratingPicker = this._element.querySelector(`.film-details__user-rating-score`);
    const labels = this._element.querySelectorAll(`.film-details__user-rating-label`);

    this.unblockRatingPicker();
    this._shake(ratingPicker);
    labels.forEach((label) => (label.style.backgroundColor = `red`));
  }

  updateElement() {
    this._updateComments();
    this._updateRating();
  }

  close() {
    const userData = this._userData;

    if (typeof this._onClose === `function`) {
      this._onClose(userData);
    }
  }

  /**
   * Перерисовывает список комментариев
   */
  _updateComments() {
    const commentsCount = this._element.querySelector(`.film-details__comments-count`);
    const commentsList = this._element.querySelector(`.film-details__comments-list`);

    commentsCount.innerHTML = this._comments.length;
    commentsList.innerHTML = `${this._commentsTemplate}`;
  }

  /**
   * Перерисовывает блок с оценкой фильма
   */
  _updateRating() {
    const userRating = this._element.querySelector(`.film-details__user-rating`);

    userRating.innerHTML = `Your rate ${this._rating}`;
  }

  _blockCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji`);

    input.disabled = true;
    emojiPicker.disabled = true;
  }

  _blockRatingPicker() {
    const inputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    inputs.forEach((input) => (input.disabled = true));
  }

  _hideErrorInCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    input.style.borderColor = ``;
  }

  _hideErrorInRatingPicker() {
    const labels = this._element.querySelectorAll(`.film-details__user-rating-label`);

    labels.forEach((label) => (label.style.backgroundColor = ``));
  }

  _shake(element) {
    const ANIMATION_TIMEOUT = 1000;
    element.classList.add(`shake`);

    setTimeout(() => {
      element.classList.remove(`shake`);
    }, ANIMATION_TIMEOUT);
  }

  _showRatingSection() {
    const ratingWrapElement = this._element.querySelector(`.film-details__user-rating-wrap`);

    ratingWrapElement.classList.remove(VISUALLY_HIDDEN_CLASS);
  }

  update(data) {
    this._rating = data.rating;
    this._comments = data.comments;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;
  }

  /**
   * Навешивает обработчики событий на элементы попапа фильма
   */
  _addEventHandlers() {
    const emojiElements = this._element.querySelectorAll(`.film-details__emoji-item`);
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    const deleteCommentButtonElement = this._element.querySelector(`.film-details__watched-reset`);
    const userRatingInputsElements = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const addToWatchlistButtonElement = this._element.querySelector(`.film-details__control-input[name="watchlist"]`);
    const markAsWatchedButtonElement = this._element.querySelector(`.film-details__control-input[name="watched"]`);
    const addToFavoriteButtonElement = this._element.querySelector(`.film-details__control-input[name="favorite"]`);
    const closeButtonElement = this._element.querySelector(`.film-details__close-btn`);

    emojiElements.forEach((emoji) => emoji.addEventListener(`click`, this._commentEmojiChangeHandler));
    commentInputElement.addEventListener(`keydown`, this._commentSubmitHandler);
    deleteCommentButtonElement.addEventListener(`click`, this._deleteCommentButtonClickHandler);
    userRatingInputsElements.forEach((input) => input.addEventListener(`click`, this._userRatingInputClickHandler));
    addToWatchlistButtonElement.addEventListener(`click`, this._addToWatchlistButtonClickHandler);
    markAsWatchedButtonElement.addEventListener(`click`, this._markAsWatchedButtonClickHandler);
    addToFavoriteButtonElement.addEventListener(`click`, this._addToFavoriteButtonClickHandler);
    closeButtonElement.addEventListener(`click`, this._closeBtnClickHandler);
    document.body.addEventListener(`keydown`, this._popupKeydownHandler);
  }

  /**
   * Удаляет обработчики события с элементов попапа фильма
   */
  _removeEventHandlers() {
    const emojiElements = this._element.querySelectorAll(`.film-details__emoji-item`);
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    const deleteCommentButtonElement = this._element.querySelector(`.film-details__watched-reset`);
    const userRatingInputsElements = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const addToWatchlistButtonElement = this._element.querySelector(`.film-details__control-input[name="watchlist"]`);
    const markAsWatchedButtonElement = this._element.querySelector(`.film-details__control-input[name="watched"]`);
    const addToFavoriteButtonElement = this._element.querySelector(`.film-details__control-input[name="favorite"]`);
    const closeButtonElement = this._element.querySelector(`.film-details__close-btn`);

    emojiElements.forEach((emoji) => emoji.removeEventListener(`click`, this._commentEmojiChangeHandler));
    commentInputElement.removeEventListener(`keydown`, this._commentSubmitHandler);
    deleteCommentButtonElement.removeEventListener(`click`, this._deleteCommentButtonClickHandler);
    userRatingInputsElements.forEach((input) => input.removeEventListener(`click`, this._userRatingInputClickHandler));
    addToWatchlistButtonElement.removeEventListener(`click`, this._addToWatchlistButtonClickHandler);
    markAsWatchedButtonElement.removeEventListener(`click`, this._markAsWatchedButtonClickHandler);
    addToFavoriteButtonElement.removeEventListener(`click`, this._addToFavoriteButtonClickHandler);
    closeButtonElement.removeEventListener(`click`, this._closeBtnClickHandler);
    document.body.removeEventListener(`keydown`, this._popupKeydownHandler);
  }

  /**
   *
   * Обработчик клика по эмоджи реакции на фильм
   * @param {event} event
   */
  _commentEmojiChangeHandler(event) {
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji-label`);
    emojiPicker.innerHTML = getEmoji(event.target.value);
  }

  /**
   * Обработчик отправки формы добавления комментариев
   * @param {event} event
   */
  _commentSubmitHandler(event) {
    const isControlOrCmdKey = isControlKey(event) || isCmdKey(event);
    const submitCommentHotkeysPressed = isControlOrCmdKey && isEnterKey(event);

    if (submitCommentHotkeysPressed) {
      this._hideErrorInCommentForm();
      this._blockCommentForm();

      const newComment = new AdapterComment({
        author: `User name`,
        emotion: this._element.querySelector(`.film-details__emoji-item:checked`).value,
        comment: event.currentTarget.value,
        date: Date.now()
      });

      this._showRatingSection();

      if (typeof this._onSubmitComment === `function`) {
        this._onSubmitComment(newComment);
      }
    }
  }

  _deleteCommentButtonClickHandler(event) {
    event.preventDefault();

    if (typeof this._onDeleteComment === `function`) {
      this._onDeleteComment();
    }
  }

  /**
   * Обработчик клика по оценке фильма
   * @param {event} event
   */
  _userRatingInputClickHandler(event) {
    this._hideErrorInRatingPicker();
    this._blockRatingPicker();
    const newRating = +event.currentTarget.value;

    if (typeof this._onSubmitRating === `function`) {
      this._onSubmitRating(newRating);
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список к просмотру
   * @param {event} event - событие клика
   */
  _addToWatchlistButtonClickHandler() {
    if (typeof this._onAddToWatchlist === `function`) {
      this._onAddToWatchlist();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список просмотренных фильмов
   * @param {event} event - событие клика
   */
  _markAsWatchedButtonClickHandler() {
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  /**
   * Обработчик клика по кнопке добавления в список избранного
   * @param {event} event - событие клика
   */
  _addToFavoriteButtonClickHandler() {
    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite();
    }
  }

  /**
   * Обработчик клика по кнопке закрытия попапа
   */
  _closeBtnClickHandler() {
    this.close();
  }

  _popupKeydownHandler(event) {
    const isClosePopupKeyPressed = isEscapeKey(event);

    if (isClosePopupKeyPressed) {
      this.close();
    }
  }

}

export default FilmPopup;
