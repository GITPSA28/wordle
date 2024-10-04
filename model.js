export const state = {
  currentWord: "",
  gusses: [],
  currentGuess: [],
  guessIndex: 0,
  isGuessed: false,
  greenKey: new Set(),
  yellowKey: new Set(),
  wrongKey: new Set(),
};
let _words;
export const getWord = async function () {
  const res = await fetch("./words.json");
  const data = await res.json();
  _words = [...data];
  const randomIndex = Math.floor(Math.random() * data.length + 1);
  return data[randomIndex];
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
    // console.log(state);
  });
  state.gusses.push(guess);
  state.guessIndex += 1;
  if (
    state.guessIndex === 6 ||
    state.currentWord === state.currentGuess.join("")
  )
    state.isGuessed = true;

  state.currentGuess = [];
};
export const addLetter = function (letter) {
  if (state.isGuessed) return false;
  //   if (!state.gusses[state.guessIndex]) state.gusses[state.guessIndex] = [];
  if (state.currentGuess.length < 5) {
    state.currentGuess.push(letter);
    return true;
  }
  return false;
};
export const removeLetter = function () {
  if (state.isGuessed) return false;
  //   if (!state.gusses[state.guessIndex]) state.gusses[state.guessIndex] = [];
  if (state.currentGuess.length > 0) {
    state.currentGuess.pop();
    return true;
  }
  return false;
};
export const setCurrentWord = function (word) {
  state.currentWord = word;
};
