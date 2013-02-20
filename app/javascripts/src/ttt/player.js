MyApp.player =  {

	mark: null,

	makeMove: function ( name ) {
		var that = this;

		return function( _, mark, grid ) {
			var move;

			if ( mark === that.mark ) {
				move = MyApp.strategy.getNextMove( grid );

				jQuery( "td#cell" + move ).click();
			};
		};
	},

	setup: function( playerMark ) {
		this.mark = playerMark;
		$.subscribe( "grid-update", this.makeMove("grid-update") );
	},

	reset: function () {
		$.unsubscribe( "grid-update" );
	}
}