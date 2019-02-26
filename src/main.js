import renderFilters from './render-filters';
import renderFilms from './render-films';

const filtersContainer = document.querySelector(`.main-navigation`);
const filters = [
  {
    caption: `All movies`,
    isAdditional: false
  },
  {
    caption: `Watchlist`,
    isAdditional: false
  },
  {
    caption: `History`,
    isAdditional: false
  },
  {
    caption: `Favorites`,
    isAdditional: false
  },
  {
    caption: `Stats`,
    isAdditional: true
  }
];

const mainFilmsContainer = document.querySelector(`.films .films-list__container`);
const extraFilmsContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

renderFilters(filters, filtersContainer);

renderFilms(7, mainFilmsContainer);
extraFilmsContainers.forEach((container) => {
  renderFilms(2, container);
});
