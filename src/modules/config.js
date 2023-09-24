const config = {
  difficulty: 'easy',
  links: ['Game', 'Toggle theme', 'Top-10', 'Save game'],
  theme: 'light',
  easy: {
    width: 10,
    height: 10,
    mines: 10,
    score: {
      Ivan: 11,
      Joyn: 10,
      Lisa: 45,
    },
  },
  medium: {
    width: 15,
    height: 15,
    mines: 40,
    score: {
      Mike: 832,
      Andrew: 235,
      Maria: 465,
    },
  },
  hard: {
    width: 25,
    height: 25,
    mines: 99,
    score: {
      Misha: 242,
      Grisha: 103,
      Frank: 172,
    },
  },
  minNumMines: 10,
  maxNumMines: 99,
  sound: 'on'
};

export default config;
