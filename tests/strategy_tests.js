var strategy = MyApp.strategy, 
	fakeCells = [];

module( "Strategy Tests", {
	setup: function () {
		var i;
	    for ( i = 0; i < 9; i += 1 ) {
			// console.log( fakeCells.length );
	        fakeCells[ i ] = MyApp.createCell( "cell" + i, i );
	    };
	},
	teardown: function () {
		console.log( fakeCells.length );
		fakeCells = [];
		console.log( fakeCells.length );
	}
});

test( "get 1st move", function() {
	expect( 1 );
	deepEqual( strategy.getNextMove( fakeCells ), "cell0", "1st move should be cell0" );
});

test( "get 3rd move", function() {
	expect( 1 );
	fakeCells[ 0 ].setMark( "X" );
	deepEqual( strategy.getNextMove( fakeCells ), "cell8", "3rd move should be cell8, if available" );
});