// javascripts/src/ttt/cell.js

/*jslint indent: 4, maxlen: 80 */
/*global MyApp */

var MyApp = MyApp || {};

/**
 * A cell represents one square on the tic-tec-toe
 * board that starts out blank anc can be marked with a single ASCII
 * character, typically 'X' or 'O'
 * @param  {string} name should correspond to a DOM element
 * @param  {number} index index of the cell in an array of cells representing
 * the game grid
 * @return {cell object}
 */
MyApp.Cell = function (name, index) {
    "use strict";

    if (index < 0 || index > 8) {
        throw new Error("invalid argument");
    }

    /**
     * the mark on the cell or an empty string if empty
     * @type {String}
     */
    this.mark = "";

    /**
     * the name of the cell appended with its index
     * @type {[type]}
     */
    this.name = name + index;

    /**
     * the index of the cell in the cells array
     * @type {[type]}
     */
    this.index = index;
};

/**
 * Indicates the state of the cell, marked or not
 * @return {Boolean} true if the cell has been marked
 */
MyApp.Cell.prototype.isMarked = function () {
    "use strict";
    return this.mark ? true : false;
};

/**
 * Overrides Object.toString().
 * @return {String} The mark in the cell or a . if the cell is empty.
 */
MyApp.Cell.prototype.toString = function () {
    "use strict";
    return this.mark || ".";
};

/**
 * The value of the cell based on the mark it contains.
 * @return {Number} The char code value of the mark or zero if the cell
 * is empty.
 */
MyApp.Cell.prototype.valueOf = function () {
    "use strict";
    return this.mark ? this.mark.charCodeAt(0) : 0;
};