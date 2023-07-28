"use strict"

class Stack {
  constructor() {
    this.container = document.querySelector(".stack textarea")
    this.stack = []
  }

  put(value) {
    this.container.value = `${value}\n` + this.container.value
    this.stack.push(value)
  }

  get() {
    if (this.stack.length === 0) return 0

    const value = this.stack.pop()

    let new_stack_text = ""
    let remove_end = false

    for (let i = 0; i < this.container.value.length; i++) {
      if (remove_end) new_stack_text += this.container.value[i]
      if (this.container.value[i] === "\n") remove_end = true
    }

    this.container.value = new_stack_text

    return value
  }

  add() {
    const a = this.get()
    const b = this.get()

    this.put(b + a)
  }

  sub() {
    const a = this.get()
    const b = this.get()

    this.put(b - a)
  }

  mul() {
    const a = this.get()
    const b = this.get()

    this.put(b * a)
  }

  div() {
    const a = this.get()
    const b = this.get()

    this.put(a ? Math.floor(b / a) : NaN)
  }

  mod() {
    const a = this.get()
    const b = this.get()

    this.put(b % a)
  }

  swap() {
    const a = this.get()
    const b = this.get()

    this.put(a)
    this.put(b)
  }

  dup() {
    const a = this.get()

    this.put(a)
    this.put(a)
  }

  neg() {
    const a = this.get()

    this.put(+!a)
  }

  cmp() {
    const a = this.get()
    const b = this.get()

    this.put(+(b > a))
  }

  clear() {
    this.stack = []
    this.container.value = ""
  }
}
