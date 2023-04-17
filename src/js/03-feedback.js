import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const formData = { email: '', message: '' };
populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.message.addEventListener('input', throttle(onMessegeInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onEmailInput(e) {
  formData.email = e.target.value;

  const formDataString = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, formDataString);
}
function onMessegeInput(e) {
  formData.message = e.target.value;

  const formDataString = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, formDataString);
}

function populateTextarea() {
  const savedObj = localStorage.getItem(STORAGE_KEY);
  if (savedObj) {
    parsedData = JSON.parse(savedObj);
    refs.email.value = parsedData.email;
    refs.message.value = parsedData.message;
  }
}
