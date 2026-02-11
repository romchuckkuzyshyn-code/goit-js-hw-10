import flatpickr from 'flatpickr';
import izitoast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const inputDate = document.querySelector('#datetime-picker');
const toastOptions = {
  title: 'Please choose a date in the future',
  position: 'bottomRight',
  timeout: 3000,
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = Date.now();
    userSelectedDate = Date.parse(selectedDates[0]);
    if (userSelectedDate < today) {
      izitoast.error(toastOptions);
      return;
    }
  },
};

flatpickr(inputDate, options);
