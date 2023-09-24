import * as renderElement from './render-element';
import * as renderLinks from './render-links';
import * as runModal from '../settings';
import * as runTop from '../top-10';
import * as saveGame from '../save-game';
import * as reloadGame from '../reload-game';

function renderHtml() {
  const saveExists = localStorage.getItem('save');
  const save = JSON.parse(localStorage.getItem('save'));
  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));

  // Render container
  const container = renderElement.default('div', 'container');
  document.body.appendChild(container);

  // Render h1
  const title = renderElement.default('h1', 'h1');
  title.innerText = 'RSS Minesweeper';
  container.appendChild(title);

  // Render list of settings links
  const ul = renderElement.default('ul', 'links');
  container.appendChild(ul);

  // Render links from config file
  config.links.forEach((link) => {
    const li = renderLinks.default(link);
    ul.appendChild(li);
  });

  // Render volume
  const volume = renderElement.default('div', 'volume');
  if (config.sound === 'off') {
    volume.classList.add('volume-disable');
  }
  container.appendChild(volume);

  // Render game container
  const game = renderElement.default('div', 'game');
  container.appendChild(game);

  // Render header container
  const header = renderElement.default('div', 'game__header', 'header');
  game.appendChild(header);

  // Render number of clicks
  const clicksNumber = renderElement.default('div', 'header__clicks');
  header.appendChild(clicksNumber);
  if (saveExists) {
    clicksNumber.innerText = save.clicksNum;
  } else {
    clicksNumber.innerText = '0';
  }

  // Render reload button
  const reloadBtn = renderElement.default('div', 'header__reload');
  header.appendChild(reloadBtn);

  // Highlight reload button
  reloadGame.default();

  // Render timer
  const timer = renderElement.default('div', 'header__timer');
  header.appendChild(timer);
  if (saveExists) {
    timer.innerText = save.time;
  } else {
    timer.innerText = '0';
  }

  // Render field container
  const field = renderElement.default('div', 'game__field', 'field');
  game.appendChild(field);

  // Render cells
  const level = config.difficulty;
  const numColumns = config[level].width;
  const numRows = config[level].height;
  const numberCells = numColumns * numRows;
  field.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  field.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  for (let i = 0; i < numberCells; i += 1) {
    const cell = renderElement.default('div', 'field__cell');
    field.appendChild(cell);
  }

  // Render agenda
  const agenda = renderElement.default('div', 'agenda');
  container.appendChild(agenda);

  // Render number of flags
  const flags = renderElement.default('div', 'agenda__flags');
  flags.innerText = 0;
  agenda.appendChild(flags);

  // Render number of remaining mines
  const mines = renderElement.default('div', 'agenda__mines');
  agenda.appendChild(mines);

  // Show remaining number of mines
  const minesCount = config[level].mines;
  mines.innerText = minesCount;

  // Render info
  const info = renderElement.default('p', 'info');
  info.innerHTML = '<p>To open all the cells not marked with a flag, click mouse wheel.</p>';
  container.appendChild(info);

  // Render message container
  const message = renderElement.default('div', 'message');
  container.appendChild(message);

  // Run modal
  runModal.default();

  // Run Top-10
  runTop.default();

  // Run save game
  saveGame.default();
}

export default renderHtml;
