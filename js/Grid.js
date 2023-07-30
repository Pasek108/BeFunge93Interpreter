"use strict"

class Grid {
  pointer_x = -1
  pointer_y = 0
  array_y = 25
  array_x = 80
  array = []

  constructor(stop_callback, show_grid, select_color, pointer_color, one_time_breakpoint_color, breakpoint_color) {
    this.container = document.querySelector(".grid")
    this.stop_callback = stop_callback

    this.select_color = select_color
    this.pointer_color = pointer_color
    this.one_time_breakpoint_color = one_time_breakpoint_color
    this.breakpoint_color = breakpoint_color

    this.createGrid()
    this.showGrid(show_grid)
  }

  /* -------------------------- private methods -------------------------- */
  createGrid() {
    this.array = []
    this.cells = []
    const grid = document.createDocumentFragment()

    for (let i = 0; i < this.array_y; i++) {
      this.array.push([])

      for (let j = 0; j < this.array_x; j++) {
        this.array[i].push("")
        this.cells.push(this.createCell(i, j))
        grid.appendChild(this.cells[j + i * this.array_x])
      }
    }

    this.container.appendChild(grid)
    this.container.addEventListener("contextmenu", this.addBreakpoint.bind(this))
  }

  createCell(y, x) {
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.appendChild(this.createTooltip(y, x))
    const instruction = document.createElement("span")
    cell.append(instruction)

    return cell
  }

  addBreakpoint(e) {
    e.preventDefault()

    const cell = e.target.className === "cell" ? e.target : e.target.parentElement

    if (cell.dataset.type === "breakpoint") {
      cell.style.backgroundColor = null
      cell.dataset.type = null
    } else if (cell.dataset.type === "one_time_breakpoint") {
      cell.style.backgroundColor = this.breakpoint_color
      cell.dataset.type = "breakpoint"
    } else {
      cell.style.backgroundColor = this.one_time_breakpoint_color
      cell.dataset.type = "one_time_breakpoint"
    }
  }

  createTooltip(y, x) {
    const tooltip = document.createElement("div")
    tooltip.className = x > 75 ? "tooltip right" : "tooltip left"
    tooltip.innerHTML = `${y}, ${x}`

    return tooltip
  }

  /* -------------------------- public methods -------------------------- */
  loadCode(code) {
    let code_iter = -1

    for (let i = 0; i < this.array_y; i++) {
      for (let j = 0; j < this.array_x; j++) {
        code_iter++

        if (code_iter >= code.length) {
          i = this.array_y
          break
        }

        if (code[code_iter] === "\n") break

        this.cells[j + i * this.array_x].lastChild.innerText = code[code_iter]
        this.array[i][j] = code[code_iter]
      }
    }
  }

  movePointer(y, x) {
    const old_cell_index = this.pointer_x < 0 ? 0 : this.pointer_x + this.pointer_y * this.array_x

    this.pointer_x += x
    this.pointer_y += y

    if (this.pointer_x >= this.array_x) this.pointer_x = 0
    else if (this.pointer_x < 0) this.pointer_x = this.array_x - 1;

    if (this.pointer_y >= this.array_y) this.pointer_y = 0
    else if (this.pointer_y < 0) this.pointer_y = this.array_y - 1;

    const new_cell_index = this.pointer_x + this.pointer_y * this.array_x

    /* ------------------ old cell ------------------ */
    const old_cell = this.cells[old_cell_index]

    if (old_cell.dataset.type === "breakpoint") {
      old_cell.style.backgroundColor = this.breakpoint_color
      old_cell.dataset.type = "breakpoint"
    } else old_cell.style.backgroundColor = null

    /* ------------------ new cell ------------------ */
    const cell = this.cells[new_cell_index]

    cell.style.backgroundColor = this.pointer_color

    if (cell.dataset.type === "breakpoint") this.stop_callback()
    else if (cell.dataset.type === "one_time_breakpoint") {
      cell.dataset.type = null
      this.stop_callback()
    }
  }

  getPointerPosition() {
    return { x: this.pointer_x, y: this.pointer_y }
  }

  getCurrentCommand() {
    return this.array[this.pointer_y][this.pointer_x]
  }

  getCommand(y, x) {
    if (y >= this.array_y || y < 0) return 0
    if (x >= this.array_x || x < 0) return 0

    return this.array[y][x].charCodeAt(0)
  }

  putCommand(y, x, command) {
    this.array[y][x] = command
    this.cells[x + y * this.array_x].lastChild.innerText = command
  }

  updateColors(select_color, pointer_color, one_time_breakpoint_color, breakpoint_color) {
    this.select_color = select_color

    /* ------------------ pointer ------------------ */
    this.pointer_color = pointer_color

    if (this.pointer_x >= 0) {
      const cell_index = this.pointer_x + this.pointer_y * this.array_x
      this.cells[cell_index].style.backgroundColor = this.pointer_color
    }

    /* ------------------ breakpoints ------------------ */
    this.one_time_breakpoint_color = one_time_breakpoint_color
    this.breakpoint_color = breakpoint_color

    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].dataset.type === "one_time_breakpoint") this.cells[i].style.backgroundColor = this.one_time_breakpoint_color
      else if (this.cells[i].dataset.type === "breakpoint") this.cells[i].style.backgroundColor = this.breakpoint_color
    }
  }

  showGrid(show_grid) {
    if (show_grid) this.container.classList.remove("no-grid")
    else this.container.classList.add("no-grid")
  }

  clear() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].lastChild.innerText = ""
      this.cells[i].style.backgroundColor = null
      this.cells[i].dataset.type = null
    }

    for (let i = 0; i < this.array_y; i++) {
      for (let j = 0; j < this.array_x; j++) this.array[i][j] = ""
    }

    this.pointer_x = -1
    this.pointer_y = 0
  }
}
