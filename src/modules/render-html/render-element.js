function renderElement(tag, ...classes) {
  const element = document.createElement(tag);
  if (classes.length) {
    classes.forEach((item) => element.classList.add(item));
  }
  return element;
}

export default renderElement;
