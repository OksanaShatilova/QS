// http-request.js

const STATUS_SUCCESS = 200;
const TIMEOUT = 20000;

const createXhr = function (onLoad, onError) {

  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === STATUS_SUCCESS) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + TIMEOUT + `мс`);
  });

  return xhr;
};

export {createXhr, TIMEOUT};
