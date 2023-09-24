import * as colorNumber from './color-number';

const makeDark = () => {
  document.body.classList.add('body-dark');

  const game = document.querySelector('.game');
  game.classList.add('game-dark');

  const gameHeader = document.querySelector('.game__header');
  gameHeader.classList.add('game__header-dark');

  const gameField = document.querySelector('.game__field');
  gameField.classList.add('game__field-dark');

  const headerReload = document.querySelector('.header__reload');
  headerReload.classList.add('header__reload-dark');

  const agenda = document.querySelector('.agenda');
  agenda.classList.add('agenda-dark');

  const fieldCell = document.querySelectorAll('.field__cell');
  fieldCell.forEach((cell) => {
    cell.classList.add('field__cell-dark');
  });

  const linksLink = document.querySelectorAll('.links__link');
  linksLink.forEach((link) => {
    link.classList.add('links__link-dark');
  });

  // Change color of numbers
  const pressedCells = document.querySelectorAll('.field__cell-pressed');
  pressedCells.forEach((cell) => colorNumber.default(cell.id));

  // Change volume button
  const volume = document.querySelector('.volume');
  volume.classList.add('volume-dark');
};

const makeLight = () => {
  document.body.classList.remove('body-dark');

  const game = document.querySelector('.game');
  game.classList.remove('game-dark');

  const gameHeader = document.querySelector('.game__header');
  gameHeader.classList.remove('game__header-dark');

  const gameField = document.querySelector('.game__field');
  gameField.classList.remove('game__field-dark');

  const headerReload = document.querySelector('.header__reload');
  headerReload.classList.remove('header__reload-dark');

  const agenda = document.querySelector('.agenda');
  agenda.classList.remove('agenda-dark');

  const fieldCell = document.querySelectorAll('.field__cell');
  fieldCell.forEach((cell) => {
    cell.classList.remove('field__cell-dark');
  });

  const linksLink = document.querySelectorAll('.links__link');
  linksLink.forEach((link) => {
    link.classList.remove('links__link-dark');
  });

  // Change color of numbers
  const pressedCells = document.querySelectorAll('.field__cell-pressed');
  pressedCells.forEach((cell) => colorNumber.default(cell.id));

  // Change volume button
  const volume = document.querySelector('.volume');
  volume.classList.remove('volume-dark');
};

const addTheme = () => {
  const config = JSON.parse(localStorage.getItem('config'));
  let currentTheme = config.theme;
  if (currentTheme === 'light') {
    currentTheme = 'dark';
    config.theme = currentTheme;
    localStorage.setItem('config', JSON.stringify(config));
    makeDark();
  } else {
    currentTheme = 'light';
    config.theme = currentTheme;
    localStorage.setItem('config', JSON.stringify(config));
    makeLight();
  }
};

const changeTheme = () => {
  const config = JSON.parse(localStorage.getItem('config'));
  const currentTheme = config.theme;
  if (currentTheme === 'dark') {
    makeDark();
  }
  const link = document.getElementById('Toggle theme');
  link.addEventListener('click', addTheme);
};

export default changeTheme;
