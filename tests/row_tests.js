var row0, cell0, cell1, cell2;

module("Row Tests", {
	setup: function () {
		cell0 = new MyApp.Cell("cell", 0);
		cell1 = new MyApp.Cell("cell", 1);
		cell2 = new MyApp.Cell("cell", 2);
		row0 = new MyApp.Row(cell0, cell1, cell2);
	},
	teardown: function () {
		row0 = null;
	}
});

test("can create row of cells", function () {
	expect(1);
	ok(row0 instanceof MyApp.Row, "should be a Row");
});

test("can detect winning row", function () {
	expect(3);
	deepEqual(row0.isWinnerFor("X"), false, "should not be a winner yet");
	cell0.mark = "X";
	cell1.mark = "X";
	cell2.mark = "X";
	deepEqual(row0.isWinnerFor("O"), false, "should not be a winner for O");
	deepEqual(row0.isWinnerFor("X"), true, "should be a winner now for X");
})