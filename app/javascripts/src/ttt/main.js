var MyApp = MyApp || {};

MyApp.ttt = function () {
    'use strict';

    var startBtn = $('startBtn'),
        status = $('status'),
        myGame, myGrid, myPlayers;

    // // set up utility functions
    // if (typeof window.addEventListener === 'function') {
    //     clickUtils.addListener = function (el, type, fn) {
    //         el.addEventListener(type, fn, false);
    //     };
    //     clickUtils.removeListener = function (el, type, fn) {
    //         el.removeEventListener(type, fn, false);
    //     };
    // } else if (typeof document.attachEvent === 'function') {    // IE
    //     clickUtils.addListener = function (el, type, fn) {
    //         el.attachEvent('on' + type, fn);
    //     };
    //     clickUtils.removeListener = function (el, type, fn) {
    //         el.detachEvent('on' + type, fn);
    //     };
    // } else {    // older browsers
    //     clickUtils.addListener = function (el, type, fn) {
    //         el['on' + type] = fn;
    //     };
    //     clickUtils.removeListener = function (el, type, fn) {
    //         el['on' + type] = null;
    //     };
    // }


    // // set click event for the start button
    // myGrid = grid();
    // myPlayers = [player('X'), player('O')];
    // myGame = game(myGrid, myPlayers, status);
    // // clickUtils.addListener(startBtn, 'click', myGame.start);
    // myGame.start();
    // status.innerHTML = "Ready to start";
};