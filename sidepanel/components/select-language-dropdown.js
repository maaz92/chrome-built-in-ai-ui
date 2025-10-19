import * as languages from "../common/languages.js";

class SelectLanguageDropDown extends HTMLElement {
  static get observedAttributes() {
    return ["subtag"];
  }

  constructor() {
    super();
    this.EVENTS = Object.freeze({
      LANGUAGE_SELECTED: "LANGUAGE_SELECTED",
      LANGUAGE_QUERIED: "LANGUAGE_QUERY",
    });
  }

  connectedCallback() {
    const languageListHTML = languages
      .getLanguages()
      .map(
        (l) =>
          `<li><a class="dropdown-item d-none" href="#" subtag="${
            l.Subtag
          }" description="${l.Description.join(", ")}">${
            l.Subtag
          } - ${l.Description.join(", ")}</a></li>`
      )
      .reduce((accumulator, liTag) => (accumulator += liTag), "");
    this.innerHTML = `<div class="dropdown">
  <a class="btn btn-outline-${
    this.hasAttribute("disabled") ? "secondary" : "primary"
  } dropdown-toggle" id="${this.getAttribute(
      "id"
    )}" subtag="${this.getAttribute("subtag")}" ${
      this.hasAttribute("disabled") && "disabled"
    } href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    ${this.getAttribute("select-box-text") ?? "Select Language"}
  </a>
  <ul class="dropdown-menu">
    <li><input type="text" placeholder="English"/></li>
    ${languageListHTML}
  </ul>
</div>`;
    this.addEventDispatchers(this);
    this.addLocalEventHandlers(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateText(this);
  }

  updateText(element) {
    const subtag = this.getAttribute("subtag");
    const language = languages.getLanguage(subtag);
    let description;
    if (subtag === "" || language === undefined) {
      description = "Select Language";
    } else {
      description = `${subtag} - ${language.Description.join(", ")}`;
    }
    const $a = element.querySelector("div.dropdown > a");
    if ($a !== null && $a !== undefined) {
      $a.textContent = description;
    }
  }

  handleLanguageQuery(query) {
    Array.from(this.querySelectorAll("ul > li > a")).forEach((a) => {
      const text = a.getAttribute("subtag") + a.getAttribute("description");
      if (text.toLowerCase().includes(query.toLowerCase())) {
        a.classList.add("d-block");
        a.classList.remove("d-none");
      } else {
        a.classList.add("d-none");
        a.classList.remove("d-block");
      }
    });
  }

  addEventDispatchers(element) {
    Array.from(element.querySelectorAll("ul > li > a")).forEach((el) =>
      el.addEventListener("click", async (event) => {
        const subtag = $(event.target).attr("subtag");
        element.dispatchEvent(
          new CustomEvent(element.EVENTS.LANGUAGE_SELECTED, {
            detail: { subtag },
          })
        );
      })
    );

    element
      .querySelector("div > ul > li > input")
      .addEventListener("keyup", async (event) => {
        const query = $(event.target).val();
        element.dispatchEvent(
          new CustomEvent(element.EVENTS.LANGUAGE_QUERIED, {
            detail: { query },
          })
        );
      });

    element
      .querySelector("div.dropdown > a.dropdown-toggle")
      .addEventListener("click", async (event) => {
        setTimeout(() => {
          element.querySelector("div > ul > li > input").focus();
        }, 100);
      });
  }

  addLocalEventHandlers(element) {
    element.addEventListener(this.EVENTS.LANGUAGE_SELECTED, async (event) => {
      element.setAttribute("subtag", event.detail.subtag);
    });
    element.addEventListener(this.EVENTS.LANGUAGE_QUERIED, async (event) => {
      this.handleLanguageQuery(event.detail.query);
    });
  }
}

customElements.define("select-language-dropdown", SelectLanguageDropDown);
