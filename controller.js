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
const displayGameView = function (shake = false) {
  guessView.update({
    curIndex: state.guessIndex,
    gusses: state.gusses,
    currentGuess: state.currentGuess,
    shake,
  });
  displayKeyboardView();
};
const addGuess = function () {
  if (state.isOver === true) return;
  if (state.currentGuess.length < 5) {
    guessView.renderError("Enter 5 letter word", 1);
    return true;
  }
  if (!checkWord(state.currentGuess.join(""))) {
    guessView.renderError("Not in word list", 1);
    return true;
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
  keyboardView.update({
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
    displayGameView(addGuess());
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
    displayGameView(addGuess());
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
(async function () {
  await setWord();
  console.log(state.currentWord);
  guessView.render({
    curIndex: state.guessIndex,
    gusses: state.gusses,
    currentGuess: state.currentGuess,
  });
  keyboardView.render({
    greenKey: state.greenKey,
    yellowKey: state.yellowKey,
    wrongKey: state.wrongKey,
    isOver: state.isOver,
  });
  keyboardView.addHandlerKeyboard(keyPress);
})();
