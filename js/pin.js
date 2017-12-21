'use strict';

(function () {
  // пины
  window.mapPins = document.querySelector('.map__pins');

  window.previousPin = null;

  // функция собирает DOM-элементы, соответствующие меткам на карте
  var createMapPin = function (pin, i) {
    var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    mapPin.style.top = pin.location.y + 'px';
    mapPin.style.left = pin.location.x + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.setAttribute('data-index', i);
    return mapPin;
  };

  // функция  создает фрагмент с сгенерированными DOM-элементами в блоке .map__pins
  window.renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(createMapPin(adverts[i], i));
    }
    window.mapPins.appendChild(fragment);
  };

  // клик на маркер
  // window.mapPins.addEventListener('click', window.showCard);
})();
