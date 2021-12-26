"use strict";

const code_textarea = document.querySelector(".code textarea");
code_textarea.addEventListener("contextmenu", reverseSelectedText);

function reverseSelectedText(e) {
  e.preventDefault();
  const range = getSelectionRange();
  const val = code_textarea.value;
  const selected_text = window.getSelection().toString().split("").reverse().join("");
  code_textarea.value = val.slice(0, range.start) + selected_text + val.slice(range.end);
}

function getSelectionRange() {
  let start = 0;
  let end = 0;

  if (typeof code_textarea.selectionStart == "number" && typeof code_textarea.selectionEnd == "number") {
    start = code_textarea.selectionStart;
    end = code_textarea.selectionEnd;
  } else {
    const len = code_textarea.value.length;
    const range = document.selection.createRange();

    if (range && range.parentElement() === el) {
      const normalizedValue = code_textarea.value.replace(/\r\n/g, "\n");

      const textInputRange = code_textarea.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      const endRange = code_textarea.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) start = end = len;
      else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) end = len;
        else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end,
  };
}
