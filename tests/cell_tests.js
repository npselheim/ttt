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
	cell4.setMark("A");
	deepEqual(cell4.isMarked(), true,
		"cell should be marked after mark is set");
});

test("non-string mark does not set the cell", function () {
	expect(1);
	cell4.setMark(1);
	deepEqual(cell4.isMarked(), false,
		"cell should not be marked by numeric value");
});

test("get the mark from the cell", function () {
	expect(2);
	deepEqual(cell4.getMark(), "", "should get an empty string");
	cell4.setMark("X");
	deepEqual(cell4.getMark(), "X", "should get back the same mark");
});

// test("cannot access the mark directly", function () {
// 	expect(2);
// 	cell4.setMark("O");
// 	deepEqual(typeof cell4.mark, "undefined",
// 		"should not see the private variable");
// 	deepEqual(cell4.getMark(), "O",
// 		"but can retrieve the value from the private variable");
// });

test("cell is marked with only the first character", function () {
	expect(2);
	var mark, result;
	mark = "ABC";
	cell4.setMark(mark);
	result = cell4.getMark();
	deepEqual(result.length, 1, "should be only one character");
	deepEqual(result, mark.substr(0, 1), "should be the first character");
});

test("index outside 0-8 returns null", function () {
	expect(1);
	throws(function () {
		var cell9 = new Cell("cell", 9);
	}, "should be invalid argument error");
});

test("cell instances are independent", function () {
	expect(3);
	cell5 = new MyApp.Cell("cell", 5);
	cell4.setMark("X");
	cell5.setMark("O");
	deepEqual(cell4.getMark(), "X", "cell4 is still X");
	cell4.setMark("A");
	deepEqual(cell4.getMark(), "A", "cell4 has been changed to 'A'");
	deepEqual(cell5.getMark(), "O", "cell5 is still O");
});