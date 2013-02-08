var MYAPP = {};

MYAPP.ttt = (function () {
    'use strict';

    var startBtn = document.getElementById('startBtn'),
        myGame = null;

    console.log(clickUtils);
    for (var key in clickUtils) {
        console.log(key);
    }
    console.log(clickUtils);

    // set up utility functions
    if (typeof window.addEventListener === 'function') {
        clickUtils.addListener = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        clickUtils.removeListener = function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else if (typeof document.attachEvent === 'function') {    // IE
        clickUtils.addListener = function (el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        clickUtils.removeListener = function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    } else {    // older browsers
        clickUtils.addListener = function (el, type, fn) {
            el['on' + type] = fn;
        };
        clickUtils.removeListener = function (el, type, fn) {
            el['on' + type] = null;
        };
    }

    // set click event for the start button
    myGame = game();
    clickUtils.addListener(startBtn, 'click', myGame.start);

}());