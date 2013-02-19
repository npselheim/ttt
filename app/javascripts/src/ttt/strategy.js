MyApp.strategy = {

	getNextMove: function ( grid ) {
		var move;

		switch ( grid.getMoveNo( cells ) )
		{
			case 1:
				move = "cell0";
				break;
			case 3:
				move = cells[ 8 ].isMarked() ? "cell2" : "cell8";
				break;
			case 5:
				move = findWin( cells );
				move = cells[ 2 ].isMarked() ? "cell6" : "cell2";
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