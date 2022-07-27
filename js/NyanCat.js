"use strict";

class NyanCat {
  constructor(nyan_cat, cells, y, x, breakpoint_color) {
    this.cells = cells;
    this.breakpoint_color = breakpoint_color;
    this.array_y = y;
    this.array_x = x;

    this.nyan = nyan_cat;
    this.song = new Audio(this.nyan.music);
    this.song.loop = true;
  }

  /* -------------------------- private methods -------------------------- */
  #draw(new_time) {
    this.animation = requestAnimationFrame(this.#draw.bind(this));

    this.now = new_time;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fps_interval) {
      this.then = this.now - (this.elapsed % this.fps_interval);

      this.#drawBackground();
      this.#drawStars();
      this.#drawRainbow();

      this.#drawPaws();
      this.#drawCatBody();
      this.#drawCatHead();
      this.#drawCatTail();

      this.tick = (this.tick + 1) % 12;
    }
  }

  #drawBackground() {
    for (let i = 0; i < this.array_y; i++) {
      for (let j = 0; j < this.array_x; j++) {
        if (i >= 4 && i <= 20 && j < 48) continue;
        this.cells[j + i * this.array_x].style.backgroundColor = this.nyan.colors.background;
      }
    }
  }

  #drawRainbow() {
    const start_y = 3;
    const end_y = 21;

    const start_x = 0;
    const end_x = this.nyan.rainbow_end_x;

    const color_height = 3;

    for (let i = start_y; i <= end_y; i++) {
      for (let j = start_x; j <= end_x; j++) {
        for (let k = 0; k < color_height * 6; k++) {
          if ((j + 2) % 16 >= 8) {
            const y = k + color_height + (((this.tick % 4) / 2) | 0);
            const x = j;

            this.cells[x + y * this.array_x].style.backgroundColor = this.nyan.colors.rainbow[(k / color_height) | 0];
          } else {
            const y = k + color_height + 1 - (((this.tick % 4) / 2) | 0);
            const x = j;

            this.cells[x + y * this.array_x].style.backgroundColor = this.nyan.colors.rainbow[(k / color_height) | 0];
          }
        }
      }
    }
  }

  #drawStars() {
    for (let i = 0; i < this.nyan.stars.positions.length; i++) {
      this.#drawStar(this.nyan.stars.positions[i]);

      this.nyan.stars.positions[i][1] -= 4;
      if (this.nyan.stars.positions[i][1] < 0) this.nyan.stars.positions[i][1] += 80;

      if (this.tick % 2) continue;
      this.nyan.stars.positions[i][2] = (this.nyan.stars.positions[i][2] + 1) % 6;
    }
  }

  #drawStar(star) {
    const center_y = star[0];
    const center_x = star[1];
    const stage = star[2];

    for (let i = 0; i < this.nyan.stars.stages[stage].length; i++) {
      for (let j = 0; j < this.nyan.stars.stages[stage][i].length; j++) {
        if (this.nyan.stars.stages[stage][i][j]) {
          const y = center_y - 3 + i;
          const x = center_x - 3 + j;

          if (y >= 0 && y < 25 && x >= 0 && x < 80) this.cells[x + y * this.array_x].style.backgroundColor = this.nyan.colors.stars;
        }
      }
    }
  }

  #drawCatBody() {
    const body_y_timing = (y) => {
      switch (this.tick % 6) {
        case 0: return y + 1;
        case 1: return y + 0;
        case 2: return y + 0;
        case 3: return y + 1;
        case 4: return y + 1;
        case 5: return y + 1;
      }
    };

    const body_x_timing = (x) => x;

    this.#colorCells(this.nyan.body.shape, this.nyan.colors.shape, body_y_timing, body_x_timing);

    for (let i = 0; i < this.nyan.body.fill.length; i++) {
      this.#colorCells(this.nyan.body.fill[i], this.nyan.colors.body[i], body_y_timing, body_x_timing);
    }
  }

  #drawCatHead() {
    const head_y_timing = (y) => {
      switch (this.tick % 6) {
        case 0: return y + 0;
        case 1: return y + 0;
        case 2: return y + 0;
        case 3: return y + 1;
        case 4: return y + 1;
        case 5: return y + 1;
      }
    };

    const head_x_timing = (x) => {
      switch (this.tick % 6) {
        case 0: return x + 0;
        case 1: return x + 0;
        case 2: return x + 1;
        case 3: return x + 1;
        case 4: return x + 1;
        case 5: return x + 0;
      }
    };

    this.#colorCells(this.nyan.head.shape, this.nyan.colors.shape, head_y_timing, head_x_timing);

    for (let i = 0; i < this.nyan.head.fill.length; i++) {
      this.#colorCells(this.nyan.head.fill[i], this.nyan.colors.head[i], head_y_timing, head_x_timing);
    }
  }

  #drawPaws() {
    const paws_y_timing = (y) => {
      switch (this.tick % 6) {
        case 0: return y + 1;
        case 1: return y + 0;
        case 2: return y + 0;
        case 3: return y + 1;
        case 4: return y + 1;
        case 5: return y + 1;
      }
    };

    const paws_x_timing = (x) => {
      switch (this.tick % 6) {
        case 0: return x + 0;
        case 1: return x + 1;
        case 2: return x + 2;
        case 3: return x + 3;
        case 4: return x + 2;
        case 5: return x + 1;
      }
    };

    this.#colorCells(this.nyan.paws.shape, this.nyan.colors.shape, paws_y_timing, paws_x_timing);
    this.#colorCells(this.nyan.paws.fill, this.nyan.colors.skin, paws_y_timing, paws_x_timing);
  }

  #drawCatTail() {
    const tail_y_timing = (y) => y;
    const tail_x_timing = (x) => x;

    this.#colorCells(this.nyan.tail.shapes[this.tick % 6], this.nyan.colors.shape, tail_y_timing, tail_x_timing);
    this.#colorCells(this.nyan.tail.fills[this.tick % 6], this.nyan.colors.skin, tail_y_timing, tail_x_timing);
  }

  #colorCells(cells_indexes, color, y_timing_func, x_timing_func) {
    for (let i = 0; i < cells_indexes.length; i++) {
      const y = y_timing_func(cells_indexes[i][0]);
      const x = x_timing_func(cells_indexes[i][1]);
      this.cells[x + y * this.array_x].style.backgroundColor = color;
    }
  }

  /* -------------------------- public methods -------------------------- */
  setPointerColor(pointer_color) {
    this.pointer_color = pointer_color;
  }

  setBreakpointColor(breakpoint_color) {
    this.breakpoint_color = breakpoint_color;
  }

  startNyanCat() {
    this.song.currentTime = 0;
    this.song.play();

    this.fps = 14;
    this.fps_interval = 1000 / this.fps;
    this.now = 0;
    this.then = window.performance.now();
    this.elapsed = 0;
    this.tick = 0;

    this.animation = requestAnimationFrame(this.#draw.bind(this));
  }

  endNyanCat() {
    this.song.pause();
    cancelAnimationFrame(this.animation);
  }
}
