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

    if (index < 0 || index > 8) {
        throw new Error("invalid argument");
    }

    this.mark = "";
    this.name = name + index;
};

/**
    Indicates the state of the cell, marked or not
    @returns {Boolean} true if the cell has been marked
    */
MyApp.Cell.prototype.isMarked = function () {
    "use strict";

    return this.mark ? true : false;
};

MyApp.Cell.prototype.toString = function () {
    "use strict";

    return this.mark || ".";
};

MyApp.Cell.prototype.valueOf = function () {
    "use strict";

    return this.mark ? this.mark.charCodeAt(0) : 0;
};