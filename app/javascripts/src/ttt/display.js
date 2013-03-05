/*global MyApp, jQuery, _ */

MyApp.view = (function () {
    "use strict";

    var $message =  null,
        $xo =       null,
        $mode =     null,
        $grid =     null,
        mode =      null,
        playerMark = null,

        // gets the value set by the mode radio buttons
        setMode = function () {

            var $markSelect = jQuery(".mark");

            mode = jQuery("fieldset#modeSelect input:checked").val();

            // disable X/O selection for 2-player mode
            if (mode === "2") {
                $xo.prop("disabled", true);
                $markSelect.addClass("hidden");
            } else {
                $xo.prop("disabled", false);
                $markSelect.removeClass("hidden");
            }

            return false;
        },

        // gets the value set by the one/two players radio buttons
        setPlayerMark = function () {
            var mark;
            mark = jQuery("fieldset#markSelect input:checked").val();
            // internal player gets the opposite of user selection
            playerMark = mark === "X" ? "O" : "X";
        };

    return {

        /**
         * Adds a class attribute to each of the cells in the winning row.
         * @param  {array} row the indexes of the cells
         * @return nothing
         */
        formatWinningRow: function (row) {
            _(row).forEach(function (item, index, array) {
                jQuery("td#cell" + item).addClass("winner_cell");
            });
        },

        showStatus: function (message) {
            $message.text(message);
        },

        getMode: function () {
            return mode;
        },

        reset: function () {
            $mode = jQuery('input[name="modeGroup"]');
            $xo = jQuery('input[name="xoGroup"]');
            $message = jQuery('td#message');
            $grid = jQuery("div#grid");

            jQuery(".cell")
                .removeClass("winner_cell")
                .html("&nbsp;");

            $mode.off("change");
            $xo.off("change");

            $mode.change(setMode);
            $xo.change(setPlayerMark());

            $mode.change();
            $xo.change();
        },

        showMove: function (index, mark) {
            jQuery("td#cell" + index).text(mark);
        },

        getPlayerMark: function () {
            return playerMark;
        },

        enableGrid: function (handler) {
            $grid.click(handler);
        },

        disableGrid: function () {
            $grid.off("click");
        }
    };

}());