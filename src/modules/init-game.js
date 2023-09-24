import * as renderHtml from './render-html/render-html';
import * as config from './config';
import * as showClicks from './show-clicks';
import * as highlightCell from './highlight-cell';
import { startGame } from './start-game';
import * as countOpenedCells from './count-opened-cells';
import * as renderSounds from './render-html/render-sounds';
import * as changeTheme from './change-theme';
import * as onOffSound from './onn-off-sound';

const initGame = () => {
  const app = document.querySelector('.container');
  if (app) {
    app.remove();
  }

  // Save config to localStorage if localStorage is empty
  if (!localStorage.getItem('config')) {
    localStorage.setItem('config', JSON.stringify(config.default));
  }

  // Render HTML tags
  renderHtml.default();

  onOffSound.default();

  // Count and show number of clicks and start timer
  showClicks.default();

  // Highlight cells
  highlightCell.default();

  // Load sounds
  renderSounds.default();

  // Run theme change function
  changeTheme.default();

  // Start game after first click
  startGame();

  // Count opened cells
  countOpenedCells.default();
};

export default initGame;
