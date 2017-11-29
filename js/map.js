'use strict';

// кол-во пинов
var PIN_COUNT = 8;

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
var generateAdverts = function () {
  var adverts = [];
  for (var i = 0; i < ADVERT_COUNT; i++) {
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
var createMapPin = function () {
  var mapPin = similarMapCardTemplate.querySelector('.map__pin').cloneNode(true);
  mapPin.style.top = generateAdverts.location.y + 'px';
  mapPin.style.left = generateAdverts.location.x + 'px';
  mapPin.querySelector('img').src = generateAdverts.author.avatar;
  return mapPin;
};

// функция  создает фрагмент с сгенерированными DOM-элементами в блоке .map__pins
var arrayMapPin = generateAdverts();
var generateAdMark = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayMapPin.length; i++) {
    fragment.appendChild(createMapPin(arrayMapPin[i]));
  }
  mapPins.appendChild(fragment);
};

//  функция создает DOM-элемент шаблона (template) 'article.map__card'
var createAdvert = function () {
  var advertFeature = mapCardTemplate.cloneNode(true);
  // функция, выводящая li
  var getFeatures = function (features) {
    var featureItem = document.createDocumentFragment();
    for (var j = 0; j < features.length; j++) {
      var newLi = document.createElement('li');
      newLi.className = 'feature feature--' + features[j];
      featureItem.appendChild(newLi);
    }
    advertFeature.appendChild(newLi);
  };
  advertFeature.querySelector('h3').textContent = generateAdverts.offer.title;
  advertFeature.querySelector('small').textContent = generateAdverts.offer.address;
  advertFeature.querySelector('.popup__price').textContent = generateAdverts.offer.price + ' ' + String.fromCharCode(8381) + ' / ночь';
  advertFeature.querySelector('h4').textContent = advertFeature.querySelector('h4').textContent = OFFER_TYPES[generateAdverts.type];
  advertFeature.querySelector('p')[3].textContent = generateAdverts.offer.rooms + ' комнаты для ' + generateAdverts.offer.guests;
  advertFeature.querySelector('p')[4].textContent = 'Заезд после ' + generateAdverts.offer.checkin + ', выезд до ' + generateAdverts.offer.checkout;
  advertFeature.querySelector('p')[5].textContent = generateAdverts.offer.description;
  getFeatures(generateAdverts.offer.features);
  advertFeature.querySelector('.popup__avatar').setAttribute('src', generateAdverts.author.avatar);
  return advertFeature;
};

var similarMapCardTemplate = document.querySelector('template').content;
var mapCardTemplate = similarMapCardTemplate.querySelector('article.map__card');

// у блока .map убераем класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// функция создает фрагмент с сгенерированными DOM-элементами в блоке .map
var generateMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADVERT_COUNT.length; i++) {
    fragment.appendChild(createAdvert(arrayMapPin[i]));
  }
  map.appendChild(fragment);
};

// вызов функций
generateAdMark(PIN_COUNT);
generateMap(ADVERT_COUNT);
