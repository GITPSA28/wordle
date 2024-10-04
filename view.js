class View {
  _data;
  _parentContainer = document.getElementById("word");
  renderWord(data) {
    if (data) this._data = data;
    this._parentContainer.insertAdjacentHTML(
      "afterbegin",
      this._genereteMarkup()
    );
  }
  _genereteMarkup() {
    const markup = `<h1>${this._data}</h1>`;
    return markup;
  }
}

export default new View();
