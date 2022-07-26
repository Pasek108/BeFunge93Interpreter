"use strict";

class Console {
  #container = null;
  #end_input_callback = null;
  #locked = true;
  #input_start_position = 0;
  #input_length = 0;
  #input_value = "";

  constructor(container, end_input_callback) {
    this.#end_input_callback = end_input_callback;

    this.#container = container;
    this.#container.addEventListener("keydown", (evt) => {
      if (this.#locked) return;

      this.focus();
      if (evt.code === "Enter") this.#endInput();
      else if (evt.code === "Backspace") {
        if (this.#input_length <= 0) evt.preventDefault();
        else this.#input_length--;
      } else this.#input_length++;
    });
  }

  /* -------------------------- private methods -------------------------- */
  #endInput() {
    this.#input_value = this.#container.value.slice(this.#input_start_position);
    this.#end_input_callback(this.#input_value);
    this.#container.value += "\n";

    this.#locked = true;
    this.#input_start_position = 0;
    this.#input_length = 0;
    this.#input_value = "";
    this.#container.readOnly = true;
  }

  /* -------------------------- public methods -------------------------- */
  startInput() {
    this.#locked = false;
    this.#container.readOnly = false;
    this.#input_start_position = this.#container.value.length;
    this.focus();
  }

  focus() {
    const current_position = this.#container.value.length;
    this.#container.setSelectionRange(current_position, current_position);
    this.#container.focus();
  }

  print(value) {
    this.#container.value += value;
  }

  clear() {
    this.#locked = true;
    this.#input_start_position = 0;
    this.#input_length = 0;
    this.#input_value = "";
    this.#container.value = "";
  }
}