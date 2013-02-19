var cells;

module( "tttCells Tests", {
	setup: function () {
		cells = MyApp.tttCells();
	},
	teardown: function () {

	}
});

test( "can see WIN_ROWS array", function () {
	expect( 1 );
	deepEqual( cells.WIN_ROWS.length, 8, "can access WIN_ROWS array" );
});
