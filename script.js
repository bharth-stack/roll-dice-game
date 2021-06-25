'use strict';
let player0 = document.querySelector('.player--0 ');
let player1 = document.querySelector('.player--1 ');
let player = document.querySelector('.player');
let playerActive = document.querySelector('.player--active');
let name = document.querySelector('.name');
let scores = document.querySelectorAll('.score');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let dice = document.querySelector('.dice');
let playerScore = 0;
let startingPlayer = 0;
let total = [0, 0];
let status = true;
let switchPlayer = function () {
  document.querySelector(`#current--${startingPlayer}`).textContent = 0;
  startingPlayer = startingPlayer === 0 ? 1 : 0;
  playerScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (status) {
    let number = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${number}.png`;
    if (number !== 1) {
      playerScore += number;
      document.querySelector(`#current--${startingPlayer}`).textContent =
        playerScore;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (status) {
    total[startingPlayer] = total[startingPlayer] + playerScore;
    document.querySelector(`#score--${startingPlayer}`).textContent =
      total[startingPlayer];
    playerScore = 0;
    document.querySelector(`#current--${startingPlayer}`).textContent = 0;
    if (total[startingPlayer] >= 100) {
      status = false;
      document
        .querySelector(`.player--${startingPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${startingPlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  dice.classList.remove('hidden');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document
    .querySelector(`.player--${startingPlayer}`)
    .classList.remove('player--winner');
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = '0';
  }
  playerScore = 0;
  startingPlayer = 0;
  total = [0, 0];
  status = true;
});
