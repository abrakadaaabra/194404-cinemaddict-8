// Возвращает шаблон фильтра
const getFilterTemplate = (href, caption, count, isAdditional = false) => {
  const baseClass = `main-navigation__item`;

  const attributes = {
    filter: {
      href,
      class: isAdditional ? `${baseClass} ${baseClass}--additional` : `${baseClass}`
    },
    filterCount: {
      class: `main-navigation__item-count`
    }
  };

  const countTempate = ` <span class="${attributes.filterCount.class}">${count}</span>`;
  const filterTemplate = `
    <a href="${attributes.filter.href}" class="${attributes.filter.class}">
      ${caption}${!isAdditional ? countTempate : ``}
    </a>
  `;

  return filterTemplate;
};

export default getFilterTemplate;
