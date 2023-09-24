import * as initGame from './init-game';

const reloadGame = () => {
  const downButton = (e) => {
    // Left button
    if (e.button === 0) {
      e.target.classList.add('header__reload-pressed');
    }
  };

  const reload = (e) => {
    // Left button
    if (e.button === 0) {
      localStorage.removeItem('save');
      initGame.default();
    }
  };

  const button = document.querySelector('.header__reload');
  button.addEventListener('mousedown', downButton);
  button.addEventListener('mouseup', reload);
};

export default reloadGame;
