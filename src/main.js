import renderFilters from './render-filters';
import renderFilms from './render-films';
import generateFilmsData from './generate-films-data';

const AMOUNT_OF_FILMS = 7;
const AMOUN_OF_EXTRA_FILMS = 2;

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

const filmsData = generateFilmsData(AMOUNT_OF_FILMS);
const extraFilmsData = generateFilmsData(AMOUN_OF_EXTRA_FILMS);

renderFilms(filmsData, mainFilmsContainer);
extraFilmsContainers.forEach((container) => {
  renderFilms(extraFilmsData, container);
});
