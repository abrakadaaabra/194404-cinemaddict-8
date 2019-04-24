import Component from "../component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

class Statistics extends Component {

  /**
   * Создает экземпляр компонента статистики
   * @param {Array} filmsData - массив объектов с информацией о фильмах
   */
  constructor(filmsData) {
    super();

    this._watchedFilmsData = filmsData.filter((film) => film.isWatched);
    this._filteredFilmsData = [...this._watchedFilmsData];
    this._amountOfFilmsGroupByGenres = this._getAmountOfFilmsGroupByGenres();

    this._chart = null;

    this._clickStatisticsFilterHandler = this._clickStatisticsFilterHandler.bind(this);
  }

  _getUserRank() {
    const amountOfWatchedFilms = this._filteredFilmsData.length;
    let rank = ``;

    switch (true) {
      case amountOfWatchedFilms >= 1 && amountOfWatchedFilms <= 10:
        rank = `Novice`;
        break;
      case amountOfWatchedFilms >= 11 && amountOfWatchedFilms <= 20:
        rank = `Fan`;
        break;
      case amountOfWatchedFilms >= 21 :
        rank = `Movie buff`;
        break;
    }

    return rank;
  }

  /**
   * Возвращает шаблон блока с количеством просмотренных фильмов
   * @return {string}
   */
  _getAmountOfWatchedFilmsTemplate() {
    const amountOfWatchedFilms = this._filteredFilmsData.length;

    return `
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${amountOfWatchedFilms} <span class="statistic__item-description">movies</span></p>
      </li>
    `;
  }

  /**
   * Возвращает шаблон блока с суммарной продолжительностью просмотренных фильмов
   * @return {string}
   */
  _getTotalDurationTemplate() {
    const totalDuration = this._filteredFilmsData.reduce((acc, film) => acc + film.duration, 0);

    return `
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Math.floor(moment.duration(totalDuration, `minutes`).asHours())} <span class="statistic__item-description">h</span> ${moment.duration(totalDuration, `minutes`).minutes()} <span
            class="statistic__item-description">m</span></p>
      </li>
    `;
  }

  /**
   * Возвращает шаблон блока с любимым жанром просмотренных фильмов
   * @return {string}
   */
  _getTopGenreTemplate() {
    const genres = Object.keys(this._amountOfFilmsGroupByGenres);
    const amountOfFilms = Object.values(this._amountOfFilmsGroupByGenres);
    const maxAmountOfFilmsOfOneGenre = Math.max(...amountOfFilms);
    const topGenreIndex = amountOfFilms.indexOf(maxAmountOfFilmsOfOneGenre);
    const topGenre = genres[topGenreIndex] || `none`;

    return `
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    `;
  }

  /**
   * Возвращает шаблон компонента статистики
   * @return {string}
   */
  get _template() {

    const statisticsTemplate = `
      <section class="statistic">
        <p class="statistic__rank">Your rank <span class="statistic__rank-label">${this._getUserRank()}</span></p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
            id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
            value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
            value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
            value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
            value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          ${this._getAmountOfWatchedFilmsTemplate()}
          ${this._getTotalDurationTemplate()}
          ${this._getTopGenreTemplate()}
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>
    `;

    return statisticsTemplate;
  }

  /**
   * Возвращает объект с информацией о жанрах просмотренных фильмов и соответствующим им количестве
   * @return {object}
   */
  _getAmountOfFilmsGroupByGenres() {
    const amountOfFilmsByGenres = this._filteredFilmsData.reduce((acc, film) => {
      film.genre.forEach((genre) => {
        if (acc[genre]) {
          acc[genre]++;
        } else {
          acc[genre] = 1;
        }
      });

      return acc;
    }, {});

    return amountOfFilmsByGenres;
  }

  /**
   * Возвращает объект с данными для инициализации chartjs
   * @return {object}
   */
  _getChartData() {
    const genres = Object.keys(this._amountOfFilmsGroupByGenres);
    const amountOfFilms = Object.values(this._amountOfFilmsGroupByGenres);

    return {
      labels: genres,
      datasets: [{
        data: amountOfFilms,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    };
  }

  /**
   * Возвращает объект с конфигурацией для инициализации chartjs
   * @return {object}
   */
  _getChartOptions() {
    const data = this._getChartData();

    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data,
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    };
  }

  /**
   * Возвращает необходимую высоту canvas для диаграммы
   * @return {number}
   */
  _getCanvasHeight() {
    const BAR_HEIGHT = 50;
    const amountOfGenres = Object.keys(this._amountOfFilmsGroupByGenres).length;
    const canvasHeight = BAR_HEIGHT * amountOfGenres;

    return canvasHeight;
  }

  /**
   * Отрисовывает диаграмму
   */
  _drawChart() {
    const statisticsCtx = this._element.querySelector(`.statistic__chart`);
    statisticsCtx.height = this._getCanvasHeight();

    const options = this._getChartOptions();
    this._chart = new Chart(statisticsCtx, options);
  }

  render() {
    this._element = this._createElement();
    this._addEventHandlers();
    this._drawChart();

    return this._element;
  }

  /**
   * Фильтрует фильмы по дате просмотра за указанный период времени
   * @param {string} period - период времени, за который нужно отфильтровать фильмы
   * @return {array}
   */
  _filterByTimePeriod(period) {
    const nowDate = moment();

    const filteredFilms = this._watchedFilmsData.filter((film) => {
      const watchingDate = moment(film.watchingDate);

      return nowDate.diff(watchingDate, period) === 0;
    });

    return filteredFilms;
  }

  /**
   * Обработчик клика по фильтру статистики
   */
  _clickStatisticsFilterHandler() {
    const activeFilter = this._element.querySelector(`.statistic__filters-input:checked`);
    const filterType = activeFilter.value;

    switch (filterType) {
      case `all-time`:
        this._filteredFilmsData = this._watchedFilmsData;
        break;
      case `today`:
        this._filteredFilmsData = this._filterByTimePeriod(`day`);
        break;
      case `week`:
        this._filteredFilmsData = this._filterByTimePeriod(`week`);
        break;
      case `month`:
        this._filteredFilmsData = this._filterByTimePeriod(`month`);
        break;
      case `year`:
        this._filteredFilmsData = this._filterByTimePeriod(`year`);
        break;
    }

    this._updateStatistics();
    this._updateChart();
  }

  _addEventHandlers() {
    const statisticsFiltrers = this._element.querySelectorAll(`.statistic__filters-input`);
    statisticsFiltrers.forEach((filter) => {
      filter.addEventListener(`click`, this._clickStatisticsFilterHandler);
    });
  }

  _removeEventHandlers() {
    const statisticsFiltrers = this._element.querySelectorAll(`.statistic__filters-input`);
    statisticsFiltrers.forEach((filter) => {
      filter.removeEventListener(`click`, this._clickStatisticsFilterHandler);
    });
  }

  /**
   * Обновляет информацию о просмотренных фильмах, сгрупированных по жанрам и обновляет "текстовые" блоки статистики
   */
  _updateStatistics() {
    this._amountOfFilmsGroupByGenres = this._getAmountOfFilmsGroupByGenres();
    const textList = this._element.querySelector(`.statistic__text-list`);
    textList.innerHTML = `
      ${this._getAmountOfWatchedFilmsTemplate()}
      ${this._getTotalDurationTemplate()}
      ${this._getTopGenreTemplate()}
    `;
  }

  /**
   * Перерисовывает диаграмму
   */
  _updateChart() {
    this._chart.destroy();
    this._drawChart();
  }

  update(filmsData) {
    this._watchedFilmsData = filmsData.filter((film) => film.isWatched);
    this._filteredFilmsData = [...this._watchedFilmsData];
    this._amountOfFilmsGroupByGenres = this._getAmountOfFilmsGroupByGenres();
    this._updateStatistics();
    this._updateChart();
  }

}

export default Statistics;
