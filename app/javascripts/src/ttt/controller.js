/*global document, jQuery, $ */

var MyApp = {};

MyApp.controller = (function () {
    "use strict";

<<<<<<< HEAD
    var $startBtn = jQuery("input#startBtn"),
        $grid = jQuery("div#grid"),
        $mode = jQuery('input[name="modeGroup"]'),
        $xo = jQuery('input[name="xoGroup"]'),
        // mode,
        mark,
        grid = null,
        display =null,
        player = MyApp.player,
        playerMark,

        processMove = function (e) {
            // var cell = e.target.id,
                // $cell = jQuery("td#" + cell),
=======
    var mark = null,
        grid = null,
        view =null,
        player = null;

    return {

        processMove: function (e) {
>>>>>>> refs/heads/display
            var index = e.target.id.charAt(4),
                row = null;

            // reject a click on an occupied cell
            if (!grid.update(index, mark)) {
                return false;
            }

            // show the player's move on the grid
<<<<<<< HEAD
            // $cell.text(mark);
            display.showMove(index, mark);

            // check to see if anybody has won yet
            row = grid.findWinningRow(mark);
            if (row !== null) {
                // we have a winner!
                display.formatWinningRow(row);
                display.showStatus("We have a winner!");
                gameOver();
=======
            view.showMove(index, mark);

            // check to see if anybody has won yet
            row = grid.findWinningRow(mark);
            if (row !== null) {     // we have a winner!
                view.formatWinningRow(row);
                view.showStatus("We have a winner!");
                view.disableGrid();
>>>>>>> refs/heads/display
                return false;
            }

            // check to see if the game is drawn
<<<<<<< HEAD
            if (grid.isFull()) {
                // we have a draw...
                display.showStatus("Draw! Nobody wins! Try again?");
                gameOver();
=======
            if (grid.isFull()) {    // we have a draw...
                view.showStatus("Draw! Nobody wins! Try again?");
                view.disableGrid();
>>>>>>> refs/heads/display
                return false;
            }

            mark = (mark === "X") ? "O" : "X";
<<<<<<< HEAD
            display.showStatus("Now it's " + mark + "'s turn to move");
=======
            view.showStatus("Now it's " + mark + "'s turn to move");
>>>>>>> refs/heads/display
            $.publish("grid-update", [mark, grid]);
            return false;
        },

        gameOver: function () {
            $grid.off("click");
        },

        start: function (e) {
            // clean up any leftovers from a previous game
            mark = "X";
<<<<<<< HEAD
            display.reset();
            player.reset();
            grid = MyApp.grid();
        },

        start = function () {
            // clean up any leftovers from a previous game
            reset();

            if (display.getMode() === "1") {
                player.setup(playerMark);
            }

            $grid.click(processMove);
            display.showStatus("Game started: X moves first");
=======
            view.reset();
            player.reset();
            grid.reset();

            if (view.getMode() === "1") {
                player.setup(view.getPlayerMark());
            }

            view.enableGrid(e.data.ctlr.processMove);
            view.showStatus("Game started: X moves first");
>>>>>>> refs/heads/display

            $.publish("grid-update", [ mark, grid ]);
            return false;
        },

<<<<<<< HEAD
        // // gets the value set by the mode radio buttons
        // setMode = function () {
        //     var $markSelect;

        //     mode = jQuery("fieldset#modeSelect input:checked").val();
        //     $markSelect = jQuery(".mark");

        //     // disable X/O selection for 2-player mode
        //     if (mode === "2") {
        //         $xo.prop("disabled", true);
        //         $markSelect.addClass("hidden");
        //     } else {
        //         $xo.prop("disabled", false);
        //         $markSelect.removeClass("hidden");
        //     }
        // },

        // gets the value set by the one/two players radio buttons
        setPlayerMark = function () {
            var mark;
            mark = jQuery("fieldset#markSelect input:checked").val();
            // internal player gets the opposite of user selection
            playerMark = mark === "X" ? "O" : "X";
        },

        init = function () {

            // set up events
            // $startBtn.click(start);
            // $mode.change(display.setMode);
            display = MyApp.display();
            display.init(this);
            // $xo.change(setPlayerMark);

            // trigger radio button events to initialize settings
            // $mode.change();
            // $xo.change();


            display.showStatus("Click the start button to play (or reset)");
            // player = MyApp.player;
        };
=======
        init: function (aGrid, aView, aPlayer) {
            grid = aGrid;
            view = aView;
            player = aPlayer;

            view.reset();
            jQuery("input#startBtn").click({ctlr: this}, this.start);
>>>>>>> refs/heads/display

            view.showStatus("Click the start button to play (or reset)");
        }
    };
}());

jQuery(document).ready(function () {
    MyApp.controller.init(MyApp.grid, MyApp.view, MyApp.player);
});
