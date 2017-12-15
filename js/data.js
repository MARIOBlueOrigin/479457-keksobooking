'use strict';

(function () {
  // данные из ТЗ
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
  var HOTEL_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  // кол-во объявлений
  var ADVERT_COUNT = 8;

  // координаты пинов
  var PIN_X_MIN = 300;
  var PIN_X_MAX = 900;
  var PIN_X_SIZE = 40;
  var PIN_Y_MIN = 100;
  var PIN_Y_MAX = 500;
  var PIN_Y_SIZE = 40;

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

  // получение массива с features
  var getArrayFeatures = function (features) {
    var arrayFeatures = [];
    var featuresCount = getRandomIndex(1, features.length);
    for (var j = 0; j < featuresCount; j++) {
      arrayFeatures.push(features[j]);
    }
    return arrayFeatures;
  };

  //  функция собирает объявления
  window.generateAdverts = function (count) {
    var adverts = [];
    for (var i = 0; i < count; i++) {
      var x = (getRandomIndex(PIN_X_MIN, PIN_X_MAX) + PIN_X_SIZE);
      var y = (getRandomIndex(PIN_Y_MIN, PIN_Y_MAX) + PIN_Y_SIZE);
      adverts.push({
        'author': {
          'avatar': 'img/avatars/user' + getUniqueItem(numbers) + '.png'
        },
        'offer': {
          'title': getUniqueItem(titles),
          'price': getRandomIndex(PRICE_MIN, PRICE_MAX),
          'address': x + ', ' + y,
          'type': HOTEL_TYPES[getRandomIndex(0, HOTEL_TYPES.length - 1)],
          'rooms': getRandomIndex(ROOMS_MIN, ROOMS_MAX),
          'guests': getRandomIndex(GUESTS_MIN, GUESTS_MAX),
          'checkin': CHECK_TIMES[getRandomIndex(0, CHECK_TIMES.length - 1)],
          'checkout': CHECK_TIMES[getRandomIndex(0, CHECK_TIMES.length - 1)],
          'features': getArrayFeatures(FEATURES),
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

  // переменная сохраняет результат функции
  window.adverts = window.generateAdverts(ADVERT_COUNT);
})();
