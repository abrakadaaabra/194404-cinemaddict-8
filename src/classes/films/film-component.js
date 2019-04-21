import Component from "../component";

/**
 * Базовый класс для компонент карточки фильма и попапа с информацией о фильме,
 * содержащий общую для них логику и поля
 * @class FilmComponent
 * @extends {Component}
 */
class FilmComponent extends Component {

  /**
   * Создает экземпляр компонента карточки фильма или попапа
   * @param {object} data - объект с информацией о фильме
   */
  constructor(data) {
    super();

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

    if (new.target === FilmComponent) {
      throw new Error(`Can't instantiate TaskComponent, only concrete one.`);
    }
  }

  /**
   * Обновляет состояние компонента
   */
  _updateState() {}

  /**
   * Обновляет поля компонента на основе новых данных
   * @param {object} data - обновленные данные о фильме
   */
  update(data) {
    this._rating = data.rating;
    this._comments = data.comments;
    this._isFavorite = data.isFavorite;
    this._isWatched = data.isWatched;
    this._inWatchlist = data.inWatchlist;

    this._updateState();
  }
}

export default FilmComponent;
