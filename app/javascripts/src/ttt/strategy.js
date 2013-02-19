MyApp.strategy = {

	getNextMove: function ( cells ) {
		var moveNo = this.getMoveNo( cells );
		return "cell0";
	},

	getMoveNo: function ( cells ) {
		var i, 
			move = 0;
		for ( i = 0; i < 9; i += 1 ) {
			move += cells[ i ].isMarked() ? 1 : 0;
		};
		return move + 1;
	}
};