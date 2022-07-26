"use strict";

class Stack {
  #container = null;
  #stack = [];

  constructor(container) {
    this.#container = container;
  }

  /* -------------------------- private methods -------------------------- */

  /* -------------------------- public methods -------------------------- */
  put(value) {
    this.#container.value = `${value}\n` + this.#container.value;
    this.#stack.push(value);
  }

  get() {
    if (this.#stack.length === 0) return 0;

    const value = this.#stack.pop();

    let stack_text = this.#container.value.split("\n");
    stack_text.shift();
    this.#container.value = stack_text.join("\n");

    return value;
  }

  add() {
    const a = this.get();
    const b = this.get();

    this.put(b + a)
  }

  substract() {
    const a = this.get();
    const b = this.get();

    this.put(b - a)
  }

  multiply() {
    const a = this.get();
    const b = this.get();

    this.put(b * a)
  }

  divide() {
    const a = this.get();
    const b = this.get();

    this.put(a ? Math.floor(b / a) : NaN);
  }

  modulo() {
    const a = this.get();
    const b = this.get();

    this.put(b % a);
  }

  swap() {
    const a = this.get();
    const b = this.get();

    this.put(a);
    this.put(b);
  }

  duplicate() {
    const a = this.get();

    this.put(a);
    this.put(a);
  }

  negate() {
    const a = this.get();

    this.put(+!a);
  }

  compare() {
    const a = this.get();
    const b = this.get();

    this.put(+(b > a))
  }

  clear() {
    this.#stack = [];
    this.#container.value = "";
  }
}