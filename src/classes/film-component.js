import Component from "./component";

class FilmComponent extends Component {
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
}

export default FilmComponent;
