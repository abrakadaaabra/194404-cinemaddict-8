import API from './api';
import {initializeFilms} from './films/initialize-films';
import initializeFilters from './filters/initialize-filters';
import initializeStatistics from './statistics/initialize-statistics';
import {initializeSearch} from './search/initialize-search';
import {VISUALLY_HIDDEN_CLASS} from './utils/utils';

const preloader = document.querySelector(`.films-list__title`);

const apiConfig = {
  END_POINT: `https://es8-demo-srv.appspot.com/moowle`,
  AUTHORIZATION: `Basic abrakadaaabra`
};

const api = new API({
  endPoint: apiConfig.END_POINT,
  authorization: apiConfig.AUTHORIZATION
});

const showPreloader = (description) => {
  preloader.innerHTML = description;
  preloader.classList.remove(VISUALLY_HIDDEN_CLASS);
};

const hidePreloader = () => {
  preloader.classList.add(VISUALLY_HIDDEN_CLASS);
};

const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
const renderFooterStatistics = (films) => {
  footerStatisticsElement.innerHTML = `${films.length} movies inside`;
};

showPreloader(`Loading movies...`);


const renderUserRank = (films) => {
  const userRankElement = document.querySelector(`.profile__rating`);
  const amountOfWatchedFilms = films.filter((film) => film.isWatched).length;

  let rank = ``;
  switch (true) {
    case amountOfWatchedFilms >= 1 && amountOfWatchedFilms <= 10:
      rank = `Novice`;
      break;
    case amountOfWatchedFilms >= 11 && amountOfWatchedFilms <= 20:
      rank = `Fan`;
      break;
    case amountOfWatchedFilms >= 21:
      rank = `Movie buff`;
      break;
  }

  userRankElement.innerHTML = `${rank}`;
};

api.getFilms()
  .then((films) => {
    hidePreloader();

    initializeFilms(films);
    initializeFilters(films);
    initializeStatistics(films);
    initializeSearch(films);

    renderUserRank(films);
    renderFooterStatistics(films);

    /**
     * Скрыть прелоадер
     * Инициализировать все фильмы (обычные и топовые)
     * Инициализировать фильтры
     * Инициализировать статистику
     * Инициализировать поиск
     * Отрисовать количетсво фильмов в футере
     */
  })
  .catch(() => {
    showPreloader(`Something went wrong while loading movies. Check your connection or try again later`);
  });
