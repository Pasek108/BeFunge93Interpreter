"use strict"

class Range {
  constructor(class_name, initial_speed, saveSettingsCallback) {
    this.saveSettingsCallback = saveSettingsCallback
    this.speed = initial_speed

    this.container = document.querySelector(class_name)

    this.pick = this.container.querySelector("span")
    this.pick.innerText = String(this.speed).padStart(2, "0")

    this.input = this.container.querySelector("input")
    this.input.value = this.speed
    this.input.addEventListener("change", () => this.saveSettingsCallback())
    this.input.addEventListener("input", () => {
      this.speed = this.input.value
      this.pick.innerText = String(this.speed).padStart(2, "0")
    })
  }
}
