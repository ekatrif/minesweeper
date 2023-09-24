import { minefield } from './start-game';
import * as openAdjacentCells from './open-adjacent-cells';
import * as playSound from './play-sound';
import * as colorNumber from './color-number';

const showContent = (id) => {
  const currentCell = document.getElementById(id);

  // Minefield has already been generated
  const row = +id.slice(0, 3);
  const col = +id.slice(3, 6);

  const content = minefield[row][col];
  if (content === 'mine' && !currentCell.classList.contains('field__cell-flag')) {
    currentCell.classList.add('field__cell-bomb');
    openAdjacentCells.default(currentCell.id);
    playSound.default('open');
  } else if (!currentCell.classList.contains('field__cell-flag')) {
    currentCell.textContent = content;
    openAdjacentCells.default(currentCell.id);
    playSound.default('open');
    colorNumber.default(currentCell.id);
  }
};

export default showContent;
