import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const toastErrorOptions = {
  position: 'topRight',
  timeout: 3000,
  icon: 'fa-solid fa-circle-xmark',
  closeOnClick: true,
};
const toastDoneOptions = {
  position: 'topRight',
  timeout: 3000,
  closeOnClick: true,
  icon: 'fa-regular fa-calendar-check',
};

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formInfo = event.target;
  const inputDelayValue = Number(formInfo.elements.delay.value);
  const inputStateValue = formInfo.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputStateValue === 'fulfilled') {
        resolve(inputDelayValue);
      } else {
        reject(inputDelayValue);
      }
    }, inputDelayValue);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        ...toastDoneOptions,
        message: `✅ Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(delayValue => {
      iziToast.error({
        ...toastErrorOptions,
        message: `❌ Rejected promise in ${delayValue}ms`,
      });
    });

  form.reset();
}
