var cell4, cell5;

module("Cell Tests", {
	setup: function () {
		cell4 = new MyApp.Cell("cell", 4);
	},
	teardown: function () {
		cell4 = null;
		cell5 = null;
	}
});

test("cell can be created", function () {
	expect(2);
	deepEqual(typeof cell4, "object", "Verify that cell is an object)");
	ok( cell4 !== null, "should not be null");
});

test("New cell object is not marked", function () {
	expect(1);
	deepEqual(cell4.isMarked(), false, "new cell should not be marked");
});

test("setting a mark marks the cell", function () {
	expect(1);

	cell4.mark = "A";
	deepEqual(cell4.isMarked(), true,
		"cell should be marked after mark is set");
});

test("get the mark from the cell", function () {
	expect(2);
	deepEqual(cell4.mark, "", "should get an empty string");
	cell4.mark = "X";
	deepEqual(cell4.mark, "X", "should get back the same mark");
});

test("index outside 0-8 throws exception", function () {
	expect(1);
	throws(function () {
		var cell9 = new Cell("cell", 9);
	}, "should be invalid argument error");
});

test("cell instances are independent", function () {
	expect(3);
	cell5 = new MyApp.Cell("cell", 5);
	cell4.mark = "X";
	cell5.mark = "O";
	deepEqual(cell4.mark, "X", "cell4 is still X");
	cell4.mark = "A";
	deepEqual(cell4.mark, "A", "cell4 has been changed to 'A'");
	deepEqual(cell5.mark, "O", "cell5 is still O");
});