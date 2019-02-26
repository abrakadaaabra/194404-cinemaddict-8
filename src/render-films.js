import getFilmTemplate from './get-film-template';

const renderFilms = (amount, container) => {
  const filmsTemplate = document.createElement(`template`);

  for (let i = 0; i < amount; i++) {
    filmsTemplate.innerHTML += getFilmTemplate();
  }

  container.appendChild(filmsTemplate.content.cloneNode(true));
};

export default renderFilms;
