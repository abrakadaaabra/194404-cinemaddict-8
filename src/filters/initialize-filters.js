import Filter from "./filter";
import {
  initializeFilteredFilms
} from "../films/initialize-films";
import {clearSearch} from "../search/initialize-search";

const filmsSection = document.querySelector(`.films`);
const allFilmsContainer = document.querySelector(`.films .films-list__container`);
const filtersContainer = document.querySelector(`.main-navigation`);

const filtersData = [{
  caption: `All movies`,
  type: `all`
},
{
  caption: `Watchlist`,
  type: `in-watchlist`
},
{
  caption: `History`,
  type: `is-watched`
},
{
  caption: `Favorites`,
  type: `in-favorites`
}
];

const initializeFilters = (filmsData) => {
  renderFilters(filmsData, filtersContainer);
};

const renderFilters = (filmsData, container) => {
  const fragment = document.createDocumentFragment();

  filtersData.forEach((data) => {
    data.count = getFilterCount(data, filmsData);
    const filter = createFilterInstance(data, filmsData);
    fragment.appendChild(filter.render());
  });

  container.insertBefore(fragment, container.firstChild);
};

const getFilterCount = (data, filmsData) => {
  const type = data.type;
  let filterCount = null;

  switch (type) {
    case `all`:
      filterCount = null;
      break;
    case `in-watchlist`:
      filterCount = filmsData.filter((film) => film.inWatchlist).length;
      break;
    case `is-watched`:
      filterCount = filmsData.filter((film) => film.isWatched).length;
      break;
    case `in-favorites`:
      filterCount = filmsData.filter((film) => film.isFavorite).length;
      break;
  }

  return filterCount;
};

const createFilterInstance = (data, filmsData) => {
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
    initializeFilteredFilms(filteredFilms);
    clearSearch();
  };

  return filter;
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

export default initializeFilters;
