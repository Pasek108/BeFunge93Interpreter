"use strict"

class ColorPicker {
  constructor(class_name, initial_color, saveSettingsCallback) {
    this.saveSettingsCallback = saveSettingsCallback
    this.color = initial_color

    this.container = document.querySelector(class_name)

    this.pick = this.container.querySelector(".picked-color")
    this.pick.style.backgroundColor = this.color

    this.input = this.container.querySelector("input")
    this.input.value = this.color
    this.input.addEventListener("change", () => this.saveSettingsCallback())
    this.input.addEventListener("input", () => {
      this.color = this.input.value
      this.pick.style.backgroundColor = this.color
    })
  }
}
