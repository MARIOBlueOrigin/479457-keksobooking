'use strict';

(function () {
  // главная часть страницы - карта
  var map = document.querySelector('.map');
  // элементы шаблона
  var similarMapCardTemplate = document.querySelector('template').content;
  var mapCardTemplate = similarMapCardTemplate.querySelector('article.map__card');
  var advertElement = mapCardTemplate.cloneNode(true);

  // закрытие объявления
  var popupClose = advertElement.querySelector('.popup__close');

  var OFFER_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // код клавиш
  var ESC_KEYCODE = 27;

  // функция, выводящая li
  var getFeatures = function (features) {
    var featureItem = document.createDocumentFragment();
    for (var j = 0; j < features.length; j++) {
      var newLi = document.createElement('li');
      newLi.className = 'feature feature--' + features[j];
      featureItem.appendChild(newLi);
    }
    return featureItem;
  };

  //  функция создает DOM-элемент шаблона (template) 'article.map__card'
  var createAdvertElement = function (adverts) {
    var advertPopup = advertElement.querySelector('.popup__features');
    advertElement.querySelector('h3').textContent = adverts.offer.title;
    advertElement.querySelector('small').textContent = adverts.offer.address;
    advertElement.querySelector('.popup__price').textContent = adverts.offer.price + ' ' + String.fromCharCode(8381) + ' / ночь';
    advertElement.querySelector('h4').textContent = OFFER_TYPES[adverts.type];
    advertElement.querySelectorAll('p')[2].textContent = adverts.offer.rooms + ' комнаты для ' + adverts.offer.guests;
    advertElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + adverts.offer.checkin + ', выезд до ' + adverts.offer.checkout;
    advertElement.querySelectorAll('p')[4].textContent = adverts.offer.description;
    while (advertPopup.firstChild) {
      advertPopup.removeChild(advertPopup.firstChild);
    }
    advertPopup.appendChild(getFeatures(adverts.offer.features));
    advertElement.querySelector('.popup__avatar').setAttribute('src', adverts.author.avatar);
    return advertElement;
  };

  // функция создает фрагмент с сгенерированными DOM-элементами в блоке .map
  window.renderAdvert = function (advert) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createAdvertElement(advert));
    map.appendChild(fragment);
  };

  // взаимодействие с Esc
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // закрытие объявление по нажатию мышки
  var onCloseClick = function () {
    closePopup();
  };

  // функция, открывающая объявление
  window.openPopup = function () {
    advertElement.classList.remove('hidden');
    popupClose.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция, закрывающая объявление
  var closePopup = function () {
    advertElement.classList.add('hidden');
    window.previousPin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // скрытие объявления
  advertElement.classList.add('hidden');
})();
