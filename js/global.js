"use strict";

let interval = undefined;
let last_time = Date.now();
let fps_interval = 1000 / 120;
let grid_x = 80;
let grid_y = 25;
let array = [];
let stack = [];
let is_running = false;
let is_end = false;
let console_value = "";
let text_mode = false;
let skip = false;
let input = 0;
let move_x = 1;
let move_y = 0;
let pos = {
  x: 0,
  y: 0,
};

const info_button = document.querySelector(".header .buttons .info");
const instructions_button = document.querySelector(".header .buttons .instructions");
const settings_button = document.querySelector(".header .buttons .settings");
const speed_input = document.querySelector(".settings input");
const speed_label = document.querySelector(".settings label");

info_button.addEventListener("click", showOptionContent);
instructions_button.addEventListener("click", showOptionContent);
settings_button.addEventListener("click", showOptionContent);
speed_input.addEventListener("input", setSpeed);
document.addEventListener("click", closeOptionIfOutside);

const init_button = document.querySelector(".console .buttons .init");
const run_button = document.querySelector(".console .buttons .run");
const step_button = document.querySelector(".console .buttons .step");
const stop_button = document.querySelector(".console .buttons .stop");

init_button.addEventListener("click", init);
run_button.addEventListener("click", () => callIfNotBusy(run));
step_button.addEventListener("click", () => callIfNotBusy(step));
stop_button.addEventListener("click", stop);

function run() {
  if (is_end) return;
  is_running = true;
  interval = window.requestAnimationFrame(step);
}

function stop() {
  is_running = false;
  window.cancelAnimationFrame(interval);
}

function callIfNotBusy(callback) {
  if (!waitingForInput() && !programIsRunning()) callback();
}

function waitingForInput() {
  if (input) {
    alert(`Input ${input === 1 ? "char" : "number"} in console`);
    focusConsole();
    return true;
  }

  return false;
}

function programIsRunning() {
  if (is_running) {
    alert("Program is already running");
    return true;
  }

  return false;
}

function showOptionContent(e) {
  const current_elem = e.currentTarget;

  if (e.target === current_elem || e.target.classList.contains("fas")) {
    current_elem.classList.toggle("active");
    const all_active = document.querySelectorAll(".active");
    if (all_active.length > 1) {
      closeActiveOptions();
      current_elem.classList.toggle("active");
    }
  }

  current_elem.querySelector(".content .close").addEventListener("click", () => {
    current_elem.classList.remove("active");
  });
}

function closeOptionIfOutside(e) {
  const outside_info = !info_button.contains(e.target);
  const outside_instructions = !instructions_button.contains(e.target);
  const outside_settings = !settings_button.contains(e.target);

  if (outside_info && outside_instructions && outside_settings) closeActiveOptions();
}

function closeActiveOptions() {
  const all_active = document.querySelectorAll(".active");
  for (let i = 0; i < all_active.length; i++) all_active[i].classList.remove("active");
}

function setSpeed() {
  const speed = parseInt(speed_input.value);
  fps_interval = 1000 / speed;
  speed_label.innerHTML = speed;
}
