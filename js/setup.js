'use strict';

var WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

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

var WIZARDS_NUMBER = 4;

var wizards = [];

// Показываем окно с настройками волшебника
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Показываем похожих волшебников в окне с настройками волшебника
document.querySelector('.setup-similar').classList.remove('hidden');

// Cписок похожих волшебников в разметке
var similarListElement = document.querySelector('.setup-similar-list');

// Шаблон похожих волшебников
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

// Генерация случайного номера массива
var getRandomArrayNumber = function (arrayName) {
  return Math.round(Math.random() * (arrayName.length - 1));
};

// Генерация случайного имени из массива
var getRandomName = function () {
  var randomFirstName = WIZARD_FIRST_NAMES[getRandomArrayNumber(WIZARD_FIRST_NAMES)];
  var randomSecondName = WIZARD_SECOND_NAMES[getRandomArrayNumber(WIZARD_SECOND_NAMES)];
  return randomFirstName + ' ' + randomSecondName;
};

// Генерация случайного плаща из массива
var getRandomCoatColor = function () {
  return COAT_COLORS[getRandomArrayNumber(COAT_COLORS)];
};

// Генерация случайного плаща из массива
var getRandomEyeColor = function () {
  return EYE_COLORS[getRandomArrayNumber(EYE_COLORS)];
};

// Генерируем массив с объектами волшебников
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  var randomWizard = {
    name: getRandomName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyeColor()
  };

  wizards.push(randomWizard);
}

// создание волшебника
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Добавляем волшебников в разметку через элемент documentFragment
var fragment = document.createDocumentFragment();

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);
