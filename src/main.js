import mockFiltersData from './mock/mock-filters-data';

import Film from './classes/films/film';
import FilmPopup from './classes/films/film-popup';
import Filter from './classes/filters/filter';
import Statistics from './classes/statistics/statistics';
import API from './api';

const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const AUTHORIZATION = `Basic abrakadaaabra`;

const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});

const filmsSection = document.querySelector(`.films`);
const main = document.querySelector(`main`);
const allFilmsContainer = document.querySelector(`.films .films-list__container`);
const preloader = document.querySelector(`.films-list__title`);

const createFilmPopupInstance = (film, data) => {
  const popup = new FilmPopup(data);

  popup.onSubmitComment = (newComment) => {
    data.comments.push(newComment);

    api.updateFilm({
      id: data.id,
      data: data.compose()
    }).then((newData) => {
      popup.updateCommentsList(newData);
      popup.resetNewCommentForm();
      popup.unblockCommentForm();
    }).catch(() => {
      popup.showErrorInCommentForm();
    });
  };

  popup.onSubmitRating = (newRating) => {
    data.rating = newRating;

    api.updateFilm({
      id: data.id,
      data: data.compose()
    }).then((newData) => {
      popup.unblockRatingPicker();
      popup.updateRating(newData);
    }).catch(() => {
      popup.showErrorInRatingPicker();
    });
  };

  popup.onClose = (newData) => {
    Object.assign(data, newData);

    film.update(data);
    film.updateElement();

    film.popup.unrender();
  };


  return popup;
};

const createFilmInstance = (data) => {
  const film = new Film(data);

  film.onCommentsBlockClick = () => {
    if (!film.popup) {
      film.popup = createFilmPopupInstance(film, data);
    }

    film.popup.update(data);
    film.popup.render();
    document.body.appendChild(film.popup.element);
  };

  film.onAddToWatchlist = () => {
    data.inWatchlist = !data.inWatchlist;
    film.update(data);
  };

  film.onAddToFavorite = () => {
    data.isFavorite = !data.isFavorite;
    film.update(data);
  };

  film.onMarkAsWatched = () => {
    data.isWatched = !data.isWatched;
    film.update(data);
  };

  return film;
};

const renderFilms = (filmsData, container) => {
  const fragment = document.createDocumentFragment();

  filmsData.forEach((data) => {
    const film = createFilmInstance(data);
    fragment.appendChild(film.render());
  });

  container.appendChild(fragment);
};

const filterFilmsData = (filmsData, type) => {
  switch (type) {
    case `all`:
      return filmsData;
    case `in-watchlist`:
      return filmsData.filter((filmData) => filmData.inWatchlist);
    case `is-watched`:
      return filmsData.filter((filmData) => filmData.isWatched);
    case `in-favorites`:
      return filmsData.filter((filmData) => filmData.isFavorite);
    default:
      return filmsData;
  }
};

const filtersContainer = document.querySelector(`.main-navigation`);

const renderFilters = (filmsData, filtersData, container) => {
  const fragment = document.createDocumentFragment();

  filtersData.forEach((data) => {
    const filter = new Filter(data);

    filter.onFilterClick = () => {
      const type = filter.type;
      const filteredFilms = filterFilmsData(filmsData, type);

      const statisticsSection = document.querySelector(`.statistic`);
      if (statisticsSection) {
        statisticsSection.remove();
      }
      filmsSection.classList.remove(`visually-hidden`);

      allFilmsContainer.innerHTML = ``;
      renderFilms(filteredFilms, allFilmsContainer);
    };

    fragment.appendChild(filter.render());
  });

  container.insertBefore(fragment, container.firstChild);
};

const initStatistics = (filmsData) => {
  const statisticsButton = document.querySelector(`.main-navigation__item--additional`);
  let statistics = null;
  const clickStatsButtonHandler = () => {
    filmsSection.classList.add(`visually-hidden`);
    if (!statistics) {
      statistics = new Statistics(filmsData);
    } else {
      statistics.unrender();
    }
    main.appendChild(statistics.render());
  };
  statisticsButton.addEventListener(`click`, clickStatsButtonHandler);
};

const showPreloader = (description) => {
  preloader.innerHTML = description;
  preloader.classList.remove(`visually-hidden`);
};

const hidePreloader = () => {
  preloader.classList.add(`visually-hidden`);
};

showPreloader(`Loading movies...`);

api.getFilms()
  .then((films) => {
    hidePreloader();
    renderFilms(films, allFilmsContainer);
    renderFilters(films, mockFiltersData, filtersContainer);
    initStatistics(films);
  })
  .catch(() => {
    showPreloader(`Something went wrong while loading movies. Check your connection or try again later`);
  });
