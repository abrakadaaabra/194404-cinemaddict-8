// Модуль вспомогательных функций

// Возвращает случайное число в диапазоне [min, max)
const getRandomNumber = (max, min = 0) => Math.random() * (max - min) + min;

// Возвращает случайное целое число в диапазоне [min, max)
const getRandomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

// Возвращает случайный индекс массива array
const getRandomArrayIndex = (array) => getRandomInteger(array.length);

// Возвращает случайный элемент массива array
const getRandomArrayElement = (array) => array[getRandomArrayIndex(array)];

// Возвращает случайное булево значение
const getRandomBoolean = () => getRandomInteger(2) === 0;

// Возвращает перемешанный массив array
const getShuffledArray = (array) => {
  const copyOfOriginalArray = [...array];
  const shuffledArray = [];

  array.forEach(() => {
    const randomIndex = getRandomArrayIndex(copyOfOriginalArray);
    const randomElement = copyOfOriginalArray[randomIndex];

    shuffledArray.push(randomElement);
    copyOfOriginalArray.splice(randomIndex, 1);
  });

  return shuffledArray;
};

// Возвращает массив длиной amountOfElements, состоящий из случайных элементов массива array
const getRandomArrayElements = (array, amountOfElements) => getShuffledArray(array).slice(0, amountOfElements);

// Возвращает случайную дату в диапазоне от текущей даты +- неделя
const getRandomDate = () => Date.now() + getRandomInteger(8, -7) * 24 * 60 * 60 * 1000;

export {
  getRandomNumber,
  getRandomInteger,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomBoolean,
  getShuffledArray,
  getRandomDate
};
