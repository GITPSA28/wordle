import View from "./view.js";

class keboardView extends View {
  _parentContainer = document.getElementById("keyboard");
  _keyRow = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  _generateMarkup() {
    let mark = "";
    this._keyRow.forEach((row) => {
      mark += "<div class='key-row'>";
      row.split("").forEach((letter) => {
        mark += `
            <button class="key ${
              this._data.greenKey.has(letter)
                ? "green"
                : this._data.yellowKey.has(letter)
                ? "yellow"
                : this._data.wrongKey.has(letter)
                ? "wrong"
                : ""
            }">
                <p>${letter.toUpperCase()}</p>
            </button>`;
      });
      mark += "</div>";
    });
    return mark;
  }
}
export default new keboardView();
