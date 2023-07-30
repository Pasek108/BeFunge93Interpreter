"use strict"

class Language {
  constructor(initial_language, saveSettingsCallback) {
    this.saveSettingsCallback = saveSettingsCallback

    this.container = document.querySelector(".lang")
    this.container.addEventListener("click", () => this.changeLanguage())

    this.setLanguage(initial_language)
    this.messages = {}
  }

  /* -------------------------- private methods -------------------------- */
  changeLanguage() {
    if (this.language === "en") this.setLanguage("pl")
    else this.setLanguage("en")

    this.saveSettingsCallback()
  }

  setLanguage(language) {
    this.language = language
    this.container.style.backgroundImage = `url(language/${language}/flag_icon.png)`

    fetch(`language/${language}/page_content.json`)
      .then((response) => response.json())
      .then((json) => this.setPageContent(json))

    fetch(`language/${language}/messages.json`)
      .then((response) => response.json())
      .then((json) => (this.messages = json))

    fetch(`language/${language}/example_programs.json`)
      .then((response) => response.json())
      .then((json) => this.loadExamplePrograms(json))
  }

  setPageContent(json) {
    Object.keys(json).forEach((key) => {
      const elem = document.querySelector(`[data-lang-text=${key}]`)
      if (elem != null) elem.innerText = json[key]
    })
  }

  loadExamplePrograms(json) {
    document.querySelector(".example-programs").innerHTML = ""
    json["programs"].forEach((program) => new ExampleProgram(program["name"], program["code"]))
  }

  /* -------------------------- public methods -------------------------- */
}

class ExampleProgram {
  constructor(title, code_lines_array) {
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

    summary_container.appendChild(title_container)
    summary_container.appendChild(copy_button_container)
    details_container.appendChild(summary_container)

    let code = ""
    code_lines_array.forEach((line) => (code += line + "\n"))

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
