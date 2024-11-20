import { getLocalData, setLocalData } from "./helper.js";
let _words;
let _easyWords;

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
const stats_default = {
  currentStreak: 0,
  maxStreak: 0,
  guess_distribution: {
    easy: [0, 0, 0, 0, 0, 0],
    normal: [0, 0, 0, 0, 0, 0],
  },
  played: 0,
  win: 0,
};
export const updateLocalStats = function (updateFunction) {
  const stats = getLocalData("guessduo_stats");
  const updatedStats = stats ? updateFunction(stats) : updateFunction();
  setLocalData("guessduo_stats", updatedStats);
};
export const updateStats = function (stats = stats_default) {
  if (!state.isOver) return;
  if (state.isGuessed) {
    stats.win += 1;
    stats.currentStreak += 1;
    stats.maxStreak =
      stats.currentStreak > stats.maxStreak
        ? stats.currentStreak
        : stats.maxStreak;
    stats.guess_distribution[state.difficulty][state.guessIndex - 1] += 1;
  } else {
    stats.currentStreak = 0;
  }
  return stats;
};

export const updateGamesPlayed = function (stats = stats_default) {
  stats.played += 1;
  return stats;
};

export const getStatsDataUI = function () {
  const localStats = getLocalData("guessduo_stats");
  const stats = localStats ? localStats : stats_default;
  const guesses = { ...stats.guess_distribution };
  const guessesWidths = {};
  for (const [key, value] of Object.entries(guesses)) {
    const max = Math.max(...guesses[key]);
    guessesWidths[key] = [];
    value.forEach(function (val) {
      const width = val === 0 ? "auto" : Math.round((val / max) * 100) + "%";
      guessesWidths[key].push(width);
    });
  }
  const statsUI = {
    ...stats,
    winPercent:
      stats.played > 0 ? Math.round((stats.win / stats.played) * 100) : 0,
    guessesWidths,
    difficulty: state.difficulty,
  };
  return statsUI;
};
export const getCurrentStreak = function () {
  const localStats = getLocalData("guessduo_stats");
  if (localStats) return localStats.currentStreak;
  return 0;
};
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
