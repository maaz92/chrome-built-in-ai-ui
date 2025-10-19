class UnavailableAlert extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="pt-2"><div class="alert alert-danger" role="alert">
  ${this.getAttribute("text") || "Unavailable for the given configuration"}
</div></div>`;
  }
}
customElements.define("unavailable-alert", UnavailableAlert);
