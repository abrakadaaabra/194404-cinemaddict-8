import Statistics from "./statistics";

const filmsSection = document.querySelector(`.films`);
const main = document.querySelector(`main`);

let statistics = null;
let filmsData = [];

const initStatistics = (data) => {
  filmsData = data;
  renderStatistics();
};

const renderStatistics = () => {
  const statisticsButton = document.querySelector(`.main-navigation__item--additional`);
  statisticsButton.addEventListener(`click`, clickStatsButtonHandler);
};

const clickStatsButtonHandler = () => {
  filmsSection.classList.add(`visually-hidden`);
  if (!statistics) {
    statistics = new Statistics(filmsData);
  } else {
    statistics.update(filmsData);
    statistics.unrender();
  }
  main.appendChild(statistics.render());
};

export default initStatistics;
