"use strict"

class ExampleProgram {
  constructor(title, code_lines_array) {
    let code = ""
    code_lines_array.forEach((line) => (code += line + "\n"))

    const example_programs_container = document.querySelector(".example-programs")

    const details_container = document.createElement("details")
    const summary_container = document.createElement("summary")

    const title_container = document.createElement("div")
    title_container.innerHTML = `
      <i class="fa-solid fa-caret-right"></i>
      <i class="fa-solid fa-caret-down"></i>
      <span>${title}</span>
      `

    const copy_button_container = document.createElement("div")
    copy_button_container.className = "copy"
    copy_button_container.innerHTML = `<i class="fa-regular fa-copy"></i> Copy code`
    copy_button_container.addEventListener("click", (evt) => {
      evt.preventDefault()
      interpreter.code.setCode(code)
    })

    summary_container.appendChild(title_container)
    summary_container.appendChild(copy_button_container)
    details_container.appendChild(summary_container)

    const code_container = document.createElement("pre")
    code_container.className = "code"
    code_container.innerText = code
    details_container.appendChild(code_container)

    example_programs_container.appendChild(details_container)

    /*
      <details>
        <summary>
          <span>
            <i class="fa-solid fa-caret-right"></i>
            <i class="fa-solid fa-caret-down"></i>
            N-ty wyraz ciągu 2
          </span>
          <button class="copy"><i class="fa-regular fa-copy"></i> Copy code</button>
        </summary>
        <pre class="code"></pre>
      </details>    
      */
  }
}
