class DownloadModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="pt-2"><div class="alert alert-primary" role="alert">
  ${this.getAttribute("body") || "Please place your text here"}
  <div class="pt-2 text-center row"><div class="col"></div><button type="button" class="col btn btn-secondary cancellation">No</button><div class="col"></div><button type="button" class="col btn btn-primary confirmation">Yes</button><div class="col"></div></div>
</div></div>`;
    this.addEventHandlers(this);
  }

  addEventHandlers(element) {
    element
      .querySelector(".cancellation")
      .addEventListener("click", async function () {
        element.classList.remove("d-block");
        element.classList.add("d-none");
      });
  }
}

customElements.define("download-modal", DownloadModal);
