import View from "./view.js";

class settingsView extends View {
  _parentContainer = document.getElementById("settings-container");
  _generateMarkup() {
    if (!this._data.visible) return "";
    let mark = `
    <div class="settings-main">
            <div class="settings-head">
                <p class="settings-title">
                    Settings
                </p>
                <div class="settings-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="setting-single">
                <div class="setting-label">
                    Difficulty
                </div>
                <div class="setting-input">
                    <select name="difficulty" id="difficulty" ${
                      this._data.inProgress ? "disabled" : ""
                    }>
                        <option value="easy" ${
                          this._data.level === "easy" ? "selected" : ""
                        }>Easy</option>
                        <option value="normal"  ${
                          this._data.level === "normal" ? "selected" : ""
                        }>Normal</option>
                        
                    </select>
                </div>
            </div>
        </div>
    `;
    return mark;
  }
  addHandlerDifficultySelect(handler, restart) {
    const difficulty = document.getElementById("difficulty");
    difficulty.addEventListener("change", function (e) {
      handler(e.target.value);
      restart();
    });
  }
  addHandlerCloseSettings(handler) {
    this._parentContainer.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".settings-close");
        if (!btn) return;
        handler();
        this._parentContainer.classList.add("hidden");
      }.bind(this)
    );
  }
}
export default new settingsView();
