import { getWord } from "./model.js";
import view from "./view.js";
const displayWord = async function () {
  const word = await getWord();
  view.renderWord(word);
};
displayWord();
