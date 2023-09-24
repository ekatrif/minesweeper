import { minefield } from './start-game';

const saveState = (e) => {
  if (e.target.classList.contains('links__link-disable')) {
    e.preventDefault();
  } else {
    // Take number of clicks
    const clicks = +document.querySelector('.header__clicks').innerText;

    // Take time
    const seconds = +document.querySelector('.header__timer').innerText;

    // Take current state of minefield
    const mineArray = minefield;

    // Take pressed cells ids
    const openedIds = [];
    const openedCells = document.querySelectorAll('.field__cell-pressed');
    openedCells.forEach((cell) => openedIds.push(cell.id));

    // Take flagged cells ids
    const flaggedIds = [];
    const flaggedCells = document.querySelectorAll('.field__cell-flag');
    flaggedCells.forEach((cell) => flaggedIds.push(cell.id));

    // Save all to localStorage
    const params = {
      clicksNum: clicks,
      time: seconds,
      pressedCells: openedIds,
      cellsWithFlag: flaggedIds,
      minefield: mineArray,
    };
    localStorage.setItem('save', JSON.stringify(params));
  }
};

const saveGame = () => {
  const saveLink = document.getElementById('Save game');
  saveLink.addEventListener('click', saveState);
};
export default saveGame;
