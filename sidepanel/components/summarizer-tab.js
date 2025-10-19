import { qs, qsa, onClick, delegate } from "../common/utils.js";

class SummarizerTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("Summarizer" in self)
      ? `<div class="alert alert-danger" role="alert">
  Summarizer not supported by this configuration of Chrome. Please update to Chrome 138 or later and review the <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/summarizer-api#hardware-requirements">hardware requirements</a>
</div>`
      : `<div class="accordion" id="summarizer-accordion">

      <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#summarizer-settings-accordion-collapse" aria-expanded="true" aria-controls="summarizer-settings-accordion-collapse">
       Configuration
      </button>
    </h2>
    <div id="summarizer-settings-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#summarizer-settings-accordion">
      <div class="accordion-body">
              <input-with-language-detector label="Shared Context" id="summarizer-shared-context"></input-with-language-detector>
  <fieldset>
  <div><small>Expected Input Languages:</small> </div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="summarizer-expected-input-language-english" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-input-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="summarizer-expected-input-language-spanish" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-input-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="summarizer-expected-input-language-japanese" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-input-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Expected Context Languages:</small></div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="summarizer-expected-context-language-english" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-context-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="summarizer-expected-context-language-spanish" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-context-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="summarizer-expected-context-language-japanese" checked>
  <label class="form-check-label fs-8" for="summarizer-expected-context-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Output Language:</small></div>
        <!-- Languages -->
        <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-output-language" id="summarizer-output-language-english" value="en" checked>
  <label class="form-check-label fs-8" for="summarizer-output-language-english">
    English
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-output-language" id="summarizer-output-language-spanish" value="es">
  <label class="form-check-label fs-8" for="summarizer-output-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-output-language" id="summarizer-output-language-japanese" value="ja">
  <label class="form-check-label fs-8" for="summarizer-output-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
  <fieldset>
    <div><small>Type:</small></div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-type" id="summarizer-type-key-points" value="key-points" checked>
  <label class="form-check-label fs-8" for="summarizer-type-key-points">
    Key-points
  </label>
</div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-type" id="summarizer-type-tldr" value="tldr">
  <label class="form-check-label fs-8" for="summarizer-type-tldr">
    Tldr
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-type" id="summarizer-type-teaser" value="teaser">
  <label class="form-check-label fs-8" for="summarizer-type-teaser">
    Teaser
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-type" id="summarizer-type-headline" value="headline">
  <label class="form-check-label fs-8" for="summarizer-type-headline">
    Headline
  </label>
</div>
</fieldset>
  <fieldset>
    <div><small>Format:</small></div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-format" id="summarizer-format-markdown" value="markdown" checked>
  <label class="form-check-label fs-8" for="summarizer-format-markdown">
    Markdown
  </label>
</div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-format" id="summarizer-format-plain-text" value="plain-text">
  <label class="form-check-label fs-8" for="summarizer-format-plain-text">
    Plain-text
  </label>
</div>
</fieldset>
<fieldset>
  <div><small>Length:</small></div>
    <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-length" id="summarizer-length-short" value="short">
  <label class="form-check-label fs-8" for="summarizer-length-short">
    Short
  </label>
</div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-length" id="summarizer-length-medium" value="medium" checked>
  <label class="form-check-label fs-8" for="summarizer-length-medium">
    Medium
  </label>
</div>
  <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="summarizer-length" id="summarizer-length-long" value="long">
  <label class="form-check-label fs-8" for="summarizer-length-long">
    Long
  </label>
</div>
</fieldset>
<div class="pt-2 text-center">
        <button class="btn btn-sm btn-primary" id="summarizer-new-session-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>New Session</button>
</div>
<div class="pt-2 session-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected shared context language
</div></div>
<progress-bar class="summarizer-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
<div class="pt-2 summarizer-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the summarizer? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary summarizer-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary summarizer-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
</div>
</div>
</div>
  <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#summarizer-accordion-collapse" aria-expanded="true" aria-controls="summarizer-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="summarizer-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#summarizer-accordion">
      <div class="accordion-body">
        <input-with-language-detector label="Input" id="summarizer-input"></input-with-language-detector>
          <input-with-language-detector label="Context" id="summarizer-context"></input-with-language-detector>
  <div class="pt-2 text-center"><button class="btn btn-sm btn-primary" id="summarizer-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Summarize</button></div>
<div class="pt-2 summarizer-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected shared context language
</div></div>
<div class="pt-2 summarizer-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the summarizer? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary summarizer-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary summarizer-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
<div class="pt-2 d-none" id="summarizer-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
<progress-bar class="summarizer-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
</div>
</div>
</div>
</div>
<ui-loader class="d-none">  </ui-loader>
<output-text header="Summarized Text" height="515px"></output-text>
`;
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const summarizerButton = qs("#summarizer-button");
    const newSessionButton = qs("#summarizer-new-session-button");
    const summarizerAccordionCollapse = new bootstrap.Collapse(
      qs("#summarizer-accordion-collapse"),
      {
        toggle: false,
      }
    );
    summarizerAccordionCollapse.hide();
    const summarizerSettingsAccordionCollapse = new bootstrap.Collapse(
      qs("#summarizer-settings-accordion-collapse"),
      {
        toggle: false,
      }
    );
    summarizerSettingsAccordionCollapse.show();
    const sessionValidationAlert = qs(".session-validation-alert", element);
    const summarizerValidationAlert = qs(
      ".summarizer-validation-alert",
      element
    );
    const summarizerDownloadProgressBars = qsa(
      ".summarizer-download-progress-bar",
      element
    );
    const outputLanguages = qsa(
      "input[name='summarizer-output-language']",
      element
    );
    const allowedOutputLanguages = ["en", "es", "ja"];
    const types = qsa("input[name='summarizer-type']", element);
    const formats = qsa("input[name='summarizer-format']", element);
    const lengths = qsa("input[name='summarizer-length']", element);
    const input = qs("#summarizer-input");
    const context = qs("#summarizer-context");
    const sharedContext = qs("#summarizer-shared-context");
    const outputText = qs("output-text", element);
    const expectedInputLanguages = [
      qs("#summarizer-expected-input-language-english"),
      qs("#summarizer-expected-input-language-spanish"),
      qs("#summarizer-expected-input-language-japanese"),
    ];

    const expectedContextLanguages = [
      qs("#summarizer-expected-context-language-english"),
      qs("#summarizer-expected-context-language-spanish"),
      qs("#summarizer-expected-context-language-japanese"),
    ];
    const unavailableAlerts = qsa("unavailable-alert", element);
    const summarizerDownloadAlerts = qsa(".summarizer-download-alert", element);
    const createSessionAlert = qs("#summarizer-no-active-session");
    const uiLoader = qs("ui-loader", element);
    const getState = () => {
      return {
        textLanguage: input.getSubtag(),
        contextLanguage: context.getSubtag(),
        sharedContextLanguage: sharedContext.getSubtag(),
        type: types.find((t) => t.checked).value,
        format: formats.find((f) => f.checked).value,
        length: lengths.find((l) => l.checked).value,
        text: input.getText(),
        context: context.getText(),
        sharedContext: sharedContext.getText(),
        expectedInputLanguages: expectedInputLanguages
          .filter((lang) => lang.checked)
          .map((lang) => lang.value),
        expectedContextLanguages: expectedContextLanguages
          .filter((lang) => lang.checked)
          .map((lang) => lang.value),
        outputLanguage: outputLanguages.find((lang) => lang.checked).value,
        allowedOutputLanguages: allowedOutputLanguages,
      };
    };

    const showSessionValidationAlert = async (text) => {
      qs("div", sessionValidationAlert).innerHTML = text;
      sessionValidationAlert.classList.remove("d-none");
      sessionValidationAlert.classList.add("d-block");

      setTimeout(() => {
        sessionValidationAlert.classList.remove("d-block");
        sessionValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hideSessionValidationAlert = async () => {
      sessionValidationAlert.classList.remove("d-block");
      sessionValidationAlert.classList.add("d-none");
    };

    const showSummarizerValidationAlert = async (text) => {
      qs("div", summarizerValidationAlert).innerHTML = text;
      summarizerValidationAlert.classList.remove("d-none");
      summarizerValidationAlert.classList.add("d-block");

      setTimeout(() => {
        summarizerValidationAlert.classList.remove("d-block");
        summarizerValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hideSummarizerValidationAlert = async () => {
      summarizerValidationAlert.classList.remove("d-block");
      summarizerValidationAlert.classList.add("d-none");
    };

    const checkNewSessionAvailability = async () => {
      const state = getState();
      console.log(state);
      hideSessionValidationAlert();
      if (state.expectedContextLanguages.length == 0) {
        showSessionValidationAlert(
          "Select at least one expected context language"
        );
        return "unavailable";
      }
      if (state.expectedInputLanguages.length == 0) {
        showSessionValidationAlert(
          "Select at least one expected input language"
        );
        return "unavailable";
      }
      if (
        state.sharedContext.trim() != "" &&
        !state.expectedContextLanguages.includes(state.sharedContextLanguage)
      ) {
        showSessionValidationAlert("Unexpected shared context language");
        return "unavailable";
      }
      const availability = await Summarizer.availability({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        type: state.type,
        format: state.format,
        length: state.length,
      });
      return availability;
    };

    const downloadSummarizerForNewSession = async () => {
      const state = getState();
      console.log(state);
      summarizerSettingsAccordionCollapse.hide();
      summarizerAccordionCollapse.show();
      return await Summarizer.create({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        type: state.type,
        format: state.format,
        length: state.length,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            summarizerDownloadProgressBars.forEach((bar) => {
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

    const summarize = async (summarizer) => {
      const state = getState();
      hideSummarizerValidationAlert();
      if (
        state.context.trim() != "" &&
        !state.expectedContextLanguages.includes(state.contextLanguage)
      ) {
        showSummarizerValidationAlert("Unexpected context language");
        return;
      }
      if (
        state.text.trim() != "" &&
        !state.expectedInputLanguages.includes(state.textLanguage)
      ) {
        showSummarizerValidationAlert("Unexpected input language");
        return;
      }
      showUILoader();
      summarizerAccordionCollapse.hide();
      const summarizerStream = summarizer.summarizeStreaming(state.text, {
        context: state.context,
      });
      outputText.setAttribute("text", "");
      for await (const chunk of summarizerStream) {
        outputText.setAttribute(
          "text",
          outputText.getAttribute("text") + chunk
        );
      }
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
      summarizerDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      summarizerDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    let summarizer = null;

    const handleNewSessionButtonClick = async (event) => {
      hideUnavailableAlert();
      hideDownloadAlert();
      const availability = await checkNewSessionAvailability();
      // const availability = "downloadable";
      // const availability = "unavailable";
      if (availability === "available") {
        summarizer = await downloadSummarizerForNewSession();
      } else if (availability === "downloadable") {
        // show modal;
        await showDownloadAlert();
      } else if (availability === "unavailable") {
        await showUnavailableAlert();
        return;
      } else if (availability === "downloading") {
        // Already showing progress bar in the download function
      }
    };

    const handleSummarizerButtonClick = async (event) => {
      // const availability = await checkWriteAvailability();
      if (summarizer == null) {
        showCreateSessionAlert();
        return;
      }
      summarize(summarizer);
    };

    const handleSummarizerDownloadConfirmation = async (event) => {
      hideDownloadAlert();
      await downloadSummarizerForNewSession();
    };

    const handleSummarizerDownloadCancellation = async (event) => {
      await hideDownloadAlert();
    };

    onClick(summarizerButton, handleSummarizerButtonClick);
    onClick(newSessionButton, handleNewSessionButtonClick);
    delegate(
      element,
      ".summarizer-download-confirmation",
      "click",
      handleSummarizerDownloadConfirmation
    );
    delegate(
      element,
      ".summarizer-download-cancellation",
      "click",
      handleSummarizerDownloadCancellation
    );
  }
}
customElements.define("summarizer-tab", SummarizerTab);
