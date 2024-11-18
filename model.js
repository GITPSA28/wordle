export let state = {
  currentWord: "",
  gusses: [],
  currentGuess: [],
  guessIndex: 0,
  isGuessed: false,
  isOver: false,
  greenKey: new Set(),
  yellowKey: new Set(),
  wrongKey: new Set(),
  difficulty: "easy",
};
let _words;
let _easyWords;
export const fetchWords = async function () {
  const res = await fetch("./words.json");
  const data = await res.json();
  _words = [...data];
  const resEasy = await fetch("./easyWords.json");
  const dataEasy = await resEasy.json();
  _easyWords = [...dataEasy];
};
export const getWord = function () {
  if (state.difficulty === "easy") {
    const randomIndex = Math.floor(Math.random() * _easyWords.length + 1);
    return _easyWords[randomIndex];
  }
  if (state.difficulty === "normal") {
    const randomIndex = Math.floor(Math.random() * _words.length + 1);
    return _words[randomIndex];
  }
};
export const checkWord = function (word) {
  return _words.includes(word);
};
export const addCurrentGuess = function () {
  let cur = state.currentWord.split("");
  const currentGuess = [...state.currentGuess];
  const guess = [];
  cur.forEach((letter, index) => {
    if (currentGuess[index] === letter) {
      guess[index] = {
        letter: letter,
        result: "green",
      };
      state.greenKey.add(letter);
      cur[index] = "";
    }
  });
  currentGuess.forEach((letter, index) => {
    if (!guess[index]) {
      if (cur.includes(letter)) {
        cur[cur.indexOf(letter)] = "";
        guess[index] = {
          letter: letter,
          result: "yellow",
        };
        state.yellowKey.add(letter);
      } else {
        guess[index] = {
          letter: letter,
          result: "wrong",
        };
        state.wrongKey.add(letter);
      }
    }
  });
  state.gusses.push(guess);
  state.guessIndex += 1;
  if (state.currentWord === state.currentGuess.join("")) {
    state.isGuessed = true;
    state.isOver = true;
  }
  if (state.guessIndex === 6) state.isOver = true;

  state.currentGuess = [];
};
export const addLetter = function (letter) {
  if (state.isOver) return false;
  if (state.currentGuess.length < 5) {
    state.currentGuess.push(letter);
    return true;
  }
  return false;
};
export const removeLetter = function () {
  if (state.isOver) return false;
  if (state.currentGuess.length > 0) {
    state.currentGuess.pop();
    return true;
  }
  return false;
};
export const setCurrentWord = function (word) {
  state.currentWord = word;
};
export const setDifficulty = function (difficulty) {
  state.difficulty = difficulty;
};
export const restartGame = function () {
  state.currentWord = "";
  state.gusses = [];
  state.currentGuess = [];
  state.guessIndex = 0;
  state.isGuessed = false;
  state.isOver = false;
  state.greenKey = new Set();
  state.yellowKey = new Set();
  state.wrongKey = new Set();
};
