// javascripts/src/ttt/row.js

/*jslint nomen: true, indent: 4, maxlen: 80 */
/*global MyApp, _ */

var MyApp = MyApp || {};

MyApp.Row = function (cells, row) {
    "use strict";

    this.cell1 = cells[row[0]];
    this.cell2 = cells[row[1]];
    this.cell3 = cells[row[2]];
};

MyApp.Row.prototype.isWinnerFor = function (mark) {
    "use strict";

    var targetValue = 3 * mark.charCodeAt(0);
    return this.valueOf() === targetValue;
};

MyApp.Row.prototype.isPotentialWinnerFor = function (mark) {
    "use strict";

    var targetValue = 2 * mark.charCodeAt(0);
    return this.valueOf() === targetValue;

};

MyApp.Row.prototype.valueOf = function () {
    "use strict";

    return _(this).reduce(function (prev, cur, index, array) {
        return prev + cur.valueOf();
    });
};

MyApp.Row.prototype.getCellIndexes = function () {
    "use strict";

    return _(this).map(function (cell, index, array) {
        return cell.index;
    });
};