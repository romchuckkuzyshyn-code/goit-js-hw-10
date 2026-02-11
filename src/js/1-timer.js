import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
};

const inputDate = document.querySelector('#datetime-picker');
flatpickr(inputDate, options);
