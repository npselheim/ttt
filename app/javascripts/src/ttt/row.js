MyApp.Row = function (cell1, cell2, cell3) {
	"use strict";

	this.cell1 = cell1;
	this.cell2 = cell2;
	this.cell3 = cell3;
}

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