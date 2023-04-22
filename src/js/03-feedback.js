import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

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

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputSave, 500));

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.email.value === '' || refs.message.value === '') {
    return alert('Please fill in all the fields!');
  }
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onInputSave(e) {
  const target = e.target;
  const formELName = target.name;
  const formELValue = target.value;

  formData[formELName] = formELValue;
  save(STORAGE_KEY, formData);
}

function populateTextarea() {
  const savedObj = load(STORAGE_KEY);

  if (!savedObj) {
    return;
  }

  const formElements = refs.form.elements;

  for (const key in savedObj)
    if (savedObj.hasOwnProperty(key)) {
      formElements[key].value = savedObj[key];

      if (savedObj[key]) {
        formData[key] = savedObj[key];
      }
    }
}

populateTextarea();
