import { minefield } from './start-game';

const showMines = () => {
  // Find mines in array
  for (let i = 0; i < minefield.length; i += 1) {
    for (let j = 0; j < minefield[0].length; j += 1) {
      const content = minefield[i][j];
      if (content === 'mine') {
        // Find corresponding cell
        const row = i < 10 ? `00${i}` : `0${i}`;
        const col = j < 10 ? `00${j}` : `0${j}`;
        const id = row + col;
        const cell = document.getElementById(id);

        // Add mine to cell
        cell.classList.add('field__cell-pressed');
        cell.classList.add('field__cell-bomb');
      }
    }
  }
};

export default showMines;
