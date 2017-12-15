'use strict';

(function () {
// главная часть страницы - карта
  var map = document.querySelector('.map');

  var form = document.querySelector('.notice__form');

  // центральный пин
  var mapPinMain = map.querySelector('.map__pin--main');

  // функция, активирующая карту
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.renderPins(window.adverts);
    window.toggleForm();
    form.classList.remove('notice__form--disabled');
  };

  // событие mouseup
  mapPinMain.addEventListener('mouseup', activateMap);
})();
