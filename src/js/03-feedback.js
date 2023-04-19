import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const formData = { email: '', message: '' };
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.message.addEventListener('input', throttle(onMessegeInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onEmailInput(e) {
  formData.email = e.target.value;
  save(STORAGE_KEY, formData);
}

function onMessegeInput(e) {
  formData.message = e.target.value;
  save(STORAGE_KEY, formData);
}

function populateTextarea() {
  const savedObj = load(STORAGE_KEY);
  if (savedObj) {
    refs.email.value = savedObj.email;
    refs.message.value = savedObj.message;
  }
}
