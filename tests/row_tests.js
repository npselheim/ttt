var row0, cell0, cell1, cell2;

module("Row Tests", {
	setup: function () {
		cells = [
			new MyApp.Cell("cell", 0),
			new MyApp.Cell("cell", 1),
			new MyApp.Cell("cell", 2)
		],
		row0 = new MyApp.Row(cells, [0, 1, 2]);
	},
	teardown: function () {
		row0 = null;
		cells = null;
	}
});

test("can create row of cells", function () {
	expect(1);
	ok(row0 instanceof MyApp.Row, "should be a Row");
});

test("can detect winning row", function () {
	expect(3);
	deepEqual(row0.isWinnerFor("X"), false, "should not be a winner yet");
	cells[0].mark = "X";
	cells[1].mark = "X";
	cells[2].mark = "X";
	deepEqual(row0.isWinnerFor("O"), false, "should not be a winner for O");
	deepEqual(row0.isWinnerFor("X"), true, "should be a winner now for X");
});

test("can detect potential winning row", function () {
	expect(2);
	cells[0].mark = "X";
	cells[1].mark = "X";
	deepEqual(row0.isPotentialWinnerFor("X"), true, "should be potential");
	cells[2].mark = "O";
	deepEqual(row0.isPotentialWinnerFor("X"), false, "no longer potential");
});