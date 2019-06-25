'use strict';

(function () {
  var elemArtifactsItem = document.querySelector('.setup-artifacts-cell').firstElementChild;
  var elemSetupArtifacts = document.querySelector('.setup-artifacts');

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
      // Выносим артификт на передний план
      elemArtifactsItem.style.zIndex = '100';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // возвращаем артефакт на место, если не попала в инвентарь
      var elemArtifactsItemRect = elemArtifactsItem.getBoundingClientRect();
      var elemSetupArtifactsRect = elemSetupArtifacts.getBoundingClientRect();

      if (elemArtifactsItemRect.top + elemArtifactsItemRect.height < elemSetupArtifactsRect.top ||
          elemArtifactsItemRect.left + elemArtifactsItemRect.width < elemSetupArtifactsRect.left ||
          elemArtifactsItemRect.left > elemSetupArtifactsRect.left + elemSetupArtifactsRect.width ||
          elemArtifactsItemRect.top > elemSetupArtifactsRect.top + elemSetupArtifactsRect.height
      ) {
        elemArtifactsItem.removeAttribute('style');
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
