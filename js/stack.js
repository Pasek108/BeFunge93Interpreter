"use strict";

const stack_textarea = document.querySelector(".stack textarea");

function putOnStack(value) {
  stack_textarea.value = `${value}\n` + stack_textarea.value;
  stack.push(value);
}

function getFromStack() {
  if (stack.length === 0) return 0;

  const value = stack[stack.length - 1];
  stack.pop();

  let stack_text = stack_textarea.value.split("\n");
  stack_text.shift();
  stack_textarea.value = stack_text.join("\n");

  return value;
}
