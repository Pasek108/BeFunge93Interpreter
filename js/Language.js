"use strict";

class Language {
  #container = null;
  #pl_lang_items = null;
  #en_lang_items = null;

  constructor(container) {
    this.#container = container;
    this.#container.addEventListener("click", () => this.#changeLanguage());
    this.#loadLanguage();
  }

  /* -------------------------- private methods -------------------------- */
  #loadLanguage() {
    if (!localStorage.hasOwnProperty("lang")) localStorage.setItem("lang", "pl");

    this.#pl_lang_items = document.querySelectorAll("[lang=pl]");
    this.#en_lang_items = document.querySelectorAll("[lang=en]");

    if (localStorage.getItem("lang") === "pl") this.#setLangPL();
    else this.#setLangEN();
  }

  #changeLanguage() {
    if (localStorage.getItem("lang") === "pl") {
      localStorage.setItem("lang", "en");
      this.#setLangEN();
    } else {
      localStorage.setItem("lang", "pl");
      this.#setLangPL();
    }
  }

  #setLangPL() {
    for (let i = 0; i < this.#en_lang_items.length; i++) {
      this.#en_lang_items[i].style.display = "none";
      this.#pl_lang_items[i + 1].style.display = null;
    }

    this.#container.style.backgroundImage = "url(pl.png)";
  }

  #setLangEN() {
    for (let i = 0; i < this.#en_lang_items.length; i++) {
      this.#en_lang_items[i].style.display = null;
      this.#pl_lang_items[i + 1].style.display = "none";
    }

    this.#container.style.backgroundImage = "url(en.png)";
  }

  /* -------------------------- public methods -------------------------- */
}
