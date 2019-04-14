// main.js

import {createXhr, TIMEOUT} from './http-request.js';

const buttonEl = document.querySelector(`.button--load`);
const progressValue = document.querySelector(`.progress-bar__value`);
const logoGrey = document.querySelector(`.progress-bar__logo--grey`);
const LOAD_URL = `http://picsum.photos/2000/1000?r=4445555555`;

// функция получения данных с сервера

const getData = function (onLoad, onError) {
  const xhr = createXhr(onLoad, onError);
  xhr.open(`GET`, LOAD_URL);
  let width = 0;
  xhr.onprogress = function (e) {
    if (width < 100) {
      logoGrey.style.width = Math.floor((e.loaded / e.total) * 100) + `%`;
      progressValue.innerHTML = Math.floor((e.loaded / e.total) * 100) + ` %`;
    }
  };
  xhr.onloadstart = function () {
    buttonEl.innerHTML = `Loading...`;
    logoGrey.style.width = `0%`;
    buttonEl.setAttribute(`disabled`, `disabled`);
    logoGrey.style.width = `0%`;
    progressValue.innerHTML = `0 %`;

  };
  xhr.onloadend = function () {
    buttonEl.innerHTML = `Download`;
    progressValue.innerHTML = `100 %`;
    logoGrey.style.width = `100%`;
    buttonEl.removeAttribute(`disabled`, `disabled`);
  };

  xhr.timeout = TIMEOUT;
  xhr.send();
};

const onLoad = () => {
  console.log(`Загрузка завершена`);
};

const onError = () => {
  console.log(`что то пошло не так`);
};

const onButtonClick = () => {
  getData(onLoad, onError);
};

buttonEl.addEventListener(`click`, onButtonClick);
