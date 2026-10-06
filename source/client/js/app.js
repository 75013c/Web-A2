const $ = (selector, root = document) => root.querySelector(selector);
const api = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
};
const escapeText = (value) => String(value ?? "");
const showState = (node, text) => {
  if (node) node.innerHTML = `<div class="state" role="status">${text}</div>`;
};
