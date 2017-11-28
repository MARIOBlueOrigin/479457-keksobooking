'use strict';

var ADVERT_COUNT = 8;
var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
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

var getUniqueItem = function (array) {
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
var numbers = getPictureNumber(ADVERT_COUNT);

var findCoordinates = function () {
  for (var i = 0; i < ADVERT_COUNT; i++) {
    coordinatesX.push(getRandomIndex(300, 900) + 40);
    coordinatesY.push(getRandomIndex(100, 500) + 40);
  }
};

var generateAdverts = function () {
  var adverts = [];
  for (var i = 0; i < ADVERT_COUNT; i++) {
    var x = coordinatesX[i];
    var y = coordinatesY[i];
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user' + getUniqueItem(numbers) + '.png'
      },
      'offer': {
        'title': '' + getUniqueItem(titles),
        'price': getRandomIndex(1000, 1000000),
        'address': x + ', ' + y,
        'type': '' + getRandomIndex(HOTEL_TYPES),
        'rooms': getRandomIndex(1, 5),
        'guests': getRandomIndex(1, 10),
        'checkin': '' + getRandomIndex(CHECK_TIMES),
        'checkout': '' + getRandomIndex(CHECK_TIMES),
        'features': '' + getRandomIndex(features),
        'description': '',
        'photos': []

      },
      'location': {
        'x': findCoordinates(coordinatesX[i]),
        'y': findCoordinates(coordinatesY[i])
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

  var deduceTypes = function (offerTypes) {
    offerTypes = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    return offerTypes;
  };

  advertFeature.querySelector('h3').textContent = generateAdverts.offer.title;
  advertFeature.querySelector('small').textContent = generateAdverts.offer.address;
  advertFeature.querySelector('.popup__price').textContent = generateAdverts.offer.price + ' ' + String.fromCharCode(8381) + ' / ночь';
  advertFeature.querySelector('h4').textContent = deduceTypes(generateAdverts.offer.type);
  advertFeature.querySelector('p')[4].textContent = 'Заезд после ' + generateAdverts.offer.checkin + ', выезд до ' + generateAdverts.offer.checkout;
  advertFeature.querySelector('p')[5].textContent = generateAdverts.offer.description;
  advertFeature.querySelector('.popup__avatar').setAttribute('src', generateAdverts.author.avatar);

  return advertFeature;
};

var pasteAdverts = generateAdverts();
var fragment = document.createDocumentFragment();
for (var i = 0; i < ADVERT_COUNT.length; i++) {
  fragment.appendChild(createAdverts(pasteAdverts[i]));
}
map.appendChild(fragment);
mapPins.appendChild(fragment);
