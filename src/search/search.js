import Component from '../component';

class Search extends Component {
  constructor() {
    super();

    this._onSearch = null;

    this._searchInputChangeHandler = this._searchInputChangeHandler.bind(this);
  }

  get _template() {
    return `
      <form class="header__search search">
        <input type="text" name="search" class="search__field" placeholder="Search">
        <button type="submit" class="visually-hidden">Search</button>
      </form>
    `;
  }

  get input() {
    return this._element.querySelector(`.search__field`);
  }

  set onSearch(callback) {
    this._onSearch = callback;
  }

  clear() {
    this._element.querySelector(`.search__field`).value = ``;
  }

  _addEventHandlers() {
    const searchInput = this._element.querySelector(`.search__field`);
    searchInput.addEventListener(`input`, this._searchInputChangeHandler);
  }

  _removeEventHandlers() {
    const searchInput = this._element.querySelector(`.search__field`);
    searchInput.removeEventListener(`input`, this._searchInputChangeHandler);
  }

  _searchInputChangeHandler() {
    if (typeof this._onSearch === `function`) {
      this._onSearch();
    }
  }
}

export default Search;
