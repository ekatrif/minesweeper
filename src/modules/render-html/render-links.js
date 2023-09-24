import * as renderElement from './render-element';

function renderLinks(linkName) {
  const li = renderElement.default('li', 'links__item');
  const link = renderElement.default('a', 'links__link');
  link.id = linkName;
  link.innerText = linkName;
  link.href = '#';
  li.appendChild(link);
  return li;
}

export default renderLinks;
