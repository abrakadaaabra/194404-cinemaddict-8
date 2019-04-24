import Film from "./film";
import FilmPopup from "./film-popup";
import getApi from '../api/get-api';
import {
  VISUALLY_HIDDEN_CLASS
} from "../utils/utils";

const SHOW_TOP_FILMS = 2;
const SHOW_FILMS_PER_ONE_TIME = 5;

const allFilmsContainerElement = document.querySelector(`.films .films-list__container`);
const topRatedFilmsContainerElement = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const mostCommentedFilmsContainerElement = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const showMoreButtonElement = document.querySelector(`.films-list__show-more`);

const api = getApi();

let filmsData = [];
let copyOfFilmsData = [];
let globalPopup = null;

const initializeFilms = (data) => {
  filmsData = data;
  copyOfFilmsData = [...filmsData];

  updateShowMoreButton();

  showMoreButtonElement.addEventListener(`click`, showMoreButtonClickHandler);

  showNextFilms();
  showTopRatedFilms();
  showMostCommentedFilms();
};

const initializeFilteredFilms = (data) => {
  filmsData = data;
  copyOfFilmsData = [...filmsData];

  updateShowMoreButton();
  showNextFilms();
};

const updateShowMoreButton = () => {
  if (copyOfFilmsData.length) {
    showMoreButtonElement.classList.remove(VISUALLY_HIDDEN_CLASS);
  } else {
    showMoreButtonElement.classList.add(VISUALLY_HIDDEN_CLASS);
  }
};

const showMoreButtonClickHandler = () => {
  showNextFilms();
};

const showNextFilms = () => {
  const nextFilms = copyOfFilmsData.splice(0, SHOW_FILMS_PER_ONE_TIME);
  renderFilms(nextFilms, allFilmsContainerElement);

  updateShowMoreButton();
};

const showTopRatedFilms = () => {
  const topRatedFilms = getTopRatedFilms(filmsData);
  renderFilms(topRatedFilms, topRatedFilmsContainerElement, true);
};

const showMostCommentedFilms = () => {
  const mostCommentedFilms = getMostCommentedFilms(filmsData);
  renderFilms(mostCommentedFilms, mostCommentedFilmsContainerElement, true);
};

const getTopRatedFilms = (films) => sortFilmsByAverageRating([...films]).splice(0, SHOW_TOP_FILMS);

const getMostCommentedFilms = (films) => sortFilmsByCommentsAmount([...films]).splice(0, SHOW_TOP_FILMS);

const sortFilmsByAverageRating = (films) => {
  return films.sort((firstFilm, secondFilm) => secondFilm.averageRating - firstFilm.averageRating);
};

const sortFilmsByCommentsAmount = (films) => {
  return films.sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
};

const renderFilms = (data, container, hideControls = false) => {
  const fragment = document.createDocumentFragment();

  data.forEach((film) => {
    const filmInstance = createFilmInstance(film, hideControls);
    fragment.appendChild(filmInstance.render());
  });

  container.appendChild(fragment);
};

const createFilmInstance = (film, hideControls) => {
  const filmInstance = new Film(film, hideControls);

  filmInstance.onAddToWatchlist = () => {
    film.inWatchlist = !film.inWatchlist;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      filmInstance.update(newData);
      filmInstance.updateElement();
    }).catch((error) => {
      throw error;
    });
  };

  filmInstance.onMarkAsWatched = () => {
    film.isWatched = !film.isWatched;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      filmInstance.update(newData);
      filmInstance.updateElement();
    }).catch((error) => {
      throw error;
    });
  };

  filmInstance.onAddToFavorite = () => {
    film.isFavorite = !film.isFavorite;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      filmInstance.update(newData);
      filmInstance.updateElement();
    }).catch((error) => {
      throw error;
    });
  };

  filmInstance.onOpenPopup = () => {
    if (globalPopup) {
      globalPopup.close();
    }
    filmInstance.popup = createFilmPopupInstance(filmInstance, film);
    globalPopup = filmInstance.popup;

    document.body.appendChild(filmInstance.popup.render());
  };

  return filmInstance;
};

const createFilmPopupInstance = (filmInstance, film) => {
  const popupInstance = new FilmPopup(film);

  popupInstance.onAddToWatchlist = () => {
    film.inWatchlist = !film.inWatchlist;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
    }).catch((error) => {
      throw error;
    });
  };

  popupInstance.onMarkAsWatched = () => {
    film.isWatched = !film.isWatched;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
    }).catch((error) => {
      throw error;
    });
  };

  popupInstance.onAddToFavorite = () => {
    film.isFavorite = !film.isFavorite;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
    }).catch((error) => {
      throw error;
    });
  };

  popupInstance.onSubmitComment = (newComment) => {
    film.comments.push(newComment);

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
      popupInstance.updateElement();
      popupInstance.resetNewCommentForm();
      popupInstance.unblockCommentForm();
    }).catch(() => {
      popupInstance.showErrorInCommentForm();
    });
  };

  popupInstance.onDeleteComment = () => {
    film.comments.pop();

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
      popupInstance.updateElement();
    }).catch((error) => {
      throw error;
    });
  };

  popupInstance.onSubmitRating = (newRating) => {
    film.rating = newRating;

    api.updateFilm({
      id: film.id,
      data: film.compose()
    }).then((newData) => {
      popupInstance.update(newData);
      popupInstance.updateElement();
      popupInstance.unblockRatingPicker();
    }).catch(() => {
      popupInstance.showErrorInRatingPicker();
    });
  };

  popupInstance.onClose = (newData) => {
    Object.assign(film, newData);

    filmInstance.update(film);
    filmInstance.updateElement();

    popupInstance.unrender();
    globalPopup = null;
  };

  return popupInstance;
};

export {
  initializeFilms,
  initializeFilteredFilms
};
