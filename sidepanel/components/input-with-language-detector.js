import * as languages from "../common/languages.js";

class InputWithLanguageDetector extends HTMLElement {
  connectedCallback() {
    this.textarea_id = Math.random().toString(36).slice(2);
    this.innerHTML = `
    <div class="form-floating">
  <textarea class="form-control" id="${this.textarea_id}" placeholder="${
      this.textarea_id
    }"></textarea>
  <label for="${this.textarea_id}">${
      this.getAttribute("label") ?? "Input"
    }</label>
          <dd class="detected-language fs-8" subtag="und" description="Undetermined">und - Undetermined with 100.0000% confidence</dd>
            <dd><select-language-dropdown ></select-language-dropdown></dd>
</div>`;
    this.addEventListeners(this);
  }

  getSubtag() {
    return (
      this.querySelector("select-language-dropdown").getAttribute("subtag") ??
      this.querySelector("dd.detected-language").getAttribute("subtag")
    );
  }

  getText() {
    return this.querySelector("textarea").value;
  }

  setText(text) {
    return (this.querySelector("textarea").value = text);
  }

  async addEventHandler(element) {
    document.addEventListener(
      globalEvents.EVENTS.TRANSLATE_FROM_LANGUAGE_SELECTED,
      async () => {
        element
          .querySelector("output-text")
          .setAttribute("text", element.getState().correctedInput);
        new bootstrap.Collapse(
          element.querySelector("#proofreader-accordion-collapse")
        ).hide();
      }
    );
  }

  async addEventListeners(element) {
    const languageDetector = await LanguageDetector.create();
    this.querySelector("textarea").addEventListener("input", async (event) => {
      const inputText = event.target.value;
      element.setAttribute("text", inputText);
      const languageDetectorTopResult = (
        await languageDetector.detect(inputText)
      )[0];
      const detectedLanguage = languages.getLanguage(
        languageDetectorTopResult.detectedLanguage
      ) ?? {
        Subtag: "und",
        Description: ["Undetermined"],
      };
      const $detectedLanguageDD = element.querySelector("dd.detected-language");
      $detectedLanguageDD.innerHTML = `${detectedLanguage["Subtag"]} - ${
        detectedLanguage["Description"]
      } <small>with ${(
        (languageDetectorTopResult.confidence ?? 0) * 100
      ).toFixed(4)}% confidence</small>`;
      $detectedLanguageDD.setAttribute("subtag", detectedLanguage["Subtag"]);
      $detectedLanguageDD.setAttribute(
        "description",
        detectedLanguage["Description"]
      );
      element.setAttribute(
        "subtag",
        element
          .querySelector("select-language-dropdown")
          .getAttribute("subtag") ?? detectedLanguage["Subtag"]
      );
    });
  }
}
customElements.define(
  "input-with-language-detector",
  InputWithLanguageDetector
);
