var cell4, cell5, $cell4,
	 $fixture = $( "#qunit-fixture" );

module( "Cell Tests", {
	setup: function() {
		$fixture.append( '<table><tr><td id="cell4"></td><td id="cell5"></td></tr></table>' );
		$cell4 = $( "td#cell4" );
		cell4 = MyApp.createCell( 4 );
	},
	teardown: function() {
		cell4 = null;
		cell5 = null;
		$cell4 = null;
	}
});

test( "cell can be created", function() {
	expect( 1 );
	deepEqual( typeof cell4, 'object', "Verify that cell is an object)" );
});

test( "New cell object is not marked", function() {
	expect( 1 );
	deepEqual( cell4.isMarked(), false, "new cell should not be marked" );
});

test( "setting a mark marks the cell", function() {
	expect( 1 );
	cell4.setMark( 'X' );
	deepEqual( cell4.isMarked(), true, "cell should be marked after mark is set" );
});

test( "can call showWin", function() {
	expect( 2 );
	cell4.showWin();
	deepEqual( $cell4.hasClass( "tokenNormal" ), false, "cell should not have tokenNormal class" );
	deepEqual( $cell4.hasClass( "tokenWin" ), true, "cell should have tokenWin class" );
})

test( "reset unmarks the cell", function() {
	expect( 3 );
	cell4.setMark( 'O' );
	deepEqual( cell4.isMarked(), true, "cell is marked when mark is set" );
	cell4.reset();
	deepEqual( cell4.isMarked(), false, "cell should not be marked after reset" );
	deepEqual( $( "#cell4" ).hasClass( "tokenNormal" ), true, "tokenNormal class not set after reset" );
});

test( "get the mark from the cell", function() {
	expect( 1 );
	cell4.setMark( 'X' );
	deepEqual( cell4.getMark(), 'X', "should get back the same mark" );
})

test( "cannot access the mark directly", function() {
	expect( 2 );
	cell4.setMark( 'O' );
	deepEqual( typeof cell4.mark, 'undefined', "should not see the private variable" );
	deepEqual( cell4.getMark(), 'O', "but can retrieve the value from the private variable")
})

test( "index outside 0-8 throws an error", function() {
	expect( 1 );
	throws( function() {
		var cell9 = MyApp.createCell( 9 );
	}, "index out of 0-8 range throws Error exception");
});

test( "illegal mark throws an error", function() {
	expect( 1 );
	throws( function() {
		cell4.setMark( 'A' );
	}, "throw an error if not 'X' or 'O'" );
});

test( "cell instances are independent", function() {
	expect( 3 );
	cell5 = MyApp.createCell( 5 );
	cell4.setMark( 'X' );
	cell5.setMark( 'O' );
	deepEqual( cell4.getMark(), 'X', "cell4 is still X" );
	cell4.reset();
	deepEqual( cell4.isMarked(), false, "cell4 has been reset" );
	deepEqual( cell5.getMark(), 'O', "cell5 is still O" );
})