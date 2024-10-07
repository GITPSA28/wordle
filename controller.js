import {
  addCurrentGuess,
  addLetter,
  checkWord,
  getWord,
  removeLetter,
  restartGame,
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
  if (state.isOver === true) return;
  if (!checkWord(state.currentGuess.join(""))) {
    guessView.renderError("Not in word list", 1);
    return;
  }
  addCurrentGuess();
  if (state.isGuessed === true) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  if (!state.isGuessed && state.isOver) {
    guessView.renderError(
      `Correct answer is ${state.currentWord.toUpperCase()}`,
      10
    );
  }
};
const displayKeyboardView = function () {
  keyboardView.render({
    greenKey: state.greenKey,
    yellowKey: state.yellowKey,
    wrongKey: state.wrongKey,
    isOver: state.isOver,
  });
};

document.addEventListener("keydown", function (event) {
  if (/^[a-zA-Z]$/.test(event.key)) {
    addLetter(event.key.toLowerCase());
    displayGameView();
  }
});
document.addEventListener("keydown", function (event) {
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

const keyPress = function (key) {
  if (key === "Enter") {
    addGuess();
    displayGameView();
    return;
  }
  if (key === "Backspace") {
    removeLetter();
    displayGameView();
    return;
  }
  if (key === "Restart") {
    restartGame();
    displayGameView();
    setWord();
    return;
  }
  addLetter(key.toLowerCase());
  displayGameView();
};
await setWord();
console.log(state.currentWord);
displayGameView();
displayKeyboardView();
keyboardView.addHandlerKeyboard(keyPress);
