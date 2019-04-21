import {
  getRandomIntegerInRange
} from "../utils/utils";

const filters = [{
  caption: `All movies`,
  type: `all`
},
{
  caption: `Watchlist`,
  type: `in-watchlist`,
  count: getRandomIntegerInRange(50)
},
{
  caption: `History`,
  type: `is-watched`,
  count: getRandomIntegerInRange(50)
},
{
  caption: `Favorites`,
  type: `in-favorites`,
  count: getRandomIntegerInRange(50)
},
  // {
  //   caption: `Stats`,
  //   isAdditional: true
  // }
];

export default filters;
