import Component from "../component";

/**
 * Класс фильтра
 * @class Filter
 * @extends {Component}
 */
class Filter extends Component {

  /**
   * Создает экземпляр фильтра
   * @param {Object} data - данные о фильтре
   */
  constructor(data) {
    super();

    this._onFilterClick = null;

    this._clickFilterHandler = this._clickFilterHandler.bind(this);

    this._caption = data.caption;
    this._type = data.type;
    this._href = data.href;
    this._count = data.count;
    this._isAdditional = data.isAdditional || false;
  }


  /**
   * Возвращает шаблон фильтра
   * @return {string}
   */
  get _template() {
    const getCountTemplate = () => `
      <span class="main-navigation__item-count">${this._count}</span>
    `;

    const isAdditionalClass = this._isAdditional ? `main-navigation__item--additional` : ``;

    return `
      <a href="#${this._caption}" class="main-navigation__item ${isAdditionalClass}">
        ${this._caption} ${this._count ? getCountTemplate() : ``}
      </a>
    `;
  }

  /**
   * Возвращает тип фильтра
   * @return {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Задает колбэк фильтрации
   * @param {Function} callback - колбэк
   */
  set onFilterClick(callback) {
    this._onFilterClick = callback;
  }

  /**
   * Обработчик клика по фильтру
   */
  _clickFilterHandler() {
    if (typeof this._onFilterClick === `function`) {
      this._onFilterClick();
    }
  }

  /**
   * Навешивает обработчики событий на элемент фильтра
   */
  _addEventHandlers() {
    this._element.addEventListener(`click`, this._clickFilterHandler);
  }

  /**
   * Удаляет обработчики событий с элементов фильтра
   */
  _removeEventHandlers() {
    this._element.removeEventListener(`click`, this._clickFilterHandler);
  }
}

export default Filter;
