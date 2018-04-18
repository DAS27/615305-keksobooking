var arr = [];
var title = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
var type = ["palace", "flat", "house", "bungalo"];
var checkin = ["12:00", "13:00", "14:00"];
var checkout = ["12:00", "13:00", "14:00"];
var features = [
  "wi-fi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];
var photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
function randomGen(arrayInput = []) {
  return Math.floor(Math.random() * arrayInput.length);
}

for (var i = 1; i < 8; i++) {
  var locationX = Math.floor(Math.random() * (900 + 1 - 300)) + 300;
  var locationY = Math.floor(Math.random() * (500 + 1 - 150)) + 150;
arr.push({
  author: { avatar: "img/avatars/user/0" + i + ".png" },
  offer: {
    title: title[i],
    address: locationX + ', ' +locationY,
    price: Math.floor(Math.random() * (1000000 + 1 - 1000)) + 1000,
    type: type[randomGen(type)],
    rooms: Math.floor(Math.random() * (5 + 1 - 1)) + 1,
    guests: Math.floor(Math.random() * (20 + 1 - 2)) + 2,
    checkin: checkin[randomGen(checkin)],
    checkout: checkout[randomGen(checkout)],
    features: features[randomGen(features)],
    description: ""
  },
  location: {
    x: locationX,
    y: locationY,
}
});
}
