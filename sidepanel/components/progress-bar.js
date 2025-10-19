class ProgressBar extends HTMLElement {
  static get observedAttributes() {
    return ["progress"];
  }

  connectedCallback() {
    this.innerHTML = `<div class="row"><div class="col-10 pt-3">
    <div class="progress">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${this.getAttribute(
    "progress"
  )}%" aria-valuenow="${this.getAttribute(
      "progress"
    )}" aria-valuemin="0" aria-valuemax="100"></div>
</div>${this.getAttribute("progress")}</div></div>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "progress") {
      const progressBar = this.querySelector(
        "div > div.progress > div.progress-bar"
      );
      if (progressBar) {
        progressBar.style.width = `${newValue}%`;
        progressBar.setAttribute("aria-valuenow", newValue);
        this.innerHTML = `<div class="pt-2">
        <div class="progress">
      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${newValue}%" aria-valuenow="${newValue}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>${newValue}%</div>`;
      }
    }
  }
}
customElements.define("progress-bar", ProgressBar);
