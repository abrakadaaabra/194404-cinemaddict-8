import data from './mock-film-data';
import {
  getRandomNumber,
  getRandomIntegerInRange,
  getRandomBoolean,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomDateInRange,
} from './utils';

const getFilmDescription = () => {
  const amountOfSentences = getRandomIntegerInRange(4);
  const description = getRandomArrayElements(data.descriptionSentences, amountOfSentences).join(` `);

  return description;
};

const generateFilmData = () => ({
  title: getRandomArrayElement(data.titles),
  originalTitle: getRandomArrayElement(data.titles),
  releaseYear: getRandomIntegerInRange(2019, 1960),
  cast: getRandomArrayElements(data.actors, getRandomIntegerInRange(data.actors.length)),
  description: getFilmDescription(),
  duration: getRandomIntegerInRange(180, 60),
  amountOfSeasons: getRandomIntegerInRange(16),
  amountOfEpisodes: getRandomIntegerInRange(150),
  genre: getRandomArrayElement(data.genres),
  ageLimit: getRandomArrayElement(data.ageLimits),
  premiereDate: getRandomDateInRange(7),
  dvdReleaseDate: getRandomDateInRange(10),
  rating: getRandomIntegerInRange(11, 1),
  averageRating: getRandomNumber(11, 1).toFixed(1),
  country: getRandomArrayElement(data.countries),
  isFavorite: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  inWatchlist: getRandomBoolean(),

  comments: data.comments,
  poster: getRandomArrayElement(data.posters),
});


// Возвращает массив длиной amount, содержащий данные о фильмах
const generateFilmsData = (amount) => {
  const filmsData = [];

  for (let i = 0; i < amount; i++) {
    filmsData.push(generateFilmData());
  }

  return filmsData;
};

export default generateFilmsData;
