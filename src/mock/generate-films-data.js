import data from './mock-film-data';
import {
  getRandomNumber,
  getRandomIntegerInRange,
  getRandomBoolean,
  getRandomArrayElement,
  getRandomArrayElements
} from '../utils/utils';

/**
 * Возвращает описание фильма
 * @return {string}
 */
const getFilmDescription = () => {
  const amountOfSentences = getRandomIntegerInRange(4);
  const description = getRandomArrayElements(data.descriptionSentences, amountOfSentences).join(` `);

  return description;
};

/**
 * Возвращает объект со сгенерированными данными о фильме
 * @return {object}
 */
const generateFilmData = () => ({
  title: getRandomArrayElement(data.titles),
  originalTitle: getRandomArrayElement(data.titles),
  releaseYear: Date.now(),
  cast: getRandomArrayElements(data.actors, getRandomIntegerInRange(data.actors.length)),
  description: getFilmDescription(),
  duration: getRandomIntegerInRange(180, 60),
  amountOfSeasons: getRandomIntegerInRange(16),
  amountOfEpisodes: getRandomIntegerInRange(150),
  genre: getRandomArrayElements(data.genres, getRandomIntegerInRange(data.genres.length)),
  ageLimit: getRandomArrayElement(data.ageLimits),
  watchingDate: getRandomArrayElement(data.watchingDates),
  premiereDate: Date.now(),
  dvdReleaseDate: Date.now(),
  rating: getRandomIntegerInRange(11, 1),
  averageRating: getRandomNumber(11, 1).toFixed(1),
  country: getRandomArrayElement(data.countries),
  isFavorite: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  inWatchlist: getRandomBoolean(),

  comments: data.comments,
  poster: getRandomArrayElement(data.posters),
});

/**
 * Возвращает массив содержащий данные о фильмах
 * @param {number} amount - количество фильмов
 * @return {array}
 */
const generateFilmsData = (amount) => {
  const filmsData = [];

  for (let i = 0; i < amount; i++) {
    filmsData.push(generateFilmData());
  }

  return filmsData;
};

export default generateFilmsData;
