const mute = () => {
  // Get all audio elements
  const allElements = document.querySelectorAll('audio');

  // Mute all
  allElements.forEach((audio) => audio.muted = true);

  // Save new setting to localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  config.sound = 'off';
  localStorage.setItem('config', JSON.stringify(config));
};

const unmute = () => {
  // Get all audio elements
  const allElements = document.querySelectorAll('audio');

  // Unmute all
  allElements.forEach((audio) => audio.muted = false);

  // Save new setting to localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  config.sound = 'on';
  localStorage.setItem('config', JSON.stringify(config));
};

const toggleVolume = () => {
  const soundBtn = document.querySelector('.volume');

  soundBtn.classList.toggle('volume-disable');
  
  const isBtnDisable = soundBtn.classList.contains('volume-disable');
  if (isBtnDisable) {
    mute();
  } else {
    unmute();
  }  
}

const onOffSound = () => {
  const soundBtn = document.querySelector('.volume');
  soundBtn.addEventListener('click', toggleVolume);
}

export default onOffSound;