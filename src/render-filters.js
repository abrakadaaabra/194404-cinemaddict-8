import {getRandomInteger} from './utils';
import getFilterTemplate from './get-filter-template';
import renderFilms from './render-films';

const clickFilterHandler = () => {
  const filmsContainers = document.querySelectorAll(`.films-list__container`);

  filmsContainers.forEach((container) => {
    container.innerHTML = ``;
    renderFilms(getRandomInteger(20), container);
  });
};

const renderFilters = (filters, container) => {
  const filtersTemplate = document.createElement(`template`);

  filters.forEach((filter) => {
    filtersTemplate.innerHTML += getFilterTemplate(`#${filter.caption}`, filter.caption, getRandomInteger(0, 100), filter.isAdditional);
  });

  container.appendChild(filtersTemplate.content.cloneNode(true));

  const filtersElements = container.querySelectorAll(`.main-navigation__item`);
  filtersElements.forEach((filter) => {
    filter.addEventListener(`click`, clickFilterHandler);
  });
};


export default renderFilters;
