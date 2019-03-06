import generateFilmsData from './generate-films-data';
import getFilmTemplate from './get-film-template';

// Отрисовывает указанное количество карточек фильмов amount в dom-элемент container
const renderFilms = (amount, container) => {
  const filmsTemplate = document.createElement(`template`);

  generateFilmsData(amount).forEach((filmData) => {
    filmsTemplate.innerHTML += getFilmTemplate(filmData);
  });

  container.appendChild(filmsTemplate.content.cloneNode(true));
};

export default renderFilms;
