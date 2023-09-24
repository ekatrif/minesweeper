const showTimer = () => {
  const timer = document.querySelector('.header__timer');
  let seconds = +timer.innerText;

  const setTimer = () => {
    seconds += 1;
    timer.textContent = seconds;
  };

  // Start timer
  const timerId = setInterval(setTimer, 1000);

  const removeTimer = () => {
    clearInterval(timerId);
    seconds = 0;
    timer.textContent = seconds;
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  // Add listener to click on reload button
  const button = document.querySelector('.header__reload');
  button.addEventListener('click', removeTimer);

  // Add listener for end of the game (changing class in button)
  // Create instance of MutationObserver
  const observerReload = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class' && (button.classList.contains('header__reload-loose') || button.classList.contains('header__reload-win'))) {
        // If class was changed to loose or win
        stopTimer();
      }
    });
  });
  // Looking for changing class of reload button
  observerReload.observe(button, { attributes: true });
};

export default showTimer;
