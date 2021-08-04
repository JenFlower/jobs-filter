"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var switcher = document.querySelector('.switch-block__switcher');
var filter = document.querySelector('.filter');

var filterInput = _toConsumableArray(document.querySelectorAll('.filter__input'));

var main = document.querySelector('.main');
var header = document.querySelector('.header');
switcher.addEventListener('click', function (evt) {
  console.log('click');
  evt.target.classList.toggle('switch-block__switcher_on');

  if (evt.target.classList.contains('switch-block__switcher_on')) {
    filterInput.forEach(function (item) {
      item.style.backgroundColor = "#19202D";
      item.style.color = "#fff";
    });
    main.style.backgroundColor = "#121721";
    header.style.backgroundColor = "#121721";
  } else {
    filterInput.forEach(function (item) {
      item.style.backgroundColor = "#fff";
      item.style.color = "#19202D";
    });
    main.style.backgroundColor = "#F4F6F8";
    header.style.backgroundColor = "#F4F6F8";
  }
});