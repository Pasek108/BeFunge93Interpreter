"use strict";

function hexToRgb(color) {
  const red = parseInt(color.substr(1, 2), 16);
  const green = parseInt(color.substr(3, 2), 16);
  const blue = parseInt(color.substr(5, 2), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}

class Program {
  direction = { x: 1, y: 0 };
  text_mode = false;
  skip = false;
  waiting_for_input = false;
  input_type = "";
  stop_execution = false;

  constructor() {
    this.grid = new Grid(document.querySelector(".grid"));
    this.code = new Code(document.querySelector(".code textarea"));
    this.stack = new Stack(document.querySelector(".stack textarea"));
    this.console = new Console(document.querySelector(".console textarea"), this.endInput.bind(this));

    this.language = new Language(document.querySelector(".lang"));
    this.info = new Popup(document.querySelector(".info"));
    this.instructions = new Popup(document.querySelector(".instructions"));
    this.settings = new Settings(document.querySelector(".settings"), this.applySettings.bind(this));

    this.nyancat_menu = new NyanCatMenu(
      document.querySelector(".nyancat-menu"),
      this.grid.getCellsReference(),
      this.settings.getPointerColor(),
      this.settings.getBreakpointColor()
    );

    this.init_button = document.querySelector(".init");
    this.init_button.addEventListener("click", () => this.load());

    this.run_button = document.querySelector(".run");
    this.run_button.addEventListener("click", () => this.run());

    this.step_button = document.querySelector(".step");
    this.step_button.addEventListener("click", () => this.step());

    this.stop_button = document.querySelector(".stop");
    this.stop_button.addEventListener("click", () => this.stop());
  }

  load() {
    this.direction = { x: 1, y: 0 };
    this.skip = false;
    this.text_mode = false;
    this.waiting_for_input = false;
    this.input_type = "";
    this.stop_execution = false;

    const code = this.code.getCode();
    this.console.clear();
    this.stack.clear();
    this.grid.clear();
    this.grid.loadCode(code);
  }

  run() {
    if (this.stop_execution) {
      alert("Program zakończył działanie lub napotkał nieznaną instrukcję");
      return;
    }

    if (this.waiting_for_input) {
      if (this.input_type === "int") alert("Wprowadź liczbę w konsoli");
      if (this.input_type === "char") alert("Wprowadź znak w konsoli");
      this.console.focus();
      return;
    }
  }

  step() {
    if (this.stop_execution) {
      alert("Program zakończył działanie lub napotkał nieznaną instrukcję");
      return;
    }

    if (this.waiting_for_input) {
      if (this.input_type === "int") alert("Wprowadź liczbę w konsoli");
      if (this.input_type === "char") alert("Wprowadź znak w konsoli");
      this.console.focus();
      return;
    }

    if (this.skip) {
      this.grid.movePointer(this.direction.y, this.direction.x);
      this.skip = false;
    }

    this.grid.movePointer(this.direction.y, this.direction.x);

    const command = this.grid.getCurrentCommand();

    if (this.text_mode && command !== '"') {
      this.stack.put(command.charCodeAt(0));
      return;
    }

    switch (command) {
      case "":
        this.doNothing();
        break;
      case " ":
        this.doNothing();
        break;
      case "0":
        this.stack.put(0);
        break;
      case "1":
        this.stack.put(1);
        break;
      case "2":
        this.stack.put(2);
        break;
      case "3":
        this.stack.put(3);
        break;
      case "4":
        this.stack.put(4);
        break;
      case "5":
        this.stack.put(5);
        break;
      case "6":
        this.stack.put(6);
        break;
      case "7":
        this.stack.put(7);
        break;
      case "8":
        this.stack.put(8);
        break;
      case "9":
        this.stack.put(9);
        break;
      case "+":
        this.stack.add();
        break;
      case "-":
        this.stack.substract();
        break;
      case "*":
        this.stack.multiply();
        break;
      case "/":
        this.stack.divide();
        break;
      case "%":
        this.stack.modulo();
        break;
      case "`":
        this.stack.compare();
        break;
      case "$":
        this.stack.get();
        break;
      case ":":
        this.stack.duplicate();
        break;
      case "!":
        this.stack.negate();
        break;
      case "\\":
        this.stack.swap();
        break;
      case ">":
        this.changeDirection(1, 0);
        break;
      case "<":
        this.changeDirection(-1, 0);
        break;
      case "^":
        this.changeDirection(0, -1);
        break;
      case "v":
        this.changeDirection(0, 1);
        break;
      case "?":
        this.changeDirection(1, 1);
        break;
      case "#":
        this.skip = true;
        break;
      case '"':
        this.text_mode = !this.text_mode;
        break;
      case "_":
        this.ifStatement(0);
        break;
      case "|":
        this.ifStatement(1);
        break;
      case "p":
        this.putValueInGrid();
        break;
      case "g":
        this.getValueFromGrid();
        break;
      case "~":
        this.startInput("char");
        break;
      case "&":
        this.startInput("int");
        break;
      case ".":
        this.console.print(this.stack.get());
        break;
      case ",":
        this.console.print(String.fromCharCode(this.stack.get()));
        break;
      case "@":
        this.stop_execution = true;
        break;
      default:
        this.unknownCommand();
    }
  }

  stop() {}

  applySettings() {
    const pointer_color = this.settings.getPointerColor();
    const breakpoint_color = this.settings.getBreakpointColor();
    const show_grid = this.settings.getShowGrid();

    this.grid.setPointerColor(pointer_color);
    this.grid.setBreakpointColor(breakpoint_color);
    this.grid.setShowGrid(show_grid);

    this.nyancat_menu.setPointerColor(pointer_color);
    this.nyancat_menu.setBreakpointColor(breakpoint_color);
  }

  /* -------------------------- functions for instructions -------------------------- */
  doNothing() {}

  changeDirection(x, y) {
    if (x === 1 && y === 1) {
      const new_x = [1, -1, 0, 0];
      const new_y = [0, 0, -1, 1];
      const random_direction = Math.floor(Math.random() * 4);
      this.direction.x = new_x[random_direction];
      this.direction.y = new_y[random_direction];
      return;
    }

    this.direction.x = x;
    this.direction.y = y;
  }

  ifStatement(type) {
    const new_x = [1, -1, 0, 0];
    const new_y = [0, 0, 1, -1];

    let new_direction = type * 2;
    if (this.stack.get()) new_direction += 1;

    this.changeDirection(new_x[new_direction], new_y[new_direction]);
  }

  putValueInGrid() {
    const y = this.stack.get();
    const x = this.stack.get();
    const value = String.fromCharCode(this.stack.get());

    this.grid.putCommand(y, x, value);
  }

  getValueFromGrid() {
    const y = this.stack.get();
    const x = this.stack.get();
    const value = this.grid.getCommand(y, x);

    this.stack.put(value);
  }

  startInput(type) {
    this.waiting_for_input = true;
    this.input_type = type;
    this.console.startInput();
  }

  endInput(value) {
    if (this.input_type === "char") this.stack.put(value.charCodeAt(0));
    else if (this.input_type === "int") this.stack.put(+value);

    this.waiting_for_input = false;
    this.input_type = "";
  }

  unknownCommand() {
    const position = this.grid.getPointerPosition();
    alert(`Błąd. Nieznana instrukcja na pozycji [${position.y}, ${position.x}]`);
    this.stop_execution = true;
  }
}

const program = new Program();
