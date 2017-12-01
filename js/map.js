'use strict';

// координаты пинов
var PIN_X_MIN = 300;
var PIN_X_MAX = 900;
var PIN_X_SIZE = 40;
var PIN_Y_MIN = 100;
var PIN_Y_MAX = 500;
var PIN_Y_SIZE = 40;

// кол-во объявлений
var ADVERT_COUNT = 8;

// данные объявлений
var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;

// функция генерирует случайное число
var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция генерирует случайное неповторяющееся число
var getUniqueItem = function (array) {
  var index = getRandomIndex(0, array.length - 1);
  return array.splice(index, 1);
};

// функция определяет номера изображений
var getPictureNumber = function (value) {
  numbers = [];
  for (var i = 1; i <= value; i++) {
    numbers.push('0' + i);
  }
  return numbers;
};
// сохраняем в переменную определение номеров изображений
var numbers = getPictureNumber(ADVERT_COUNT);

//  функция собирает объявления
var generateAdverts = function (count) {
  var adverts = [];
  for (var i = 0; i < count; i++) {
    var x = (getRandomIndex(PIN_X_MIN, PIN_X_MAX) + PIN_X_SIZE);
    var y = (getRandomIndex(PIN_Y_MIN, PIN_Y_MAX) + PIN_Y_SIZE);
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user' + getUniqueItem(numbers) + '.png'
      },
      'offer': {
        'title': '' + getUniqueItem(titles),
        'price': getRandomIndex(PRICE_MIN, PRICE_MAX),
        'address': x + ', ' + y,
        'type': '' + getRandomIndex(HOTEL_TYPES),
        'rooms': getRandomIndex(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomIndex(GUESTS_MIN, GUESTS_MAX),
        'checkin': '' + getRandomIndex(CHECK_TIMES),
        'checkout': '' + getRandomIndex(CHECK_TIMES),
        'features': '' + getRandomIndex(FEATURES),
        'description': '',
        'photos': []
      },
      'location': {
        'x': x,
        'y': y
      }
    });
  }
  return adverts;
};

// функция собирает DOM-элементы, соответствующие меткам на карте
var createMapPin = function (pin) {
  var mapPin = similarMapCardTemplate.querySelector('.map__pin').cloneNode(true);
  mapPin.style.top = pin.location.y + 'px';
  mapPin.style.left = pin.location.x + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;
  return mapPin;
};

// функция  создает фрагмент с сгенерированными DOM-элементами в блоке .map__pins
var renderPins = function (adverts) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createMapPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

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
  var advertElement = mapCardTemplate.cloneNode(true);
  advertElement.querySelector('h3').textContent = adverts.offer.title;
  advertElement.querySelector('small').textContent = adverts.offer.address;
  advertElement.querySelector('.popup__price').textContent = adverts.offer.price + ' ' + String.fromCharCode(8381) + ' / ночь';
  advertElement.querySelector('h4').textContent = OFFER_TYPES[adverts.type];
  advertElement.querySelectorAll('h4 + p').textContent = adverts.offer.rooms + ' комнаты для ' + adverts.offer.guests;
  advertElement.querySelectorAll('h4 + p + p').textContent = 'Заезд после ' + adverts.offer.checkin + ', выезд до ' + adverts.offer.checkout;
  advertElement.querySelectorAll('p')[4].textContent = adverts.offer.description;


  var list = advertElement.querySelectorAll('.popup__features')[adverts.offer.features.length];
  for (var j = 0; j < list; j++) {
    advertElement.querySelector('.popup__features').removeChild(list);
  }
  advertElement.querySelectorAll('popup__features').textContent = getFeatures(adverts.offer.features);
  advertElement.querySelector('.popup__avatar').setAttribute('src', adverts.author.avatar);
  return advertElement;
};

var similarMapCardTemplate = document.querySelector('template').content;
var mapCardTemplate = similarMapCardTemplate.querySelector('article.map__card');

// у блока .map убераем класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// функция создает фрагмент с сгенерированными DOM-элементами в блоке .map
var renderAdvert = function (advert) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createAdvertElement(advert));
  map.appendChild(fragment);
};

// переменная сохраняет результат функции
var adverts = generateAdverts(ADVERT_COUNT);

// вызов функций
renderPins(adverts);
renderAdvert(adverts[0]);
