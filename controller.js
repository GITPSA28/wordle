import {
  addCurrentGuess,
  addLetter,
  checkWord,
  fetchWords,
  getCurrentStreak,
  getStatsDataUI,
  getWord,
  removeLetter,
  restartGame,
  setCurrentWord,
  setDifficulty,
  state,
  updateGamesPlayed,
  updateLocalStats,
  updateStats,
} from "./model.js";
import guessView from "./guessView.js";
import keyboardView from "./keyboardView.js";
import settingsView from "./settingsView.js";
import statsView from "./statsView.js";
import headerView from "./headerView.js";

const setWord = function () {
  const word = getWord();
  setCurrentWord(word);
  console.log(state.currentWord);
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
  if (state.guessIndex === 1) {
    updateLocalStats(updateGamesPlayed);
  }
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
      3
    );
  }
  if (state.isOver) {
    updateLocalStats(updateStats);
    headerView.update({
      streak: getCurrentStreak(),
    });
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
const restart = function (params) {
  restartGame();
  setWord();
  state.difficulty === "easy" && addLetter(state.currentWord[0]);
  displayGameView();
};
const keyPress = async function (key) {
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
    restart();
    return;
  }
  addLetter(key.toLowerCase());
  displayGameView();
};

const closeSettings = function () {
  settingsView.render({ visible: false });
};
const openSettings = function () {
  settingsView.render({
    visible: true,
    inProgress: state.guessIndex > 0 && !state.isOver,
    level: state.difficulty,
  });
  settingsView.addHandlerDifficultySelect(setDifficulty, restart);
  settingsView.addHandlerCloseSettings(closeSettings);
};
const openStats = function () {
  statsView.render({ ...getStatsDataUI(), visible: true });
  statsView.addHandlerCloseModel(closeStats);
};
const closeStats = function () {
  statsView.render({ visible: false });
};
(async function () {
  await fetchWords();
  setWord();
  state.difficulty === "easy" && addLetter(state.currentWord[0]);
  headerView.render({
    streak: getCurrentStreak(),
  });
  headerView.addHandlerOpenStats(openStats);
  headerView.addHandlerOpenSettings(openSettings);
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
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark");
}
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  });
