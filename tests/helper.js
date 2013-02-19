MyApp.helper = {

	gridSetup: function ( grid, moves ) {
		var mark;

		mark = "X";
		for ( i = 0; i < moves.length; i += 1 ) {
			grid.update( moves[ i ], mark );
			mark = ( mark === "X" ) ? "O" : "X";
		};
	}
}