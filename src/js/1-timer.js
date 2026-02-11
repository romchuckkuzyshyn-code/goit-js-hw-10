import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
const inputDate = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = Date.now();
    userSelectedDate = Date.parse(selectedDates[0]);
    if (userSelectedDate < today) {
      return;
    }
  },
};

flatpickr(inputDate, options);
