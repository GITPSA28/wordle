import { backSpaceIcon } from "./backspace.js";
import View from "./view.js";

class keboardView extends View {
  _parentContainer = document.getElementById("keyboard");
  _keyRow = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  _generateMarkup() {
    let mark = "";
    for (let i = 0; i < this._keyRow.length; i++) {
      mark += "<div class='key-row'>";
      if (i === 2) {
        mark += `
          <button data-key='${
            this._data.isOver ? "Restart" : "Enter"
          }' class="key ${this._data.isOver ? "restart" : ""}">
              <p>${this._data.isOver ? "RESTART" : "ENTER"}</p>
          </button>`;
      }
      this._keyRow[i].split("").forEach((letter) => {
        mark += `
        <button data-key='${letter}' class="key ${
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
      if (i === 2) {
        mark += `
      <button data-key='Backspace' class="key backspace">
          ${backSpaceIcon}
      </button>`;
      }
      mark += "</div>";
    }
    return mark;
  }
  addHandlerKeyboard(handler) {
    this._parentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".key");
      if (!btn) return;
      const key = btn.dataset.key;
      handler(key);
    });
  }
}
export default new keboardView();
