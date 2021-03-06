'use strict';
const loader = document.getElementById('preloader');
const permitWindow = document.querySelector('.permit-box');
const permitBtnYes = document.querySelector('.permit-yes');
const permitBtnNo = document.querySelector('.permit-no');

const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');

//Button
const buttons = document.querySelectorAll('button');
//Audio
// const gameWaitingAudio = new Audio('gameWaiting.mp3');
// const gameStartAudio = new Audio('gameStart.mp3');
// const correctAnswer = new Audio('correct.mp3');
// const wrongAnswer = new Audio('wrong.mp3');
const gameWaitingAudio = document.querySelector('.gameWaitingAudio');
const gameStartAudio = document.querySelector('.gameStartAudio');
const correctAnswer = document.querySelector('.correctAnswer');
const correctAnswerCopy = document.querySelector('.correctAnswer-copy');
const wrongAnswer = document.querySelector('.wrongAnswer');
const wrongAnswerCopy = document.querySelector('.wrongAnswer-copy');
const buttonHoverSound = document.querySelector('.button-hover');
const buttonClickSound = document.querySelector('.button-click');

console.log(wrongAnswer);
correctAnswer.volume = 0.1;
correctAnswerCopy.volume = 0.1;
wrongAnswer.volume = 0.1;
wrongAnswerCopy.volume = 0.1;
gameWaitingAudio.volume = 0.2;
gameStartAudio.volume = 0.2;
let turnOnMusic = false;

const correctAudioPlaying = function () {
  if (!correctAnswer.paused) {
    correctAnswer.pause();
    correctAnswerCopy.play();
  }
  correctAnswer.play();
};

const wrongAudioPlaying = function () {
  if (!wrongAnswer.paused) {
    wrongAnswer.pause();
    wrongAnswerCopy.play();
  }
  wrongAnswer.play();
};

const triggerMusic = function () {
  correctAnswer.pause();
  wrongAnswer.pause();
  gameStartAudio.pause();
  gameWaitingAudio.play();
  gameWaitingAudio.loop = true;
};

const waitingMusic = function () {
  gameStartAudio.currentTime = 0;
  gameStartAudio.pause();
  gameWaitingAudio.currentTime = 0;
  gameWaitingAudio.play();
  gameWaitingAudio.loop = true;
};

const loadPage1 = function () {
  loader.style.display = 'none';
  page1.classList.remove('hidden');
};

const audioPermit = function () {
  permitWindow.classList.toggle('hidden');
  page1.classList.add('hidden');
  page2.classList.add('hidden');

  permitBtnYes.addEventListener('click', function () {
    permitWindow.classList.toggle('hidden');
    // gameStartAudio.pause();
    // gameWaitingAudio.play();
    // gameWaitingAudio.loop = true;
    triggerMusic();
    return loadPage1();
  });
  permitBtnNo.addEventListener('click', function () {
    permitWindow.classList.toggle('hidden');
    return loadPage1();
  });
};

window.addEventListener('load', function () {
  audioPermit();
});
