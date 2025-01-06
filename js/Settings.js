"use strict"

class Settings {
  settings = {
    language: "en",
    select: "#34aaff",
    pointer: "#ffd000",
    one_time_breakpoint: "#ff0000",
    breakpoint: "#a600ff",
    speed: 60,
    show_grid: true,
  }

  constructor(apply_settings_callback) {
    this.apply_settings_callback = apply_settings_callback

    this.container = document.querySelector(".settings")

    if (localStorage.getItem("settings") == null) localStorage.setItem("settings", JSON.stringify(this.settings))
    else this.settings = JSON.parse(localStorage.getItem("settings"))

    this.language = new Language(this.settings.language, this.updateSettings.bind(this))
    this.speed = new Range(".speed", this.settings.speed, this.updateSettings.bind(this))

    this.select = new ColorPicker(".select", this.settings.select, this.updateSettings.bind(this))
    this.pointer = new ColorPicker(".pointer", this.settings.pointer, this.updateSettings.bind(this))
    this.one_time_breakpoint = new ColorPicker(".one_time_breakpoint", this.settings.one_time_breakpoint, this.updateSettings.bind(this))
    this.breakpoint = new ColorPicker(".breakpoint", this.settings.breakpoint, this.updateSettings.bind(this))

    this.show_grid = document.querySelector(".show-grid input")
    this.show_grid.checked = this.settings.show_grid
    this.show_grid.addEventListener("change", this.updateSettings.bind(this))
  }

  updateSettings() {
    this.settings = {
      language: this.language.language,
      select: this.select.color,
      pointer: this.pointer.color,
      one_time_breakpoint: this.one_time_breakpoint.color,
      breakpoint: this.breakpoint.color,
      speed: this.speed.speed,
      show_grid: this.show_grid.checked,
    }

    localStorage.setItem("settings", JSON.stringify(this.settings))

    this.apply_settings_callback()
  }
}
