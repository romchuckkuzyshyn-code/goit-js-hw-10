import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const inputDate = document.querySelector('#datetime-picker');
const btn = document.querySelector('.js-btn-start');
const toastErrorOptions = {
  title: 'Please choose a date in the future',
  position: 'bottomRight',
  timeout: 3000,
  icon: 'fa-solid fa-circle-xmark',
  closeOnClick: true,
};
const toastDoneOptions = {
  title: 'Well done',
  position: 'bottomRight',
  timeout: 3000,
  closeOnClick: true,
  icon: 'fa-regular fa-calendar-check',
};
const today = Date.now();
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
btn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = Date.parse(selectedDates[0]);
    if (userSelectedDate < today) {
      iziToast.error(toastErrorOptions);
      btn.disabled = true;
      return;
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

btn.addEventListener('click', startWorkTimer);

function startWorkTimer(event) {
  btn.disabled = true;
  inputDate.disabled = true;
  const intervalID = setInterval(params => {
    const result = userSelectedDate - Date.now();
    if (result <= 0) {
      clearInterval(intervalID);
      btn.disabled = false;
      inputDate.disabled = false;
      iziToast.success(toastDoneOptions);
    } else {
      const { days, hours, minutes, seconds } = convertMs(result);
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
