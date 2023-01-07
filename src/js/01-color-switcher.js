const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let disable = false;
let intervalId = null;

refs.btnStart.addEventListener('click', onBtnOn);
refs.btnStop.addEventListener('click', onBtnOff);

function onBtnOn() {
  if (disable) {
    return;
  }
  disable = true;
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnOff() {
  clearInterval(intervalId);
  disable = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}