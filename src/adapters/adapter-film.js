import AdapterComment from './adapter-comment';

class AdapterFilm {

  constructor(data) {
    this.id = data[`id`];

    this.title = data[`film_info`][`title`] || ``;
    this.originalTitle = data[`film_info`][`alternative_title`] || ``;
    this.releaseDate = data[`film_info`][`release`][`date`] || 0;
    this.director = data[`film_info`][`director`] || ``;
    this.writers = data[`film_info`][`writers`] || [];
    this.cast = data[`film_info`][`actors`] || [];
    this.description = data[`film_info`][`description`] || ``;
    this.duration = data[`film_info`][`runtime`] || 0;
    this.genre = data[`film_info`][`genre`] || [];
    this.ageLimit = data[`film_info`][`age_rating`] || 0;
    this.rating = data[`user_details`][`personal_rating`] || 0;
    this.averageRating = data[`film_info`][`total_rating`] || 0;
    this.country = data[`film_info`][`release`][`release_country`] || ``;
    this.isFavorite = data[`user_details`][`favorite`] || false;
    this.isWatched = data[`user_details`][`already_watched`] || false;
    this.inWatchlist = data[`user_details`][`watchlist`] || false;
    this.watchingDate = data[`user_details`][`watching_date`] || 0;

    this.comments = AdapterComment.parseComments(data[`comments`]);
    this.poster = data[`film_info`][`poster`] || ``;
  }

  compose() {
    return {
      'id': this.id,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.averageRating,
        "poster": this.poster,
        "age_rating": this.ageLimit,
        "director": this.director,
        "writers": this.writers,
        "actors": this.cast,
        "release": {
          "date": this.releaseDate,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genre,
        "description": this.description
      },
      'user_details': {
        "personal_rating": this.rating,
        "watchlist": this.inWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.isFavorite
      },
      'comments': this.comments.map((comment) => comment.compose())
    };
  }

  static parseFilm(data) {
    return new AdapterFilm(data);
  }

  static parseFilms(data) {
    return data.map(AdapterFilm.parseFilm);
  }

}

export default AdapterFilm;
