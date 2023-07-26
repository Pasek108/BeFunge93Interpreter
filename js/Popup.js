"use strict"

class Popup {
  static popups = []
  active = false

  constructor(class_name) {
    if (Popup.popups.push(this) === 1) document.addEventListener("click", Popup.closeAllPopupsOnClickOutside)

    this.container = document.querySelector(class_name)
    this.container.addEventListener("click", (evt) => this.showPopup(evt))

    this.close_button = this.container.querySelector(".close")
    this.close_button.addEventListener("click", (evt) => this.closePopup(evt))
  }

  /* -------------------------- private methods -------------------------- */
  showPopup(evt) {
    if (this.container.querySelector(".content").contains(evt.target)) return

    if (!this.active) Popup.closeAllPopups()
    this.container.classList.toggle("active")
    this.active = true
  }

  /* -------------------------- public methods -------------------------- */
  closePopup(evt) {
    this.active = false
    this.container.classList.remove("active")
  }

  static closeAllPopups() {
    for (let i = 0; i < Popup.popups.length; i++) {
      Popup.popups[i].closePopup()
    }
  }

  static closeAllPopupsOnClickOutside(e) {
    for (let i = 0; i < Popup.popups.length; i++) {
      if (Popup.popups[i].container.contains(e.target)) return
    }

    Popup.closeAllPopups()
  }
}

const info = new Popup(".info")
const instructions = new Popup(".instructions")
