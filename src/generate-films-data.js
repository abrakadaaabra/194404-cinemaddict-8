import generateFilmData from './generate-film-data';

// Возвращает массив длиной amount, содержащий данные о фильмах
const generateFilmsData = (amount) => {
  const filmsData = [];

  for (let i = 0; i < amount; i++) {
    filmsData.push(generateFilmData());
  }

  return filmsData;
};

export default generateFilmsData;
