'use strict';

//document Elements
const titleDigits = document.querySelectorAll('.title-digit');
const btnStart = document.querySelector('.btn-start');

//Page2 document Elements
const body = document.querySelector('body');
const correctNumber = document.querySelector('.correct-number');
const wrongNumber = document.querySelector('.wrong-number');
const timerNumber = document.querySelector('.timmer-number');
const questionsBox = document.querySelectorAll('.question-box');
//input context
const inputAnswer = document.querySelector('.input-answer');
//summary Element
const summaryWindow = document.querySelector('.summary');
const summaryCorrect = document.querySelector('.summary-correct');
const summaryWrong = document.querySelector('.summary-wrong');
const summaryBtn = document.querySelector('.summary-btn');
//Add Event Listeners
titleDigits.forEach((digit) =>
  digit.addEventListener('mouseover', function (e) {
    e.preventDefault();
    const digit = e.target;
    digit.classList.add('moving-up');
  })
);

titleDigits.forEach((digit) =>
  digit.addEventListener('mouseout', function (e) {
    e.preventDefault();
    const digit = e.target;
    digit.classList.remove('moving-up');
  })
);

//Global
let gaming = false;
let correct = 0;
let wrong = 0;
let imageIndex;
let answer = inputAnswer.getAttribute('value');
let newAnswer = '';

// const dataAnswer = ['coffee', 'pie', 'sandwich', '', '', '', ''];
const dataAnswer = [];
questionsBox.forEach((e) => dataAnswer.push(e.dataset.answer));

//functions
function showImages() {
  const random = Math.floor(Math.random() * 7); //1~6
  imageIndex = random;
  questionsBox.forEach((question) => {
    if (Number(question.dataset.question) === imageIndex) {
      question.classList.remove('hidden');
    }
  });
}

const closeImages = function () {
  questionsBox.forEach((question) => {
    if (Number(question.dataset.question) === imageIndex) {
      question.classList.add('hidden');
    }
  });
};

const checkInput = function () {
  if (newAnswer === dataAnswer[imageIndex]) {
    correctAudioPlaying();
    correct++;
    correctNumber.textContent = `${correct}`;
    closeImages();
    return showImages();
  } else {
    wrongAudioPlaying();

    wrong++;
    wrongNumber.textContent = `${wrong}`;
    closeImages();
    return showImages();
  }
};

const popUpSummary = function () {
  page1.style.opacity = 0.5;
  page2.style.opacity = 0.5;
  summaryWindow.classList.remove('summary-hidden');
  summaryBtn.addEventListener('click', function () {
    summaryWindow.classList.add('summary-hidden');
    returnToPage1();
  });
};
const allImagesHidden = function () {
  questionsBox.forEach((question) => {
    question.classList.add('hidden');
  });
};

const resetScores = function () {
  summaryCorrect.textContent = `${correct}`;
  summaryWrong.textContent = `${wrong}`;
  correct = 0;
  wrong = 0;
  correctNumber.textContent = `${correct}`;
  wrongNumber.textContent = `${wrong}`;
  allImagesHidden();
};

const returnToPage1 = function () {
  page1.style.opacity = 1;
  page2.style.opacity = 1;
  page1.classList.remove('hidden');
  page2.classList.add('hidden');
  waitingMusic();
};

const countDown = function (time) {
  gaming = true;
  let timer = time;
  timerNumber.textContent = timer;

  const count = setInterval(function () {
    if (timer === 0) {
      gaming = false;
      timerNumber.textContent = '0';
      inputAnswer.textContent = '';
      resetScores();
      popUpSummary();

      clearInterval(count);
      console.log('GAME OVER');
    }
    timer--;
    timerNumber.textContent = timer;
  }, 1000);
};

function init() {
  //Change Music
  gameStartAudio.play();
  gameWaitingAudio.loop = false;
  gameWaitingAudio.currentTime = 0;
  gameWaitingAudio.pause();
  //display page2
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
  //set timer to 3 secs
  let startTimer = 5;
  timerNumber.textContent = startTimer;
  const gameCountDown = setInterval(function () {
    //Game start!!!
    if (startTimer === 0) {
      clearInterval(gameCountDown);
      //count Down
      countDown(60);
      //show first img
      showImages();
      return;
    }
    startTimer--;
    timerNumber.textContent = startTimer;
  }, 1000);
}

//Initialize Game
btnStart.addEventListener('click', init);

document.addEventListener('keydown', function (e) {
  const key = e.key;

  if (gaming && key === 'Enter') {
    newAnswer = inputAnswer.value;
    // console.log(newAnswer);

    checkInput();

    inputAnswer.value = '';
  } else if (key === 'Enter') {
    inputAnswer.value = '';
  }
});

//// Sound effect
buttons.forEach((button) =>
  button.addEventListener('click', function () {
    if (buttonClickSound.duration > 0) buttonClickSound.currentTime = 0;
    buttonClickSound.play();
  })
);

buttons.forEach((button) =>
  button.addEventListener('mouseenter', function () {
    if (buttonHoverSound.duration > 0) buttonHoverSound.currentTime = 0;
    buttonHoverSound.play();
  })
);
