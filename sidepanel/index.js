import "./common/languages.js";
import "./common/language_information.json";
import "./common/utils.js";
import "./components/select-language-dropdown.js";
import "./components/ui-loader.js";
import "./components/prompt-loader.js";
import "./components/unavailable-alert.js";
import "./components/progress-bar.js";
import "./components/writer-tab.js";
import "./components/proofreader-tab.js";
import "./components/rewriter-tab.js";
import "./components/summarizer-tab.js";
import "./components/prompt-tab.js";
import "./components/input-with-language-detector.js";
import "./components/chat-box.js";
import "./components/output-text.js";
import "./components/translator-tab.js";
import "./components/download-modal.js";
import { qs, qsa } from "./common/utils.js";

(() => {
  const appTablist = qs("#app-tablist");
  const $a = qs("a.nav-link.dropdown-toggle");
  qsa("a.dropdown-item", appTablist).forEach(async (a) => {
    a.addEventListener("click", async (event) => {
      $a.innerHTML = event.target.innerHTML;
    });
  });
  qs("a", appTablist).click();
  qs("#writer-tab").click();
  qsa(".chrome-docs-link").forEach((a) => {
    a.addEventListener("click", () => {
      chrome.tabs.create({
        url: a.getAttribute("chrome-docs-url"),
      });
    });
  });
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();
