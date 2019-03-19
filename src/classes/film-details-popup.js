import FilmComponent from "./film-component";

class FilmDetailsPopup extends FilmComponent {
  constructor(data) {
    super(data);

    this._clickCloseBtnHandler = this._clickCloseBtnHandler.bind(this);
  }

  set onCloseBtnClick(handler) {
    this._onCloseBtnClick = handler;
  }

  get _template() {
    const getCast = () => `${this._cast.join(`, `)}.`;

    const getFormattedDate = (timestamp) => {
      const date = new Date(timestamp);

      const formattedDate = date.toLocaleString(`ru`, {
        day: `numeric`,
        month: `long`,
        year: `numeric`
      });

      return formattedDate;
    };

    const commentsListItems = () => this._comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${comment.reaction}</span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">Tim Macoveev</span>
            <span class="film-details__comment-day">3 days ago</span>
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
                  <td class="film-details__cell">${getFormattedDate(this._premiereDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._duration} min</td>
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

  _clickCloseBtnHandler() {
    if (this._onCloseBtnClick && typeof this._onCloseBtnClick === `function`) {
      this._onCloseBtnClick();
    }
  }

  _createListeners() {
    const comments = this._element.querySelector(`.film-details__close-btn`);
    comments.addEventListener(`click`, this._clickCloseBtnHandler);
  }

  _removeListeners() {
    const comments = this._element.querySelector(`.film-details__close-btn`);
    comments.removeEventListener(`click`, this._clickCloseBtnHandler);
  }
}

export default FilmDetailsPopup;
