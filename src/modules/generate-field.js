// Find all cells adjacents with first cell
const generateMinefield = (rows, cols, mines, id) => {
  // This cell has to be empty
  const rowEmpty = +id.slice(0, 3);
  const colEmpty = +id.slice(3, 6);

  // Create empty array with falsy elements
  const minefield = Array(rows).fill(false).map(() => Array(cols).fill(false));

  // Fill array with mines
  let count = 0;
  while (count < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (row === rowEmpty && col === colEmpty) {
      // If this cell is the first clicked cell, do nothing
    } else if (!minefield[row][col]) {
      // If cell doesn`t contain a mine
      minefield[row][col] = true;
      count += 1;
    }
  }
  return minefield;
};

const countMines = (minefield, row, col) => {
  let count = 0;

  for (let i = row - 1; i <= row + 1; i += 1) {
    for (let j = col - 1; j <= col + 1; j += 1) {
      if (i >= 0 && i < minefield.length && j >= 0 && j < minefield[0].length && minefield[i][j]) {
        count += 1;
      }
    }
  }

  return count;
};

const generateMinesweeper = (rows, cols, mines, id) => {
  // Create array with true & false elements (true===mine, false===empty)
  const minefield = generateMinefield(rows, cols, mines, id);

  // Create empty array for the game
  const minesweeper = Array(rows).fill(false).map(() => Array(cols).fill(false));

  // Place mines or numbers
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (minefield[row][col]) {
        minesweeper[row][col] = 'mine';
      } else {
        const count = countMines(minefield, row, col);
        minesweeper[row][col] = count > 0 ? count : '';
      }
    }
  }

  return minesweeper;
};

export default generateMinesweeper;
