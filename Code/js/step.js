"use strict";

function step() {
  if (waitingForInput()) {
    const running = is_running;
    stop();
    if (running) is_running = 1;
    return;
  }

  if (!is_running) {
    move();
    return;
  }

  const now = Date.now();
  const elapsed_time = now - last_time;

  if (elapsed_time > fps_interval) {
    last_time = now - (elapsed_time % fps_interval);
    move();
  }

  if (is_running && !input) interval = window.requestAnimationFrame(step);
}

function move() {
  let axis = "x";
  let value = move_x;
  if (move_y !== 0) (axis = "y"), (value = move_y);

  const prev_cell = cells[pos.y * grid_x + pos.x];

  if (prev_cell.style.backgroundColor === "rgb(255, 208, 0)") {
    prev_cell.style.backgroundColor = "whitesmoke";

    const grid_max = axis === "x" ? grid_x : grid_y;
    pos[axis] += value + value * skip;
    if (pos[axis] >= grid_max) pos[axis] = 0;
    else if (pos[axis] < 0) pos[axis] = grid_max - 1;
  }

  const next_cell = cells[pos.y * grid_x + pos.x];
  if (next_cell.style.backgroundColor === "red") stop();
  next_cell.style.backgroundColor = "rgb(255, 208, 0)";
  skip = false;

  executeCommand(array[pos.y][pos.x]);
}

function executeCommand(instruction) {
  const instr_ascii = instruction.charCodeAt(0);

  if (instr_ascii === 34) {
    text_mode = !text_mode;
    return;
  }

  if (text_mode) {
    putOnStack(instr_ascii);
    return;
  }

  // prettier-ignore
  switch (instruction) {
    case "":  break; 
    case " ": break;
    case "0": putOnStack(0); break;
    case "1": putOnStack(1); break;
    case "2": putOnStack(2); break;
    case "3": putOnStack(3); break;
    case "4": putOnStack(4); break;
    case "5": putOnStack(5); break;
    case "6": putOnStack(6); break;
    case "7": putOnStack(7); break;
    case "8": putOnStack(8); break;
    case "9": putOnStack(9); break;
    case "_": ifStatement(0); break;
    case "|": ifStatement(1); break;
    case "$": getFromStack(); break;
    case "#": skip = true;    break;
    case "~": expectInput(1); break;
    case "&": expectInput(2); break;
    case "p": putInArray();   break;
    case "g": getFromArray(); break;
    case "\\": swapValues();  break;
    case "@": endProgram();   break;
    case ">": changeDirection(1, 0);  break;
    case "<": changeDirection(-1, 0); break;
    case "^": changeDirection(0, -1); break;
    case "v": changeDirection(0, 1);  break;
    case "?": changeDirection(1, 1);  break;
    case "+": doOperation(instruction); break;
    case "-": doOperation(instruction); break;
    case "*": doOperation(instruction); break;
    case "/": doOperation(instruction); break;
    case "%": doOperation(instruction); break;
    case "`": doOperation(instruction); break;
    case "!": putOnStack(+!getFromStack()); break;
    case ".": writeOnConsole(getFromStack());  break;
    case ":": putOnStack(stack[stack.length - 1]); break;
    case ",": writeOnConsole(String.fromCharCode(getFromStack())); break;
    default: unknownCommand();
  }
}

function changeDirection(x, y) {
  if (x === 1 && y === 1) {
    const new_x = [1, -1, 0, 0];
    const new_y = [0, 0, -1, 1];
    const random_direction = Math.floor(Math.random() * 4);
    move_x = new_x[random_direction];
    move_y = new_y[random_direction];
    return;
  }

  move_x = x;
  move_y = y;
}

function ifStatement(type) {
  const new_x = [1, -1, 0, 0];
  const new_y = [0, 0, 1, -1];

  let new_direction = type * 2;
  if (getFromStack() !== 0) new_direction += 1;

  move_x = new_x[new_direction];
  move_y = new_y[new_direction];
}

function doOperation(operation) {
  const a = getFromStack();
  const b = getFromStack();

  // prettier-ignore
  switch (operation) {
    case "+": putOnStack(b + a); break;
    case "-": putOnStack(b - a); break;
    case "*": putOnStack(b * a); break;
    case "%": putOnStack(b % a); break;
    case "`": putOnStack(+(b > a)); break;
    case "/": putOnStack((a === 0) ? NaN : Math.floor(b / a)); break;
  }
}

function writeOnConsole(value) {
  console_textarea.value += `${value}`;
}

function expectInput(type) {
  input = type;
  console_textarea.readOnly = false;
  focusConsole();
  console_value = console_textarea.value;
}

function putInArray() {
  const a = getFromStack();
  const b = getFromStack();
  const v = getFromStack();
  array[a][b] = String.fromCharCode(v);
  fillCell(a * grid_x + b, String.fromCharCode(v));
}

function getFromArray() {
  const a = getFromStack();
  const b = getFromStack();
  if (a >= grid_y || a < 0 || b >= grid_x || b < 0) putOnStack(0);
  else putOnStack(array[a][b].charCodeAt(0));
}

function swapValues() {
  const a = getFromStack();
  const b = getFromStack();
  putOnStack(a);
  putOnStack(b);
}

function endProgram() {
  stop();
  is_end = true;
  move_x = 0;
  move_y = 0;
}

function unknownCommand() {
  alert(`Error. Unknown instruction at [${pos.y}, ${pos.x}]`);
  endProgram();
}
