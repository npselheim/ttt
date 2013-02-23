MyApp.helper = {

	gridSetup: function (grid, moves) {
		var i,
			mark = "X";

		moves.forEach(function (item, index, array) {
			grid.update(item, mark);
			mark = (mark === "X") ? "O" : "X";
		});
	}
}