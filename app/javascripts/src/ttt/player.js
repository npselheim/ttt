/*global MyApp, jQuery, $ */


MyApp.player = (function () {
    "use strict";

    var myMark = null,
    strategy = MyApp.strategy;

    return {

        makeMove: function (name) {
            var that = this;

<<<<<<< HEAD
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
=======
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
>>>>>>> refs/heads/display
