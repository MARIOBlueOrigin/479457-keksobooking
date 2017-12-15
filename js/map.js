'use strict';

(function () {
// главная часть страницы - карта
  var map = document.querySelector('.map');

  // центральный пин
  var mapPinMain = document.querySelector('map.map__pin--main');

  // функция, активирующая карту
  window.activateMap = function () {
    map.classList.remove('map--faded');
    window.renderPins(window.adverts);
    window.toggleForm();
    window.form.form.classList.remove('notice__form--disabled');
  };

  // событие mouseup
  mapPinMain.addEventListener('mouseup', window.activateMap);
})();
