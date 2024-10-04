export const removeLetter = function (arr, val) {
  const index = arr.indexOf(elementToRemove);

  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
};
