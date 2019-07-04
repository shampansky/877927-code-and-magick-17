'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];


  // Генерация случайного номера массива
  var getRandomArrayNumber = function (arrayName) {
    return Math.round(Math.random() * (arrayName.length - 1));
  };

  // Применить случайный цвет заливки
  var applyRandomFillColor = function (element, elementInput, color) {
    element.style.fill = color;
    elementInput.value = color;
  };

  // Применить случайный цвет фона
  var applyRandomBackgroundColor = function (element, elementInput, color) {
    element.style.background = color;
    elementInput.value = color;
  };

  var elemWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var elemWizardCoatInput = document.querySelector('input[name="coat-color"]');
  // Генерация случайного плаща из массива
  var getRandomCoatColor = function () {
    return COAT_COLORS[getRandomArrayNumber(COAT_COLORS)];
  };

  // Обработчик изменения цвета плаща мага
  elemWizardCoat.addEventListener('click', function () {
    var newColor = getRandomCoatColor();
    applyRandomFillColor(elemWizardCoat, elemWizardCoatInput, newColor);
    window.wizard.onCoatChange(newColor);
  });


  var elemWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var elemWizardEyesInput = document.querySelector('input[name="eyes-color"]');

  // Генерация случайного плаща из массива
  var getRandomEyeColor = function () {
    return EYES_COLORS[getRandomArrayNumber(EYES_COLORS)];
  };

  // Обработчик изменения цвета глаз мага
  elemWizardEyes.addEventListener('click', function () {
    var newColor = getRandomEyeColor();
    applyRandomFillColor(elemWizardEyes, elemWizardEyesInput, newColor);
    window.wizard.onEyesChange(newColor);
  });

  var elemWizardFireball = document.querySelector('.setup-fireball-wrap');
  var elemWizardFireballInput = document.querySelector('input[name="fireball-color"]');
  // Генерация случайного цвета файербола из массива
  var getFireballColor = function () {
    return FIREBALL_COLORS[getRandomArrayNumber(FIREBALL_COLORS)];
  };

  // Обработчик изменения цвета файербола мага
  elemWizardFireball.addEventListener('click', function () {
    var newColor = getFireballColor();
    applyRandomBackgroundColor(elemWizardFireball, elemWizardFireballInput, newColor);
  });

})();
