"use strict";

function init() {
  stop();
  resetInterpreter();

  let code = code_textarea.value;
  let code_iter = -1;

  for (let i = 0; i < grid_y; i++) {
    for (let j = 0; j < grid_x; j++) {
      code_iter++;

      if (code[code_iter] == undefined) i = grid_y;
      else if (code[code_iter] === "\n") break;
      else {
        array[i][j] = code[code_iter];
        fillCell(i * grid_x + j, array[i][j]);
      }
    }
  }
}

function resetInterpreter() {
  cells[pos.y * grid_x + pos.x].style.backgroundColor = "whitesmoke";
  stack_textarea.value = "";
  console_textarea.value = "";
  console_textarea.readOnly = true;
  last_time = Date.now();
  stack = [];
  move_x = 1;
  move_y = 0;
  console_value = "";
  text_mode = false;
  is_end = false;
  skip = false;
  input = 0;
  pos = {
    x: 0,
    y: 0,
  };

  for (let i = 0; i < grid_y; i++) {
    for (let j = 0; j < grid_x; j++) {
      array[i][j] = "";
      fillCell(i * grid_x + j, array[i][j]);
    }
  }
}

function fillCell(i, text) {
  cells[i].removeChild(cells[i].lastChild);
  cells[i].append(text);
}
