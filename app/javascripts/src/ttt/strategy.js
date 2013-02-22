MyApp.strategy = {

	getNextMove: function ( grid ) {
		"use strict";

		var moveNo, move, myMark, opponent;

		moveNo = grid.getMoveNo();

		myMark = moveNo % 2 === 1 ? "X" : "O";
		opponent = myMark === "X" ? "O" : "X";

		// if there's a winner, take it
		move = grid.findWinningMoveFor( myMark );
		if ( move !== null ) {
			return move;
		};

		// if opponent might win, block it
		move = grid.findWinningMoveFor( opponent );
		if (move !== null ) {
			return move;
		};

		switch ( grid.getMoveNo() ) {

			// "X" moves
			case 1:
				// always take the top-left corner
				move = 0;
				break;
			case 3:
				// now try to get the opposite corner
				// if not available, one of the other corners will do
				move = grid.isMarked( 8 ) ? 2 : 8;
				break;
			case 5:
				// if we get this far and there's no win or block,
				// one of the corners must be open - take it
				move = grid.isMarked( 2 ) ? 6 : 2;
				break;


			// "O" moves
			case 2:
				// if X has a corner, take the center
				if ( grid.isMarked( 0 ) ||
					 grid.isMarked( 2 ) ||
					 grid.isMarked( 6 ) ||
					 grid.isMarked( 8 ) ) {
					move = 4;
				} else {
					move = 0;
				};
				break;
			case 4:
				// take a side cell to force X to block
				move = grid.findFirstOpenCell( [ 1, 3, 5, 7 ]) ;
				break;

			// all other moves should be block, win, or find last
			// remaining open cell
			default:
				move = grid.findFirstOpenCell();
		};

		return move;
	}
};