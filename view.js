export default class View {
  _data;

  render(data) {
    if (data) this._data = data;
    this._clear();
    this._parentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup()
    );
  }
  _clear() {
    this._parentContainer.innerHTML = "";
  }
  renderError(message, timeOut) {
    this._errorContainer.innerHTML = message;
    this._errorContainer.classList.remove("hidden");
    setTimeout(() => {
      this._errorContainer.classList.add("hidden");
    }, timeOut * 1000);
  }
}
