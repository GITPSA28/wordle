export const removeLetter = function (arr, val) {
  const index = arr.indexOf(elementToRemove);

  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
};
export const getLocalData = function (key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (data) return data;
  return false;
};
export const setLocalData = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};
