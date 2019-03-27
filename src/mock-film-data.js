const titles = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Godfather: Part II`,
  `The Dark Knight`,
  `12 Angry Men`,
  `Schindler's List`,
  `The Lord of the Rings: The Return of the King`,
  `Pulp Fiction`,
  `Il buono, il brutto, il cattivo`,
  `Fight Club`,
  `The Lord of the Rings: The Fellowship of the Ring`,
  `Forrest Gump`,
  `Star Wars: Episode V - The Empire Strikes Back`,
  `Inception`,
  `The Lord of the Rings: The Two Towers`
];

const actors = [
  `Morgan Freeman`,
  `Marlon Brando`,
  `Al Pacino`,
  `Christian Bale`,
  `Heath Ledger`,
  `Michael Caine`,
  `Gary Oldman`,
  `Cillian Murphy`,
  `Liam Neeson`,
  `Ralph Fiennes`,
  `Sean Bean`,
  `Tim Roth`,
  `John Travolta`,
  `Samuel L. Jackson`,
  `Edward Norton`,
  `Brad Pitt`,
  `Orlando Bloom`
];

const descriptionSentences = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.replace(/([.?!])\s*(?=[A-Z])/g, `$1|`).split(`|`);

const genres = [
  `drama`,
  `crime`,
  `action`,
  `history`,
  `biography`,
  `adventure`,
  `fantasy`,
  `western`,
  `romance`,
  `sci-fi`
];

const ageLimits = [
  0,
  6,
  12,
  16,
  18
];

const countries = [
  `USA`,
  `UK`,
  `New Zealand`,
  `Italy`,
  `Spain`,
  `France`,
  `Russia`,
  `Germany`
];

const comments = [{
  emoji: `neutral-face`,
  text: `Simply incredible. Never before have I seen a 3 hour movie that didn't seem like 3 hours. I read the Lord of the Rings very recently and I was surprised at how similar Peter Jackson's vision was to my own.`,
  author: `Steve`,
  date: Date.now()
},
{
  emoji: `grinning`,
  text: `Here is one film that lived up to its hype, and by the time I saw it after it had arrived at the video stores, I had heard and read a ton of things about it, and seen all the awards it had received, and expected a lot. To my surprise, it did not disappoint.`,
  author: `John`,
  date: Date.now()
},
];

const basePostersPath = `./images/posters`;
const posters = [
  `${basePostersPath}/accused.jpg`,
  `${basePostersPath}/blackmail.jpg`,
  `${basePostersPath}/blue-blazes.jpg`,
  `${basePostersPath}/fuga-da-new-york.jpg`,
  `${basePostersPath}/moonrise.jpg`,
  `${basePostersPath}/three-friends.jpg`
];

const Emojis = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`,
};

const mockFilmData = {
  titles,
  actors,
  descriptionSentences,
  genres,
  ageLimits,
  countries,
  comments,
  posters,
  Emojis
};

export default mockFilmData;
