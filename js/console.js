"use strict"

class Console {
  constructor(end_input_callback) {
    this.container = document.querySelector(".console")

    this.end_input_callback = end_input_callback
    this.locked = true
    this.input_start_position = 0
    this.input_length = 0
    this.input_value = ""

    this.textarea = this.container.querySelector("textarea")
    this.textarea.addEventListener("keydown", (evt) => {
      if (this.locked) return

      this.focus()
      if (evt.code === "Enter") this.endInput()
      else if (evt.code === "Backspace") {
        if (this.input_length <= 0) evt.preventDefault()
        else this.input_length--
      } else this.input_length++
    })
  }

  /* -------------------------- private methods -------------------------- */
  endInput() {
    this.input_value = this.textarea.value.slice(this.input_start_position)
    this.textarea.value += "\n"

    this.locked = true
    this.input_start_position = 0
    this.input_length = 0
    this.textarea.readOnly = true

    this.end_input_callback(this.input_value)
    this.input_value = ""
  }

  /* -------------------------- public methods -------------------------- */
  startInput() {
    this.locked = false
    this.textarea.readOnly = false
    this.input_start_position = this.textarea.value.length
    this.focus()
  }

  focus() {
    const current_position = this.textarea.value.length
    this.textarea.setSelectionRange(current_position, current_position)
    this.textarea.focus()
  }

  print(value) {
    this.textarea.value += value
  }

  clear() {
    this.locked = true
    this.input_start_position = 0
    this.input_length = 0
    this.input_value = ""
    this.textarea.value = ""
  }
}
