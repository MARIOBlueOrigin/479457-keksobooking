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

// код клавиш
var ESC_KEYCODE = 27;

// элементы шаблона
var similarMapCardTemplate = document.querySelector('template').content;
var mapCardTemplate = similarMapCardTemplate.querySelector('article.map__card');
var advertElement = mapCardTemplate.cloneNode(true);

// главная часть страницы - карта
var map = document.querySelector('.map');

// пины
var mapPins = document.querySelector('.map__pins');

// центральный пин
var mapPinMain = map.querySelector('.map__pin--main');

// закрытие объявления
var popupClose = advertElement.querySelector('.popup__close');

//  форма
var form = document.querySelector('.notice__form');

var previousPin = null;


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

// функция собирает DOM-элементы, соответствующие меткам на карте
var createMapPin = function (pin, i) {
  var mapPin = similarMapCardTemplate.querySelector('.map__pin').cloneNode(true);
  mapPin.style.top = pin.location.y + 'px';
  mapPin.style.left = pin.location.x + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;
  mapPin.setAttribute('data-index', i);
  return mapPin;
};

// функция  создает фрагмент с сгенерированными DOM-элементами в блоке .map__pins
var renderPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createMapPin(adverts[i], i));
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
var renderAdvert = function (advert) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createAdvertElement(advert));
  map.appendChild(fragment);
};

// переменная сохраняет результат функции
var adverts = generateAdverts(ADVERT_COUNT);

// ______________________________________________
//
// сценарии взаимодействия пользователя с сайтом
// ______________________________________________

// функция, назначающая полям формы атрибут disabled
var toggleForm = function (disabled) {
  for (var i = 0; i < form.querySelectorAll('fieldset').length; i++) {
    if (disabled) {
      form.querySelectorAll('fieldset')[i].setAttribute('disabled', true);
    } else {
      form.querySelectorAll('fieldset')[i].removeAttribute('disabled');
    }
  }
};
toggleForm(true);

// функция, активирующая карту
var activateMap = function () {
  map.classList.remove('map--faded');
  renderPins(adverts);
  toggleForm();
  form.classList.remove('notice__form--disabled');
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
var openPopup = function () {
  advertElement.classList.remove('hidden');
  popupClose.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onPopupEscPress);
};

// функция, закрывающая объявление
var closePopup = function () {
  advertElement.classList.add('hidden');
  previousPin.classList.remove('map__pin--active');
  document.removeEventListener('keydown', onPopupEscPress);
};

// показ/ скрытие объявления
var onPinClick = function (evt) {
  var activePin = evt.target;

  while (activePin !== mapPins) {
    if (activePin.tagName === 'BUTTON') {
      activePin.classList.add('map__pin--active');
      if (previousPin) {
        previousPin.classList.remove('map__pin--active');
      }
      previousPin = activePin;
      if (!activePin.classList.contains('map__pin--main')) {
        renderAdvert(adverts[activePin.dataset.index]);
        openPopup();
      }
      return;
    }
    activePin = activePin.parentNode;
  }
};

// скрытие объявления
advertElement.classList.add('hidden');

// событие mouseup
mapPinMain.addEventListener('mouseup', activateMap);
// клик на маркер
mapPins.addEventListener('click', onPinClick);


