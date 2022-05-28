"use strict";

const grid = document.querySelector(".grid");
const cells = createGrid();

function createGrid() {
  for (let i = 0; i < grid_y; i++) {
    array.push([]);

    for (let j = 0; j < grid_x; j++) {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.innerHTML = `${i}, ${j}`;
      if (j > 75) {
        tooltip.style.left = "inherit";
        tooltip.style.right = "100%";
      }

      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML = "";
      cell.addEventListener("click", addBreakpoint);
      cell.appendChild(tooltip);
      cell.append("");

      grid.appendChild(cell);

      array[i].push("");
    }
  }

  return document.querySelectorAll(".grid .cell");
}

function addBreakpoint(e) {
  const cell = e.currentTarget;
  if (cell.style.backgroundColor !== "red") cell.style.backgroundColor = "red";
  else cell.style.backgroundColor = "whitesmoke";
}
