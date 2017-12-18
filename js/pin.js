'use strict';

(function () {
  // пины
  var mapPins = document.querySelector('.map__pins');

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
    mapPins.appendChild(fragment);
  };

  // показ/ скрытие объявления
  window.onPinClick = function (evt) {
    var activePin = evt.target;

    while (activePin !== mapPins) {
      if (activePin.tagName === 'BUTTON') {
        activePin.classList.add('map__pin--active');
        if (window.previousPin) {
          window.previousPin.classList.remove('map__pin--active');
        }
        window.previousPin = activePin;
        if (!activePin.classList.contains('map__pin--main')) {
          window.renderAdvert(window.adverts[activePin.dataset.index]);
          window.openPopup();
        }
        return;
      }
      activePin = activePin.parentNode;
    }
  };

  // клик на маркер
  mapPins.addEventListener('click', window.onPinClick);
})();
