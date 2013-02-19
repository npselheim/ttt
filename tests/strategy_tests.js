var strategy = MyApp.strategy, 
	fakeCells = [];

module( "Strategy Tests", {
	setup: function () {
		var i;
	    for ( i = 0; i < 9; i += 1 ) {
			// console.log( fakeCells.length );
	        fakeCells[ i ] = MyApp.createCell( "cell" + i, i );
	        // console.log( typeof fakeCells[ i ] );
	    };
	},
	teardown: function () {
		// console.log( fakeCells.length );
		fakeCells = [];
		// console.log( fakeCells.length );
	}
});

test( "get 1st move", function () {
	expect( 1 );
	deepEqual( strategy.getNextMove( fakeCells ), "cell0", "1st move should be cell0" );
});

test( "can determine number of moves", function() {
	expect( 2 );
	fakeCells[ 0 ].setMark( "X" );
	deepEqual( strategy.getMoveNo( fakeCells ), 2, "Should be on move 2" );
	fakeCells[ 2 ].setMark( "O" );
	fakeCells[ 8 ].setMark( "X" );
	fakeCells[ 4 ].setMark( "O" );
	deepEqual( strategy.getMoveNo( fakeCells ), 5, "Should be on move 5" );
})

// test( "get 3rd move", function () {
// 	expect( 1 );
// 	fakeCells[ 0 ].setMark( "X" );
// 	deepEqual( strategy.getNextMove( fakeCells ), "cell8", "3rd move should be cell8, if available" );
// });

