import * as renderElement from './render-element';
import '../../assets/sounds/open.mp3';
import '../../assets/sounds/flag.mp3';
import '../../assets/sounds/loose.mp3';
import '../../assets/sounds/win.mp3';

const renderSounds = () => {
  const container = document.querySelector('.container');

  const open = renderElement.default('audio');
  open.id = 'open';
  const openSource = renderElement.default('source');
  openSource.src = './sounds/open.mp3';
  openSource.type = 'audio/mp3';
  open.appendChild(openSource);
  container.appendChild(open);

  const flag = renderElement.default('audio');
  flag.id = 'flag';
  const flagSource = renderElement.default('source');
  flagSource.src = './sounds/flag.mp3';
  flagSource.type = 'audio/mp3';
  flag.appendChild(flagSource);
  container.appendChild(flag);

  const win = renderElement.default('audio');
  win.id = 'win';
  const winSource = renderElement.default('source');
  winSource.src = './sounds/win.mp3';
  winSource.type = 'audio/mp3';
  win.appendChild(winSource);
  container.appendChild(win);

  const loose = renderElement.default('audio');
  loose.id = 'loose';
  const looseSource = renderElement.default('source');
  looseSource.src = './sounds/loose.mp3';
  looseSource.type = 'audio/mp3';
  loose.appendChild(looseSource);
  container.appendChild(loose);
};
export default renderSounds;
