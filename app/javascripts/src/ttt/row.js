MyApp.Row = function (cell1, cell2, cell3) {
	"use strict";

	this.cell1 = cell1;
	this.cell2 = cell2;
	this.cell3 = cell3;
}

MyApp.Row.prototype.isWinnerFor = function (mark) {
	"use strict";

	var targetValue = 3 * mark.charCodeAt(0),
		rowValue =  _(this).reduce(function (prev, cur, index, array) {
        	return prev + cur.valueOf();
            });
	return rowValue === targetValue;
}