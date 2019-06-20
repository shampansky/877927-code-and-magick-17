'use strict';

var elemArtifactsItem = document.querySelector('.setup-artifacts-cell').firstElementChild;

elemArtifactsItem.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  elemArtifactsItem.style.position = 'absolute';

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    elemArtifactsItem.style.top = (elemArtifactsItem.offsetTop - shift.y) + 'px';
    elemArtifactsItem.style.left = (elemArtifactsItem.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
