import FilmComponent from "./film-component";
import AdapterComment from "../../adapter-comment";
import moment from "moment";

import {
  isControlKey,
  isCmdKey,
  isEnterKey
} from '../../utils/keyboard-utils';

import {
  getEmoji
} from "../../utils/utils";

/**
 * Класс попапа с подробной информацией о фильме
 * @class FilmDetailsPopup
 * @extends {FilmComponent}
 */
class FilmPopup extends FilmComponent {
  /**
   * Создает экземпляр попапа фильма
   * @param {Object} data - данные о фильме
   */
  constructor(data) {
    super(data);

    this._onClose = null;
    this._onSubmitComment = null;
    this._onSubmitRating = null;

    this._clickCloseBtnHandler = this._clickCloseBtnHandler.bind(this);
    this._changeCommentEmojiHandler = this._changeCommentEmojiHandler.bind(this);
    this._submitCommentHandler = this._submitCommentHandler.bind(this);
    this._clickUserRatingInputHandler = this._clickUserRatingInputHandler.bind(this);
  }

  /**
   * Возвращает шаблон комментариев к фильму
   * @return {string}
   */
  get _commentsTemplate() {
    const comments = this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${getEmoji([comment.emoji])}</span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
          </p>
        </div>
      </li>
    `).join(``);

    return comments;
  }

  /**
   * Возвращает шаблон выбора оценки фильма
   * @return {string}
   */
  get _ratingPickerTemplate() {
    const AMOUNT_OF_VARIANTS = 9;
    let inputs = ``;

    for (let i = 1; i <= AMOUNT_OF_VARIANTS; i++) {
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
    const getCast = () => `${this._cast.join(`, `)}.`;
    const getGenres = () => this._genre.map((genre) => `
      <span class="film-details__genre">${genre}</span>
    `).join(``);

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
                  <td class="film-details__cell">Brad Bird</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Brad Bird</td>
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
          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <span class="film-details__watched-status ${this._isWatched ? ` film-details__watched-status--active` : ``}">Already watched</span>
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
  get _partOfFilmData() {
    const partOfFilmData = {
      rating: this._rating,
      comments: this._comments,
      isFavorite: this._isFavorite,
      isWatched: this._isWatched,
      inWatchlist: this._inWatchlist
    };

    return partOfFilmData;
  }

  /**
   * Задает колбэк закрытия попапа фильма
   * @param {Function} callback - колбэк
   */
  set onClose(callback) {
    this._onClose = callback;
  }

  /**
   * Задает колбэк отправки комментария о фильме
   * @param {Function} callback - колбэк
   */
  set onSubmitComment(callback) {
    this._onSubmitComment = callback;
  }

  /**
   * Задает колбэк отправки оценки фильма
   * @param {Function} callback - колбэк
   */
  set onSubmitRating(callback) {
    this._onSubmitRating = callback;
  }

  /**
   * Обработчик клика по кнопке закрытия попапа
   */
  _clickCloseBtnHandler() {
    const updatedFilmData = this._partOfFilmData;

    if (typeof this._onClose === `function`) {
      this._onClose(updatedFilmData);
    }
  }

  blockCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji`);

    input.disabled = true;
    emojiPicker.disabled = true;
  }

  unblockCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji`);

    input.disabled = false;
    emojiPicker.disabled = false;
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
    emojiPickerLabel.innerHTML = getEmoji(`neutral-face`);
  }

  showErrorInCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);

    this.shake(input);
    input.style.borderColor = `red`;
  }

  hideErrorInCommentForm() {
    const input = this._element.querySelector(`.film-details__comment-input`);
    input.style.borderColor = ``;
  }

  blockRatingPicker() {
    const inputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    inputs.forEach((input) => (input.disabled = true));
  }

  unblockRatingPicker() {
    const inputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    inputs.forEach((input) => (input.disabled = false));
  }

  showErrorInRatingPicker() {
    const ratingPicker = this._element.querySelector(`.film-details__user-rating-score`);
    const labels = this._element.querySelectorAll(`.film-details__user-rating-label`);

    this.shake(ratingPicker);
    labels.forEach((label) => (label.style.backgroundColor = `red`));
  }

  hideErrorInRatingPicker() {
    const labels = this._element.querySelectorAll(`.film-details__user-rating-label`);

    labels.forEach((label) => (label.style.backgroundColor = ``));
  }

  /**
   * Перерисовывает список комментариев
   */
  updateCommentsList({
    comments
  }) {
    this._comments = comments;

    const commentsList = this.element.querySelector(`.film-details__comments-list`);
    commentsList.innerHTML = `${this._commentsTemplate}`;
  }

  /**
   * Перерисовывает блок с оценкой фильма
   */
  updateRating({
    rating
  }) {
    this._rating = rating;

    const userRating = this._element.querySelector(`.film-details__user-rating`);
    userRating.innerHTML = `Your rate ${this._rating}`;
  }

  shake(element) {
    const ANIMATION_TIMEOUT = 1000;
    element.classList.add(`shake`);

    setTimeout(() => {
      element.classList.remove(`shake`);
    }, ANIMATION_TIMEOUT);
  }

  /**
   *
   * Обработчик клика по эмоджи реакции на фильм
   * @param {event} event
   */
  _changeCommentEmojiHandler(event) {
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji-label`);
    emojiPicker.innerHTML = getEmoji(event.target.value);
  }

  /**
   * Обработчик отправки формы добавления комментариев
   * @param {event} event
   */
  _submitCommentHandler(event) {
    this.hideErrorInCommentForm();

    const isControlOrCmdKey = isControlKey(event) || isCmdKey(event);
    const submitCommentHotkeysPressed = isControlOrCmdKey && isEnterKey(event);

    if (submitCommentHotkeysPressed) {
      this.blockCommentForm();

      const newComment = new AdapterComment({
        author: `User name`,
        emotion: this._element.querySelector(`.film-details__emoji-item:checked`).value,
        comment: event.currentTarget.value,
        date: Date.now()
      });

      if (typeof this._onSubmitComment === `function`) {
        this._onSubmitComment(newComment);
      }
    }
  }

  /**
   * Обработчик клика по оценке фильма
   * @param {event} event
   */
  _clickUserRatingInputHandler(event) {
    this.hideErrorInRatingPicker();
    this.blockRatingPicker();
    const newRating = +event.currentTarget.value;

    if (typeof this._onSubmitRating === `function`) {
      this._onSubmitRating(newRating);
    }
  }

  /**
   * Навешивает обработчики событий на элементы попапа фильма
   */
  _addEventHandlers() {
    const popupCloseBtn = this._element.querySelector(`.film-details__close-btn`);
    const userRatingInputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    const emojiListItems = this._element.querySelectorAll(`.film-details__emoji-item`);

    popupCloseBtn.addEventListener(`click`, this._clickCloseBtnHandler);
    userRatingInputs.forEach((input) => input.addEventListener(`click`, this._clickUserRatingInputHandler));
    commentInput.addEventListener(`keydown`, this._submitCommentHandler);
    emojiListItems.forEach((emoji) => emoji.addEventListener(`click`, this._changeCommentEmojiHandler));
  }

  /**
   * Удаляет обработчики события с элементов попапа фильма
   */
  _removeEventHandlers() {
    const popupCloseBtn = this._element.querySelector(`.film-details__close-btn`);
    const userRatingInputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    const emojiListItems = this._element.querySelectorAll(`.film-details__emoji-item`);

    popupCloseBtn.removeEventListener(`click`, this._clickCloseBtnHandler);
    userRatingInputs.forEach((input) => input.removeEventListener(`click`, this._clickUserRatingInputHandler));
    commentInput.removeEventListener(`keydown`, this._submitCommentHandler);
    emojiListItems.forEach((emoji) => emoji.removeEventListener(`click`, this._changeCommentEmojiHandler));
  }
}

export default FilmPopup;
