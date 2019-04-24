import Statistics from "./statistics";
import {VISUALLY_HIDDEN_CLASS} from "../utils/utils";

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
  statisticsButton.addEventListener(`click`, statisticsButtonClickHandler);
};

const statisticsButtonClickHandler = () => {
  filmsSection.classList.add(VISUALLY_HIDDEN_CLASS);
  if (!statistics) {
    statistics = new Statistics(filmsData);
  } else {
    statistics.update(filmsData);
    statistics.unrender();
  }
  main.appendChild(statistics.render());
};

export default initStatistics;
