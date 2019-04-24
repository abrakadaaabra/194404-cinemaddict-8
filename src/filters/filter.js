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

    this._caption = data.caption;
    this._type = data.type;
    this._count = data.count;

    this._onFilterClick = null;

    this._clickFilterHandler = this._clickFilterHandler.bind(this);
  }

  get _countTemplate() {
    return `<span class="main-navigation__item-count">${this._count}</span>`;
  }

  /**
   * Возвращает шаблон фильтра
   * @return {string}
   */
  get _template() {
    return `
      <a href="#${this._caption}" class="main-navigation__item">
        ${this._caption} ${this._count ? this._countTemplate : ``}
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

  /**
   * Обработчик клика по фильтру
   */
  _clickFilterHandler() {
    if (typeof this._onFilterClick === `function`) {
      this._onFilterClick();
    }
  }

}

export default Filter;
