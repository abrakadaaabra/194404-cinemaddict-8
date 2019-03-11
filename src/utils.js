// Модуль вспомогательных функций

// Возвращает случайное число в диапазоне [min, max)
const getRandomNumber = (max, min = 0) => Math.random() * (max - min) + min;

// Возвращает случайное целое число в диапазоне [min, max)
const getRandomIntegerInRange = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

// Возвращает случайный индекс массива array
const getRandomArrayIndex = (array) => getRandomIntegerInRange(array.length);

// Возвращает случайный элемент массива array
const getRandomArrayElement = (array) => array[getRandomArrayIndex(array)];

// Возвращает случайное булево значение
const getRandomBoolean = () => getRandomIntegerInRange(2) === 0;

// Возвращает перемешанный массив array
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

// Возвращает массив длиной amountOfElements, состоящий из случайных элементов массива array
const getRandomArrayElements = (array, amountOfElements) => getShuffledArray(array).slice(0, amountOfElements);

// Возвращает случайную дату в диапазоне [текущая дата + min, текущая дата + max)
const getRandomDateInRange = (max, min = 0) => Date.now() + getRandomIntegerInRange(max, min) * 24 * 60 * 60 * 1000;

export {
  getRandomNumber,
  getRandomIntegerInRange,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomBoolean,
  getShuffledArray,
  getRandomDateInRange
};
