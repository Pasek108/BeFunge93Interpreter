"use strict";

class NyanCatMenu {
  #container = null;
  #cells = null;
  #button = null;
  #pointer_color = "#ffd000";
  #breakpoint_color = "#ff0000";
  #array_y = 25;
  #array_x = 80;

  constructor(container, cells, pointer_color, breakpoint_color) {
    this.#container = container;
    this.#button = this.#container.querySelector(".button");
    this.#button.addEventListener("click", () => this.#toggleMenu());

    this.#cells = cells;
    this.#pointer_color = pointer_color;
    this.#breakpoint_color = breakpoint_color;
    this.breakpoints = [];

    this.nyan_cats = [nyancat_default, nyancat_gameboy, nyancat_rasta, nyancat_christmas, nyancat_mexican];
    this.current_cat = null;
    this.nyan_cat = new NyanCat(nyancat_default, this.#cells, this.#array_y, this.#array_x, this.#breakpoint_color);

    this.nyan_cats_buttons = this.#container.querySelectorAll(".content div");
    for (let i = 0; i < this.nyan_cats_buttons.length; i++) {
      this.nyan_cats_buttons[i].addEventListener("click", () => this.#loadCat(this.nyan_cats[i]));
    }
  }

  /* -------------------------- private methods -------------------------- */
  #toggleMenu() {
    this.nyan_cat.endNyanCat();
    this.current_cat = null;

    if (this.#container.classList.contains("active")) {
      this.#clearBackground();
      this.#restoreState();
    } else {
      this.#saveState();
      this.#clearBackground();
    }

    this.#container.classList.toggle("active");
  }

  #loadCat(new_cat) {
    if (this.current_cat === new_cat) return;

    this.current_cat = new_cat;
    this.nyan_cat.endNyanCat();
    this.nyan_cat = new NyanCat(this.current_cat, this.#cells, this.#array_y, this.#array_x, this.#breakpoint_color);
    this.nyan_cat.startNyanCat();
  }

  #saveState() {
    this.breakpoints = [];
    for (let i = 0; i < this.#cells.length; i++) {
      const is_cell_a_breakpoint = this.#cells[i].style.backgroundColor === hexToRgb(this.#breakpoint_color);
      if (is_cell_a_breakpoint) this.breakpoints.push(i);
    }
  }

  #restoreState() {
    for (let i = 0; i < this.breakpoints.length; i++) {
      this.#cells[this.breakpoints[i]].style.backgroundColor = this.#breakpoint_color;
    }
  }

  #clearBackground() {
    for (let i = 0; i < this.#array_y; i++) {
      for (let j = 0; j < this.#array_x; j++) {
        this.#cells[j + i * this.#array_x].style.backgroundColor = "whitesmoke";
      }
    }
  }

  /* -------------------------- public methods -------------------------- */
  setPointerColor(pointer_color) {
    this.#pointer_color = pointer_color;
  }

  setBreakpointColor(breakpoint_color) {
    this.#breakpoint_color = breakpoint_color;
  }
}
