var strategy = MyApp.strategy,
	helper = MyApp.helper;
	grid;

module( "Strategy Tests", {
	setup: function () {
		grid = MyApp.createGrid();
	},
	teardown: function () {
		grid = null;
	}
});

test( "get 1st move", function () {
	expect( 1 );
	deepEqual( strategy.getNextMove( grid ), 0, "1st move should be cell0" );
});

test( "get 3rd move", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 4 ] );
	deepEqual( strategy.getNextMove( grid ), 8,
		"3rd move should be cell8, if available" );
});

test( "get 3rd move, cell8 taken", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 8 ] );
	deepEqual( strategy.getNextMove( grid ), 2,
		"3rd move should be cell 2 if cell 8 not available" );
});

test( "get 5th move, have to block", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 8, 4, 6 ] );
	deepEqual( strategy.getNextMove( grid ), 7, "should be cell7 to block" );
});

test( "get 5th move, have a win", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 8, 2, 6 ] );
	deepEqual( strategy.getNextMove( grid ), 1, "should be cell1 to win" );
});

test( "get 5th move, no win, no block", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 8, 6, 3 ] );
	deepEqual( strategy.getNextMove( grid ), 2, "should take cell2" );
});

test( "if X has a corner, take the center on 2nd move", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0 ] );
	deepEqual( strategy.getNextMove ( grid ), 4,
		"should take opposite corner" );
});
