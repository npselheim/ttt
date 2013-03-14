// javascripts/src/ttt/controller.js

/*jslint indent: 4, maxlen: 80 */
/*global document, jQuery, $ */

/**
 * MyApp is the single global variable that contains all the objects for
 * the tic-tac-toe application.
 * @type {Object}
 */
var MyApp = MyApp || {};

MyApp.controller = (function () {
    "use strict";

    var mark =  null,
        grid =  null,
        view =  null,
        player = null;

    return {

        processMove: function (e) {

            // console.log("processMove");

            var index = e.target.id.charAt(4),
                row = null;

            // reject a click on an occupied cell
            if (!grid.update(index, mark)) {
                return false;
            }

            // show the player's move on the grid
            view.showMove(index, mark);

            // check to see if anybody has won yet
            row = grid.findWinningRow(mark);
            if (row !== null) {     // we have a winner!
                view.formatWinningRow(row);
                view.showStatus("We have a winner!");
                view.disableGrid();
                return false;
            }

            // check to see if the game is drawn
            if (grid.isFull()) {    // we have a draw...
                view.showStatus("Draw! Nobody wins! Try again?");
                view.disableGrid();
                return false;
            }

            mark = (mark === "X") ? "O" : "X";
            view.showStatus("Now it's " + mark + "'s turn to move");
            $.publish("grid-update", [mark, grid]);
            return false;
        },

        start: function (e) {

            // console.log("start");

            // clean up any leftovers from a previous game
            mark = "X";
            view.reset();
            player.reset();
            grid.reset();

            if (view.getMode() === "1") {
                player.setup(view.getPlayerMark());
            }

            view.enableGrid(e.data.ctlr.processMove);
            view.showStatus("Game started: X moves first");
            $.publish("grid-update", [ mark, grid ]);
            return false;
        },

        init: function (aGrid, aView, aPlayer) {

            // console.log("controller init");

            grid = aGrid;
            view = aView;
            player = aPlayer;

            view.reset();
            jQuery(".startBtn").click({ctlr: this}, this.start);
            view.showStatus("Click the start button to play (or reset)");
        }
    };
}());

jQuery(document).ready(function () {
    "use strict";
    MyApp.controller.init(MyApp.grid, MyApp.view, MyApp.player);
});