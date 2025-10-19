document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#docs-button").addEventListener("click", () => {
    chrome.tabs.create({
      url: "https://developer.chrome.com/docs/ai/built-in-apis#api_status",
    });
  });
});
