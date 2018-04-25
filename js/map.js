'use strict';
var PIN_COUNT = 8;
var titleOffers = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeOffers = [
  'flat',
  'bungalo',
  'house',
  'palace',
];
var checkinOffers = [
  '12:00',
  '13:00',
  '14:00'
];
var checkoutOffers = [
  '12:00',
  '13:00',
  '14:00'
];
var photosOffers = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var featuresOffers = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
// Генерация случайных целых чисел
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// Получить случайный порядок в массиве
var getArrayRandom = function (arr) {
  var randomSort = function () {
    return Math.random() - 0.5;
  };
  return arr.sort(randomSort);
};
// Создание элементов
var createElement = function(tag, tagClass, text) {
  var element = document.querySelector(tag);
  element.classList.add(tagClass);
  if (text) {
    element.textContent = text;
  }
  return element;
};
// Получить случайный длинны массив
var getRandomLengthArray = function(arr) {
  var newLength = Math.floor(Math.random() *  arr.length);
  var newArray = arr.contact();

  for (var i = 0; i < arr.length - newLength; ++i) {
    newArray.splice(Math.floor(Math.random() * newArray.length), 1);
  }
  return newArray;
};
// Временное удаление класса
var sectionMap = document.querySelector('.map');
var closeOverlay = function () {
  sectionMap.classList.remove('map--faded');
};
closeOverlay();
