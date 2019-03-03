import data from './mock-film-data';
import {
  getRandomNumber,
  getRandomInteger,
  getRandomBoolean,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomDate,
} from './utils';

const getFilmDescription = () => {
  const amountOfSentences = getRandomInteger(4);
  const description = getRandomArrayElements(data.descriptionSentences, amountOfSentences).join(` `);

  return description;
};

const generateFilmData = () => ({
  title: getRandomArrayElement(data.titles),
  originatlTitle: getRandomArrayElement(data.titles),
  releaseYear: getRandomInteger(2019, 1960),
  cast: getRandomArrayElements(data.actors, getRandomInteger(data.actors.length)),
  description: getFilmDescription(),
  duration: getRandomInteger(180, 60),
  amountOfEpisodes: getRandomInteger(150),
  genre: getRandomArrayElement(data.genres),
  ageLimit: getRandomArrayElement(data.ageLimits),
  premiereDate: getRandomDate(),
  releaseDate: getRandomDate(),
  rating: getRandomInteger(11, 1),
  averageRating: getRandomNumber(11, 1).toFixed(1),
  country: getRandomArrayElement(data.countries),
  poster: getRandomArrayElement(data.posters),
  amountOfComments: getRandomInteger(100),
  isFavorite: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  inWatchlist: getRandomBoolean()
});

export default generateFilmData;
