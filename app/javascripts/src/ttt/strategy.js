MyApp.strategy = {

	getNextMove: function ( grid ) {
		var move;

		switch ( grid.getMoveNo() )
		{
			// "X" moves
			case 1:
				move = "cell0";
				break;
			case 3:
				move = grid.isMarked( 8 ) ? "cell2" : "cell8";
				break;
			case 5:
				// if there's a winner, take it
				move = grid.findWinningMoveFor( "X" );
				if ( move !== null ) break;

				// if "O" might win, block it
				move = grid.findWinningMoveFor( "O" );
				if (move !== null ) break;

				// best move
				move = grid.isMarked( 2 ) ? "cell6" : "cell2";
				break;
			case 7:
				// if there's a winner, take it
				move = grid.findWinningMoveFor( "X" );
				if ( move !== null ) break;

				// if "O" might win, block it
				move = grid.findWinningMoveFor( "O" );
				if (move !== null ) break;

				// should never reach this point
				move = grid.findFirstOpenCell();
				break;
			case 9:
				// find the only cell left
				move = grid.findFirstOpenCell();
				break;

			// "O" moves
			case 2:


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