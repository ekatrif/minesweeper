import * as generateMinesweeper from './generate-field';
import * as playSound from './play-sound';
import * as colorNumber from './color-number';
import * as openAdjacentCells from './open-adjacent-cells';
import * as restoreCellsState from './restore-cells-state';

let minefield = [];

const generateMinefield = (e) => {
  if (e.target.classList.contains('field__cell')) {
    // Generate minefield after first click
    const clicks = +document.querySelector('.header__clicks').innerHTML;

    // Render minefield after first click
    if (clicks === 1) {
      const config = JSON.parse(localStorage.getItem('config'));
      const level = config.difficulty;

      minefield = generateMinesweeper.default(config[level].width, config[level].height, config[level].mines, e.target.id);

      // Insert content to cell
      const row = +e.target.id.slice(0, 3);
      const col = +e.target.id.slice(3, 6);
      e.target.classList.add('field__cell-pressed');
      e.target.textContent = minefield[row][col];

      openAdjacentCells.default(e.target.id);

      colorNumber.default(e.target.id);
      playSound.default('open');
    }
    // Remove listener to clicks on cells
    const field = document.querySelector('.field');
    field.removeEventListener('click', generateMinefield);
  }
};

const startGame = () => {
  const saveExists = localStorage.getItem('save');
  const save = JSON.parse(localStorage.getItem('save'));

  if (saveExists) {
    minefield = save.minefield;
    restoreCellsState.default(minefield);
  } else {
    // Add listener to clicks on cells
    const field = document.querySelector('.field');
    field.addEventListener('click', generateMinefield);
  }
};

export { minefield, startGame };
