const playSound = (soundId) => {
  const sound = document.getElementById(soundId);
  sound.volume = 0.05;

  // Config from localStorage
  const config = JSON.parse(localStorage.getItem('config'));
  if (config.sound === 'on') {
    sound.play();
  } else {
    sound.muted = true;
  }

};

export default playSound;
