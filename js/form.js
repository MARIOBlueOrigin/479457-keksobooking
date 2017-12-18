'use strict';

window.form = (function () {
  //  форма
  var form = document.querySelector('.notice__form');
  var addressElement = form.querySelector('#address');
  var titleElement = form.querySelector('#title');
  var priceElement = form.querySelector('#price');
  var timeinElement = form.querySelector('#timein');
  var timeoutElement = form.querySelector('#timeout');
  var typeElement = form.querySelector('#type');
  var roomElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');

  var MIN_PRACES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Проверка правильности введенных данных
  addressElement.setAttribute('required', true);
  addressElement.setAttribute('readonly', true);

  titleElement.setAttribute('required', true);
  titleElement.setAttribute('minlength', '30');
  titleElement.setAttribute('maxlength', '100');

  priceElement.setAttribute('required', true);
  priceElement.setAttribute('type', 'number');
  priceElement.setAttribute('min', '0');
  priceElement.setAttribute('max', '1000000');
  priceElement.setAttribute('value', '1000');

  // добавление красной рамки
  var setErrorBorder = function (formElement) {
    formElement.style.borderWidth = '2px';
    formElement.style.borderColor = 'red';
  };
  // удаление рамки
  form.addEventListener('input', function (evt) {
    var target = evt.target;
    target.style.border = '';
  });

  addressElement.addEventListener('invalid', function (evt) {
    var target = evt.target;
    target.style.border = setErrorBorder(addressElement);
    return target.validity.valueMissing === true ? target.setCustomValidity('Обязательное поле') : target.setCustomValidity('');
  });

  titleElement.addEventListener('invalid', function (evt) {
    var target = evt.target;
    target.style.border = setErrorBorder(titleElement);
    if (target.validity.tooShort) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Заголовок объявления не должен привышать 100 символов');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  });

  priceElement.addEventListener('invalid', function (evt) {
    var target = evt.target;
    target.style.border = setErrorBorder(priceElement);
    if (target.validity.rangeUnderflow) {
      target.setCustomValidity('Цена меньше допустимого значения');
    } else if (target.validity.rangeOverflow) {
      target.setCustomValidity('Цена не должна превышать 1000000 рублей');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  });

  // функция, назначающая полям формы атрибут disabled
  window.toggleForm = function (disabled) {
    for (var i = 0; i < form.querySelectorAll('fieldset').length; i++) {
      if (disabled) {
        form.querySelectorAll('fieldset')[i].setAttribute('disabled', true);
      } else {
        form.querySelectorAll('fieldset')[i].removeAttribute('disabled');
      }
    }
  };
  window.toggleForm(true);

  // Автоматическая корректировка полей в форме.

  //  «время заезда» и «время выезда»
  timeinElement.addEventListener('change', function () {
    timeoutElement.selectedIndex = timeinElement.selectedIndex;
  });

  timeoutElement.addEventListener('change', function () {
    timeinElement.selectedIndex = timeoutElement.selectedIndex;
  });

  // «Тип жилья» и минимальная цена
  var synchronizeTypes = function () {
    priceElement.setAttribute('min', MIN_PRACES[typeElement.value]);
  };

  typeElement.addEventListener('change', function () {
    synchronizeTypes();
  });

  // Количество комнат связываем с количеством гостей:
  var synchronizeRooms = function (room, capacity) {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = true;
    }
    switch (room.value) {
      case '1':
        capacity.options[2].disabled = false;
        break;
      case '2':
        capacity.options[1].disabled = false;
        capacity.options[2].disabled = false;
        break;
      case '3':
        capacity.options[0].disabled = false;
        capacity.options[1].disabled = false;
        capacity.options[2].disabled = false;
        break;
      case '100':
        capacity.options[3].disabled = false;
        break;
    }
  };

  roomElement.addEventListener('change', function () {
    synchronizeRooms(roomElement, capacityElement);
  });

  // отправка формы
  form.setAttribute('action', 'https://js.dump.academy/keksobooking');
  form.setAttribute('type', 'multipart/form-data');

  // вызов функции
  synchronizeRooms(roomElement, capacityElement);

})();
