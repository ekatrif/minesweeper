import * as showMines from './show-mines';
import { minefield } from './start-game';
import * as playSound from './play-sound';
import * as colorNumber from './color-number';

// Get Adjacent cells
const getAdjacentCells = (matrix, row, col) => {
  const adjacents = [];

  for (let i = row - 1; i <= row + 1; i += 1) {
    for (let j = col - 1; j <= col + 1; j += 1) {
      if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length && !(i === row && j === col) && matrix[i][j] !== 'mine') {
        adjacents.push({ row: i, col: j });
      }
    }
  }

  return adjacents;
};

// Mark cells to open in visited array
const revealAdjacentCells = (matrix, row, col, visited) => {
  visited[row][col] = true;

  const adjacents = getAdjacentCells(matrix, row, col);
  adjacents.forEach(({ row: adjRow, col: adjCol }) => {
    if (!visited[adjRow][adjCol]) {
      if (matrix[adjRow][adjCol] === '') {
        revealAdjacentCells(matrix, adjRow, adjCol, visited);
      } else {
        visited[adjRow][adjCol] = true;
      }
    }
  });
};

const openAdjacentCells = (cellId) => {
  const isEmpty = (cellId) => {
    const cell = document.getElementById(cellId);
    return cell.innerHTML === '' && !cell.classList.contains('field__cell-bomb');
  };
  const isMine = (cellId) => {
    const cell = document.getElementById(cellId);
    return cell.classList.contains('field__cell-bomb');
  };

  // Click on the cell with mine
  if (isMine(cellId)) {
    const cell = document.getElementById(cellId);

    // Smile changes
    const smile = document.querySelector('.header__reload');
    smile.classList.add('header__reload-loose');

    // Current cell is red
    cell.classList.add('field__cell-red-bomb');

    // Block clicks on cells in hightlight-cell.js
    // Stop timer in show-timer.js
    // Freeze clicks counter in show-clicks.js

    // Open all the cells with mines
    showMines.default();

    // Add crossed bomb to all wrong flagged cells
    const cells = document.querySelectorAll('.field__cell');
    cells.forEach((cell) => {
      if (cell.classList.contains('field__cell-flag') && !cell.classList.contains('field__cell-bomb')) {
        cell.classList.add('field__cell-crossed-bomb');
      }
    })

    // Print the message
    const messageContainer = document.querySelector('.message');
    messageContainer.innerHTML = '<p>Game over. Try again</p>';
    playSound.default('loose');
  }

  if (isEmpty(cellId)) {
    const openEmptyCell = (currentCellId) => {
      // Get row and column indexes
      const row = +currentCellId.slice(0, 3);
      const col = +currentCellId.slice(3, 6);

      // Empty array of visited cells
      const visited = Array(minefield.length).fill(false).map(() => Array(minefield[0].length)
        .fill(false));
      revealAdjacentCells(minefield, row, col, visited);

      // Highlight visited items
      for (let i = 0; i < visited[0].length; i += 1) {
        for (let j = 0; j < visited.length; j += 1) {
          if (visited[i][j]) {
            const colToHighlight = i < 10 ? `00${i}` : `0${i}`;
            const rowToHighlight = j < 10 ? `00${j}` : `0${j}`;
            const id = colToHighlight + rowToHighlight;
            const content = minefield[i][j];

            const cellToHighlight = document.getElementById(id);
            // Open the cell if it is not flagged
            if (!cellToHighlight.classList.contains('field__cell-flag')) {
              cellToHighlight.classList.add('field__cell-pressed');
              cellToHighlight.textContent = content;
              colorNumber.default(cellToHighlight.id);
            }
          }
        }
      }
    };
    openEmptyCell(cellId);
  }
};

export default openAdjacentCells;
