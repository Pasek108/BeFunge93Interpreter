"use strict"

class NyanCatMenu {
  container = null
  cells = null
  button = null
  array_y = 25
  array_x = 80

  constructor(cells, restore_breakpoints_callback) {
    this.container = document.querySelector(".nyancat-menu")
    this.cells = cells
    this.restore_breakpoints_callback = restore_breakpoints_callback

    this.button = this.container.querySelector(".button")
    this.button.addEventListener("click", () => this.toggleMenu())

    this.nyan_cats = [nyancat_default, nyancat_gameboy, nyancat_rasta, nyancat_christmas, nyancat_mexican]
    this.current_cat = null
    this.nyan_cat = new NyanCat(nyancat_default, this.cells, this.array_y, this.array_x, this.breakpoint_color)

    this.nyan_cats_buttons = this.container.querySelectorAll(".nyancat-buttons div")
    for (let i = 0; i < this.nyan_cats_buttons.length; i++) {
      this.nyan_cats_buttons[i].addEventListener("click", () => {
        this.nyan_cats_buttons.forEach((nyan_cat_button) => (nyan_cat_button.style.backgroundColor = null))
        this.nyan_cats_buttons[i].style.backgroundColor = "#1263b0"
        this.loadCat(this.nyan_cats[i])
      })
    }
  }

  /* -------------------------- private methods -------------------------- */
  toggleMenu() {
    this.nyan_cat.endNyanCat()
    this.current_cat = null

    if (this.container.classList.contains("active")) {
      this.nyan_cats_buttons.forEach((nyan_cat_button) => (nyan_cat_button.style.backgroundColor = null))
      this.clearBackground()
      this.restore_breakpoints_callback()
    } else this.clearBackground()

    this.container.classList.toggle("active")
  }

  loadCat(new_cat) {
    if (this.current_cat === new_cat) return

    this.current_cat = new_cat
    this.nyan_cat.endNyanCat()
    this.nyan_cat = new NyanCat(this.current_cat, this.cells, this.array_y, this.array_x, this.breakpoint_color)
    this.nyan_cat.startNyanCat()
  }

  clearBackground() {
    for (let i = 0; i < this.array_y; i++) {
      for (let j = 0; j < this.array_x; j++) {
        this.cells[j + i * this.array_x].style.backgroundColor = null
      }
    }
  }
}
