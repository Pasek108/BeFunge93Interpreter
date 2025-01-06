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
