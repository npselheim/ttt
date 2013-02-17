var grid;

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

test( "Can reference the grid object", function() {
	expect( 1 );
	deepEqual( typeof grid, "object", "grid should be an object" );
});

test( "cannot access cells directly", function() {
	expect( 2 );
	var cells = grid.cells;
	deepEqual( jQuery.isArray( cells ), false, "should not have access to private field cells" );
	deepEqual( typeof cells, "undefined", "cells should be undefined" );
});

test( "grid has 9 cells", function() {
	expect( 2 );
	cells = grid.getCells();
	deepEqual( jQuery.isArray( cells ), true, "grid should return the array of cells" );
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

test( "can find winning row", function() {
	expect( 2 );
	deepEqual( grid.findWinningRow( "X" ), null, "should not find winning row in blank grid" );
	grid.update( 0, "X" );
	grid.update( 1, "X" );
	grid.update( 2, "X" );
	deepEqual( grid.findWinningRow( "X" ), [0, 1, 2], "should find winning row for 'X'");
});

test( "can format winning row", function() {
	expect( 9 );
	grid.formatWinningRow( [ 2, 5, 8] );
	deepEqual( jQuery( "td#cell0" ).hasClass("tokenWin"), false, "cell0 should not be a winner" );
	deepEqual( jQuery( "td#cell1" ).hasClass("tokenWin"), false, "cell1 should not be a winner" );
	deepEqual( jQuery( "td#cell2" ).hasClass("tokenWin"), true, "cell2 should be a winner" );
	deepEqual( jQuery( "td#cell3" ).hasClass("tokenWin"), false, "cell3 should not be a winner" );
	deepEqual( jQuery( "td#cell4" ).hasClass("tokenWin"), false, "cell4 should not be a winner" );
	deepEqual( jQuery( "td#cell5" ).hasClass("tokenWin"), true, "cell5 should be a winner" );
	deepEqual( jQuery( "td#cell6" ).hasClass("tokenWin"), false, "cell6 should not be a winner");
	deepEqual( jQuery( "td#cell7" ).hasClass("tokenWin"), false, "cell7 should not be a winner" );
	deepEqual( jQuery( "td#cell8" ).hasClass("tokenWin"), true, "cell8 should be a winner" );
})