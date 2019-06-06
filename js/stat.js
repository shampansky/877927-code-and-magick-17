'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_10 = 10;
var GAP_20 = 20;

var COL_HEIGHT = 150;
var COL_WIDTH = 40;
var COL_GAP = 50;

var FONT_SIZE = 16;
var LINE_HEIGHT = FONT_SIZE * 1.4;
var FONT_FAMILY = 'PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (elements) {
  var maxElement = elements[0];

  for (var i = 0; i < elements.length; i++) {
    if (elements[i] > maxElement) {
      maxElement = elements[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  return 'hsl(240,' + Math.round(Math.random() * 100) + '%, 50%)';
};

var addColorStyle = function (name, color) {
  return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : color;
};

var renderColumn = function (ctx, name, time, maxTime, colNumber) {
  var currentColHeight = (COL_HEIGHT * time) / maxTime;
  var currentTime = Math.round(time);
  var xPos = CLOUD_X + COL_WIDTH + (COL_WIDTH + COL_GAP) * colNumber;
  var yPos = 90 + COL_HEIGHT - currentColHeight;
  var randomColor = getRandomColor();

  // Выводим время игрока
  ctx.fillText(currentTime, xPos, yPos);

  // Выводим цветную колонку
  ctx.fillStyle = addColorStyle(name, randomColor);
  ctx.fillRect(xPos, yPos + GAP_10, COL_WIDTH, currentColHeight);

  // Выводим имя игрока
  ctx.fillStyle = '#000000';
  ctx.fillText(name, xPos, yPos + GAP_10 + currentColHeight + FONT_SIZE);
};

window.renderStatistics = function (ctx, names, times) {
  // Создаем облако
  renderCloud(ctx, CLOUD_X + GAP_10, CLOUD_Y + GAP_10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // Вводный текст
  ctx.fillStyle = '#000000';
  ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_20, CLOUD_Y + GAP_20 + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_20, CLOUD_Y + GAP_20 + FONT_SIZE + LINE_HEIGHT);

  // Находим самое большое время
  var maxTime = getMaxElement(times);

  // Генерируем колонки для каждого игрока
  for (var i = 0; i < names.length; i++) {
    renderColumn(ctx, names[i], times[i], maxTime, i);
  }

};
