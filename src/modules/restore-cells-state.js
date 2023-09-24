import * as showTimer from './show-timer';
import * as colorNumber from './color-number';

const restoreCellsState = (minefield) => {
  const save = JSON.parse(localStorage.getItem('save'));
  const { pressedCells } = save;
  const { cellsWithFlag } = save;

  // Restore flags
  if (cellsWithFlag.length) {
    cellsWithFlag.forEach((id) => {
      const cell = document.getElementById(id);
      cell.classList.add('field__cell-flag');
    });
  }

  // Restore opened cells
  if (pressedCells.length) {
    pressedCells.forEach((id) => {
      const cell = document.getElementById(id);
      cell.classList.add('field__cell-pressed');
      const row = +id.slice(0, 3);
      const col = +id.slice(3, 6);
      cell.innerText = minefield[row][col];
      colorNumber.default(id);
    });
  }
  // Start timer
  showTimer.default();
};

export default restoreCellsState;
