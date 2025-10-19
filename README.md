# Chrome Built-in AI UI

This Chrome Sidepanel Extension provides a UI for the 7 Chrome Built-in AI APIs.

- Writer API
- Rewriter API
- Proofreader API
- Prompt API
- Translator API
- Language Detector API
- Summarizer API

To learn more about the APIs head over to the [docs on developer.chrome.com](https://developer.chrome.com/docs/ai/built-in-apis).

## Running this extension

1. Clone this repository.
2. Use node version 20 and above.
3. Run `npm install` in this folder to install all dependencies.
4. Run `npm run build` to build the extension.
5. Load the newly created `dist` directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).
6. Click the extension icon to open the side panel and see the welcome page.
7. Switch to any other tab to see the main page.
