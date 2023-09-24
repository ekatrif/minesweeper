import * as renderElement from './render-html/render-element';
import * as initGame from './init-game';

const closeModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.remove();
};

const setLevelActive = (e) => {
  if (e.target.classList.contains('content__label')) {
    const levels = document.querySelectorAll('.content__label');
    levels.forEach((level) => {
      level.classList.remove('content__label-active');
    });
    e.target.classList.add('content__label-active');
  }
};

const newGame = () => {
  // Save new settings to localStorage

  // Save level
  const level = document.querySelector('.content__label-active').innerHTML.toLowerCase();
  const config = JSON.parse(localStorage.getItem('config'));
  config.difficulty = level;

  // Validate number of mines 
  const min = config.minNumMines;
  const max = config.maxNumMines;
  const minesNumber = +document.getElementById(`mines-${level}`).value;
  if (minesNumber >= min && minesNumber <= max) {
    // Save number of mines
    config[level].mines = minesNumber;
    localStorage.setItem('config', JSON.stringify(config));
    // Close Modal
    closeModal();

  initGame.default();
  } else {
    const error = document.querySelector('.modal__error');
    error.textContent = `The number of mines must be between ${min} and ${max} inclusive!`;
  }
};

const getModal = () => {
  const container = document.querySelector('.container');

  const overlay = renderElement.default('div', 'overlay');
  container.appendChild(overlay);

  const modal = renderElement.default('div', 'modal');
  overlay.appendChild(modal);

  // Get settings from localStorage
  const config = JSON.parse(localStorage.getItem('config'));

  const content = `<div class = 'wrapper'><div class='modal__title'><h2>Settings</h2><span class='modal__close'>x</span></div><div class='modal__content content'><div class='header__height'>Height</div><div class='header__width'>Width</div><div class='header__mines'>Mines</div><div class='content__label content__label-easy'>Easy</div><div class='content__label content__label-medium'>Medium</div><div class='content__label content__label-hard'>Hard</div>
  <div class='content__height-easy'>10</div><div class='content__height-medium'>15</div><div class='content__height-hard'>25</div><div class='content__width-easy'>10</div><div class='content__width-medium'>15</div><div class='content__width-hard'>25</div><div class='content__mines content__mines-easy'><input id="mines-easy" type="number" name="mines-easy" value="${config.easy.mines}" min="${config.minNumMines}" max="${config.maxNumMines}"/></div><div class='content__mines content__mines-medium'><input id="mines-medium" type="number" name="mines-medium" value="${config.medium.mines}" min="${config.minNumMines}" max="${config.maxNumMines}"/></div><div class='content__mines content__mines-hard'><input id="mines-hard" type="number" name="mines-hard" value="${config.hard.mines}" min="${config.minNumMines}" max="${config.maxNumMines}"/></div></div></div>`;

  modal.innerHTML = content;

  // Set active level
  const levels = document.querySelectorAll('.content__label');
  levels.forEach((lvl) => {
    if (lvl.innerHTML.toLowerCase() === config.difficulty) {
      lvl.classList.add('content__label-active');
    }
  });

  // Add button New fame
  const newGameBtn = renderElement.default('button', 'modal__btn');
  newGameBtn.textContent = 'New game';
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild(newGameBtn);

  // Add tag for error message
  const error = renderElement.default('div', 'modal__error');
  wrapper.appendChild(error);

  // Add listener to New game button
  newGameBtn.addEventListener('click', newGame);

  // Add listener to select level
  const wrapperElement = document.querySelector('.wrapper');
  wrapperElement.addEventListener('click', setLevelActive);

  const closeBtn = document.querySelector('.modal__close');
  closeBtn.addEventListener('click', closeModal);
};

const runModal = () => {
  const settings = document.getElementById('Game');
  settings.addEventListener('click', getModal);
};

export default runModal;
