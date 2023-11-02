'use strict';

// Select all the documents we need
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialize the variables
let player = 0;
let currentScore = 0;
let hasEnded = false;
let totalScores = [0, 0];

// Functions to select documents dynamically
const scoreEl = cur => document.querySelector(`#score--${cur}`);
const currentEl = cur => document.querySelector(`#current--${cur}`);
const section = cur => document.querySelector(`.player--${cur}`);

// Funstion that calls when user click on the new game button
const resetGame = () => {
  // 1. Reset the displayed scores
  for (let i = 0; i < 2; i++) {
    scoreEl(i).textContent = 0;
    currentEl(i).textContent = 0;
    section(i).classList.remove('player--winner');
  }

  // 2. Reset the classes
  section(0).classList.add('player--active');
  section(1).classList.remove('player--active');
  diceEl.classList.add('hidden');

  // 3.Reset the variables
  totalScores = [0, 0];
  player = 0;
  currentScore = 0;
  hasEnded = false;
};

const randomDice = () => Math.floor(Math.random() * 6 + 1);

const updateCurrentScore = val => {
  currentScore += val;
  currentEl(player).textContent = currentScore;
};

const switchPlayer = () => {
  currentScore = 0;
  currentEl(player).textContent = 0;
  section(player).classList.remove('player--active');
  player = 1 - player;
  section(player).classList.add('player--active');
};

const updateTotal = () => {
  totalScores[player] += currentScore;
  scoreEl(player).textContent = totalScores[player];
};

const winGame = () => {
  section(player).classList.remove('player--active');
  section(player).classList.add('player--winner');
  diceEl.classList.add('hidden');
  hasEnded = true;
};

btnRoll.addEventListener('click', () => {
  if (!hasEnded) {
    // 1. Generating a new random dice roll
    const diceVal = randomDice();

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${diceVal}.png`;

    // 3. Check for rolled 1
    if (diceVal === 1) {
      switchPlayer();
    } else {
      updateCurrentScore(diceVal);
    }
  }
});

btnHold.addEventListener('click', () => {
  if (!hasEnded) {
    // 1. Update the total score of current player
    updateTotal();

    // 2. Check for winner
    totalScores[player] >= 100 ? winGame() : switchPlayer();
  }
});

btnNew.addEventListener('click', resetGame);
