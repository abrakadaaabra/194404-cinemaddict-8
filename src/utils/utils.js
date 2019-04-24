/**
 * Модуль вспомогательных функций
 */

const VISUALLY_HIDDEN_CLASS = `visually-hidden`;

/**
 * Возвращает случайное число в диапазоне [min, max)
 * @param  {number} max - верхняя граница диапазона (не включается)
 * @param  {number} min - нижняя граница диапазона
 * @return {number}
 */
const getRandomNumber = (max, min = 0) => Math.random() * (max - min) + min;

/**
 * Возвращает случайное целое число в диапазоне [min, max)
 * @param  {number} max - верхняя граница диапазона (не включается)
 * @param  {number} min - нижняя граница диапазона
 * @return {number}
 */
const getRandomIntegerInRange = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Возвращает случайный индекс массива array
 * @param  {array} array
 * @return {number}
 */
const getRandomArrayIndex = (array) => getRandomIntegerInRange(array.length);

/**
 * Возвращает случайный элемент массива array
 * @param  {array} array
 * @return {any}
 */
const getRandomArrayElement = (array) => array[getRandomArrayIndex(array)];

/**
 * Возвращает случайное булево значение
 * @return {boolean}
 */
const getRandomBoolean = () => getRandomIntegerInRange(2) === 0;

/**
 * Возвращает перемешанный массив array
 * @param  {array} array
 * @return {array}
 */
const getShuffledArray = (array) => {
  const copyOfOriginalArray = [...array];
  const shuffledArray = [];

  while (copyOfOriginalArray.length) {
    const randomIndex = getRandomArrayIndex(copyOfOriginalArray);
    const randomElement = copyOfOriginalArray[randomIndex];

    shuffledArray.push(randomElement);
    copyOfOriginalArray.splice(randomIndex, 1);
  }

  return shuffledArray;
};

/**
 * Возвращает новый массив, созданный из элементов массива array
 * @param  {array} array - входящий массив
 * @param  {number} amountOfElements - количество элементов, которые будут взяты из массива array
 * @return {array}
 */
const getRandomArrayElements = (array, amountOfElements) => getShuffledArray(array).slice(0, amountOfElements);

/**
 * Возвращает случайную дату в диапазоне [текущая дата + min, текущая дата + max)
 * @param  {number} max
 * @param  {number} min
 * @return {number}
 */
const getRandomDateInRange = (max, min = 0) => Date.now() + getRandomIntegerInRange(max, min) * 24 * 60 * 60 * 1000;

const Emojis = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`,
};

const getEmoji = (title = `neutral-face`) => Emojis[title];

const convertHtmlToText = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element.textContent || ``;
};

const showPreloader = (description) => {
  const preloader = document.querySelector(`.films-list__title`);
  preloader.innerHTML = description;
  preloader.classList.remove(VISUALLY_HIDDEN_CLASS);
};

const hidePreloader = () => {
  const preloader = document.querySelector(`.films-list__title`);
  preloader.classList.add(VISUALLY_HIDDEN_CLASS);
};

const getUserRank = (films) => {
  const amountOfWatchedFilms = films.filter((film) => film.isWatched).length;

  let rank = ``;
  switch (true) {
    case amountOfWatchedFilms >= 1 && amountOfWatchedFilms <= 10:
      rank = `Novice`;
      break;
    case amountOfWatchedFilms >= 11 && amountOfWatchedFilms <= 20:
      rank = `Fan`;
      break;
    case amountOfWatchedFilms >= 21:
      rank = `Movie buff`;
      break;
  }

  return rank;
};

const renderUserRank = (films) => {
  const userRankElement = document.querySelector(`.profile__rating`);

  userRankElement.innerHTML = getUserRank(films);
};

const renderFooterStatistics = (films) => {
  const footerStatisticsElement = document.querySelector(`.footer__statistics p`);
  footerStatisticsElement.innerHTML = `${films.length} movies inside`;
};

export {
  VISUALLY_HIDDEN_CLASS,
  getRandomNumber,
  getRandomIntegerInRange,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomBoolean,
  getShuffledArray,
  getRandomDateInRange,
  getEmoji,
  convertHtmlToText,
  showPreloader,
  hidePreloader,
  getUserRank,
  renderUserRank,
  renderFooterStatistics
};
