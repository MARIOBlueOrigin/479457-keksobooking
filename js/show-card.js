'use strict';

(function () {

  function showCard(evt) {
    var target = evt.target;
    while (target !== window.mapPins) {
      if (target.tagName === 'BUTTON') {
        target.classList.add('map__pin--active');
        if (window.previousPin) {
          window.previousPin.classList.remove('map__pin--active');
        }
        window.previousPin = target;
        if (!target.classList.contains('map__pin--main')) {
          window.renderAdvert(window.adverts[target.dataset.index]);
          window.openPopup();
        }
        return;
      }
      target = target.parentNode;
    }
  }
  window.showCard = showCard();

})();

