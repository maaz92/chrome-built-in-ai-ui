function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function on(element, event, handler, options = {}) {
  element.addEventListener(event, handler, options);
}

function onClick(element, handler, options = {}) {
  return on(element, "click", handler, options);
}

function em(event, element = document) {
  element.dispatchEvent(new CustomEvent(event));
}

function delegate(parent, selector, event, handler, options = {}) {
  parent.addEventListener(
    event,
    function (e) {
      if (e.target.matches(selector)) {
        handler.call(e.target, e);
      }
    },
    options
  );
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export {
  em,
  qs,
  qsa,
  createElementFromHTML,
  on,
  onClick,
  delegate,
  handleEvent,
};
