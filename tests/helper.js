MyApp.helper = {

	gridSetup: function (grid, moves) {
		var i,
			mark = "X";

		_(moves).forEach(function (item, index, array) {
			grid.update(item, mark);
			mark = (mark === "X") ? "O" : "X";
		});
	},

	getNumberMarkedWith: function (mark) {
		return jQuery("td:contains('" + mark + "')").length;
	}
};