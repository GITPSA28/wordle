import {
  addCurrentGuess,
  addLetter,
  checkWord,
  getWord,
  removeLetter,
  setCurrentWord,
  state,
} from "./model.js";
import guessView from "./guessView.js";
import keyboardView from "./keyboardView.js";
const setWord = async function () {
  const word = await getWord();
  setCurrentWord(word);
};
const displayGameView = function () {
  guessView.render({
    curIndex: state.guessIndex,
    gusses: state.gusses,
    currentGuess: state.currentGuess,
  });
  displayKeyboardView();
};
const addGuess = function () {
  if (!checkWord(state.currentGuess.join(""))) return;
  addCurrentGuess();
};
const displayKeyboardView = function () {
  keyboardView.render({
    greenKey: state.greenKey,
    yellowKey: state.yellowKey,
    wrongKey: state.wrongKey,
  });
};

document.addEventListener("keydown", function (event) {
  if (/^[a-zA-Z]$/.test(event.key)) {
    addLetter(event.key.toLowerCase());
    displayGameView();
  }
});
document.addEventListener("keydown", function (event) {
  //   console.log(event.key, event.key === "Enter");
  if (event.key === "Enter") {
    addGuess();
    displayGameView();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    removeLetter();
    displayGameView();
  }
});
await setWord();
console.log(state.currentWord);
displayGameView();
displayKeyboardView();
