import * as showContent from './show-content';
import * as playSound from './play-sound';
// import * as startGame from './start-game';

let isMiddleButtonPressed = false;

// Count all flags on the field
const countAllFlags = () => {
  const flaggedCells = document.querySelectorAll('.field__cell-flag');
  const flags = flaggedCells.length;
  return flags;
};

// Set ids to cells
const setIds = () => {
  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  const level = config.difficulty;
  const numColumns = config[level].width;
  const numRows = config[level].height;

  const cells = document.querySelectorAll('.field__cell');
  for (let k = 0; k < cells.length;) {
    for (let i = 0; i < numColumns; i += 1) {
      for (let j = 0; j < numRows; j += 1) {
        const col = i < 10 ? `00${i}` : `0${i}`;
        const row = j < 10 ? `00${j}` : `0${j}`;
        cells[k].id = col + row;
        k += 1;
      }
    }
  }
};

// For moving mouse
const overCell = (e) => {
  // Remove pressed class for cells
  const cells = document.querySelectorAll('.field__cell ');
  cells.forEach((cell) => {
    // If there is no text in cell remove pressed class
    if (!cell.textContent) {
      cell.classList.remove('field__cell-pressed');
    }
  });

  // Add pressed class to cell under the mouse
  if (e.target.classList.contains('field__cell')) {
    e.target.classList.add('field__cell-pressed');
  }
};

const bothClicksDown = (e) => {
  isMiddleButtonPressed = true;
  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  const level = config.difficulty;
  const row = +e.target.id.slice(0, 3);
  const col = +e.target.id.slice(3, 6);

  // Highlight cells around pressed cell
  for (let i = row - 1; i <= row + 1; i += 1) {
    for (let j = col - 1; j <= col + 1; j += 1) {
      if (i >= 0 && i < config[level].height && j >= 0 && j < config[level].width) {
        const colCurrent = i < 10 ? `00${i}` : `0${i}`;
        const rowCurrent = j < 10 ? `00${j}` : `0${j}`;
        const idCurrent = colCurrent + rowCurrent;
        const cellCurrent = document.getElementById(idCurrent);

        // Don`t highlight cells with flag
        if (!cellCurrent.classList.contains('field__cell-flag')) {
          if (cellCurrent.classList.contains('field__cell-pressed')) {
            // Mark cell which were pressed before
            cellCurrent.classList.add('pressed');
          }
          cellCurrent.classList.add('field__cell-pressed');
        }
      }
    }
  }
};

const bothClicksUp = (e) => {
  isMiddleButtonPressed = false;
  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  const level = config.difficulty;
  const row = +e.target.id.slice(0, 3);
  const col = +e.target.id.slice(3, 6);

  // Number in the cell
  const number = +document.getElementById(e.target.id).innerHTML;

  // Count flags arouond the cell
  const countFlags = () => {
    let flags = 0;
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (i >= 0 && i < config[level].height && j >= 0 && j < config[level].width) {
          const colCurrent = i < 10 ? `00${i}` : `0${i}`;
          const rowCurrent = j < 10 ? `00${j}` : `0${j}`;
          const idCurrent = colCurrent + rowCurrent;
          const cellCurrent = document.getElementById(idCurrent);
          if (cellCurrent.classList.contains('field__cell-flag')) {
            flags += 1;
          }
        }
      }
    }
    return flags;
  };

  const flags = countFlags();

  // If number of cells with flag = number in the cell, open all cells around
  if (flags === number) {
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (i >= 0 && i < config[level].height && j >= 0 && j < config[level].width) {
          const colCurrent = i < 10 ? `00${i}` : `0${i}`;
          const rowCurrent = j < 10 ? `00${j}` : `0${j}`;
          const idCurrent = colCurrent + rowCurrent;
          const cellCurrent = document.getElementById(idCurrent);
          if (!cellCurrent.classList.contains('field__cell-flag')) {
            cellCurrent.classList = 'field__cell';
            cellCurrent.classList.add('field__cell-pressed');
          }
          showContent.default(cellCurrent.id);
        }
      }
    }
  } else {
    // Highlight cells around pressed cell
    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = col - 1; j <= col + 1; j += 1) {
        if (i >= 0 && i < config[level].height && j >= 0 && j < config[level].width) {
          const colCurrent = i < 10 ? `00${i}` : `0${i}`;
          const rowCurrent = j < 10 ? `00${j}` : `0${j}`;
          const idCurrent = colCurrent + rowCurrent;
          const cellCurrent = document.getElementById(idCurrent);
          if (!cellCurrent.classList.contains('field__cell-flag') && !cellCurrent.classList.contains('pressed')) {
            cellCurrent.classList.remove('field__cell-pressed');
            cellCurrent.textContent = '';
          } else if (cellCurrent.classList.contains('pressed')) {
            cellCurrent.classList.remove('pressed');
          }
        }
        const cellCenter = document.getElementById(e.target.id);
        cellCenter.classList.add('field__cell-pressed');
        showContent.default(cellCenter.id);
      }
    }
  }
};

// Highlight cell
const downCell = (e) => {
  // Open the cell if it is not flagged and if left button is pressed
  if (e.target.classList.contains('field__cell') && !e.target.classList.contains('field__cell-flag') && !e.target.classList.contains('field__cell-pressed') && e.buttons === 1) {
    // If mouse is pressed on the cell
    e.target.classList.add('field__cell-pressed');

    // Change Smile
    const smile = document.querySelector('.header__reload');
    smile.classList.add('header__reload-cell-pressed');

    // Add listener for moving mouse
    const field = document.querySelector('.field');
    field.addEventListener('mouseover', overCell);
  } else if (e.buttons === 4) {
    bothClicksDown(e);
  }
};

const upCell = (e) => {
  // Open the cell if it is not flagged and not pressed
  if (!e.target.classList.contains('field__cell-flag')) {
    if (isMiddleButtonPressed) {
      bothClicksUp(e);
    }
    // Left button
    if (e.button === 0) {
      // Remove listener for moving mouse
      const field = document.querySelector('.field');
      field.removeEventListener('mouseover', overCell);

      // Show cell`s content when minefield is generated
      const clicks = +document.querySelector('.header__clicks').innerHTML;
      if (clicks > 1) {
        const currentCellId = e.target.id;
        showContent.default(currentCellId);
      }

      // Change Smile
      const smile = document.querySelector('.header__reload');
      smile.classList.remove('header__reload-cell-pressed');
    }
  }

  // Right button
  // Add/remove flag by right mouse button
  if (e.button === 2 && e.target.classList.contains('field__cell') && !e.target.classList.contains('field__cell-pressed')) {
    e.target.classList.toggle('field__cell-flag');
    playSound.default('flag');
    
    // Show number of flags
    const flags = countAllFlags();
    const flagsContainer = document.querySelector('.agenda__flags');
    flagsContainer.innerText = `- ${flags}`;

    // Show remaining number of mines
    const config = JSON.parse(localStorage.getItem('config'));
    const level = config.difficulty;
    const mines = config[level].mines;

    const remainingMines = mines - flags;
    const minesContainer = document.querySelector('.agenda__mines');
    minesContainer.innerText = `- ${remainingMines}`;
  }
};

const highlightCell = () => {
  // Set ids to cells
  setIds();

  // Disable context menu
  const game = document.querySelector('.game');
  game.addEventListener('contextmenu', (e) => e.preventDefault());

  const field = document.querySelector('.field');

  // Add listeners to cells
  field.addEventListener('mousedown', downCell);
  field.addEventListener('mouseup', upCell);

  // Remove listeners if the game is over
  const smile = document.querySelector('.header__reload');
  // Create instance of MutationObserver
  const observerOver = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class' && (smile.classList.contains('header__reload-loose') || smile.classList.contains('header__reload-win'))) {
        // If class was changed to loose or win
        field.removeEventListener('mousedown', downCell);
        field.removeEventListener('mouseup', upCell);

        const linkSave = document.getElementById('Save game');
        linkSave.classList.add('links__link-disable');
      }
    });
  });

  // Looking for changing class of reload button
  observerOver.observe(smile, { attributes: true });
};

export default highlightCell;
