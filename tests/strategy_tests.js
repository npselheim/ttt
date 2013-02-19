var strategy = MyApp.strategy,
	grid;

module( "Strategy Tests", {
	setup: function () {
		grid = MyApp.createGrid();
		// var i;
	 //    for ( i = 0; i < 9; i += 1 ) {
		// 	// console.log( fakeCells.length );
	 //        fakeCells[ i ] = MyApp.createCell( "cell" + i, i );
	 //        // console.log( typeof fakeCells[ i ] );
	 //    };
	},
	teardown: function () {
		grid = null;
		// // console.log( fakeCells.length );
		// fakeCells = [];
		// // console.log( fakeCells.length );
	}
});

test( "get 1st move", function () {
	expect( 1 );
	deepEqual( strategy.getNextMove( grid ),
		"cell0", "1st move should be cell0" );
});

// test( "can determine number of moves", function() {
	// expect( 2 );
	// fakeCells[ 0 ].setMark( "X" );
	// deepEqual( strategy.getMoveNo( fakeCells ), 2, "Should be on move 2" );
	// fakeCells[ 2 ].setMark( "O" );
	// fakeCells[ 8 ].setMark( "X" );
	// fakeCells[ 4 ].setMark( "O" );
	// deepEqual( strategy.getMoveNo( fakeCells ), 5, "Should be on move 5" );
// })

test( "get 3rd move", function () {
	expect( 1 );
	grid.update( 0, "X" );
	grid.update( 4, "O" );
	deepEqual( strategy.getNextMove( grid ),
		"cell8", "3rd move should be cell8, if available" );
});

test("get 3rd move, cell8 taken", function () {
	expect( 1 );
	grid.update( 0, "X" );
	grid.update( 8, "O" );
	deepEqual( strategy.getNextMove( grid ),
		"cell2", "3rd move should be cell 2 if cell 8 not available" );
});



