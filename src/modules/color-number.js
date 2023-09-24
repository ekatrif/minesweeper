const colorNumber = (id) => {
  const config = JSON.parse(localStorage.getItem('config'));
  const currentTheme = config.theme;

  const cell = document.getElementById(id);
  const number = +cell.innerText;
  switch (number) {
    case 1:
      cell.classList.add('one');
      if (currentTheme === 'dark') {
        cell.classList.add('one-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 2:
      cell.classList.add('two');
      if (currentTheme === 'dark') {
        cell.classList.add('two-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 3:
      cell.classList.add('three');
      if (currentTheme === 'dark') {
        cell.classList.add('three-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 4:
      cell.classList.add('four');
      if (currentTheme === 'dark') {
        cell.classList.add('four-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 5:
      cell.classList.add('five');
      if (currentTheme === 'dark') {
        cell.classList.add('five-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 6:
      cell.classList.add('six');
      if (currentTheme === 'dark') {
        cell.classList.add('six-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 7:
      cell.classList.add('seven');
      if (currentTheme === 'dark') {
        cell.classList.add('seven-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    case 8:
      cell.classList.add('eight');
      if (currentTheme === 'dark') {
        cell.classList.add('eight-dark');
      } else {
        cell.classList.remove('one-dark');
      }
      break;

    default:
      break;
  }
};

export default colorNumber;
