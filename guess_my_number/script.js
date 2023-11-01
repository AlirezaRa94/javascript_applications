'use strict';

const createNewTarget = () => {
  return Math.floor(Math.random() * 20) + 1;
};

let targetNumber = createNewTarget();
let score = 20;
let highestScore = 0;
const guessInput = document.querySelector('.guess');
const messageArea = document.querySelector('.message');
const scoreArea = document.querySelector('.score');
const highScoreArea = document.querySelector('.highscore');
const numberArea = document.querySelector('.number');
const againButton = document.querySelector('.again');
const checkButton = document.querySelector('.check');
const body = document.querySelector('body');

const decrementScore = () => {
  if (score > 0) {
    score--;
    scoreArea.textContent = score;
  }
};

const displayMessage = message => {
  messageArea.textContent = message;
};

const winGame = () => {
  body.style.backgroundColor = '#60b347';
  numberArea.style.width = '30rem';
  numberArea.textContent = targetNumber;
  if (score > highestScore) {
    highestScore = score;
    highScoreArea.textContent = highestScore;
  }
};

againButton.addEventListener('click', () => {
  displayMessage('Start guessing...');
  score = 20;
  scoreArea.textContent = score;
  guessInput.value = '';
  numberArea.textContent = '?';
  body.style.backgroundColor = '#222';
  numberArea.style.width = '15rem';
  targetNumber = createNewTarget();
});

checkButton.addEventListener('click', () => {
  if (score > 0) {
    const guessedNumber = Number(guessInput.value);
    if (!guessedNumber) {
      displayMessage('⛔ No Number!');
    } else if (guessedNumber === targetNumber) {
      displayMessage('🎉 Correct Number!');
      winGame();
    } else {
      decrementScore();
      if (score < 1) {
        displayMessage('💥 You Lost the Game!');
      } else {
        displayMessage(
          guessedNumber < targetNumber ? '⬆️ Too Low!' : '⬇️ Too High!'
        );
      }
    }
  }
});
