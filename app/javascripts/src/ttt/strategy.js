MyApp.strategy = {

	getNextMove: function ( grid ) {
		var move;

		switch ( grid.getMoveNo() )
		{
			case 1:
				move = "cell0";
				break;
			case 3:
				move = grid.isMarked( 8 ) ? "cell2" : "cell8";
				break;
			case 5:
				// move = grid.findWin( "X" );
				move = grid.isMarked( 2 ) ? "cell6" : "cell2";
		}






		return move;
	},

	// getMoveNo: function ( cells ) {
	// 	var i,
	// 		move = 0;
	// 	for ( i = 0; i < 9; i += 1 ) {
	// 		move += cells[ i ].isMarked() ? 1 : 0;
	// 	};
	// 	return move + 1;
	// },

	findWin: function ( cells ) {

	}
};