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
	deepEqual( strategy.getNextMove( grid ),
		"cell0", "1st move should be cell0" );
});

test( "get 3rd move", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 4 ] );
	// grid.update( 0, "X" );
	// grid.update( 4, "O" );
	deepEqual( strategy.getNextMove( grid ),
		"cell8", "3rd move should be cell8, if available" );
});

test( "get 3rd move, cell8 taken", function () {
	expect( 1 );
	helper.gridSetup( grid, [ 0, 8 ] );
	// grid.update( 0, "X" );
	// grid.update( 8, "O" );
	deepEqual( strategy.getNextMove( grid ),
		"cell2", "3rd move should be cell 2 if cell 8 not available" );
});






