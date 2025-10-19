import { qs, qsa, onClick, delegate } from "../common/utils.js";

class RewriterTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("Rewriter" in self)
      ? `<div class="alert alert-danger" role="alert">
  Rewriter not supported by this configuration of Chrome. Please check how to configure Rewriter <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/rewriter-api#add_support_to_localhost">here</a> and review the <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/rewriter-api#hardware-requirements">hardware requirements</a>
</div>`
      : `
    <div class="accordion" id="rewriter-accordion">
        <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rewriter-settings-accordion-collapse" aria-expanded="true" aria-controls="rewriter-settings-accordion-collapse">
       Configuration
      </button>
    </h2>
    <div id="rewriter-settings-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#rewriter-settings-accordion">
      <div class="accordion-body">
              <input-with-language-detector label="Shared Context" id="rewriter-shared-context"></input-with-language-detector>
  <fieldset>
  <div><small>Expected Input Languages:</small> </div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="rewriter-expected-input-language-english" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-input-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="rewriter-expected-input-language-spanish" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-input-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="rewriter-expected-input-language-japanese" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-input-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Expected Context Languages:</small></div>
        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="rewriter-expected-context-language-english" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-context-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="rewriter-expected-context-language-spanish" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-context-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="rewriter-expected-context-language-japanese" checked>
  <label class="form-check-label fs-8" for="rewriter-expected-context-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<fieldset>
 <div><small>Output Language:</small></div>
        <!-- Languages -->
        <div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-output-language" id="rewriter-output-language-english" value="en" checked>
  <label class="form-check-label fs-8" for="rewriter-output-language-english">
    English
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-output-language" id="rewriter-output-language-spanish" value="es">
  <label class="form-check-label fs-8" for="rewriter-output-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check-inline">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-output-language" id="rewriter-output-language-japanese" value="ja">
  <label class="form-check-label fs-8" for="rewriter-output-language-japanese">
    Japanese
  </label>
</div>
</fieldset>
<div class="pt-2 text-center">
        <button class="btn btn-sm btn-primary" id="rewriter-new-session"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>New Session</button>
</div>
<div class="pt-2 session-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected shared context language
</div></div>
<progress-bar class="rewriter-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
<div class="pt-2 rewriter-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the writer?
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary rewriter-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary rewriter-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert text="Unavailable for the given configuration" class="d-none"></unavailable-alert>
</div>
</div>
</div>
  <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rewriter-accordion-collapse" aria-expanded="true" aria-controls="rewriter-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="rewriter-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#rewriter-accordion">
      <div class="accordion-body">

        <input-with-language-detector label="Input" id="rewriter-input"></input-with-language-detector>
          <input-with-language-detector label="Context" id="rewriter-context"></input-with-language-detector>
  <div class="row">
  <div class="col">
  <fieldset>
      <div><small>Tone:</small></div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-tone" id="rewriter-tone-more-formal" value="more-formal">
  <label class="form-check-label fs-8" for="rewriter-tone">
    More Formal
  </label>
</div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-tone" id="rewriter-tone-as-is" value="as-is" checked>
  <label class="form-check-label fs-8" for="rewriter-tone">
    As is
  </label>
</div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-tone" id="rewriter-tone-more-casual" value="more-casual">
  <label class="form-check-label fs-8" for="rewriter-tone">
    More Casual
  </label>
</div>
</fieldset>
</div>
  <div class="col">
  <fieldset>
    <div><small>Format:</small></div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-format" id="rewriter-format-markdown" value="markdown">
  <label class="form-check-label fs-8" for=rewriter-format">
    Markdown
  </label>
</div>
<div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-format" id="rewriter-format-as-is" value="as-is" checked>
  <label class="form-check-label fs-8" for="rewriter-format">
    As is
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-format" id="rewriter-format-plain-text" value="plain-text">
  <label class="form-check-label fs-8" for="rewriter-format">
    Plain-text
  </label>
</div>
</fieldset>
</div>
  <div class="col">
  <fieldset>
  <div><small>Length:</small></div>
    <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-length" id="rewriter-length-shorter" value="shorter">
  <label class="form-check-label fs-8" for="rewriter-length">
    Shorter
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-length" id="writer-length-as-is" value="as-is" checked>
  <label class="form-check-label fs-8" for="rewriter-length">
    As is
  </label>
</div>
  <div class="form-check">
  <input class="form-check-input form-check-input-sm" type="radio" name="rewriter-length" id="rewriter-length-longer" value="longer">
  <label class="form-check-label fs-8" for="rewriter-length">
    Longer
  </label>
</div>
</fieldset>
</div>
</div>
  <div class="pt-2 text-center"><button class="btn btn-sm btn-primary" id="rewrite-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Rewrite</button></div>
<div class="pt-2 rewriter-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected shared context language
</div></div>
<unavailable-alert class="d-none"></unavailable-alert>
<download-modal header="Download" body="Do you want to download the rewriter?" class="d-none"></download-modal>
<progress-bar class="rewriter-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
<div class="pt-2 d-none" id="rewriter-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
</div>
</div>
</div>
</div>
<ui-loader class="d-none">  </ui-loader>
<output-text header="Rewritten Text" height="515px"></output-text>
`;
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const rewriteButton = qs("#rewrite-button");
    const newSessionButton = qs("#rewriter-new-session");
    const rewriteAccordionCollapse = new bootstrap.Collapse(
      qs("#rewriter-accordion-collapse"),
      {
        toggle: false,
      }
    );
    const rewriteSettingsAccordionCollapse = new bootstrap.Collapse(
      qs("#rewriter-settings-accordion-collapse"),
      {
        toggle: false,
      }
    );
    const sessionValidationAlert = qs(".session-validation-alert", element);
    const rewriterValidationAlert = qs(".rewriter-validation-alert", element);
    rewriteAccordionCollapse.hide();
    rewriteSettingsAccordionCollapse.show();
    const outputLanguages = qsa(
      "input[name='rewriter-output-language']",
      element
    );
    const allowedOutputLanguages = ["en", "es", "ja"];
    const rewriterDownloadProgressBars = qsa(
      ".rewriter-download-progress-bar",
      element
    );
    const tones = qsa("input[name='rewriter-tone']", element);
    const formats = qsa("input[name='rewriter-format']", element);
    const lengths = qsa("input[name='rewriter-length']", element);
    const input = qs("#rewriter-input");
    const context = qs("#rewriter-context");
    const sharedContext = qs("#rewriter-shared-context");
    const outputText = qs("output-text", element);
    const expectedInputLanguages = [
      qs("#rewriter-expected-input-language-english"),
      qs("#rewriter-expected-input-language-spanish"),
      qs("#rewriter-expected-input-language-japanese"),
    ];

    const expectedContextLanguages = [
      qs("#rewriter-expected-context-language-english"),
      qs("#rewriter-expected-context-language-spanish"),
      qs("#rewriter-expected-context-language-japanese"),
    ];
    const unavailableAlerts = qsa("unavailable-alert", element);
    const rewriterDownloadAlerts = qsa(".rewriter-download-alert", element);
    const createSessionAlert = qs("#rewriter-no-active-session");
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

    const showRewriterValidationAlert = async (text) => {
      qs("div", rewriterValidationAlert).innerHTML = text;
      rewriterValidationAlert.classList.remove("d-none");
      rewriterValidationAlert.classList.add("d-block");

      setTimeout(() => {
        rewriterValidationAlert.classList.remove("d-block");
        rewriterValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hideRewriterValidationAlert = async () => {
      rewriterValidationAlert.classList.remove("d-block");
      rewriterValidationAlert.classList.add("d-none");
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
      const availability = await Rewriter.availability({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
      });
      return availability;
    };

    const downloadRewriterForNewSession = async () => {
      const state = getState();
      console.log(state);
      rewriteSettingsAccordionCollapse.hide();
      rewriteAccordionCollapse.show();
      return await Rewriter.create({
        sharedContext: state.sharedContext,
        expectedContextLanguages: state.expectedContextLanguages,
        expectedInputLanguages: state.expectedInputLanguages,
        outputLanguage: state.outputLanguage, //state.language,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            rewriterDownloadProgressBars.forEach((bar) => {
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
      rewriterDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      rewriterDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    let rewriter = null;
    const handleNewSessionButtonClick = async () => {
      hideUnavailableAlert();
      hideDownloadAlert();
      const availability = await checkNewSessionAvailability();
      // const availability = "downloadable";
      // const availability = "unavailable";
      if (availability === "available") {
        rewriter = await downloadRewriterForNewSession();
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

    const showUILoader = async () => {
      uiLoader.classList.add("d-block");
      uiLoader.classList.remove("d-none");
    };

    const hideUILoader = async () => {
      uiLoader.classList.remove("d-block");
      uiLoader.classList.add("d-none");
    };

    const rewrite = async (rewriter) => {
      const state = getState();
      hideRewriterValidationAlert();
      if (
        state.context.trim() != "" &&
        !state.expectedContextLanguages.includes(state.contextLanguage)
      ) {
        showRewriterValidationAlert("Unexpected context language");
        return;
      }
      if (
        state.text.trim() != "" &&
        !state.expectedInputLanguages.includes(state.textLanguage)
      ) {
        showRewriterValidationAlert("Unexpected input language");
        return;
      }
      showUILoader();
      rewriteAccordionCollapse.hide();
      const rewriterStream = rewriter.rewriteStreaming(state.text, {
        context: state.context,
        tone: state.tone,
        format: state.format,
        length: state.length,
      });
      console.log(state);
      outputText.setAttribute("text", "");
      for await (const chunk of rewriterStream) {
        outputText.setAttribute(
          "text",
          outputText.getAttribute("text") + chunk
        );
      }
      hideUILoader();
    };

    const handleRewriteButtonClick = async () => {
      // const availability = await checkWriteAvailability();
      if (rewriter == null) {
        showCreateSessionAlert();
        return;
      }
      rewrite(rewriter);
    };

    const handleRewriterDownloadConfirmation = async (event) => {
      hideDownloadAlert();
      await downloadRewriterForNewSession();
    };

    const handleRewriterDownloadCancellation = async (event) => {
      await hideDownloadAlert();
    };

    onClick(rewriteButton, handleRewriteButtonClick);
    onClick(newSessionButton, handleNewSessionButtonClick);
    delegate(
      element,
      ".rewriter-download-confirmation",
      "click",
      handleRewriterDownloadConfirmation
    );
    delegate(
      element,
      ".rewriter-download-cancellation",
      "click",
      handleRewriterDownloadCancellation
    );
  }
}
customElements.define("rewriter-tab", RewriterTab);
