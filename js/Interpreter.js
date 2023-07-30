"use strict"

class Interpreter {
  direction = { x: 1, y: 0 }
  text_mode = false
  skip = false
  waiting_for_input = false
  input_type = ""
  running = 0
  stop_execution = false
  pause_execution = false

  constructor() {
    this.settings = new Settings(this.applySettings.bind(this));
    this.fps_interval = 1000 / this.settings.settings.speed

    this.code = new Code()
    this.stack = new Stack()
    this.console = new Console(this.endInput.bind(this))
    this.grid = new Grid(
      this.stop.bind(this), 
      this.settings.settings.show_grid,
      this.settings.settings.select, 
      this.settings.settings.pointer, 
      this.settings.settings.one_time_breakpoint, 
      this.settings.settings.breakpoint
    )
    this.nyancat_menu = new NyanCatMenu(
      this.grid.cells,
      () => {
        this.grid.updateColors(
          this.settings.settings.select, 
          this.settings.settings.pointer, 
          this.settings.settings.one_time_breakpoint, 
          this.settings.settings.breakpoint
        )
      }
    )

    this.init_button = document.querySelector(".init")
    this.init_button.addEventListener("click", () => this.load())

    this.execute_button = document.querySelector(".execute")
    this.execute_button.addEventListener("click", () => this.execute())

    this.run_button = document.querySelector(".run")
    this.run_button.addEventListener("click", () => this.run())

    this.step_button = document.querySelector(".step")
    this.step_button.addEventListener("click", () => this.step())

    this.stop_button = document.querySelector(".stop")
    this.stop_button.addEventListener("click", () => this.stop())
  }

  applySettings() {
    this.fps_interval = 1000 / this.settings.settings.speed
    this.grid.showGrid(this.settings.settings.show_grid)
    this.grid.updateColors(
      this.settings.settings.select, 
      this.settings.settings.pointer, 
      this.settings.settings.one_time_breakpoint, 
      this.settings.settings.breakpoint
    )
  }

  load() {
    this.stop()

    this.direction = { x: 1, y: 0 }
    this.skip = false
    this.text_mode = false
    this.waiting_for_input = false
    this.input_type = ""
    this.stop_execution = false

    this.console.clear()
    this.stack.clear()
    this.grid.clear()
    this.grid.loadCode(this.code.getCode())
  }

  stepError() {
    if (this.stop_execution) {
      alert(this.settings.language.messages.end_or_unknown_command)
      return true
    }

    if (this.waiting_for_input) {
      if (this.input_type === "int") alert(this.settings.language.messages.input_number)
      if (this.input_type === "char") alert(this.settings.language.messages.input_char)
      this.console.focus()
      return true
    }

    return false
  }

  execute() {
    if (this.stepError()) return

    this.running = 1
    this.pause_execution = false
    while (!(this.stop_execution || this.pause_execution || this.waiting_for_input)) this.step()
  }

  run() {
    if (this.stepError()) return

    this.now = 0
    this.then = window.performance.now()
    this.elapsed = 0
    this.running = 2
    this.pause_execution = false
    this.animation = requestAnimationFrame(this.runNextStep.bind(this))
  }

  runNextStep(new_time) {
    if (this.stop_execution || this.pause_execution || this.waiting_for_input) {
      if (!this.waiting_for_input) this.running = 0
      cancelAnimationFrame(this.animation)
      return
    }

    this.animation = requestAnimationFrame(this.runNextStep.bind(this))

    this.now = new_time
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fps_interval) {
      this.then = this.now - (this.elapsed % this.fps_interval)
      this.step()
    }
  }

  step() {
    this.pause_execution = false
    if (this.stepError()) return

    if (this.skip) {
      this.grid.movePointer(this.direction.y, this.direction.x)
      this.skip = false
    }

    this.grid.movePointer(this.direction.y, this.direction.x)

    const command = this.grid.getCurrentCommand()

    if (this.text_mode && command !== '"') {
      if (command === "") this.stack.put(" ".charCodeAt(0));
      else this.stack.put(command.charCodeAt(0))
      return
    }

    if (command === "" || command === " ") return

    if (+command >= 0 && +command <= 9) {
      this.stack.put(+command)
      return
    }

    switch (command) {
      case ">": this.changeDirection(1, 0); break
      case "<": this.changeDirection(-1, 0); break
      case "^": this.changeDirection(0, -1); break
      case "v": this.changeDirection(0, 1); break
      case '"': this.text_mode = !this.text_mode; break
      case "_": this.ifStatement(0); break
      case "|": this.ifStatement(1); break
      case "#": this.skip = true; break
      case "+": this.stack.add(); break
      case "-": this.stack.sub(); break
      case "*": this.stack.mul(); break
      case "/": this.stack.div(); break
      case "%": this.stack.mod(); break
      case "`": this.stack.cmp(); break
      case "$": this.stack.get(); break
      case ":": this.stack.dup(); break
      case "!": this.stack.neg(); break
      case "\\": this.stack.swap(); break
      case ".": this.console.print(this.stack.get()); break
      case ",": this.console.print(String.fromCharCode(this.stack.get())); break
      case "p": this.putValueInGrid(); break
      case "g": this.getValueFromGrid(); break
      case "~": this.startInput("char"); break
      case "&": this.startInput("int"); break
      case "?": this.changeDirection(1, 1); break
      case "@": this.stop_execution = true; break
      default: this.unknownCommand()
    }
  }

  stop() {
    this.pause_execution = true
    cancelAnimationFrame(this.animation)
  }

  /* -------------------------- functions for instructions -------------------------- */
  changeDirection(x, y) {
    if (x === 1 && y === 1) {
      const new_x = [1, -1, 0, 0]
      const new_y = [0, 0, -1, 1]
      const random_direction = Math.floor(Math.random() * 4)
      this.direction.x = new_x[random_direction]
      this.direction.y = new_y[random_direction]
      return
    }

    this.direction.x = x
    this.direction.y = y
  }

  ifStatement(type) {
    const new_x = [1, -1, 0, 0]
    const new_y = [0, 0, 1, -1]

    let new_direction = type * 2
    if (this.stack.get()) new_direction += 1

    this.changeDirection(new_x[new_direction], new_y[new_direction])
  }

  putValueInGrid() {
    const y = this.stack.get()
    const x = this.stack.get()
    const value = String.fromCharCode(this.stack.get())

    this.grid.putCommand(y, x, value)
  }

  getValueFromGrid() {
    const y = this.stack.get()
    const x = this.stack.get()
    const value = this.grid.getCommand(y, x)

    this.stack.put(value)
  }

  startInput(type) {
    this.waiting_for_input = true
    this.input_type = type
    this.console.startInput()
  }

  endInput(value) {
    if (this.input_type === "char") this.stack.put(value.charCodeAt(0))
    else if (this.input_type === "int") this.stack.put(+value)

    this.waiting_for_input = false
    this.input_type = ""

    if (this.running === 1) this.execute()
    if (this.running === 2) this.run()
  }

  unknownCommand() {
    const position = this.grid.getPointerPosition()
    alert(`${this.settings.language.messages.unknown_instruction} [${position.y}, ${position.x}]`)
    this.stop_execution = true
  }
}

const interpreter = new Interpreter()
