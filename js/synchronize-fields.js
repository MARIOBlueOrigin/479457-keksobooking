'use strict';

(function () {
  window.synchronizeFields = function (firstElement, secondElement, firstValue, secondValue, callbackSync) {
    var valueIndex = firstValue.indexOf(firstElement.value);
    callbackSync(secondElement, secondValue[valueIndex]);
  };
})();
