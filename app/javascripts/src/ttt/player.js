/*global MyApp, jQuery, $ */


MyApp.player =  {

    mark: null,

    makeMove: function (name) {
        "use strict";

        var that = this;

        return function (x, mark, grid) {
            var move;

            if (mark === that.mark) {
                move = MyApp.strategy.getNextMove(grid);

                jQuery("td#cell" + move).click();
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