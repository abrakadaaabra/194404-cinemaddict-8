import Search from './search';
import {
  initializeFilteredFilms
} from '../films/initialize-films';


const header = document.querySelector(`.header`);
const profileContainer = document.querySelector(`.header__profile`);
const allFilmsContainer = document.querySelector(`.films .films-list__container`);
let search;

/**
 * Function for searching film by title
 * @param {Object[]} films
 * @param {String} title
 * @return {Object[]}
 */
const searchFilm = (films, title) => films.filter((film) => film.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);


/**
 * Function for clear search field
 * @return {*}
 */
export const clearSearch = () => search.clear();


/**
 * Function for rendering search
 * @param {Object[]} films
 */
const renderSearch = (films) => {
  search = new Search();

  search.onSearch = () => {
    const filteredFilms = searchFilm(films, search.input.value);
    allFilmsContainer.innerHTML = ``;

    initializeFilteredFilms(filteredFilms);
  };

  header.insertBefore(search.render(), profileContainer);
};

export const initializeSearch = (films) => {
  renderSearch(films);
};
