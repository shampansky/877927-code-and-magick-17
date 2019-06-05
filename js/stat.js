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
    var currentColHeight = (COL_HEIGHT * times[i]) / maxTime;
    var currentTime = Math.round(times[i]);
    var xPos = CLOUD_X + COL_WIDTH + (COL_WIDTH + COL_GAP) * i;
    var yPos = 90 + COL_HEIGHT - currentColHeight;
    var randomColor = 'hsl(240,' + Math.round(Math.random() * 100) + '%, 50%)';

    // Почему-то вызывает ошибку в линтере
    // names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = randomColor;

    ctx.fillText(currentTime, xPos, yPos);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = randomColor;
    }

    ctx.fillRect(xPos, yPos + GAP_10, COL_WIDTH, currentColHeight);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], xPos, yPos + GAP_10 + currentColHeight + FONT_SIZE);
  }

};
