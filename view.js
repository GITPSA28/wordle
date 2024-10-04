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
}
