
// utils/helpers.js

export function getURLParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function crearElemento(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}
