/**
 * Базовый класс для всех компонент.
 * Нельзя создавать экземпляры этого класса, от него можно только наследоваться.
 * @class Component
 */
class Component {

  /**
   * Создает экземпляр ПРОИЗВОДНОГО класса.
   * При попытке создать экземпляр компонента будет выброшена ошибка.
   */
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  /**
   * Возвращает DOM-элемент, соответствующий компоненту
   */
  get element() {
    return this._element;
  }

  /**
   * Возвращает шаблон компонента.
   * Метод обязательно должен быть определен у потомков, иначе будет выброшена ошибка.
   */
  get _template() {
    throw new Error(`You have to define template.`);
  }

  /**
   * Создает DOM-элемент, записывает его в поле компонента,
   * затем навешивает обработчики событий на элемент и возвращает его.
   * @return {HTMLElement}
   */
  render() {
    this._element = this._createElement();
    this._addEventHandlers();

    return this._element;
  }

  /**
   * Удаляет обработчики событий с DOM-элемента, удаляет элемент из DOM-дерева
   * и стирает записанный в поле компонента элемент
   */
  unrender() {
    this._removeEventHandlers();
    this._element.remove();
    this._element = null;
  }

  /**
   * Обновляет поля компонента
   */
  update() {}

  /**
   * Создает и возвращает DOM-элемент, соответствующий компоненту
   * @return {HTMLElement}
   */
  _createElement() {
    const tmpElement = document.createElement(`div`);
    tmpElement.innerHTML = this._template;

    const element = tmpElement.firstElementChild;

    return element;
  }

  /**
   * Навешивает обработчики событий на элемент
   */
  _addEventHandlers() {}

  /**
   * Удаляет обработчики события с элементов карточки фильма
   */
  _removeEventHandlers() {}
}

export default Component;
