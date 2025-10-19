import { qs, qsa, onClick, delegate } from "../common/utils.js";

class ProofreaderTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("Proofreader" in self)
      ? `<div class="alert alert-danger" role="alert">
  Proofreader not supported by this configuration of Chrome. Please check how to configure Proofreader <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/proofreader-api#add_support_to_localhost">here</a> and review the <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/proofreader-api#hardware-requirements">hardware requirements</a>
</div>`
      : `
    <div class="accordion" id="proofreader-accordion">
     <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#proofreader-settings-accordion-collapse" aria-expanded="true" aria-controls="proofreader-settings-accordion-collapse">
       Configuration
      </button>
    </h2>
    <div id="proofreader-settings-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#proofreader-accordion">
      <div class="accordion-body">
        <fieldset>
  <div><small>Expected Input Languages:</small> </div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="proofreader-expected-input-language-english" checked disabled>
  <label class="form-check-label fs-8" for="proofreader-expected-input-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="proofreader-expected-input-language-spanish" disabled>
  <label class="form-check-label fs-8" for="proofreader-expected-input-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="proofreader-expected-input-language-japanese" disabled>
  <label class="form-check-label fs-8" for="proofreader-expected-input-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Output Language:</small></div>
        <!-- Languages -->
        <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="proofreader-output-language" id="proofreader-output-language-english" value="en" checked disabled>
  <label class="form-check-label fs-8" for="proofreader-output-language-english">
    English
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="proofreader-output-language" id="proofreader-output-language-spanish" value="es" disabled>
  <label class="form-check-label fs-8" for="proofreader-output-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="proofreader-output-language" id="proofreader-output-language-japanese" value="ja" disabled>
  <label class="form-check-label fs-8" for="proofreader-output-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="include-correction-types" disabled>
  <label class="form-check-label" for="include-correction-types">
    Include correction types
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="include-correction-explanation" disabled>
  <label class="form-check-label" for="include-correction-explanation">
    Include correction explanation
  </label>
</div>
<select-language-dropdown select-box-text="Correction Explanation Language" disabled></select-language-dropdown>
<div class="pt-2 pb-2 text-center">
        <button class="btn btn-sm btn-primary" id="proofreader-new-session-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>New Session</button>
<progress-bar class="proofreader-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
<div class="pt-2 proofreader-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the proofreader? 
  <div class="pt-2 text-center row">
  <div class="col"></div>
  <button type="button" class="col btn btn-secondary proofreader-download-cancellation">No</button>
  <div class="col"></div>
  <button type="button" class="col btn btn-primary proofreader-download-confirmation">Yes</button>
  <div class="col"></div>
  </div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
      </div>
    </div>
  </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#proofreader-accordion-collapse" aria-expanded="true" aria-controls="proofreader-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="proofreader-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#proofreader-accordion">
      <div class="accordion-body">
      <input-with-language-detector id="proofreader-input"></input-with-language-detector>
<div class="pt-2 text-center"><button class="btn btn-sm btn-primary" id="proofread-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Proofread</button>
</div>
<div class="pt-2 proofreader-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected input language
</div></div>
<div class="pt-2 d-none" id="proofreader-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
<progress-bar class="proofreader-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
      </div>
    </div>
  </div>
</div>
<ui-loader  class="d-none">  </ui-loader>
<div class="pt-2"><div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    Corrections
  </div>
  <div class="card-body corrections" style="height: 230px; overflow-y: scroll;">
  </div>
  </div></div>
<output-text class="corrected-text" header="Corrected Text" height="230px"></output-text>
`;
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const proofreadButton = qs("#proofread-button");
    const newSessionButton = qs("#proofreader-new-session-button");
    const proofreaderAccordionCollapse = new bootstrap.Collapse(
      qs("#proofreader-accordion-collapse"),
      {
        toggle: false,
      }
    );
    proofreaderAccordionCollapse.hide();
    const proofreaderSettingsAccordionCollapse = new bootstrap.Collapse(
      qs("#proofreader-settings-accordion-collapse"),
      {
        toggle: false,
      }
    );
    proofreaderSettingsAccordionCollapse.show();
    const proofreaderValidationAlert = qs(
      ".proofreader-validation-alert",
      element
    );
    const proofreaderDownloadProgressBars = qsa(
      ".proofreader-download-progress-bar",
      element
    );
    const outputLanguages = qsa(
      "input[name='proofreader-output-language']",
      element
    );
    const allowedOutputLanguages = ["en", "es", "ja"];
    const input = qs("#proofreader-input");
    const outputText = qs("output-text.corrected-text", element);
    const correctionsOutputText = qs("div.corrections", element);
    const expectedInputLanguages = [
      qs("#proofreader-expected-input-language-english"),
      qs("#proofreader-expected-input-language-spanish"),
      qs("#proofreader-expected-input-language-japanese"),
    ];
    const includeCorrectionTypes = qs("#include-correction-types");
    const includeCorrectionExplanation = qs("#include-correction-explanation");
    const unavailableAlerts = qsa("unavailable-alert", element);
    const proofreaderDownloadAlerts = qsa(
      ".proofreader-download-alert",
      element
    );
    const createSessionAlert = qs("#proofreader-no-active-session");
    const uiLoader = qs("ui-loader", element);
    const correctionsDiv = qs(".corrections", element);
    const getState = () => {
      return {
        textLanguage: input.getSubtag(),
        text: input.getText(),
        expectedInputLanguages: expectedInputLanguages
          .filter((lang) => lang.checked)
          .map((lang) => lang.value),
        outputLanguage: outputLanguages.find((lang) => lang.checked).value,
        includeCorrectionTypes: includeCorrectionTypes.checked ? true : false,
        includeCorrectionExplanation: includeCorrectionExplanation.checked
          ? true
          : false,
        allowedOutputLanguages: allowedOutputLanguages,
      };
    };

    const checkNewSessionAvailability = async () => {
      const state = getState();
      console.log(state);
      const availability = await Proofreader.availability({
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        includeCorrectionExplanation: state.includeCorrectionExplanation,
        includeCorrectionTypes: state.includeCorrectionTypes,
      });
      return availability;
    };

    const downloadProofreaderForNewSession = async () => {
      const state = getState();
      console.log(state);
      proofreaderSettingsAccordionCollapse.hide();
      proofreaderAccordionCollapse.show();
      return await Proofreader.create({
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        includeCorrectionExplanation: state.includeCorrectionExplanation,
        includeCorrectionTypes: state.includeCorrectionTypes,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            proofreaderDownloadProgressBars.forEach((bar) => {
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

    const showProofreaderValidationAlert = async (text) => {
      qs("div", proofreaderValidationAlert).innerHTML = text;
      proofreaderValidationAlert.classList.remove("d-none");
      proofreaderValidationAlert.classList.add("d-block");

      setTimeout(() => {
        proofreaderValidationAlert.classList.remove("d-block");
        proofreaderValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hideProofreaderValidationAlert = async () => {
      proofreaderValidationAlert.classList.remove("d-block");
      proofreaderValidationAlert.classList.add("d-none");
    };

    const displayCorrections = (inputText, corrections) => {
      let inputRenderIndex = 0;

      console.log(corrections);
      const correctionsDiv = correctionsOutputText;
      for (const correction of corrections) {
        // Render part of input that has no error.
        if (correction.startIndex > inputRenderIndex) {
          const unchangedInput = document.createElement("span");
          unchangedInput.textContent = inputText.substring(
            inputRenderIndex,
            correction.startIndex
          );
          correctionsDiv.append(unchangedInput);
        }
        // Render part of input that has an error and highlight as such.
        const errorInput = document.createElement("s");
        errorInput.textContent = inputText.substring(
          correction.startIndex,
          correction.endIndex
        );
        errorInput.classList.add("text-danger");
        correctionsDiv.append(errorInput);

        const correctedInput = document.createElement("span");
        correctedInput.textContent = correction.correction;
        correctedInput.classList.add("text-success");
        correctionsDiv.append(correctedInput);
        inputRenderIndex = correction.endIndex;
      }

      // Render the rest of the input that has no error.
      if (inputRenderIndex !== inputText.length) {
        const unchangedInput = document.createElement("span");
        unchangedInput.textContent = inputText.substring(
          inputRenderIndex,
          inputText.length
        );
        correctionsDiv.append(unchangedInput);
      }
    };

    const proofread = async (proofreader) => {
      const state = getState();
      hideProofreaderValidationAlert();
      if (
        state.text.trim() != "" &&
        !state.expectedInputLanguages.includes(state.textLanguage)
      ) {
        showProofreaderValidationAlert("Unexpected input language");
        return;
      }
      showUILoader();
      proofreaderAccordionCollapse.hide();
      const proofreaderOutput = await proofreader.proofread(state.text);
      console.log(state);
      console.log(proofreaderOutput);
      outputText.setAttribute("text", proofreaderOutput.correctedInput);
      displayCorrections(state.text, proofreaderOutput.corrections);
      hideUILoader();
    };

    const showCreateSessionAlert = async () => {
      createSessionAlert.classList.add("d-block");
      createSessionAlert.classList.remove("d-none");
      setTimeout(() => {
        createSessionAlert.classList.remove("d-block");
        createSessionAlert.classList.add("d-none");
      }, 2000);
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
      proofreaderDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      proofreaderDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    let proofreader = null;

    const handleNewSessionButtonClick = async (event) => {
      hideUnavailableAlert();
      hideDownloadAlert();
      const availability = await checkNewSessionAvailability();
      // const availability = "downloadable";
      // const availability = "unavailable";
      if (availability === "available") {
        proofreader = await downloadProofreaderForNewSession();
      } else if (availability === "downloadable") {
        // show modal;
        await showDownloadAlert();
        //writer = await downloadWriterForNewSession();
      } else if (availability === "unavailable") {
        await showUnavailableAlert();
        return;
      } else if (availability === "downloading") {
        // Already showing progress bar in the download function
      }
    };

    const handleProofreadButtonButtonClick = async (event) => {
      // const availability = await checkWriteAvailability();
      if (proofreader == null) {
        showCreateSessionAlert();
        return;
      }
      proofread(proofreader);
    };

    const handleProofreaderDownloadConfirmation = async (event) => {
      hideDownloadAlert();
      await downloadProofreaderForNewSession();
    };

    const handleProofreaderDownloadCancellation = async (event) => {
      await hideDownloadAlert();
    };

    onClick(proofreadButton, handleProofreadButtonButtonClick);
    onClick(newSessionButton, handleNewSessionButtonClick);
    delegate(
      element,
      ".proofreader-download-confirmation",
      "click",
      handleProofreaderDownloadConfirmation
    );
    delegate(
      element,
      ".proofreader-download-cancellation",
      "click",
      handleProofreaderDownloadCancellation
    );
  }
}

customElements.define("proofreader-tab", ProofreaderTab);
