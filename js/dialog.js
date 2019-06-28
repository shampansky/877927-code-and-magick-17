'use strict';

(function () {
  var elemSetup = document.querySelector('.setup');
  var elemSetupOpen = document.querySelector('.setup-open');
  var elemSetupClose = elemSetup.querySelector('.setup-close');
  var elemSetupForm = elemSetup.querySelector('.setup-wizard-form');
  var elemUpload = document.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    // TODO: отменить действие когда elemUserName в фокусе
    window.util.isEscEvent(evt, closePopup);
  };

  // Обработчик открытия окна
  elemSetupOpen.addEventListener('click', function () {
    openPopup();
  });
  elemSetupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // Обработчик закрытия окна
  elemSetupClose.addEventListener('click', function () {
    closePopup();
  });
  elemSetupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var openPopup = function () {
    elemSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    elemSetup.classList.add('hidden');
    elemSetup.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Обработчик перетаскивания окна
  elemUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      elemSetup.style.top = (elemSetup.offsetTop - shift.y) + 'px';
      elemSetup.style.left = (elemSetup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          elemUpload.removeEventListener('click', onClickPreventDefault);
        };
        elemUpload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Обработчик отправки формы
  elemSetupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Создаем объект с данными формы
    var formData = new FormData(elemSetupForm);

    // Переводим данные формы в JSON
    var formObject = {};
    formData.forEach(function (value, key) {
      formObject[key] = value;
    });
    var json = JSON.stringify(formObject);

    // Обработка успешной отправки формы
    var successHandler = function () {
      closePopup();
    };

    // Обработка отправки формы с ошибками
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.save(json, successHandler, errorHandler);
  });
})();
