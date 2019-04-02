import mockFilmData from '../mock-film-data';
import FilmComponent from "./film-component";
import moment from "moment";

class FilmDetailsPopup extends FilmComponent {
  constructor(data) {
    super(data);

    this._onCloseBtnClick = null;

    this._clickCloseBtnHandler = this._clickCloseBtnHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._changeCommentEmojiHandler = this._changeCommentEmojiHandler.bind(this);
    this._clickUserRatingInputHandler = this._clickUserRatingInputHandler.bind(this);
  }

  get _template() {
    const getCast = () => `${this._cast.join(`, `)}.`;

    // TODO: заменить Date.now() на дату публикация комментария и добавить ее в моковые данные
    const commentsListItems = () => this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${mockFilmData.Emojis[comment.emoji]}</span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
          </p>
        </div>
      </li>
    `).join(``);

    const ratingInputs = () => {
      const amountOfVariants = 9;
      let ratingInputsTemplate = ``;

      for (let i = 1; i <= amountOfVariants; i++) {
        ratingInputsTemplate += `
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"${this._rating === i ? ` checked` : ``} value="${i}" id="rating-${i}">
          <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
        `;
      }

      return ratingInputsTemplate;
    };

    // TODO: заменить Date.now() на дату выхода, продолжительность фильма в минутах
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
                  <td class="film-details__cell">${moment(Date.now()).format(`D MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${moment(Date.now()).format(`mm`)}min</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${this._genre}</span>
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
            <ul class="film-details__comments-list">
              ${commentsListItems()}
            </ul>
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

                <div class="film-details__user-rating-score">
                  ${ratingInputs()}
                </div>
              </section>
            </div>
          </section>
        </form>
      </section>
    `;

    return filmDetailsPopupTemplate;
  }

  _getNewFilmData() {
    const newFilmPopupData = {
      rating: this._rating,
      comments: this._comments,
      isFavorite: this._isFavorite,
      isWatched: this._isFavorite,
      inWatchlist: this._inWatchlist
    };

    return newFilmPopupData;
  }

  set onCloseBtnClick(handler) {
    this._onCloseBtnClick = handler;
  }

  _clickCloseBtnHandler() {
    const newFilmData = this._getNewFilmData();

    if (this._onCloseBtnClick && typeof this._onCloseBtnClick === `function`) {
      this._onCloseBtnClick(newFilmData);
    }
  }

  _addCommentHandler(event) {
    const isControlOrCmdKey = event.ctrlKey || event.metaKey || event.keyCode === 91 || event.which === 91;
    const isEnter = event.keyCode === 13 || event.which === 13;

    if (isControlOrCmdKey && isEnter) {
      const emoji = this._element.querySelector(`.film-details__emoji-item:checked`).value;
      const text = event.currentTarget.value;
      const author = `User name`;
      const date = Date.now();

      const newComment = {
        emoji,
        text,
        author,
        date
      };

      this._comments.push(newComment);

      event.currentTarget.value = ``;
      const emojiPicker = this._element.querySelector(`.film-details__add-emoji-label`);
      emojiPicker.innerHTML = mockFilmData.Emojis[`neutral-face`];
      event.target.blur();

      // TODO: сразу же обновлять список комментариев в DOM
    }
  }

  _changeCommentEmojiHandler(event) {
    const emojiPicker = this._element.querySelector(`.film-details__add-emoji-label`);
    emojiPicker.innerHTML = mockFilmData.Emojis[event.target.value];
  }

  _clickUserRatingInputHandler(event) {
    this._rating = +event.currentTarget.value;
    // TODO: сразу же обновлять оценку в DOM
  }

  _addEventHandlers() {
    const popupCloseBtn = this._element.querySelector(`.film-details__close-btn`);
    const userRatingInputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    const emojiListItems = this._element.querySelectorAll(`.film-details__emoji-item`);

    popupCloseBtn.addEventListener(`click`, this._clickCloseBtnHandler);
    userRatingInputs.forEach((input) => input.addEventListener(`click`, this._clickUserRatingInputHandler));
    commentInput.addEventListener(`keydown`, this._addCommentHandler);
    emojiListItems.forEach((emoji) => emoji.addEventListener(`click`, this._changeCommentEmojiHandler));
  }

  _removeEventHandlers() {
    const popupCloseBtn = this._element.querySelector(`.film-details__close-btn`);
    const userRatingInputs = this._element.querySelectorAll(`.film-details__user-rating-input`);
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    const emojiListItems = this._element.querySelectorAll(`.film-details__emoji-item`);

    popupCloseBtn.removeEventListener(`click`, this._clickCloseBtnHandler);
    userRatingInputs.forEach((input) => input.removeEventListener(`click`, this._clickUserRatingInputHandler));
    commentInput.removeEventListener(`keydown`, this._addCommentHandler);
    emojiListItems.forEach((emoji) => emoji.removeEventListener(`click`, this._changeCommentEmojiHandler));
  }

  // static createMapper(target) {
  //   return {
  //     score: (value) => (target.rating = value),
  //     favorite: (value) => (target.isFavorite = value),
  //     watched: (value) => (target.isWatched = value),
  //     watchlist: (value) => (target.inWatchlist = value),
  //   };
  // }
}

export default FilmDetailsPopup;
