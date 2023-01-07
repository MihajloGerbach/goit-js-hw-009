import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputText: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button'),
  spanDay: document.querySelector('span[data-days]'),
  spanHour: document.querySelector('span[data-hours]'),
  spanMinute: document.querySelector('span[data-minutes]'),
  spanSecond: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() < 0) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btn.disabled = false;
    }
  },
};

const date = flatpickr(refs.inputText, options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const userInputDate = date.selectedDates[0];
      const currentTime = new Date();
      const timeOff = userInputDate - currentTime;
      const time = convertMs(timeOff);
      updateInterfaceTimer(time);
      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        this.stop();
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.btn.disabled = true;
  },
};

refs.btn.addEventListener('click', () => {
  timer.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateInterfaceTimer({ days, hours, minutes, seconds }) {
  refs.spanDay.textContent = `${addLeadingZero(days)}`;
  refs.spanHour.textContent = `${addLeadingZero(hours)}`;
  refs.spanMinute.textContent = `${addLeadingZero(minutes)}`;
  refs.spanSecond.textContent = `${addLeadingZero(seconds)}`;
}