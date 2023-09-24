import * as renderElement from './render-html/render-element';

const getList = (wrapper, sortedObject, level, top) => {
  if (Object.keys(sortedObject).length) {
    const h3 = renderElement.default('h3', 'results__title');
    h3.textContent = level.toUpperCase();
    wrapper.appendChild(h3);

    const ol = renderElement.default('ol', 'results__list');
    wrapper.appendChild(ol);
    for (let i = 0; i < top; i += 1) {
      // If the key exists
      if (Object.keys(sortedObject)[i]) {
        const li = renderElement.default('li', 'results__item');
        li.textContent = `${Object.keys(sortedObject)[i]} - ${Object.values(sortedObject)[i]}`;
        ol.appendChild(li);
      }
    }
  }
};

const closeModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.remove();
};

const getTop = () => {
  const container = document.querySelector('.container');

  const overlay = renderElement.default('div', 'overlay');
  container.appendChild(overlay);

  const modal = renderElement.default('div', 'modal');
  overlay.appendChild(modal);

  // Get settings from localStorage
  const config = JSON.parse(localStorage.getItem('config'));

  const resultsEasy = config.easy.score;
  const resultsMedium = config.medium.score;
  const resultsHard = config.hard.score;

  const sortedEasy = Object.fromEntries(
    Object.entries(resultsEasy)
      .sort(([, a], [, b]) => a - b),
  );

  const sortedMedium = Object.fromEntries(
    Object.entries(resultsMedium)
      .sort(([, a], [, b]) => a - b),
  );

  const sortedHard = Object.fromEntries(
    Object.entries(resultsHard)
      .sort(([, a], [, b]) => a - b),
  );

  const content = '<div class = \'wrapper\'><div class=\'modal__title\'><h2>TOP-10</h2><span class=\'modal__close\'>x</span></div><div class=\'results__content\'><div class="results"><div class="results__easy"></div><div class="results__medium"></div><div class="results__hard"></div></div></div>';

  modal.innerHTML = content;

  // Render TOP-10
  const resultsEasyWrapper = document.querySelector('.results__easy');
  getList(resultsEasyWrapper, sortedEasy, 'easy', 10);

  const resultsMediumWrapper = document.querySelector('.results__medium');
  getList(resultsMediumWrapper, sortedMedium, 'medium', 10);

  const resultsHardWrapper = document.querySelector('.results__hard');
  getList(resultsHardWrapper, sortedHard, 'hard', 10);

  const closeBtn = document.querySelector('.modal__close');
  closeBtn.addEventListener('click', closeModal);
};

const runTop = () => {
  const topLink = document.getElementById('Top-10');
  topLink.addEventListener('click', getTop);
};

export default runTop;
