import { qs, qsa, onClick, delegate } from "../common/utils.js";

class WriterTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("Writer" in self)
      ? `<div class="alert alert-danger" role="alert">
  Writer not supported by this configuration of Chrome. Please check how to configure Writer <a href="#" class="chrome-docs-link" " chrome-docs-url="https://developer.chrome.com/docs/ai/writer-api#add_support_to_localhost">here</a> and review the <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/writer-api#hardware-requirements">hardware requirements</a>
</div>`
      : `<div class="accordion" id="writer-accordion">
    <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#writer-settings-accordion-collapse" aria-expanded="true" aria-controls="writer-settings-accordion-collapse">
       Configuration
      </button>
    </h2>
    <div id="writer-settings-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#writer-accordion">
      <div class="accordion-body">
      <input-with-language-detector label="Shared Context" id="writer-shared-context"></input-with-language-detector>
  <fieldset>
  <div><small>Expected Input Languages:</small> </div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="writer-expected-input-language-english" checked>
  <label class="form-check-label fs-8" for="writer-expected-input-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="writer-expected-input-language-spanish" checked>
  <label class="form-check-label fs-8" for="writer-expected-input-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="writer-expected-input-language-japanese" checked>
  <label class="form-check-label fs-8" for="writer-expected-input-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Expected Context Languages:</small></div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="writer-expected-context-language-english" checked>
  <label class="form-check-label fs-8" for="writer-expected-context-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="writer-expected-context-language-spanish" checked>
  <label class="form-check-label fs-8" for="writer-expected-context-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="writer-expected-context-language-japanese" checked>
  <label class="form-check-label fs-8" for="writer-expected-context-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Output Language:</small></div>
        <!-- Languages -->
        <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-output-language" id="writer-output-language-english" value="en" checked>
  <label class="form-check-label fs-8" for="writer-output-language-english">
    English
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-output-language" id="writer-output-language-spanish" value="es">
  <label class="form-check-label fs-8" for="writer-output-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-output-language" id="writer-output-language-japanese" value="ja">
  <label class="form-check-label fs-8" for="writer-output-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<div class="pt-2 text-center">
        <button class="btn btn-sm btn-primary" id="writer-new-session-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>New Session</button>
</div>
<div class="pt-2 session-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected shared context language
</div></div>
<progress-bar class="writer-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
<div class="pt-2 writer-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the writer? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary writer-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary writer-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
</div>
</div>
</div>
  <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#writer-accordion-collapse" aria-expanded="true" aria-controls="writer-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="writer-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#writer-accordion">
      <div class="accordion-body">

        <input-with-language-detector label="Input" id="writer-input"></input-with-language-detector>
          <input-with-language-detector label="Context" id="writer-context"></input-with-language-detector>
<div class="row">
  <div class="col">
  <fieldset>
    <div><small>Tone:</small></div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-tone" id="writer-tone-formal" value="formal">
  <label class="form-check-label fs-8" for="writer-tone">
    Formal
  </label>
</div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-tone" id="writer-tone-neutral" value="neutral" checked>
  <label class="form-check-label fs-8" for="writer-tone">
    Neutral
  </label>
</div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-tone" id="writer-tone-casual" value="casual">
  <label class="form-check-label fs-8" for="writer-tone">
    Casual
  </label>
</div>
</fieldset>
</div>
<div class="col">
<fieldset>
  <div><small>Format:</small></div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-format" id="writer-format-markdown" value="markdown" checked>
  <label class="form-check-label fs-8" for="writer-format">
    Markdown
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-format" id="writer-format-plain-text" value="plain-text">
  <label class="form-check-label fs-8" for="writer-format">
    Plain-text
  </label>
</div>
</fieldset>
</div>
<div class="col">
<fieldset>
  <div><small>Length:</small></div>
    <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-length" id="writer-length-short" value="short">
  <label class="form-check-label fs-8" for="writer-length">
    Short
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-length" id="writer-length-medium" value="medium" checked>
  <label class="form-check-label fs-8" for="writer-length">
    Medium
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="writer-length" id="writer-length-long" value="long">
  <label class="form-check-label fs-8" for="writer-length">
    Long
  </label>
</div>
</fieldset>
</div>
</div>
<div class="pt-2 text-center"><button class="btn btn-sm btn-primary" id="writer-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Write</button>
</div>
<div class="pt-2 writer-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected input language
</div></div>
<div class="pt-2 writer-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the writer? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary writer-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary writer-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
<div class="pt-2 d-none" id="writer-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
<progress-bar class="writer-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
      </div>
    </div>
  </div>
</div>
<ui-loader class="d-none">  </ui-loader>
<output-text header="Written Text" height="515px"></output-text>
`;
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const writeButton = qs("#writer-button");
    const newSessionButton = qs("#writer-new-session-button");
    const writerAccordionCollapse = new bootstrap.Collapse(
      qs("#writer-accordion-collapse"),
      {
        toggle: false,
      }
    );
    writerAccordionCollapse.hide();
    const writerSettingsAccordionCollapse = new bootstrap.Collapse(
      qs("#writer-settings-accordion-collapse"),
      {
        toggle: false,
      }
    );
    writerSettingsAccordionCollapse.show();
    const writerDownloadProgressBars = qsa(
      ".writer-download-progress-bar",
      element
    );
    const outputLanguages = qsa(
      "input[name='writer-output-language']",
      element
    );
    const allowedOutputLanguages = ["en", "es", "ja"];
    const tones = qsa("input[name='writer-tone']", element);
    const formats = qsa("input[name='writer-format']", element);
    const lengths = qsa("input[name='writer-length']", element);
    const input = qs("#writer-input");
    const context = qs("#writer-context");
    const sharedContext = qs("#writer-shared-context");
    const sessionValidationAlert = qs(".session-validation-alert", element);
    const writerValidationAlert = qs(".writer-validation-alert", element);
    const outputText = qs("output-text", element);
    const expectedInputLanguages = [
      qs("#writer-expected-input-language-english"),
      qs("#writer-expected-input-language-spanish"),
      qs("#writer-expected-input-language-japanese"),
    ];

    const expectedContextLanguages = [
      qs("#writer-expected-context-language-english"),
      qs("#writer-expected-context-language-spanish"),
      qs("#writer-expected-context-language-japanese"),
    ];
    const unavailableAlerts = qsa("unavailable-alert", element);
    const writerDownloadAlerts = qsa(".writer-download-alert", element);
    const createSessionAlert = qs("#writer-no-active-session");
    const uiLoader = qs("ui-loader", element);
    const getState = () => {
      return {
        textLanguage: input.getSubtag(),
        contextLanguage: context.getSubtag(),
        sharedContextLanguage: sharedContext.getSubtag(),
        tone: tones.find((t) => t.checked).value,
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

    const showWriterValidationAlert = async (text) => {
      qs("div", writerValidationAlert).innerHTML = text;
      writerValidationAlert.classList.remove("d-none");
      writerValidationAlert.classList.add("d-block");

      setTimeout(() => {
        writerValidationAlert.classList.remove("d-block");
        writerValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hideWriterValidationAlert = async () => {
      writerValidationAlert.classList.remove("d-block");
      writerValidationAlert.classList.add("d-none");
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
      const availability = await Writer.availability({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
      });
      return availability;
    };

    const downloadWriterForNewSession = async () => {
      const state = getState();
      console.log(state);
      writerSettingsAccordionCollapse.hide();
      writerAccordionCollapse.show();
      return await Writer.create({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            writerDownloadProgressBars.forEach((bar) => {
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

    const write = async (writer) => {
      const state = getState();
      hideWriterValidationAlert();
      if (
        state.context.trim() != "" &&
        !state.expectedContextLanguages.includes(state.contextLanguage)
      ) {
        showWriterValidationAlert("Unexpected context language");
        return;
      }
      if (
        state.text.trim() != "" &&
        !state.expectedInputLanguages.includes(state.textLanguage)
      ) {
        showWriterValidationAlert("Unexpected input language");
        return;
      }
      showUILoader();
      writerAccordionCollapse.hide();
      const writerStream = writer.writeStreaming(state.text, {
        context: state.context,
        tone: state.tone,
        format: state.format,
        length: state.length,
      });
      console.log(state);
      outputText.setAttribute("text", "");
      for await (const chunk of writerStream) {
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
      writerDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      writerDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    let writer = null;

    const handleNewSessionButtonClick = async (event) => {
      hideUnavailableAlert();
      hideDownloadAlert();
      const availability = await checkNewSessionAvailability();
      // const availability = "downloadable";
      // const availability = "unavailable";
      if (availability === "available") {
        writer = await downloadWriterForNewSession();
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

    const handleWriteButtonClick = async (event) => {
      // const availability = await checkWriteAvailability();
      if (writer == null) {
        showCreateSessionAlert();
        return;
      }
      write(writer);
    };

    const handleWriterDownloadConfirmation = async (event) => {
      hideDownloadAlert();
      await downloadWriterForNewSession();
    };

    const handleWriterDownloadCancellation = async (event) => {
      await hideDownloadAlert();
    };

    onClick(writeButton, handleWriteButtonClick);
    onClick(newSessionButton, handleNewSessionButtonClick);
    delegate(
      element,
      ".writer-download-confirmation",
      "click",
      handleWriterDownloadConfirmation
    );
    delegate(
      element,
      ".writer-download-cancellation",
      "click",
      handleWriterDownloadCancellation
    );
  }
}
customElements.define("writer-tab", WriterTab);
