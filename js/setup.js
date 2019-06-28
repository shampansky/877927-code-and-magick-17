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

  var EYE_COLORS = [
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

  var WIZARDS_NUMBER = 4;

  var successHandler = function (wizards) {
    // Показываем похожих волшебников в окне с настройками волшебника
    document.querySelector('.setup-similar').classList.remove('hidden');

    // Cписок похожих волшебников в разметке
    var similarListElement = document.querySelector('.setup-similar-list');

    // Шаблон похожих волшебников
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

    // создание волшебника
    var renderWizard = function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardElement;
    };

    // Добавляем волшебников в разметку через элемент documentFragment
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < WIZARDS_NUMBER; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }

    similarListElement.appendChild(fragment);
  };

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

  window.backend.load(successHandler, errorHandler);

  // Генерация случайного номера массива
  var getRandomArrayNumber = function (arrayName) {
    return Math.round(Math.random() * (arrayName.length - 1));
  };

  // Генерация случайного плаща из массива
  var getRandomCoatColor = function () {
    return COAT_COLORS[getRandomArrayNumber(COAT_COLORS)];
  };

  // Генерация случайного плаща из массива
  var getRandomEyeColor = function () {
    return EYE_COLORS[getRandomArrayNumber(EYE_COLORS)];
  };

  // Генерация случайного цвета файербола из массива
  var getFireballColor = function () {
    return FIREBALL_COLORS[getRandomArrayNumber(FIREBALL_COLORS)];
  };

  var elemWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var elemWizardCoatInput = document.querySelector('input[name="coat-color"]');
  var elemWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var elemWizardEyesInput = document.querySelector('input[name="eyes-color"]');
  var elemWizardFireball = document.querySelector('.setup-fireball-wrap');
  var elemWizardFireballInput = document.querySelector('input[name="fireball-color"]');


  var applyRandomFillColor = function (element, elementInput, color) {
    element.style.fill = color;
    elementInput.value = color;
  };

  var applyRandomBackgroundColor = function (element, elementInput, color) {
    element.style.background = color;
    elementInput.value = color;
  };

  // Обработчик изменения цвета плаща мага
  elemWizardCoat.addEventListener('click', function () {
    applyRandomFillColor(elemWizardCoat, elemWizardCoatInput, getRandomCoatColor());
  });

  // Обработчик изменения цвета глаз мага
  elemWizardEyes.addEventListener('click', function () {
    applyRandomFillColor(elemWizardEyes, elemWizardEyesInput, getRandomEyeColor());
  });

  // Обработчик изменения цвета файербола мага
  elemWizardFireball.addEventListener('click', function () {
    applyRandomBackgroundColor(elemWizardFireball, elemWizardFireballInput, getFireballColor());
  });
})();
