import { qs, qsa, onClick, delegate } from "../common/utils.js";

class ChatBox extends HTMLElement {
  static get observedAttributes() {
    return ["new-assistant-chunk", "new-user-message"];
  }
  connectedCallback() {
    this.textarea_id = Math.random().toString(36).slice(2);
    this.innerHTML = `<div class="pt-2"><div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    Chat
    <button class="btn btn-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg></button>
  </div>
  <div class="card-body" >
    <div class="pb-3">
    <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="prompt-chat-box-option" id="prompt-chat-box-option-prefix" value="prefix">
  <label class="form-check-label fs-8" for="prompt-chat-box-option-prefix">Prefill</label>
</div>
    <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="prompt-chat-box-option" id="prompt-chat-box-option-schema" value="schema">
  <label class="form-check-label fs-8" for="prompt-chat-box-option-schema">Schema Constraint</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="prompt-chat-box-option" id="prompt-chat-box-option-none" value="none" checked>
  <label class="form-check-label fs-8" for="prompt-chat-box-option-none">None</label>
</div>
<div class="form-floating prompt-chat-box-suffix-div collapse">
<div class="pt-2"></div>
  <textarea class="form-control prompt-chat-box-suffix-input" placeholder="Suffix"></textarea>
  <label for="">Suffix</label>
</div>
<div class="form-floating prompt-chat-box-schema-div collapse">
<div class="pt-2"></div>
  <textarea class="form-control prompt-chat-box-schema-input" placeholder="Schema"></textarea>
  <label for="">Schema</label>
  <div class="invalid-feedback">
    Please enter a valid JSON schema.
  </div>
</div>

  <div class="form-floating">
  <div class="pt-3"></div>
                  <textarea class="form-control prompt-chat-box-input" id="${
                    this.textarea_id
                  }" placeholder="Ask"></textarea>
                  <label for="${this.textarea_id}">Ask</label>
              </div>
              </div>
  <div class="d-flex flex-column prompt-chats" style="height: ${
    this.getAttribute("height") ?? "415px"
  }; overflow-y: scroll;">
  </div>
              </div>
              </div>
  </div></div>`;
    this.addValidators(this);
    this.addEventHandlers(this);
  }

  addValidators(element) {
    const schemaInput = qs("textarea.prompt-chat-box-schema-input", element);
    schemaInput.addEventListener("input", () => {
      try {
        JSON.parse(schemaInput.value);
        schemaInput.classList.remove("is-invalid");
      } catch (e) {
        schemaInput.classList.add("is-invalid");
      }
    });
  }

  addEventHandlers(element) {
    const turndownService = new TurndownService();
    const promptChatBoxOptions = qsa(
      "input[name='prompt-chat-box-option']",
      element
    );
    qs("div > div.card > div.card-header > button", element).addEventListener(
      "click",
      async function () {
        let conversation = "";
        const promptChats = qs("div.prompt-chats", element);
        qsa("div", promptChats).forEach((div) => {
          if (div.classList.contains("user-message")) {
            conversation += "User:\n" + div.textContent + "\n";
          } else {
            turndownService.turndown(div.innerHTML);
            conversation +=
              "Assistant:\n" + turndownService.turndown(div.innerHTML) + "\n";
          }
        });
        navigator.clipboard.writeText(conversation);
      }
    );

    promptChatBoxOptions.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        const suffixDiv = qs(".prompt-chat-box-suffix-div", element);
        const schemaDiv = qs(".prompt-chat-box-schema-div", element);
        const suffixDivCollapse = new bootstrap.Collapse(suffixDiv, {
          toggle: false,
        });
        const schemaDivCollapse = new bootstrap.Collapse(schemaDiv, {
          toggle: false,
        });
        if (selectedValue == "schema") {
          suffixDivCollapse.hide();
          schemaDivCollapse.show();
        } else if (selectedValue == "prefix") {
          suffixDivCollapse.show();
          schemaDivCollapse.hide();
        } else {
          suffixDivCollapse.hide();
          schemaDivCollapse.hide();
        }
      });
    });
  }

  clear() {
    const promptChats = qs("div.prompt-chats", this);
    promptChats.innerHTML = "";
    this.assistantMessageMarkdown = null;
    this.existingAssistantMessage = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const promptChats = qs(".prompt-chats", this);
    const createUserMessage = (textContent) => {
      const userMessageDiv = document.createElement("div");
      userMessageDiv.classList.add("text-end");
      userMessageDiv.classList.add("text-secondary");
      userMessageDiv.classList.add("user-message");
      userMessageDiv.classList.add("py-2");
      userMessageDiv.textContent = textContent;
      promptChats.append(userMessageDiv);
    };

    const createAssistantMessage = () => {
      const assistantMessageDiv = document.createElement("div");
      assistantMessageDiv.classList.add("py-2");
      assistantMessageDiv.classList.add("assistant-message");
      assistantMessageDiv.style.minHeight = "350px";
      promptChats.append(assistantMessageDiv);
      this.assistantMessageMarkdown = "";
      return promptChats.lastElementChild;
    };
    if (name == "new-assistant-chunk") {
      this.existingAssistantMessage =
        this.existingAssistantMessage ?? createAssistantMessage();
      this.assistantMessageMarkdown += newValue;
      this.existingAssistantMessage.innerHTML = marked.parse(
        this.assistantMessageMarkdown
      );
      //promptChats.scroll(0, promptChats.scrollHeight);
      //append chunk to last assistant message
    } else if (name == "new-user-message") {
      //append new user message
      createUserMessage(newValue);
      if (this.existingAssistantMessage) {
        this.existingAssistantMessage.style.minHeight = "";
      }
      this.existingAssistantMessage = createAssistantMessage();
      promptChats.scroll(0, promptChats.scrollHeight);
    }
  }
}

customElements.define("chat-box", ChatBox);
