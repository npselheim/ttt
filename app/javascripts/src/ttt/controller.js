/*global document, jQuery, $ */

var MyApp = {};

MyApp.controller = function () {
    "use strict";

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
            var index = e.target.id.charAt(4),
                row = null;

            // reject a click on an occupied cell
            if (!grid.update(index, mark)) {
                return false;
            }

            // show the player's move on the grid
            // $cell.text(mark);
            display.showMove(index, mark);

            // check to see if anybody has won yet
            row = grid.findWinningRow(mark);
            if (row !== null) {
                // we have a winner!
                display.formatWinningRow(row);
                display.showStatus("We have a winner!");
                gameOver();
                return false;
            }

            // check to see if the game is drawn
            if (grid.isFull()) {
                // we have a draw...
                display.showStatus("Draw! Nobody wins! Try again?");
                gameOver();
                return false;
            }

            mark = (mark === "X") ? "O" : "X";
            display.showStatus("Now it's " + mark + "'s turn to move");
            $.publish("grid-update", [mark, grid]);
            return false;
        },

        gameOver = function () {
            $grid.off("click", processMove);
        },

        // clean up before starting a new game
        reset = function () {
            mark = "X";
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

            $.publish("grid-update", [ mark, grid ]);
            return false;
        },

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

        // gets the value set by the mode radio buttons
        setMode = function () {
            var $xoForm;

            mode = jQuery("#modeForm input:checked").val();
            $xoForm = jQuery("#xoForm");

            // disable X/O selection for 2-player mode
            if (mode === "2") {
                $xo.prop("disabled", true);
                $xoForm.addClass("gray-out");
            } else {
                $xo.prop("disabled", false);
                $xoForm.removeClass("gray-out");
            }
        },

        // gets the value set by the one/two players radio buttons
        setPlayerMark = function () {
            var mark;
            mark = jQuery("#xoForm input:checked").val();
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
            $message.text("Click the start button to play");
            player = MyApp.player;
        };

    init();
};

jQuery(document).ready(MyApp.controller);