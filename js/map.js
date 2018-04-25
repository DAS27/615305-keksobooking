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
// Генерация карточек
var generateCards = function (quantity) {
  var cards = [];
  var sortTitle = getArrayRandom(titleOffers);

  for (var i = 0; i < quantity; i++) {
    cards[i] = {
      author: {
        avatar: 'img/avatar/user0' + (i + 1) + '.png'
      },
      offer: {
        title: sortTitle[i],
        price: getRandomInteger(1000, 1000000),
        type: typeOffers[getRandomInteger(0, typeOffers.lenght)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 20),
        chechin: checkinOffers[getRandomInteger(0, checkinOffers.length)],
        checkout: checkoutOffers[getRandomInteger(0, checkoutOffers.length)],
        features: getRandomLengthArray(featuresOffers),
        description: '',
        photos: getArrayRandom(photosOffers)
      },
      location: {
        x: getRandomInteger(300, 900),
        y: getRandomInteger(150, 500)
      }
    };
    cards[i].offer.address = cards[i].location.x + ',' + cards[i].location.y;
  }
  return cards;
};

var cardsData = generateCards(PIN_COUNT);

var map = document.querySelector('.map');
var pins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var filters = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('template').content.querySelector('.popup');
var fragment = document.createDocumentFragment();

var makePin = function (dataArray) {
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');
  var pinWidth = 50;
  var pinHeight = 70;
  var pinXY = 'left: ' + (dataArray.location.x + pinWidth / 2) + 'px; ' + 'top: ' + (dataArray.location.y + pinHeight) + 'px';

  pin.style = pinXY;
  pinImg.src = dataArray.author.avatar;
  pinImg.alt = dataArray.offer.title;

  return pin;
};

var makeCard =
