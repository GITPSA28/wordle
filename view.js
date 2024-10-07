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
  update(data) {
    if (data) this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll("*");
    const oldElements = this._parentContainer.querySelectorAll("*");
    oldElements.forEach((oldEl, i) => {
      const newEl = newElements[i];
      if (
        !newEl.isEqualNode(oldEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      )
        oldEl.textContent = newEl.textContent;
      if (!newEl.isEqualNode(oldEl)) {
        Array.from(newEl.attributes).forEach((attr, i) =>
          oldEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
