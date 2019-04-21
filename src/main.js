import generateFilmsData from './mock/generate-films-data';
import mockFilterData from './mock/mock-filter-data';

import Film from './classes/films/film';
import FilmDetailsPopup from './classes/films/film-details-popup';
import Filter from './classes/filters/filter';
import Statistics from './classes/statistics/statistics';

const AMOUNT_OF_FILMS = 7;
const AMOUNT_OF_EXTRA_FILMS = 2;


const filmsSection = document.querySelector(`.films`);
const main = document.querySelector(`main`);
const mainFilmsContainer = document.querySelector(`.films .films-list__container`);
const extraFilmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

const mainFilmsData = generateFilmsData(AMOUNT_OF_FILMS);
const extraFilmsData = generateFilmsData(AMOUNT_OF_EXTRA_FILMS);

const renderFilms = (filmsData, container) => {
  const fragment = document.createDocumentFragment();

  filmsData.forEach((data) => {
    const film = new Film(data);

    film.onCommentsBlockClick = () => {
      if (!film.popup) {
        film.popup = new FilmDetailsPopup(data);

        film.popup.onCloseBtnClick = (newData) => {
          Object.assign(data, newData);

          film.update(data);
          film.updateElement();

          film.popup.unrender();
        };
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

    fragment.appendChild(film.render());
  });

  container.appendChild(fragment);
};

renderFilms(mainFilmsData, mainFilmsContainer);
extraFilmsContainers.forEach((container) => {
  renderFilms(extraFilmsData, container);
});


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

const renderFilters = (filtersData, container) => {
  const fragment = document.createDocumentFragment();

  filtersData.forEach((data) => {
    const filter = new Filter(data);

    filter.onFilterClick = () => {
      const type = filter.type;
      const filteredFilms = filterFilmsData(mainFilmsData, type);

      document.querySelector(`.statistic`).remove();
      filmsSection.classList.remove(`visually-hidden`);

      mainFilmsContainer.innerHTML = ``;
      renderFilms(filteredFilms, mainFilmsContainer);
    };

    fragment.appendChild(filter.render());
  });

  container.insertBefore(fragment, container.firstChild);
};

renderFilters(mockFilterData, filtersContainer);

const statisticsButton = document.querySelector(`.main-navigation__item--additional`);
let statistics = null;
const clickStatsButtonHandler = () => {
  filmsSection.classList.add(`visually-hidden`);
  if (!statistics) {
    statistics = new Statistics(mainFilmsData);
  } else {
    statistics.unrender();
  }
  main.appendChild(statistics.render());
};
statisticsButton.addEventListener(`click`, clickStatsButtonHandler);
