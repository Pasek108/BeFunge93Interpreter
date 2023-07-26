"use strict"

class Code {
  constructor() {
    this.container = document.querySelector(".code textarea")
    this.container.addEventListener("contextmenu", (evt) => this.reverseSelectedText(evt))
  }

  /* -------------------------- private methods -------------------------- */
  reverseSelectedText(evt) {
    evt.preventDefault()

    const range = {
      start: this.container.selectionStart,
      end: this.container.selectionEnd,
    }

    const code = this.container.value
    const selected_text = window.getSelection().toString()
    const reversed_text = selected_text.split("").reverse().join("")
    this.container.value = code.slice(0, range.start) + reversed_text + code.slice(range.end)
  }

  /* -------------------------- public methods -------------------------- */
  getCode() {
    return this.container.value
  }
}
