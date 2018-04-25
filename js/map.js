'use strict';

var blockMap = document.querySelector('.map');
var closeOverlay = function () {
  blockMap.classList.remove('map--faded');
};
closeOverlay();

var PIN_COUNT = 8;

var titlesOffer = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeOffer = [
  'flat',
  'bungalo',
  'house',
  'palace',
];

var checkinOffer = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutOffer = [
  '12:00',
  '13:00',
  '14:00'
];

var photosOffer = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var featuresOffer = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var sortArrayRandom = function (arr) {
  var sortingAlgorithm = function () {
    return Math.random() - 0.5;
  };
  return arr.sort(sortingAlgorithm);
};

var createNewElement = function (tag, tagClass, text) {
  var element = document.createElement(tag);
  element.classList.add(tagClass);
  if (text) {
    element.textContent = text;
  }

  return element;
};

var getRandomLengthArray = function (arr) {
  var newLength = Math.floor(Math.random() * arr.length);
  var newArray = arr.concat();

  for (var i = 0; i < arr.length - newLength; i++) {
    newArray.splice(Math.floor(Math.random() * newArray.length), 1);
  }

  return newArray;
};

var generateCards = function (quantity) {
  var cards = [];
  var shuffledOffersTitle = sortArrayRandom(titlesOffer);

  for (var i = 0; i < quantity; i++) {
    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: shuffledOffersTitle[i],
        price: getRandomNumber(1000, 1000000),
        type: typeOffer[getRandomNumber(0, typeOffer.length)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: checkinOffer[getRandomNumber(0, checkinOffer.length)],
        checkout: checkoutOffer[getRandomNumber(0, checkoutOffer.length)],
        features: getRandomLengthArray(featuresOffer),
        description: '',
        photos: sortArrayRandom(photosOffer)
      },

      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      }
    };
    cards[i].offer.address = cards[i].location.x + ', ' + cards[i].location.y;
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

var makeCard = function (dataArray) {
  var card = cardTemplate.cloneNode(true);
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDesc = card.querySelector('.popup__description');
  var cardPhoto = card.querySelector('.popup__photos');

  cardTitle.textContent = dataArray.offer.title;
  cardAddress.textContent = dataArray.offer.address;
  cardPrice.textContent = dataArray.offer.price + ' ₽/ночь';

  switch (dataArray.offer.type) {
    case 'flat':
      cardType.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardType.textContent = 'Бунгало';
      break;
    case 'house':
      cardType.textContent = 'Дом';
      break;
    case 'palace':
      cardType.textContent = 'Дворец';
  }

  cardCapacity.textContent = dataArray.offer.rooms + ' комнат для ' + dataArray.offer.guests + ' гостей';
  cardTime.textContent = 'заезд после ' + dataArray.offer.checkin + ', ' + 'выезд до ' + dataArray.offer.checkout;

  for (var i = 0; i < dataArray.offer.features.length; i++) {
    var popupFeature = createNewElement('li', 'popup__feature');
    popupFeature.classList.add('popup__feature--' + dataArray.offer.features[i]);
    cardFeatures.appendChild(popupFeature);
  }

  cardDesc.textContent = dataArray.offer.description;

  for (i = 0; i < dataArray.offer.photos.length; i++) {
    var cardImg = createNewElement('img', 'popup__photo');
    cardImg.width = 45;
    cardImg.height = 40;
    cardImg.src = dataArray.offer.photos[i];
    cardPhoto.appendChild(cardImg);
  }

  return card;
};

var renderPins = function () {
  for (var i = 0; i < cardsData.length; i++) {
    fragment.appendChild(makePin(cardsData[i]));
  }
  pins.appendChild(fragment);
};

renderPins();

var renderCards = function () {
  map.insertBefore(makeCard(cardsData[0]), filters);
};

renderCards();
