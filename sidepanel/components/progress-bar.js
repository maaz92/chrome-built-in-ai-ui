class ProgressBar extends HTMLElement {
  static get observedAttributes() {
    return ["progress"];
  }

  connectedCallback() {
    //     this.innerHTML = `<div class="row"><div class="col-10 pt-3">
    //     <div class="progress">
    //   <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${this.getAttribute(
    //     "progress"
    //   )}%" aria-valuenow="${this.getAttribute(
    //       "progress"
    //     )}" aria-valuemin="0" aria-valuemax="100"></div>
    // </div></div>${this.getAttribute("progress")}</div>`;
    this.innerHTML = `<div class="pt-3"><div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${this.getAttribute(
      "progress"
    )}" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-success" style="width: ${this.getAttribute(
    "progress"
  )}%">${this.getAttribute("progress")}%</div>
</div></div>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "progress") {
      const progressBar = this.querySelector("div.progress-bar");
      const progress = this.querySelector("div.progress");
      if (progress && progressBar) {
        progressBar.style.width = `${newValue}%`;
        progressBar.innerHTML = `${newValue}%`;
        progress.setAttribute("aria-valuenow", newValue);
      }
    }
  }
}
customElements.define("progress-bar", ProgressBar);
