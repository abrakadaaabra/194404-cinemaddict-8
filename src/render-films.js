import Film from './classes/film';
import FilmDetailsPopup from './classes/film-details-popup';

const renderFilm = (data) => {
  const film = new Film(data);
  const filmElement = film.render();

  const filmDetailsPopup = new FilmDetailsPopup(data);

  film.onCommentsBlockClick = () => {
    filmDetailsPopup.render();
    document.body.appendChild(filmDetailsPopup.element);
  };

  filmDetailsPopup.onCloseBtnClick = () => {
    filmDetailsPopup.element.remove();
    filmDetailsPopup.unrender();
  };

  return filmElement;
};

const renderFilms = (filmsData, container) => {
  const fragment = document.createDocumentFragment();

  filmsData.map((data) => {
    const element = renderFilm(data);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export default renderFilms;
