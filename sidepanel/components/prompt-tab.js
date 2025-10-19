import { qs, qsa, onClick, delegate } from "../common/utils.js";

class PromptTab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = !("LanguageModel" in self)
      ? `<div class="alert alert-danger" role="alert">
  Prompt not supported by this configuration of Chrome. Please update to Chrome 138 or later and review the <a href="#" class="chrome-docs-link" chrome-docs-url="https://developer.chrome.com/docs/ai/prompt-api#hardware-requirements">hardware requirements</a>.
</div>`
      : `
    <!-- main accordion -->
    <div class="accordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-settings-accordion-collapse" aria-expanded="true" aria-controls="prompt-settings-accordion-collapse">
       Configuration
      </button>
    </h2>
    <div id="prompt-settings-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-settings-accordion">
      <div class="accordion-body">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-params-accordion-collapse" aria-expanded="true" aria-controls="prompt-params-accordion-collapse">
       Params
      </button>
    </h2>
    <div id="prompt-params-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-params-accordion">
      <div class="accordion-body">
<div class="row g-2">
  <div class="col">
    <div class="form-floating">
      <input type="number" min="0" max="2" step="0.1" class="form-control" id="prompt-temperature" value="1.0">
      <label for="prompt-temperature">Temperature</label>
      <div class="invalid-feedback">
    Please enter a Temperature between 0 and 2.
  </div>
    </div>
  </div>
  <div class="col">
    <div class="form-floating">
      <input type="number" min="1" max="128" step="1" class="form-control" id="prompt-top-k" value="3">
      <label for="prompt-top-k">Top K</label>
      <div class="invalid-feedback">
    Please enter an integer Top K value between 1 and 128.
  </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
<div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-initialization-accordion-collapse" aria-expanded="true" aria-controls="prompt-initialization-accordion-collapse">
       Initial Prompts
      </button>
    </h2>
    <div id="prompt-initialization-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-initialization-accordion">
      <div class="accordion-body">
      <!-- Prompts List -->
                  <div class="form-floating pb-2">
                  <textarea class="form-control" id="prompt-initial-system-prompt" placeholder="System Prompt"></textarea>
                  <label for="prompt-initial-system-prompt">System Prompt</label>
              </div>
             <div class="form-floating pb-2">
            <textarea class="form-control" id="prompt-initial-prompt-list" placeholder="Initial Prompts"></textarea>
            <label for="prompt-initial-prompt-list">Initial Prompts</label>
            <div class="invalid-feedback">
    Please enter a valid JSON.
  </div>
  </div>
        <!-- Prompts List --> 
<!--       <div class="pt-2 form-check form-check-inline">
   <input class="form-check-input" type="radio" name="prompt-initial-prompt-role" id="prompt-initial-prompt-role-system" value="system" checked>
   <label class="form-check-label fs-8" for="prompt-initial-prompt-role-system">System</label>
 </div> -->
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="prompt-initial-prompt-role" id="prompt-initial-prompt-role-user" value="user" checked>
  <label class="form-check-label fs-8" for="prompt-initial-prompt-role-user">User</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="prompt-initial-prompt-role" id="prompt-initial-prompt-role-assistant" value="assistant">
  <label class="form-check-label fs-8" for="prompt-initial-prompt-role-assistant">Assistant</label>
</div>
<input-with-language-detector id="prompt-initial-prompt-content" label="Content"></input-with-language-detector>
<div class="pb-1 pt-1 text-center"><button class="btn btn-sm btn-primary" id="prompt-initial-prompt-add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>Add Prompt</button></div>
</div>
</div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-expected-input-modes-accordion-collapse" aria-expanded="true" aria-controls="prompt-expected-input-modes-accordion-collapse">
       Expected Input Modes
      </button>
    </h2>
    <div id="prompt-expected-input-modes-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-expected-input-modes-accordion">
      <div class="accordion-body">


        <!-- Modes -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="text" id="prompt-expected-input-text" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-text">
    Text
  </label>
</div>
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="image" id="prompt-expected-input-image" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-image">
    Image
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="audio" id="prompt-expected-input-audio" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-audio">
    Audio
  </label>
</div>
</div>
</div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-expected-input-languages-accordion-collapse" aria-expanded="true" aria-controls="prompt-expected-input-languages-accordion-collapse">
       Expected Input Languages
      </button>
    </h2>
    <div id="prompt-expected-input-languages-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-expected-input-languages-accordion">
      <div class="accordion-body">


        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="prompt-expected-input-language-english" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-language-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="prompt-expected-input-language-spanish" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-language-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="prompt-expected-input-language-japanese" checked>
  <label class="form-check-label fs-7" for="prompt-expected-input-language-japanese">
    Japanese
  </label>
</div>
</div>
</div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-expected-input-output-accordion-collapse" aria-expanded="true" aria-controls="prompt-expected-input-output-accordion-collapse">
       Expected Output Languages
      </button>
    </h2>
    <div id="prompt-expected-input-output-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-expected-input-output-accordion">
      <div class="accordion-body">


        <!-- Languages -->
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="en" id="prompt-expected-output-english" checked>
  <label class="form-check-label fs-7" for="prompt-expected-output-english">
    English
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="es" id="prompt-expected-output-spanish" checked>
  <label class="form-check-label fs-7" for="prompt-expected-output-spanish">
    Spanish
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="ja" id="prompt-expected-output-japanese" checked>
  <label class="form-check-label fs-7" for="prompt-expected-output-japanese">
    Japanese
  </label>
</div>
</div>
</div>
</div>

<div class="pt-2 text-center">
        <button class="btn btn-sm btn-primary" id="prompt-prompt-new-session"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>New Session</button>
</div>
<div class="pt-2 session-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected prompt language
</div></div>
<div class="pt-2 prompt-download-alert d-none"><div class="alert alert-primary" role="alert">
  Do you want to download the prompt? 
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary prompt-download-cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary prompt-download-confirmation">Yes</button><div class="col"></div></div>
</div></div>
<unavailable-alert class="d-none"></unavailable-alert>
<download-modal header="Download" body="Do you want to download the prompt?" class="d-none"></download-modal>
<progress-bar class="prompt-download-progress-bar d-none" progress="1" max="100" ></progress-bar>

</div>
</div>
</div>
  <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-prompt-append-accordion-collapse" aria-expanded="true" aria-controls="prompt-prompt-append-accordion-collapse">
       Append
      </button>
    </h2>
    <div id="prompt-prompt-append-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-prompt-append-accordion">
      <div class="accordion-body">

<input-with-language-detector id="prompt-prompt-append-content" label="Content"></input-with-language-detector>
<div class="mb-3">
  <label for="prompt-prompt-append-type-image" class="form-label fs-7">Image</label>
  <input class="form-control input-sm" type="file" id="prompt-prompt-append-type-image">
</div>
<div class="mb-3">
  <label for="prompt-prompt-append-type-audio" class="form-label fs-7">Audio</label>
  <input class="form-control input-sm" type="file" id="prompt-prompt-append-type-audio">
</div>
        <div class="pt-2 text-center">
         <button class="btn btn-sm btn-primary" id="prompt-prompt-append-prompt"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>Append</button>
         </div>
<div class="pt-2 prompt-append-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected prompt language
</div></div>
<div class="pt-2 d-none prompt-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
<ui-loader  class="append-ui-loader d-none">  </ui-loader>
<unavailable-alert class="d-none"></unavailable-alert>
<download-modal header="Download" body="Do you want to download the prompt?" class="d-none"></download-modal>
<progress-bar class="prompt-download-progress-bar d-none" progress="1" max="100" ></progress-bar>
         </div>
         </div>
         </div>

           <!-- <div class="accordion-item">
    <h2 class="accordion-header">

      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#prompt-prompt-input-accordion-collapse" aria-expanded="true" aria-controls="prompt-prompt-input-accordion-collapse">
       Input
      </button>
    </h2>
    <div id="prompt-prompt-input-accordion-collapse" class="accordion-collapse collapse show" data-bs-parent="#prompt-prompt-input-accordion">
      <div class="accordion-body">

<input-with-language-detector id="prompt-prompt-input-content" label="Content"></input-with-language-detector>
        <div class="pt-2 text-center">
         <button class="btn btn-sm btn-primary" id="prompt-prompt-input-prompt"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">
  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/>
</svg>Submit</button>
         </div>
         </div>
         </div>
         </div> -->
</div>
</div>
<div class="pt-2 prompt-input-validation-alert d-none"><div class="alert alert-danger" role="alert">
  Unexpected prompt language
</div></div>
         <div class="pt-2 d-none prompt-no-active-session"><div class="alert alert-danger" role="alert">
No Active Session. Please create a session in configuration.
</div></div>
<unavailable-alert class="d-none"></unavailable-alert>
<download-modal header="Download" body="Do you want to download the prompt?" class="d-none"></download-modal>
<div class="container">
<progress-bar class="prompt-download-progress-bar d-none" progress="1" max="100"></progress-bar>
</div>
<prompt-loader class="d-none"></prompt-loader>
<chat-box></chat-box>
`;
    this.files = {};
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    const initialPromptListAddButton = qs("#prompt-initial-prompt-add");
    const newSessionButton = qs("#prompt-prompt-new-session");
    const appendButton = qs("#prompt-prompt-append-prompt");
    // const promptInputAccordionCollapse = new bootstrap.Collapse(
    //   qs("#prompt-prompt-input-accordion-collapse"),
    //   {
    //     toggle: false,
    //   }
    // );
    // promptInputAccordionCollapse.hide();
    const promptSettingsAccordionCollapse = new bootstrap.Collapse(
      qs("#prompt-settings-accordion-collapse"),
      {
        toggle: false,
      }
    );
    promptSettingsAccordionCollapse.show();
    const promptAppendAccordionCollapse = new bootstrap.Collapse(
      qs("#prompt-prompt-append-accordion-collapse"),
      {
        toggle: false,
      }
    );
    promptAppendAccordionCollapse.hide();
    const sessionValidationAlert = qs(".session-validation-alert", element);
    const promptAppendValidationAlert = qs(
      ".prompt-append-validation-alert",
      element
    );
    const promptInputValidationAlert = qs(
      ".prompt-input-validation-alert",
      element
    );
    const promptDownloadProgressBars = qsa(
      ".prompt-download-progress-bar",
      element
    );
    const allowedOutputLanguages = ["en", "es", "ja"];
    const initialPromptList = qs("#prompt-initial-prompt-list");
    const initialSystemPrompt = qs("#prompt-initial-system-prompt");
    const temperatureInput = element.querySelector("#prompt-temperature");
    const topKInput = element.querySelector("#prompt-top-k");
    const expectedInputModes = [
      qs("#prompt-expected-input-text"),
      qs("#prompt-expected-input-image"),
      qs("#prompt-expected-input-audio"),
    ];

    const appendInput = qs("#prompt-prompt-append-content");
    const promptChat = qs("chat-box", element);
    const expectedInputLanguages = [
      qs("#prompt-expected-input-language-english"),
      qs("#prompt-expected-input-language-spanish"),
      qs("#prompt-expected-input-language-japanese"),
    ];

    const expectedOutputLanguages = [
      qs("#prompt-expected-output-english"),
      qs("#prompt-expected-output-spanish"),
      qs("#prompt-expected-output-japanese"),
    ];

    const unavailableAlerts = qsa("unavailable-alert", element);
    const promptDownloadAlerts = qsa(".prompt-download-alert", element);
    const createSessionAlerts = qsa(".prompt-no-active-session", element);
    const outputUiLoader = qs("ui-loader.output-ui-loader", element);
    const appendUiLoader = qs("ui-loader.append-ui-loader", element);
    const promptInitialPromptRoles = qsa(
      "input[name='prompt-initial-prompt-role']",
      element
    );
    const promptInitialPromptContent = qs(
      "#prompt-initial-prompt-content",
      element
    );
    const promptAppendTypeImage = qs("#prompt-prompt-append-type-image");
    const promptAppendTypeAudio = qs("#prompt-prompt-append-type-audio");
    const promptStopButton = qs("#prompt-stop-button");
    const promptLoader = qs("prompt-loader", element);
    const files = {};
    const getState = () => {
      return {
        topK: parseInt(topKInput.value),
        temperature: parseFloat(temperatureInput.value),
        promptInitialPromptRole: promptInitialPromptRoles.find(
          (role) => role.checked
        ).value,
        promptInitialPromptContent: promptInitialPromptContent.getText(),
        promptAppendTypeImage: promptAppendTypeImage.files[0],
        promptAppendTypeAudio: promptAppendTypeAudio.files[0],
        initialSystemPrompt: initialSystemPrompt.value,
        expectedInputModes: expectedInputModes
          .filter((eim) => eim.checked)
          .map((eim) => eim.value),
        initialPrompts:
          initialPromptList.value.trim() == ""
            ? []
            : JSON.parse(initialPromptList.value),
        expectedInputs: expectedInputModes
          .filter((eim) => eim.checked)
          .map((eim) => {
            if (eim.value == "text") {
              return {
                type: "text",
                languages: expectedInputLanguages
                  .filter((lang) => lang.checked)
                  .map((lang) => lang.value),
              };
            } else if (eim.value == "image") {
              return { type: "image" };
            } else if (eim.value == "audio") {
              return { type: "audio" };
            }
          }),
        expectedInputLanguages: expectedInputLanguages
          .filter((lang) => lang.checked)
          .map((lang) => lang.value),
        expectedOutputLanguages: expectedOutputLanguages
          .filter((lang) => lang.checked)
          .map((lang) => lang.value),
        expectedOutputs: [
          {
            type: "text",
            languages: expectedOutputLanguages
              .filter((lang) => lang.checked)
              .map((lang) => lang.value),
          },
        ],
        appendText: appendInput.getText(),
        appendLanguage: appendInput.getSubtag(),
        text: qs("textarea.prompt-chat-box-input", promptChat).value,
        schema: qs("textarea.prompt-chat-box-schema-input", promptChat).value,
        suffix: qs("textarea.prompt-chat-box-suffix-input", promptChat).value,
        promptInputOption: qsa(
          "input[name='prompt-chat-box-option']",
          promptChat
        ).find((f) => f.checked).value,
      };
    };

    const addValidators = () => {
      initialPromptList.addEventListener("input", () => {
        try {
          JSON.parse(initialPromptList.value);
          initialPromptList.classList.remove("is-invalid");
        } catch (e) {
          initialPromptList.classList.add("is-invalid");
        }
      });
      temperatureInput.addEventListener("input", async (event) => {
        let value = event.target.value;
        value = value == "" ? 0 : parseFloat(value);
        if (value >= 0 && value <= 2.0) {
          temperatureInput.classList.remove("is-invalid");
        } else {
          temperatureInput.classList.add("is-invalid");
        }
      });

      topKInput.addEventListener("input", async (event) => {
        if (topKInput.validity.valid) {
          topKInput.classList.remove("is-invalid");
        } else {
          topKInput.classList.add("is-invalid");
        }
      });
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

    const showPromptAppendValidationAlert = async (text) => {
      qs("div", promptAppendValidationAlert).innerHTML = text;
      promptAppendValidationAlert.classList.remove("d-none");
      promptAppendValidationAlert.classList.add("d-block");

      setTimeout(() => {
        promptAppendValidationAlert.classList.remove("d-block");
        promptAppendValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hidePromptAppendValidationAlert = async () => {
      promptAppendValidationAlert.classList.remove("d-block");
      promptAppendValidationAlert.classList.add("d-none");
    };

    const showPromptInputValidationAlert = async (text) => {
      qs("div", promptInputValidationAlert).innerHTML = text;
      promptInputValidationAlert.classList.remove("d-none");
      promptInputValidationAlert.classList.add("d-block");

      setTimeout(() => {
        promptInputValidationAlert.classList.remove("d-block");
        promptInputValidationAlert.classList.add("d-none");
      }, 2000);
    };

    const hidePromptInputValidationAlert = async () => {
      promptInputValidationAlert.classList.remove("d-block");
      promptInputValidationAlert.classList.add("d-none");
    };

    const checkAvailability = async () => {
      const state = getState();
      hideSessionValidationAlert();
      if (state.expectedInputLanguages.length == 0) {
        showSessionValidationAlert(
          "Select at least one expected input language"
        );
        return "unavailable";
      }
      if (state.expectedOutputLanguages.length == 0) {
        showSessionValidationAlert(
          "Select at least one expected output language"
        );
        return "unavailable";
      }
      if (state.expectedInputModes.length == 0) {
        showSessionValidationAlert("Select at least one expected input mode");
        return "unavailable";
      }
      return await LanguageModel.availability({
        temperature: state.temperature,
        topK: state.topK,
        initialPrompts: state.initialPrompts,
        expectedInputs: state.expectedInputs,
        expectedOutputs: state.expectedOutputs,
      });
    };

    const downloadLMForNewSession = async () => {
      const state = getState();
      promptSettingsAccordionCollapse.hide();
      promptAppendAccordionCollapse.hide();
      // promptInputAccordionCollapse.show();
      console.log(state);
      promptDownloadProgressBars.forEach((bar) => {
        bar.classList.remove("d-none");
        bar.classList.add("d-block");
      });
      promptChat.clear();
      return await LanguageModel.create({
        temperature: state.temperature,
        topK: state.topK,
        initialPrompts: [
          { role: "system", content: state.initialSystemPrompt },
          ...state.initialPrompts,
        ],
        expectedInputs: state.expectedInputs,
        expectedOutputs: state.expectedOutputs,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            promptDownloadProgressBars.forEach((bar) => {
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

    const showDownloadAlert = async () => {
      promptDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-none");
        alert.classList.add("d-block");
      });
    };

    const hideDownloadAlert = async () => {
      promptDownloadAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    const hideUnavailableAlert = async () => {
      unavailableAlerts.forEach((alert) => {
        alert.classList.remove("d-block");
        alert.classList.add("d-none");
      });
    };

    const showCreateSessionAlert = async () => {
      createSessionAlerts.forEach((csa) => {
        csa.classList.add("d-block");
        csa.classList.remove("d-none");
        setTimeout(() => {
          csa.classList.remove("d-block");
          csa.classList.add("d-none");
        }, 2000);
      });
    };

    let languageModel = null;
    const handleNewSessionButtonClick = async () => {
      const availability = await checkAvailability();
      if (availability === "available") {
        languageModel = await downloadLMForNewSession();
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
      promptLoader.classList.remove("d-none");
      promptLoader.classList.add("d-block");
    };

    const hideUILoader = async () => {
      promptLoader.classList.add("d-none");
      promptLoader.classList.remove("d-block");
    };

    const showAppendUILoader = async () => {
      appendUiLoader.classList.add("d-block");
      appendUiLoader.classList.remove("d-none");
    };

    const hideAppendUILoader = async () => {
      appendUiLoader.classList.remove("d-block");
      appendUiLoader.classList.add("d-none");
    };

    const prompt = async (languageModel) => {
      const state = getState();
      // hidePromptInputValidationAlert();
      // if (
      //   state.text.trim() != "" &&
      //   !state.expectedInputLanguages.includes(state.textLanguage)
      // ) {
      //   await showPromptInputValidationAlert("Unexpected language");
      //   return;
      // }
      showUILoader();
      console.log(state);
      if (state.promptInputOption == "schema") {
        const schema = JSON.parse(state.schema);
        promptChat.setAttribute("new-user-message", state.text);
        promptChat.setAttribute(
          "new-assistant-chunk",
          await languageModel.prompt(state.text, {
            responseConstraint: schema,
          })
        );
      } else if (state.promptInputOption == "prefix") {
        promptChat.setAttribute("new-user-message", state.text);
        promptChat.setAttribute(
          "new-assistant-chunk",
          await languageModel.prompt([
            { role: "user", content: state.text },
            { role: "assistant", content: state.suffix, prefix: true },
          ])
        );
      } else {
        element.controller = new AbortController();
        qs("textarea", promptChat).value = "";
        promptChat.setAttribute("new-user-message", state.text);
        const promptStream = languageModel.promptStreaming(state.text, {
          signal: element.controller.signal,
        });
        console.log(state);
        for await (const chunk of promptStream) {
          promptChat.setAttribute("new-assistant-chunk", chunk);
        }
      }
      hideUILoader();
    };

    const promptAppend = async (languageModel) => {
      const state = getState();
      const content = [];
      hidePromptAppendValidationAlert();
      let newUserMessage = "";
      if (state.appendText.trim() != "") {
        if (!state.expectedInputLanguages.includes(state.appendLanguage)) {
          showPromptAppendValidationAlert("Unexpected language");
          return;
        }
        content.push({ type: "text", value: state.appendText });
        newUserMessage += state.appendText;
      }
      //showAppendUILoader();
      if (state.promptAppendTypeImage != undefined) {
        content.push({ type: "image", value: state.promptAppendTypeImage });
        newUserMessage += "\nImage[" + state.promptAppendTypeImage.name + "]";
      }
      if (state.promptAppendTypeAudio != undefined) {
        content.push({ type: "audio", value: state.promptAppendTypeAudio });
        newUserMessage += "\nAudio[" + state.promptAppendTypeAudio.name + "]";
      }
      console.log(content);
      promptAppendAccordionCollapse.hide();
      showUILoader();
      promptChat.setAttribute("new-user-message", newUserMessage);
      element.controller = new AbortController();
      if (content.length != 0) {
        await languageModel.append([{ role: "user", content: content }], {
          signal: element.controller.signal,
        });
      }
      console.log(state);
      hideUILoader();
      //hideAppendUILoader();
    };

    const handlePromptInputButtonClick = () => {
      if (languageModel == null) {
        showCreateSessionAlert();
        return;
      }
      prompt(languageModel);
    };

    const handlePromptAppendButtonClick = () => {
      if (languageModel == null) {
        showCreateSessionAlert();
        return;
      }
      promptAppend(languageModel);
    };

    const handlePromptDownloadConfirmation = async () => {
      hideDownloadAlert();
      await downloadLMForNewSession();
    };
    const handlePromptDownloadCancellation = async () => {
      await hideDownloadAlert();
    };

    const handleInitialPromptListAddButtonClick = async () => {
      const state = getState();
      const role = state.promptInitialPromptRole;
      const content = state.promptInitialPromptContent;
      let initialPrompts = state.initialPrompts;
      const prompt = {
        role,
        content,
      };
      initialPrompts.push(prompt);
      initialPromptList.value = JSON.stringify(initialPrompts, null, 2);
    };

    onClick(initialPromptListAddButton, handleInitialPromptListAddButtonClick);
    onClick(newSessionButton, handleNewSessionButtonClick);
    onClick(appendButton, handlePromptAppendButtonClick);
    delegate(promptChat, "textarea", "keydown", (event) => {
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        const value = event.target.value;

        // Insert a newline character at the current cursor position
        event.target.value =
          value.substring(0, start) + "\n" + value.substring(end);

        // Move the cursor after the newly inserted newline
        event.target.selectionStart = event.target.selectionEnd = start + 1;
      } else if (event.key === "Enter") {
        event.preventDefault();
        handlePromptInputButtonClick();
      }
    });
    onClick(promptStopButton, () => {
      element.controller.abort();
      hideUILoader();
    });
    delegate(
      element,
      ".prompt-download-confirmation",
      "click",
      handlePromptDownloadConfirmation
    );
    delegate(
      element,
      ".prompt-download-cancellation",
      "click",
      handlePromptDownloadCancellation
    );
    addValidators();
  }
}
customElements.define("prompt-tab", PromptTab);
