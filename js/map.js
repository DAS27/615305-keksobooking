'use strict';

var PIN_COUNT = 8;
var MAP = {
  'left': 300,
  'top': 150,
  'right': 900,
  'bottom': 500
};
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 50;
var offersTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offersType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var offersChickIn = ['12:00', '13:00', '14:00'];
var offersChickOut = ['12:00', '13:00', '14:00'];
var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var randomSort = function () {
  return Math.random() - 0.5;
};
//  Случайное целое число
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
//  Случайный порядок в массиве
var getRandomSubarray = function (arr) {
  var copyArr = arr.sort(randomSort);
  return copyArr.slice(0, 1 + Math.floor(Math.random() * arr.length));
};
var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
var getSortArray = function (arr) {
  return arr.slice(0).sort(randomSort);
};

var offers = [];
var getOffers = function () {
  for (var i = 0; i < PIN_COUNT; ++i) {
    var coordinateX = getRandom(MAP.left, MAP.right);
    var coordinateY = getRandom(MAP.top, MAP.bottom);

    offers.push({
      'author': {
        'avatar': 'img/avatar/user0' + (i + 1) + '.png',
      },

      'offer': {
        'title': offersTitle.sort(randomSort)[i],
        'adress': coordinateX + ',' + coordinateY,
        'price': getRandom(PRICE_MIN, PRICE_MAX),
        'type': getRandomElement(offersType),
        'rooms': getRandom(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandom(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomElement(offersChickIn),
        'checkout': getRandomElement(offersChickOut),
        'features': getRandomSubarray(offersFeatures),
        'description': '',
        'photos': getSortArray(offerPhotos)
      },

      'location': {
        'x': coordinateX,
        'y': coordinateY
      }
    });
  }
};

getOffers(PIN_COUNT);

var sectionMap = document.querySelector('.map');
var closeOverlay = function () {
  sectionMap.classList.remove('map--faded');
};

closeOverlay();
