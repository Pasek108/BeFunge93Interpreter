"use strict";

class Popup {
  static popups = [];
  container = null;
  #active = false;

  constructor(container) {
    if (Popup.popups.push(this) === 1) document.addEventListener("click", Popup.closeAllPopupsOnClickOutside);

    this.container = container;
    this.container.addEventListener("click", (evt) => this.#showPopup(evt));

    this.close_button = this.container.querySelector(".close");
    this.close_button.addEventListener("click", (evt) => this.closePopup(evt));
  }

  /* -------------------------- private methods -------------------------- */
  #showPopup(evt) {
    if (this.container.querySelector(".content").contains(evt.target)) return;

    if (!this.#active) Popup.closeAllPopups();
    this.container.classList.toggle("active");
    this.#active = true;
  }

  /* -------------------------- public methods -------------------------- */
  closePopup(evt) {
    this.#active = false;
    this.container.classList.remove("active");
  }

  static closeAllPopups() {
    for (let i = 0; i < Popup.popups.length; i++) {
      Popup.popups[i].closePopup();
    }
  }

  static closeAllPopupsOnClickOutside(e) {
    for (let i = 0; i < Popup.popups.length; i++) {
      if (Popup.popups[i].container.contains(e.target)) return;
    }

    Popup.closeAllPopups();
  }
}

class Settings extends Popup {
  #settings_change_callback = null;
  #settings = null;
  #speed_input = null;
  #speed_label = null;
  #pointer_color_input = null;
  #pointer_color_label = null;
  #breakpoint_color_input = null;
  #breakpoint_color_label = null;
  #show_grid_input_1 = null;
  #show_grid_input_2 = null;
  #show_grid = true;

  #speed = 120;
  #pointer_color = "#ffd000";
  #breakpoint_color = "#ff0000";

  constructor(container, settings_change_callback) {
    super(container);
    this.#settings_change_callback = settings_change_callback;

    this.#settings = document.querySelectorAll(".setting");
    this.#speed_input = this.#settings[0].querySelector("input");
    this.#speed_label = this.#settings[0].querySelector("label");
    this.#speed_input.addEventListener("change", () => this.#setSpeed());

    this.#pointer_color_input = this.#settings[1].querySelector("input");
    this.#pointer_color_label = this.#settings[1].querySelector("label");
    this.#pointer_color_input.addEventListener("change", () => this.#setPointerColor());

    this.#breakpoint_color_input = this.#settings[2].querySelector("input");
    this.#breakpoint_color_label = this.#settings[2].querySelector("label");
    this.#breakpoint_color_input.addEventListener("change", () => this.#setBreakpointColor());

    this.#show_grid_input_1 = this.#settings[3].querySelectorAll("input")[0];
    this.#show_grid_input_2 = this.#settings[3].querySelectorAll("input")[1];
    this.#show_grid_input_1.addEventListener("change", () => this.#setShowGrid());
    this.#show_grid_input_2.addEventListener("change", () => this.#setShowGrid());
  }

  /* -------------------------- private methods -------------------------- */
  #setSpeed() {
    this.#speed = this.#speed_input.value;
    this.#speed_label.innerHTML = this.#speed;

    this.#settings_change_callback();
  }

  #setPointerColor() {
    this.#pointer_color = this.#pointer_color_input.value;
    this.#pointer_color_label.innerHTML = this.#pointer_color;

    this.#settings_change_callback();
  }

  #setBreakpointColor() {
    this.#breakpoint_color = this.#breakpoint_color_input.value;
    this.#breakpoint_color_label.innerHTML = this.#breakpoint_color;

    this.#settings_change_callback();
  }

  #setShowGrid() {
    this.#show_grid = this.#show_grid_input_1.checked;

    this.#settings_change_callback();
  }

  /* -------------------------- public methods -------------------------- */
  getSpeed() {
    return this.#speed;
  }

  getPointerColor() {
    return this.#pointer_color;
  }

  getBreakpointColor() {
    return this.#breakpoint_color;
  }

  getShowGrid() {
    return this.#show_grid;
  }
}
