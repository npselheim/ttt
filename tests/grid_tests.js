var grid,
	helper = MyApp.helper;
	$fixture = jQuery( "#qunit-fixture" );

module( "Grid Tests", {
	setup: function() {
		$fixture.append(
			"<table><tr>" +
				"<td id='cell0'></td>" +
				"<td id='cell1'></td>" +
				"<td id='cell2'></td>" +
				"<td id='cell3'></td>" +
				"<td id='cell4'></td>" +
				"<td id='cell5'></td>" +
				"<td id='cell6'></td>" +
				"<td id='cell7'></td>" +
				"<td id='cell8'></td>" +
			"</tr></table>" );
		grid = MyApp.createGrid();
	},
	teardown: function() {
		grid = null;
		$fixture.empty();
	}
});

test( "Can reference the grid object", function () {
	expect( 1 );
	deepEqual( typeof grid, "object", "grid should be an object" );
});

test( "cannot access cells directly", function () {
	expect( 2 );
	var cells = grid.cells;
	deepEqual( jQuery.isArray( cells ), false,
		"should not have access to private field cells" );
	deepEqual( typeof cells, "undefined", "cells should be undefined" );
});

test( "grid has 9 cells", function () {
	expect( 2 );
	cells = grid.getCells();
	deepEqual( jQuery.isArray( cells ), true,
		"grid should return the array of cells" );
	deepEqual( cells.length, 9, "grid should have 9 cells" );
});

test( "Can mark a cell with 'X'", function () {
	expect( 1 );
	grid.update( 1, "X" );
	deepEqual( grid.getCells()[ 1 ].getMark(), "X",
		"cell1 should contain an 'X'" );
});

test( "returns a copy of the cells array", function () {
	expect( 2 );
	var cells = grid.getCells();
	cells.shift();
	deepEqual( cells.length, 8, "array should be shortened to 8 elements");
	deepEqual( grid.getCells().length, 9,
		"grid array should remain unchanged" );
});

test( "cannot modify the cells in the grid", function () {
	expect( 1 );
	var cells = grid.getCells();
	cells[ 1 ] = "A";
	deepEqual( grid.getCells()[ 1 ].getMark(), "",
		"cell1 should be empty, not 'A'" );
});

test( "cannot update cell with illegal mark", function () {
	expect( 1 );
	throws( function () {
		grid.update( 3, "A" )
		}, "throws an exception if not 'X' or 'O'" );
});

test( "can find winning row", function () {
	expect( 2 );
	deepEqual( grid.findWinningRow( "X" ), null,
		"should not find winning row in blank grid" );
	// set up a winning row for X
	helper.gridSetup( grid, [ 0, 8, 2, 6, 1 ] );
	deepEqual( grid.findWinningRow( "X" ), [0, 1, 2],
		"should find winning row for 'X'");
});

test( "can format winning row", function () {
	expect( 9 );
	grid.formatWinningRow( [ 2, 5, 8] );
	deepEqual( jQuery( "td#cell0" ).hasClass("winner_cell"), false,
		"cell0 should not be a winner" );
	deepEqual( jQuery( "td#cell1" ).hasClass("winner_cell"), false,
		"cell1 should not be a winner" );
	deepEqual( jQuery( "td#cell2" ).hasClass("winner_cell"), true,
		"cell2 should be a winner" );
	deepEqual( jQuery( "td#cell3" ).hasClass("winner_cell"), false,
		"cell3 should not be a winner" );
	deepEqual( jQuery( "td#cell4" ).hasClass("winner_cell"), false,
		"cell4 should not be a winner" );
	deepEqual( jQuery( "td#cell5" ).hasClass("winner_cell"), true,
		"cell5 should be a winner" );
	deepEqual( jQuery( "td#cell6" ).hasClass("winner_cell"), false,
		"cell6 should not be a winner");
	deepEqual( jQuery( "td#cell7" ).hasClass("winner_cell"), false,
		"cell7 should not be a winner" );
	deepEqual( jQuery( "td#cell8" ).hasClass("winner_cell"), true,
		"cell8 should be a winner" );
});

test( "isFull returns false for empty grid", function () {
	expect( 1 );
	deepEqual( grid.isFull(), false, "empty grid should not be full" );
});

test( "isFull returns true if all cells are marked", function () {
	expect( 1 );
	// set up a full grid
	helper.gridSetup( grid, [ 0, 4, 8, 1, 7, 6, 2, 5, 3 ])
	deepEqual( grid.isFull(), true, "marked grid should be full" );
});

test( "get the move number for the next move", function () {
	expect( 2 );
	deepEqual( grid.getMoveNo(), 1, "first move should be 1" );
	// make 4 moves
	helper.gridSetup( grid, [ 0, 2, 8, 4 ])
	deepEqual( grid.getMoveNo(), 5, "Should be on move 5" );
});

test( "find out if a cell is already marked", function () {
	expect( 2 );
	deepEqual( grid.isMarked( 4 ), false,
		"should be nothing marked in an empty grid" );
	grid.update( 4, "X" );
	deepEqual ( grid.isMarked( 4 ), true, "cell4 should be marked now" );
});

test( "find winning moves for 'X' and 'O'", function () {
	expect( 3 );
	deepEqual( grid.findWinningMoveFor( "X" ), null,
		"no winning moves in an empty grid" );
	helper.gridSetup( grid, [ 0, 2, 3, 4 ] );
	deepEqual( grid.findWinningMoveFor( "X" ), 6, "should find cell6" );
	deepEqual( grid.findWinningMoveFor( "O" ), 6, "should find cell6 ");
});

test( "find first open cell", function () {
	expect( 2 );
	deepEqual( grid.findFirstOpenCell(), 0,
		"0 should be the first cell in an empty grid" );
	helper.gridSetup( grid, [ 0, 1, 2, 3, 4, 6 ] );
	deepEqual( grid.findFirstOpenCell(), 5, "should find cell5" );
} )
