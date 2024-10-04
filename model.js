export const state = {
  currentWord: "",
  gusses: [],
  isGuessed: false,
};
export const getWord = async function () {
  const res = await fetch("./words.json");
  const data = await res.json();
  const randomIndex = Math.floor(Math.random() * data.length + 1);
  return data[randomIndex];
};
