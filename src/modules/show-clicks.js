import * as showTimer from './show-timer';

const showClicks = () => {
  let count = +document.querySelector('.header__clicks').innerText;

  const clickHandler = (e) => {
    // Count left clicks on cells
    if (e.target.classList.contains('field__cell') && !e.target.classList.contains('field__cell-pressed') && e.button === 0) {
      count += 1;

      // if game started, start timer
      if (count === 1) {
        showTimer.default();
      }
    }

    // Show number of clicks
    const clicks = document.querySelector('.header__clicks');
    clicks.textContent = count;
  };

  const removeClicks = () => {
    count = 0;
    const clicks = document.querySelector('.header__clicks');
    clicks.textContent = count;
  };

  // Add listener to click on cells
  const field = document.querySelector('.field');
  field.addEventListener('mousedown', clickHandler);

  // Add listener to click on reload button
  const button = document.querySelector('.header__reload');
  button.addEventListener('click', removeClicks);

  // Add listener for end of the game (changing class in button)
  // Create instance of MutationObserver
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'attributes'
      && mutation.attributeName === 'class'
      && (button.classList.contains('header__reload-loose')
      || button.classList.contains('header__reload-win'))) {
        // If class was changed to loose
        field.removeEventListener('mousedown', clickHandler);
      }
    });
  });

  // Looking for changing class of reload button
  observer.observe(button, { attributes: true });
};

export default showClicks;
