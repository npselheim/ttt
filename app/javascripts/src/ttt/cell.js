/*global MyApp */
/*jslint unparam: true */

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

<<<<<<< HEAD
=======
    /**
        the mark in this cell
        @type {String}
        @private
        */
    var mark = '';

    ;

>>>>>>> parent of 0849867... improve page layout and styling
    if (index < 0 || index > 8) {
        throw new Error("invalid argument");
    }

    this.mark = "";
    this.name = name + index;
};

MyApp.Cell.prototype = {

    constructor: MyApp.Cell,

    /**
        Marks the cell to record a player's move
        @ param {string} value value of the mark to show in this cell
        */
    setMark: function (value) {
        "use strict";

        if (typeof value !== "string") {
            return;
        }
        this.mark = value.substr(0, 1);
    },

    /**
        Retrieves the mark in this cell
        @returns {String} the mark in this cell
        */
    getMark: function () {
        "use strict";

        return this.mark;
    },

    /**
        Indicates the state of the cell, marked or not
        @returns {Boolean} true if the cell has been marked
        */
    isMarked: function () {
        "use strict";

        return this.mark ? true : false;
    },

    toString: function () {
        "use strict";

        return this.mark || ".";
    },

    valueOf: function () {
        "use strict";

        return this.mark ? this.mark.charCodeAt(0) : 0;
    }
};
