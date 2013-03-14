// javascripts/src/ttt/player.js

/*jslint indent: 4, maxlen: 80 */
/*global MyApp, jQuery, $ */

var MyApp = MyApp || {};

MyApp.player = (function () {
    "use strict";

    var myMark = null,
        strategy = MyApp.strategy;

    return {

        makeMove: function (name) {

            return function (x, moveMark, grid) {
                var move;
                if (moveMark === myMark) {
                    move = strategy.getNextMove(grid);
                    jQuery("#cell" + move).click();
                }
            };
        },

        setup: function (playerMark) {
            myMark = playerMark;
            $.subscribe("grid-update", this.makeMove("grid-update"));
        },

        reset: function () {
            $.unsubscribe("grid-update");
        }
    };

}());