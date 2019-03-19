import Film from './classes/film';
import FilmDetailsPopup from './classes/film-details-popup';

const renderFilm = (data) => {
  const film = new Film(data);
  const filmElement = film.render();

  film.onCommentsBlockClick = () => {
    if (!film.popup) {
      film.popup = new FilmDetailsPopup(data);

      film.popup.onCloseBtnClick = () => {
        film.popup.unrender();
      };
    }

    film.popup.render();
    document.body.appendChild(film.popup.element);
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
