"use strict";

class Grid {
  #container = null;
  #cells = null;
  #pointer_color = "#ffd000";
  #breakpoint_color = "#ff0000";
  #pointer_x = -1;
  #pointer_y = 0;
  #array_y = 25;
  #array_x = 80;
  #array = [];

  constructor(container, stop_callback) {
    this.#container = container;
    this.stop_callback = stop_callback;

    if (!localStorage.hasOwnProperty("pointer_color")) localStorage.setItem("pointer_color", "#ffd000");
    if (!localStorage.hasOwnProperty("breakpoint_color")) localStorage.setItem("breakpoint_color", "#ff0000");
    this.#pointer_color = localStorage.getItem("pointer_color");
    this.#breakpoint_color = localStorage.getItem("breakpoint_color");

    this.#createArray();
    this.#createGrid();
  }

  /* -------------------------- private methods -------------------------- */
  #createArray() {
    for (let i = 0; i < this.#array_y; i++) {
      this.#array.push([]);
      for (let j = 0; j < this.#array_x; j++) this.#array[i].push("");
    }
  }

  #createGrid() {
    this.#cells = [];

    for (let i = 0; i < this.#array_y; i++) {
      for (let j = 0; j < this.#array_x; j++) {
        this.#cells.push(this.#createCell(i, j));
        this.#container.appendChild(this.#cells[j + i * this.#array_x]);
      }
    }
  }

  #createCell(y, x) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", (evt) => this.#addBreakpoint(cell));
    cell.appendChild(this.#createTooltip(y, x));
    const instruction = document.createElement("span");
    cell.append(instruction);

    return cell;
  }

  #addBreakpoint(cell) {
    const is_cell_a_breakpoint = cell.style.backgroundColor === hexToRgb(this.#breakpoint_color);

    if (is_cell_a_breakpoint) cell.style.backgroundColor = "whitesmoke";
    else cell.style.backgroundColor = this.#breakpoint_color;
  }

  #createTooltip(y, x) {
    const tooltip = document.createElement("div");
    tooltip.className = x > 75 ? "tooltip right" : "tooltip left";
    tooltip.innerHTML = `${y}, ${x}`;

    return tooltip;
  }

  /* -------------------------- public methods -------------------------- */
  loadCode(code) {
    let code_iter = -1;

    for (let i = 0; i < this.#array_y; i++) {
      for (let j = 0; j < this.#array_x; j++) {
        code_iter++;

        if (code_iter >= code.length) {
          i = this.#array_y;
          break;
        }

        if (code[code_iter] === "\n") break;

        this.#cells[j + i * this.#array_x].lastChild.innerText = code[code_iter];
        this.#array[i][j] = code[code_iter];
      }
    }
  }

  movePointer(y, x) {
    const old_cell_index = this.#pointer_x < 0 ? 0 : this.#pointer_x + this.#pointer_y * this.#array_x;

    this.#pointer_x += x;
    this.#pointer_y += y;
    if (this.#pointer_x >= this.#array_x) this.#pointer_x = 0;
    if (this.#pointer_y >= this.#array_y) this.#pointer_y = 0;

    const new_cell_index = this.#pointer_x + this.#pointer_y * this.#array_x;

    this.#cells[old_cell_index].style.backgroundColor = "whitesmoke";

    const is_cell_a_breakpoint = this.#cells[new_cell_index].style.backgroundColor === hexToRgb(this.#breakpoint_color);
    if (is_cell_a_breakpoint) {
      this.stop_callback();
      console.log("dipa");
    }

    this.#cells[new_cell_index].style.backgroundColor = this.#pointer_color;
  }

  getPointerPosition() {
    return { x: this.#pointer_x, y: this.#pointer_y };
  }

  getCurrentCommand() {
    return this.#array[this.#pointer_y][this.#pointer_x];
  }

  getCommand(y, x) {
    if (y >= this.#array_y || y < 0) return 0;
    if (x >= this.#array_x || x < 0) return 0;

    return this.#array[y][x].charCodeAt(0);
  }

  putCommand(y, x, command) {
    this.#array[y][x] = command;
    this.#cells[x + y * this.#array_x].lastChild.innerText = command;
  }

  setPointerColor(color) {
    if (this.#pointer_x >= 0) {
      const cell_index = this.#pointer_x + this.#pointer_y * this.#array_x;
      this.#cells[cell_index].style.backgroundColor = color;
    }

    this.#pointer_color = color;
  }

  setBreakpointColor(color) {
    for (let i = 0; i < this.#cells.length; i++) {
      const is_cell_a_breakpoint = this.#cells[i].style.backgroundColor === hexToRgb(this.#breakpoint_color);
      if (is_cell_a_breakpoint) this.#cells[i].style.backgroundColor = color;
    }

    this.#breakpoint_color = color;
  }

  setShowGrid(show_grid) {
    if (show_grid) this.#container.classList.remove("no-grid");
    else this.#container.classList.add("no-grid");
  }

  getCellsReference() {
    return this.#cells;
  }

  clear() {
    for (let i = 0; i < this.#cells.length; i++) {
      this.#cells[i].lastChild.innerText = "";
      this.#cells[i].style.backgroundColor = "whitesmoke";
    }

    for (let i = 0; i < this.#array_y; i++) {
      for (let j = 0; j < this.#array_x; j++) this.#array[i][j] = "";
    }

    this.#pointer_x = -1;
    this.#pointer_y = 0;
  }
}
