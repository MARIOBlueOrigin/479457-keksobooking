'use strict';

var ADVERT_COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var coordinatesX = [];
var coordinatesY = [];

var similarMapCardTemplate = document.querySelector('template').content;
var mapCardTemplate = similarMapCardTemplate.querySelector('article.map__card');

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getUniqueIndex = function (array) {
  var index = getRandomIndex(0, array.length - 1);
  return array.splice(index, 1);
};

var getPictureNumber = function (value) {
  numbers = [];
  for (var i = 1; i <= value; i++) {
    numbers.push('0' + i);
  }
  return numbers;
};
var numbers = getPictureNumber();

var findCoordinates = function () {
  for (var i = 0; i < ADVERT_COUNT; i++) {
    coordinatesX.push(getRandomIndex(300, 900) + 40);
    coordinatesY.push(getRandomIndex(100, 500) + 40);
  }
};

var generateAdverts = function () {
  var adverts = [];
  for (var i = 0; i < ADVERT_COUNT; i++) {
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user' + getUniqueIndex(numbers) + '.png'
      },
      'offer': {
        'title': '' + getUniqueIndex(TITLES),
        'address': '' + findCoordinates(coordinatesX) + '' + findCoordinates(coordinatesY),
        'price': getRandomIndex(1000, 1000000),
        'type': '' + getRandomIndex(HOTEL_TYPES),
        'rooms': getRandomIndex(1, 5),
        'guests': getRandomIndex(1, 10),
        'checkin': '' + getRandomIndex(CHECK_TIMES),
        'checkout': '' + getRandomIndex(CHECK_TIMES),
        'features': '' + getRandomIndex(FEATURES),
        'description': '',
        'photos': []

      },
      'location': {
        'x': coordinatesX[i],
        'y': coordinatesY[i]
      }
    });
  }
  return adverts;
};

var createElement = function () {
  var advertElement = document.createElement('button');
  advertElement.setAttribute('class', 'map__pin');
  advertElement.setAttribute('style', 'left: ' + generateAdverts.location.x + 'px; top: ' + generateAdverts.location.y + 'px;');
  advertElement.setAttribute.innerHTML = '<img width="40" height="40" draggable="false">';
  advertElement.querySelector('img').setAttribute('src', generateAdverts.author.avatar);
  return advertElement;
};

var createAdverts = function () {
  var advertFeature = mapCardTemplate.cloneNode(true);
};

var pasteAdverts = generateAdverts();
var fragment = document.createDocumentFragment();
for (var i = 0; i < ADVERT_COUNT.length; i++) {
  fragment.appendChild(pasteAdverts());
}
map.appendChild(fragment);
mapPins.appendChild(fragment);
