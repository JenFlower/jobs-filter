"use strict";

var _Api = _interopRequireDefault(require("../scripts/Api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var switcher = document.querySelector('.switch-block__switcher');

var filterInput = _toConsumableArray(document.querySelectorAll('.filter__input'));

var main = document.querySelector('.main');
var body = document.querySelector('.body');
var header = document.querySelector('.header');
var contentVacationList = document.querySelector('.content__list');
var checkFullTime = document.querySelector('.filter__input_full-time');
var inputLocation = document.querySelector('.filter__input_location');
var commonFilter = document.querySelector('.filter__input_common');

var btnSearch = _toConsumableArray(document.querySelectorAll('.filter__input_submit'));

var btnModal = document.querySelector('.filter__input_modal');

function createVacation(item) {
  var templateVacation = document.querySelector('#content-template').content.querySelector('#content-item');
  var vacation = templateVacation.cloneNode(true);
  var vacationImage = vacation.querySelector('.content__image');
  vacationImage.src = item.img;
  var time = vacation.querySelector('.content__posted_time');
  time.textContent = item.time;
  var clock = vacation.querySelector('.content__posted_clock');
  clock.textContent = item.clock;
  var shedule = vacation.querySelector('.content__shedule');
  shedule.textContent = item.graphik;
  var vacationName = vacation.querySelector('.content__vacation');
  vacationName.textContent = item.vacation;
  var company = vacation.querySelector('.content__company');
  company.textContent = item.company;
  var location = vacation.querySelector('.content__location');
  location.textContent = item.location;
  return vacation;
}

var api = new _Api["default"]();

function addVacation(item) {
  return contentVacationList.append(item);
}

function drawCards() {
  api.getData().then(function (res) {
    contentVacationList.innerHTML = '';
    return filterData(res);
  }).then(function (res) {
    return res.forEach(function (item) {
      addVacation(createVacation(item));
      checkTheme();
    });
  });
} // ?????????????????? ?????????????????? ????????????


function actualFilterStatus() {
  return {
    fulltime: checkFullTime.checked,
    location: inputLocation.value,
    common: commonFilter.value
  };
}

function filterData(res) {
  if (actualFilterStatus().fulltime) {
    return res.filter(function (x) {
      return (x.vacation.toUpperCase().includes(actualFilterStatus().common.toUpperCase()) || x.company.toUpperCase().includes(actualFilterStatus().common.toUpperCase())) && x.location.toUpperCase().includes(actualFilterStatus().location.toUpperCase()) && x.graphik === 'Full Time';
    });
  } else {
    return res.filter(function (x) {
      return (x.vacation.toUpperCase().includes(actualFilterStatus().common.toUpperCase()) || x.company.toUpperCase().includes(actualFilterStatus().common.toUpperCase())) && x.location.toUpperCase().includes(actualFilterStatus().location.toUpperCase());
    });
  }
}

function vacationHover(item, mouse, colorName) {
  item.querySelector('.content__vacation').addEventListener(mouse, function (evt) {
    evt.target.style.color = colorName;
  });
}

function checkTheme() {
  if (switcher.classList.contains('switch-block__switcher_on')) {
    filterInput.forEach(function (item) {
      item.style.backgroundColor = "#19202D";
      item.style.color = "#fff";
    });
    document.querySelectorAll('#content-item').forEach(function (item) {
      item.querySelector('.content__vacation').style.color = "#fff";
      item.style.backgroundColor = "#19202D";
      vacationHover(item, 'mouseover', "#6E8098");
      vacationHover(item, 'mouseout', "#fff");
    });
    body.style.backgroundColor = "#121721";
    header.style.backgroundColor = "#121721";
  } else {
    filterInput.forEach(function (item) {
      item.style.backgroundColor = "#fff";
      item.style.color = "#19202D";
    });
    document.querySelectorAll('#content-item').forEach(function (item) {
      item.querySelector('.content__vacation').style.color = "#19202D";
      item.style.backgroundColor = "#fff";
      vacationHover(item, 'mouseover', "#6E8098");
      vacationHover(item, 'mouseout', "#19202D");
    });
    body.style.backgroundColor = "#F4F6F8";
    header.style.backgroundColor = "#F2F2F2";
  }
}

switcher.addEventListener('click', function (evt) {
  evt.target.classList.toggle('switch-block__switcher_on');
  checkTheme();
});
btnSearch.forEach(function (item) {
  return item.addEventListener('click', function (evt) {
    evt.preventDefault();
    drawCards();
  });
}); // btnModal.addEventListener(() => {
// })

drawCards();