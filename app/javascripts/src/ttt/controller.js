/*global document, jQuery, $ */

var MyApp = {};

MyApp.controller = function () {
    "use strict";

    var $startBtn = jQuery("input#startBtn"),
        $grid = jQuery("div#grid"),
        $message = jQuery("td#message"),
        $mode = jQuery('input[name="modeGroup"]'),
        $xo = jQuery('input[name="xoGroup"]'),
        mode,
        mark,
        grid,
        player,
        playerMark,

        processMove = function (e) {
            var cell = e.target.id,
                $cell = jQuery("td#" + cell),
                index = cell.charAt(4),
                row = null;

            // reject a click on an occupied cell
            if (!grid.update(index, mark)) {
                return false;
            }

            // show the player's move on the grid
            $cell.text(mark);

            // check to see if anybody has won yet
            row = grid.findWinningRow(mark);
            if (row !== null) {
                // we have a winner!
                grid.formatWinningRow(row);
                $message.text("We have a winner!");
                gameOver();
                return false;
            }

            // check to see if the game is drawn
            if (grid.isFull()) {
                // we have a draw...
                $message.text("Draw! Nobody wins! Try again?");
                gameOver();
                return false;
            }

            mark = (mark === "X") ? "O" : "X";
            $message.text("Now it's " + mark + "'s turn to move");
            $.publish("grid-update", [mark, grid]);
            return false;
        },

        gameOver = function () {
            $grid.off("click", processMove);
        },

        // clean up before starting a new game
        reset = function () {
            mark = "X";
            player.reset();
            grid = MyApp.createGrid();
            jQuery(".cell")
                .removeClass("winner_cell")
                .html("&nbsp;");
        },

        start = function () {
            // clean up any leftovers from a previous game
            reset();

            if (mode === "1") {
                player.setup(playerMark);
            }

            $grid.click(processMove);
            $message.text("Game started: X moves first");

            $.publish("grid-update", [ mark, grid ]);
            return false;
        },

                // gets the value set by the mode radio buttons
        setMode = function () {
            var $markSelect;

            mode = jQuery("fieldset#modeSelect input:checked").val();
            $markSelect = jQuery(".mark");

            // disable X/O selection for 2-player mode
            if (mode === "2") {
                $xo.prop("disabled", true);
                $markSelect.addClass("hidden");
            } else {
                $xo.prop("disabled", false);
                $markSelect.removeClass("hidden");
            }
        },

        // gets the value set by the one/two players radio buttons
        setPlayerMark = function () {
            var mark;
            mark = jQuery("fieldset#markSelect input:checked").val();
            // internal player gets the opposite of user selection
            playerMark = mark === "X" ? "O" : "X";
        },

        init = function () {

            // set up events
            $startBtn.click(start);
            $mode.change(setMode);
            $xo.change(setPlayerMark);

            // trigger radio button events to initialize settings
            $mode.change();
            $xo.change();


            $message.text("Click the start button to play (or reset)");
            player = MyApp.player;
        };

    init();
};

jQuery(document).ready(MyApp.controller);