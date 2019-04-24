import getApi from './api/get-api';
import {
  initializeFilms
} from './films/initialize-films';
import initializeFilters from './filters/initialize-filters';
import initializeStatistics from './statistics/initialize-statistics';
import {
  initializeSearch
} from './search/initialize-search';

import {
  showPreloader,
  hidePreloader,
  renderUserRank,
  renderFooterStatistics
} from './utils/utils';

const api = getApi();

showPreloader(`Loading movies...`);
api.getFilms()
  .then((films) => {
    hidePreloader();

    initializeFilms(films);
    initializeFilters(films);
    initializeStatistics(films);
    initializeSearch(films);

    renderUserRank(films);
    renderFooterStatistics(films);
  })
  .catch(() => {
    showPreloader(`Something went wrong while loading movies. Check your connection or try again later`);
  });
