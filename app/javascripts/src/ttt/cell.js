/*global MyApp */
/*jslint unparam: true */

   /**
    * Creates cell objects. A cell represents one square on the tic-tec-toe
    * board that starts out blank anc can be marked with a single ASCII
    * character, typically 'X' or 'O'
    * @param  {string} name should correspond to a DOM element
    * @param  {number} index index of the cell in an array of cells representing
    * the game grid
    * @return {cell object}
    */
MyApp.createCell = function (name, index) {
    "use strict";

    /**
        the mark in this cell
        @type {String}
        @private
        */
    var mark = '';

    if (index < 0 || index > 8) {
        return null;
    }

    return {
        /**
            Marks the cell to record a player's move
            @ param {string} value value of the mark to show in this cell
            */
        setMark: function (value) {
            if (typeof value !== "string") {
                return;
            }
            mark = value.substr(0, 1);
        },

        /**
            Retrieves the mark in this cell
            @returns {String} the mark in this cell
            */
        getMark: function () {
            return mark;
        },

        /**
            Indicates the state of the cell, marked or not
            @returns {Boolean} true if the cell has been marked
            */
        isMarked: function () {
            return mark ? true : false;
        },

        toString: function () {
            return mark ? mark : ".";
        },

        valueOf: function() {
            return mark ? mark.charCodeAt(0) : 0;
        }
    };
};