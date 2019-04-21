/**
 * Модуль вспомогательных функция для работы с клавиатурой
 */

/**
 * Проверяет, что нажата клавиша Control
 * @param  {event} event - событие keyDown
 * @return {boolean}
 */
const isControlKey = (event) => event.ctrlKey || event.keyCode === 17 || event.which === 17;

/**
 * Проверяет, что нажата клавиша Cmd
 * @param  {event} event - событие keyDown
 * @return {boolean}
 */
const isCmdKey = (event) => event.metaKey || event.keyCode === 91 || event.which === 91;

/**
 * Проверяет, что нажата клавиша Enter
 * @param  {event} event - событие keyDown
 * @return {boolean}
 */
const isEnterKey = (event) => event.key === `Enter` || event.keyCode === 13 || event.which === 13;

export {
  isControlKey,
  isCmdKey,
  isEnterKey
};
