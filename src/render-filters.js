import {getRandomIntegerInRange} from './utils';
import getFilterTemplate from './get-filter-template';
import renderFilms from './render-films';
import generateFilmsData from './generate-films-data';

const clickFilterHandler = () => {
  const filmsContainers = document.querySelectorAll(`.films-list__container`);

  filmsContainers.forEach((container) => {
    container.innerHTML = ``;
    const filmsData = generateFilmsData(getRandomIntegerInRange(20));
    renderFilms(filmsData, container);
  });
};

const renderFilters = (filters, container) => {
  const filtersTemplate = document.createElement(`template`);

  filters.forEach((filter) => {
    filtersTemplate.innerHTML += getFilterTemplate(`#${filter.caption}`, filter.caption, getRandomIntegerInRange(0, 100), filter.isAdditional);
  });

  container.appendChild(filtersTemplate.content.cloneNode(true));

  const filtersElements = container.querySelectorAll(`.main-navigation__item`);
  filtersElements.forEach((filter) => {
    filter.addEventListener(`click`, clickFilterHandler);
  });
};


export default renderFilters;
