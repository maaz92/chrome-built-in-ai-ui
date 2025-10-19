class PromptLoader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="pt-2 text-center"><button id="prompt-stop-button" class="btn btn-danger">Stop</button></div>
    <ui-loader  class="output-ui-loader">  </ui-loader>
    `;
  }
}
customElements.define("prompt-loader", PromptLoader);
