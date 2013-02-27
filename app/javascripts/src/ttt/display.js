/*global MyApp, jQuery, _ */

MyApp.display = function () {
    "use strict";

    var $message = jQuery("td#message"),
        $xo = jQuery('input[name="xoGroup"]'),
        mode;

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
            var msg = $message.text(message);
        },

        reset: function () {
            jQuery(".cell")
                .removeClass("winner_cell")
                .html("&nbsp;");
        },

        // gets the value set by the mode radio buttons
        setMode: function () {
            var $markSelect = jQuery(".mark");

            mode = jQuery("fieldset#modeSelect input:checked").val();

            // $markSelect = jQuery(".mark");

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

        getMode: function() {
            return mode;
        },

        init: function(ctlr) {
            var $mode = jQuery('input[name="modeGroup"]');
            $mode.change(this.setMode);
            $xo.change(ctlr.setPlayerMark);
            jQuery("input#startBtn").click(ctlr.start);

            $mode.change();
            $xo.change();
        },

        showMove: function (index, mark) {
            jQuery("td#cell" + index).text(mark);
        }
    };
};