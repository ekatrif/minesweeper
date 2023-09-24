import { minefield } from './start-game';
import * as playSound from './play-sound';

const saveResult = (level, name, result) => {
  const config = JSON.parse(localStorage.getItem('config'));
  config[level].score[name] = +result;
  localStorage.setItem('config', JSON.stringify(config));

  // Remove Node with input
  const inputWrapper = document.querySelector('.input-wrapper');
  inputWrapper.remove();
};

const getControlNumber = () => {
  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  const level = config.difficulty;

  const controlNumber = config[level].width * config[level].height - config[level].mines;
  return controlNumber;
};

const clickHandler = (e) => {
  // Check theme
  const config = JSON.parse(localStorage.getItem('config'));
  const currentTheme = config.theme;

  if (e.target.classList.contains('field__cell')) {
    // Config from localStorage
    const level = config.difficulty;

    const controlNumber = getControlNumber();

    let numberPressedCells = 0;

    // First click, when minefield is not yet generated or there is only one empty cell
    if (!minefield.length
      || config[level].height * config[level].width - config[level].mines === 1) {
      numberPressedCells = 1;
    } else {
      // Other cases
      for (let i = 0; i < minefield.length; i += 1) {
        for (let j = 0; j < minefield[0].length; j += 1) {
          // Find corresponding cell
          const row = i < 10 ? `00${i}` : `0${i}`;
          const col = j < 10 ? `00${j}` : `0${j}`;
          const id = row + col;
          const cell = document.getElementById(id);

          if (minefield[i][j] !== 'mine' && cell.classList.contains('field__cell-pressed')) {
            numberPressedCells += 1;
          }
        }
      }
    }

    // You win if ...
    if (numberPressedCells === controlNumber) {
      // Smile changes
      const smile = document.querySelector('.header__reload');
      smile.classList.add('header__reload-win');

      // Block clicks on cells in hightlight-cell.js
      // Stop timer in show-timer.js
      // Freeze clicks counter in show-clicks.js

      const moves = document.querySelector('.header__clicks').innerHTML;
      const seconds = document.querySelector('.header__timer').innerHTML;

      // Print the message
      const messageContainer = document.querySelector('.message');
      if (currentTheme === 'dark') {
        messageContainer.classList.add('message-dark');
      }
      messageContainer.innerHTML = `<p>Hooray! You found all mines in ${seconds} seconds and ${moves} moves!</p><div class="input-wrapper"><span>Enter your name to save the result:&nbsp;</span><input id="user-name" type="text" name="user-name" value="" /><button class="save-result">Save</button></div>`;

      // Add listener to save button
      const saveBtn = document.querySelector('.save-result');
      saveBtn.addEventListener('click', () => {
        const userName = document.getElementById('user-name').value;
        saveResult(level, userName, seconds);
      });
      playSound.default('win');

      // saveResult.default(level, '', seconds);

      // To prevent multiple wins bi clicking on the field
      const field = document.querySelector('.field');
      field.removeEventListener('mouseup', clickHandler);
    }
  }
};

const isWin = () => {
  const field = document.querySelector('.field');
  field.addEventListener('mouseup', clickHandler);
};

export default isWin;
