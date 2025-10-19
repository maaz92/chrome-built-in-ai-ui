import { qs, qsa, onClick, delegate } from "../common/utils.js";

class TranslatorTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("Translator" in self)
      ? `<div class="alert alert-danger" role="alert">
  Translator not supported by this configuration of Chrome. Please update to Chrome 138 or later.
</div>`
      : `
    <div class="accordion" id="translator-accordion">
  <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#translator-accordion-collapse" aria-expanded="true" aria-controls="translator-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="translator-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#translator-accordion">
      <div class="accordion-body">
        <input-with-language-detector id="translator-input"></input-with-language-detector>
        <dl>
        <dt>To</dt>
        <dd id="target-language-dd">
          <select-language-dropdown subtag="en" select-box-text="en - English" class="to-language" id="translator-target-language" ></select-language-dropdown>
          <p></p></dd>
        </dl>
        <div class="pt-2 text-center"><button class="btn btn-sm btn-primary" id="translate-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Translate</button>
</div>
<div class="pt-2 translator-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the translator for the given languages? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary translator-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary translator-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given languages" class="d-none"></unavailable-alert>
<progress-bar class="translator-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
</div>
</div>
</div>
</div>
<ui-loader class="d-none">  </ui-loader>
<output-text header="Translated Text" height="565px"></output-text>
`;

    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const translateButton = qs("#translate-button");
    const translatorAccordionCollapse = new bootstrap.Collapse(
      qs("#translator-accordion-collapse"),
      {
        toggle: false,
      }
    );
    translatorAccordionCollapse.show();
    const translatorDownloadProgressBars = qsa(
      ".translator-download-progress-bar",
      element
    );
    const input = qs("#translator-input");
    const outputText = qs("output-text", element);

    const unavailableAlerts = qsa("unavailable-alert", element);
    const translatorDownloadAlerts = qsa(".translator-download-alert", element);
    const uiLoader = qs("ui-loader", element);
    const translatorTargetLanguage = qs("#translator-target-language");
    const getState = () => {
      return {
        sourceLanguage: input.getSubtag(),
        text: input.getText(),
        targetLanguage: translatorTargetLanguage.getAttribute("subtag"),
      };
    };

    const checkTranslatorAvailability = async () => {
      const state = getState();
      console.log(state);
      return await Translator.availability({
        sourceLanguage: state.sourceLanguage,
        targetLanguage: state.targetLanguage,
      });
    };

    const downloadTranslatorForGivenLanguages = async () => {
      const state = getState();
      console.log(state);
      return await Translator.create({
        sourceLanguage: state.sourceLanguage,
        targetLanguage: state.targetLanguage,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            translatorDownloadProgressBars.forEach((bar) => {
              bar.setAttribute("progress", e.loaded * 100);
              bar.classList.remove("d-none");
              bar.classList.add("d-block");
              if (e.loaded === 1) {
                setTimeout(() => {
                  bar.classList.remove("d-block");
                  bar.classList.add("d-none");
                }, 1000);
              }
            });
          });
        },
      });
    };

    const showUILoader = async () => {
      uiLoader.classList.add("d-block");
      uiLoader.classList.remove("d-none");
    };

    const hideUILoader = async () => {
      uiLoader.classList.remove("d-block");
      uiLoader.classList.add("d-none");
    };

    const translate = async (translator) => {
      showUILoader();
      translatorAccordionCollapse.hide();
      const state = getState();
      const translatorStream = translator.translateStreaming(state.text);
      console.log(state);
      outputText.setAttribute("text", "");
      for await (const chunk of translatorStream) {
        outputText.setAttribute(
          "text",
          outputText.getAttribute("text") + chunk
        );
      }
      hideUILoader();
    };

    const showUnavailableAlert = async () => {
      unavailableAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
        setTimeout(() => {
          alert.classList.remove("d-block");
          alert.classList.add("d-none");
        }, 2000);
      });
    };

    const hideUnavailableAlert = async () => {
      unavailableAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    const showDownloadAlert = async () => {
      translatorDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      translatorDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    const handleTranslateButtonClick = async (event) => {
      hideUnavailableAlert();
      const availability = await checkTranslatorAvailability();
      if (availability === "available") {
        const translator = await downloadTranslatorForGivenLanguages();
        translate(translator);
      } else if (availability === "downloadable") {
        // show modal;
        await showDownloadAlert();
        //writer = await downloadWriterForNewSession();
      } else if (availability === "unavailable") {
        await showUnavailableAlert();
        return;
      } else if (availability === "downloading") {
        return;
        // Already showing progress bar in the download function
      }
    };

    const handleTranslatorDownloadConfirmation = async (event) => {
      hideDownloadAlert();
      const translator = await downloadTranslatorForGivenLanguages();
      const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
      while (checkTranslatorAvailability() != "available") {
        await sleep(100);
      }
      translate(translator);
    };

    const handleTranslatorDownloadCancellation = async (event) => {
      await hideDownloadAlert();
    };

    onClick(translateButton, handleTranslateButtonClick);
    delegate(
      element,
      ".translator-download-confirmation",
      "click",
      handleTranslatorDownloadConfirmation
    );
    delegate(
      element,
      ".translator-download-cancellation",
      "click",
      handleTranslatorDownloadCancellation
    );
  }
}
customElements.define("translator-tab", TranslatorTab);
