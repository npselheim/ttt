var grid;

module( "Grid Tests", {
	setup: function() {
		grid = MyApp.grid;
	}, 
	teardown: function() {
		grid.reset();
	}
});

test( "Can reference the grid object", function() {
	expect( 1 );
	deepEqual( typeof grid, "object", "grid should be an object" );
});

test( "cannot access cells directly", function() {
	expect( 2 );
	var cells = grid.cells;
	deepEqual( $.isArray( cells ), false, "should not have access to private field cells" );
	deepEqual( typeof cells, "undefined", "cells should be undefined" );
});

test( "grid has 9 cells", function() {
	expect( 2 );
	cells = grid.getCells();
	deepEqual( $.isArray( cells ), true, "grid should return the array of cells" );
	deepEqual( cells.length, 9, "grid should have 9 cells" );
});

test( "Can mark a cell with 'X'", function() {
	expect( 1 );
	grid.update( 1, "X" );
	deepEqual( grid.getCells()[ 1 ].getMark(), "X", "cell1 should contain an 'X'" );
});

test( "returns a copy of the cells array", function() {
	expect( 2 );
	var cells = grid.getCells();
	cells.shift();
	deepEqual( cells.length, 8, "array should be shortened to 8 elements");
	deepEqual( grid.getCells().length, 9, "grid array should remain unchanged" );
});

test( "cannot modify the cells in the grid", function() {
	expect( 1 );
	var cells = grid.getCells();
	cells[ 1 ] = "A";
	deepEqual( grid.getCells()[ 1 ].getMark(), "", "cell1 should be empty, not 'A'" );
});

test( "cannot update cell with illegal mark", function() {
	expect( 1 );
	throws( function() {
		grid.update( 3, "A" )
		}, "throws an exception if not 'X' or 'O'" );
});