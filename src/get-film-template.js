// Возвращает шаблон фильма
const getFilmTemplate = (data) => {
  const {
    title,
    releaseYear,
    description,
    duration,
    genre,
    averageRating,
    poster,
    amountOfComments
  } = data;

  const filmTemplateParts = {};

  const getDuration = () => {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;

    if (duration >= 60) {
      return `${hours}h${minutes ? ` ${minutes}m` : ``}`;
    } else {
      return `${minutes}m`;
    }
  };

  filmTemplateParts.title = `
    <h3 class="film-card__title">${title}</h3>
  `;

  filmTemplateParts.rating = `
    <p class="film-card__rating">${averageRating}</p>
  `;

  filmTemplateParts.info = `
   <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${getDuration()}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
  `;

  filmTemplateParts.poster = `
    <img src="${poster}" alt="" class="film-card__poster">
  `;

  filmTemplateParts.description = `
    <p class="film-card__description">${description}</p>
  `;

  filmTemplateParts.comments = `
    <button class="film-card__comments">${amountOfComments} comments</button>
  `;

  filmTemplateParts.controls = `
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">WL</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">WTCHD</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">FAV</button>
    </form>
  `;

  const filmTemplate = `
    <article class="film-card">
      ${filmTemplateParts.title}
      ${filmTemplateParts.rating}
      ${filmTemplateParts.info}
      ${filmTemplateParts.poster}
      ${filmTemplateParts.description}
      ${filmTemplateParts.comments}
      ${filmTemplateParts.controls}
    </article>
  `;

  return filmTemplate;
};

export default getFilmTemplate;
