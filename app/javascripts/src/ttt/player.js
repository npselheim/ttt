/*global MyApp, jQuery, $ */


MyApp.player = (function () {
    "use strict";

    var myMark = null,
    strategy = MyApp.strategy;

    return {

        makeMove: function (name) {
            var that = this;

            return function (x, moveMark, grid) {
                var move;
                if (moveMark === myMark) {
                    move = strategy.getNextMove(grid);
                    jQuery("td#cell" + move).click();
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