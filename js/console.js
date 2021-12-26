"use strict";

const console_textarea = document.querySelector(".console textarea");
console_textarea.addEventListener("keydown", acceptInput);

function acceptInput(e) {
  focusConsole();

  if (e.code === "Enter" && input) {
    console_textarea.value += "\n";
    readInput();
    console_textarea.readOnly = true;
    input = 0;
    if (is_running) interval = window.requestAnimationFrame(step);
  }
}

function readInput() {
  let input_value = "";
  const start_index = console_value.length;
  const end_index = console_textarea.value.length;

  for (let i = start_index; i < end_index; i++) {
    input_value += console_textarea.value[i];
  }

  if (input === 1) input_value = input_value.charCodeAt(0);
  else if (input === 2) input_value = parseInt(input_value);

  putOnStack(input_value);
}

function focusConsole() {
  const text_len = console_textarea.value.length;
  console_textarea.setSelectionRange(text_len, text_len);
  console_textarea.focus();
}
