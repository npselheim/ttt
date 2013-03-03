var strategy = MyApp.strategy,
	helper = MyApp.helper;
	grid = MyApp.grid;

module("Strategy Tests", {
	setup: function () {
		grid.reset();
	},
	teardown: function () {
		// grid = null;
	}
});

test("get 1st move", function () {
	expect(1);
	deepEqual(strategy.getNextMove(grid), 0, "1st move should be cell0");
});

test("get 3rd move", function () {
	expect(1);
	helper.gridSetup(grid, [0, 4]);
	deepEqual(strategy.getNextMove(grid), 8,
		"3rd move should be cell8, if available");
});

test("get 3rd move, cell8 taken", function () {
	expect(1);
	helper.gridSetup(grid, [0, 8]);
	deepEqual(strategy.getNextMove(grid), 2,
		"3rd move should be cell 2 if cell 8 not available");
});

test("get 5th move, have to block", function () {
	expect(1);
	helper.gridSetup(grid, [0, 8, 4, 6]);
	deepEqual(strategy.getNextMove(grid), 7, "should be cell7 to block");
});

test("get 5th move, have a win", function () {
	expect(1);
	helper.gridSetup(grid, [0, 8, 2, 6]);
	deepEqual(strategy.getNextMove(grid), 1, "should be cell1 to win");
});

test("5th move, no win, no block, should be cell2", function () {
	expect(1);
	helper.gridSetup(grid, [0, 8, 6, 3]);
	deepEqual(strategy.getNextMove(grid), 2, "should take cell2");
});

test("2nd move, take the center if available ", function () {
	expect(1);
	helper.gridSetup(grid, [0]);
	deepEqual(strategy.getNextMove(grid), 4, "should take the center");
});

test("2nd move, X has center", function () {
	expect(1);
	helper.gridSetup(grid, [4]);
	deepEqual(strategy.getNextMove(grid), 0, "should take the corner");
});

test("4th move, X has opposite corners", function() {
	// console.log("Strategy Tests: get 4th move, X has corners");
	expect(1);
	helper.gridSetup(grid, [2, 4, 6]);
	deepEqual(strategy.getNextMove(grid), 1, "should take the first side");
})

test("get 4th move, X has a side", function() {
	expect(1);
	helper.gridSetup(grid, [0, 4, 7]);
	deepEqual(strategy.getNextMove(grid), 2, "should take a corner");
})
