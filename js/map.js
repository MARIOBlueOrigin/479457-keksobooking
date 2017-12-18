'use strict';

(function () {
// главная часть страницы - карта
  var map = document.querySelector('.map');

  var form = document.querySelector('.notice__form');

  // центральный пин
  var mapPinMain = map.querySelector('.map__pin--main');

  // ограничения по Y
  var coordsY = {
    min: 100,
    max: 500
  };

  // высота главного пина
  var MAIN_PIN_HEIGHT = 58;

  // функция, активирующая карту
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.renderPins(window.adverts);
    window.toggleForm();
    form.classList.remove('notice__form--disabled');
  };

  // событие mouseup
  mapPinMain.addEventListener('mouseup', activateMap);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if ((mapPinMain.offsetTop - shift.y) >= (coordsY.min + MAIN_PIN_HEIGHT) && (mapPinMain.offsetTop - shift.y) <= (coordsY.max + MAIN_PIN_HEIGHT)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
      window.addressElement.value = (mapPinMain.offsetTop - shift.y) + ', ' + (mapPinMain.offsetLeft - shift.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
