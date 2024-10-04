import View from "./view.js";

class guessView extends View {
  _parentContainer = document.getElementById("game-container");

  _generateMarkup() {
    const markup = this._generateGameBoard();
    return markup;
  }
  _generateGameBoard() {
    let markup = "";
    let empty = 5 - this._data.curIndex;
    empty += !this._data.currentGuess.length ? 1 : 0;
    this._data.gusses.forEach((word) => {
      markup += this._generateRowMarkup(word);
    });
    // console.log(this._data.currentGuess);
    markup += this._data.currentGuess.length
      ? this._generateCurrentRowMarkup(this._data.currentGuess)
      : "";

    for (let i = 0; i < empty; i++) markup += this._generateCurrentRowMarkup();
    return markup;
  }
  _generateRowMarkup(word) {
    let markup = '<div class="row">';

    word.forEach((el) => {
      markup += `
        <div class="letter ${el.result}">
                <p>${el.letter.toUpperCase()}</p>
            </div>`;
    });
    markup += "</div>";
    return markup;
  }
  _generateCurrentRowMarkup(word = []) {
    let markup = '<div class="row">';

    for (let i = 0; i < 5; i++) {
      markup += `
        <div class="letter">
                <p>${word[i]?.toUpperCase() || ""}</p>
            </div>`;
    }
    markup += "</div>";
    return markup;
  }
}
export default new guessView();
