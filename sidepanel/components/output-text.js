class OutputText extends HTMLElement {
  static get observedAttributes() {
    return ["text"];
  }
  connectedCallback() {
    this.innerHTML = `<div class="pt-2"><div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    ${this.getAttribute("header")}
    <button class="btn btn-sm copy-button" data-bs-toggle="tooltip" data-bs-title="Copy text" data-bs-placement="top" data-bs-trigger="hover">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg></button>
  </div>
  <div class="card-body" style="height: ${this.getAttribute(
    "height"
  )}; overflow-y: scroll;">
  ${this.getAttribute("text") ?? ""}
  </div>
  </div></div>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div class="toast align-items-center text-bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      Text copied
    </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div></div>`;
    this.addEventListeners(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      const cardBody = this.querySelector("div.card-body");
      if (cardBody) {
        cardBody.innerHTML = marked.parse(newValue);
      }
    }
  }

  addEventListeners(element) {
    const toast = element.querySelector(".toast");
    const toastBootstrap = new bootstrap.Toast(toast);
    const turndownService = new TurndownService();
    element
      .querySelector(".copy-button")
      .addEventListener("click", async function () {
        toastBootstrap.show();
        navigator.clipboard.writeText(
          turndownService.turndown(
            element.querySelector("div.card-body")?.textContent
          )
        );
      });
  }
}

customElements.define("output-text", OutputText);
