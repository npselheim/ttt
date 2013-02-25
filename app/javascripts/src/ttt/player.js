/*global MyApp, jQuery, $ */


MyApp.player =  {

    mark: null,

    makeMove: function (name) {
        "use strict";

        var that = this;

        return function (x, mark, grid) {
            var move;

            if (mark === that.mark) {
                // setTimeout(function () {
                    move = MyApp.strategy.getNextMove(grid);
                // }, 500)
                setTimeout(function () {
                    jQuery("td#cell" + move).click();
                }, 200);

            }
        };
    },

    setup: function (playerMark) {
        "use strict";

        this.mark = playerMark;
        $.subscribe("grid-update", this.makeMove("grid-update"));
    },

    reset: function () {
        "use strict";

        $.unsubscribe("grid-update");
    }
};