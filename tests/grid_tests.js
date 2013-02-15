var grid;

module( "Grid Tests", {
	setup: function() {
		grid = MyApp.grid;
	}, 
	teardown: function() {
	}
});

test( "Can reference the grid object", function() {
	expect( 1 );
	ok( typeof grid, 'object', "grid should be an object" );
});
test( "grid should have 9 cells", function() {
	expect( 1 );
	deepEqual( grid.cells.length, 9, "grid should have 9 cells");
});
test( "Can mark a cell with 'X'", function() {
	expect( 1 );
	// console.log("Attempting to mark cell 1");
	grid.update( 1, 'X' );
	deepEqual( grid.cells[1].getMark(), 'X', "cell1 should contain an 'X'");
});
