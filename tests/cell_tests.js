var cell4, cell5, $cell4,
	 $fixture = jQuery( "#qunit-fixture" );

module( "Cell Tests", {
	setup: function() {
		$fixture.append( 
			"<table><tr>" +
				"<td id='cell4'></td>" +
				"<td id='cell5'></td>" +
				"<td id='cell9'></td>" +
			"</tr></table>" );
		$cell4 = jQuery( "td#cell4" );
		cell4 = MyApp.createCell( "cell4", 4 );
	},
	teardown: function() {
		cell4 = null;
		cell5 = null;
		$cell4 = null;
		$fixture.empty();
	}
});

test( "cell can be created", function() {
	expect( 2 );
	deepEqual( typeof cell4, "object", "Verify that cell is an object)" );
	ok(  cell4 !== null, "should not be null" );
});

test( "New cell object is not marked", function() {
	expect( 1 );
	deepEqual( cell4.isMarked(), false, "new cell should not be marked" );
});

test( "setting a mark marks the cell", function() {
	expect( 1 );
	cell4.setMark( "A" );
	deepEqual( cell4.isMarked(), true, "cell should be marked after mark is set" );
});

test( "non-string mark does not set the cell", function() {
	expect( 1 );
	cell4.setMark( 1 );
	deepEqual( cell4.isMarked(), false, "cell should not be marked by numeric value" );
});

test( "can call showWin", function() {
	expect( 2 );
	cell4.showAsWinner();
	deepEqual( $cell4.hasClass( "tokenNormal" ), false, "cell should not have tokenNormal class" );
	deepEqual( $cell4.hasClass( "tokenWin" ), true, "cell should have tokenWin class" );
});

// test( "reset unmarks the cell", function() {
// 	expect( 3 );
// 	cell4.setMark( "O" );
// 	deepEqual( cell4.isMarked(), true, "cell is marked when mark is set" );
// 	cell4.reset();
// 	deepEqual( cell4.isMarked(), false, "cell should not be marked after reset" );
// 	deepEqual( jQuery( "td#cell4" ).hasClass( "tokenNormal" ), true, "tokenNormal class not set after reset" );
// });

test( "get the mark from the cell", function() {
	expect( 1 );
	cell4.setMark( 'X' );
	deepEqual( cell4.getMark(), 'X', "should get back the same mark" );
});

test( "cannot access the mark directly", function() {
	expect( 2 );
	cell4.setMark( 'O' );
	deepEqual( typeof cell4.mark, 'undefined', "should not see the private variable" );
	deepEqual( cell4.getMark(), 'O', "but can retrieve the value from the private variable");
});

test( "cell is marked with only the first character", function() {
	expect( 2 );
	var mark, result;
	mark = "ABC";
	cell4.setMark( mark );
	result = cell4.getMark();
	deepEqual( result.length, 1, "should be only one character" );
	deepEqual( result, mark[ 0 ], "should be the first character" );
});

test( "index outside 0-8 returns null", function() {
	expect( 1 );
	var cell9 = MyApp.createCell( "cell9", 9 );
	deepEqual( cell9, null, "index out of range returns null" );
});

test( "cell instances are independent", function() {
	expect( 3 );
	cell5 = MyApp.createCell( "cell5", 5 );
	cell4.setMark( "X" );
	cell5.setMark( "O" );
	deepEqual( cell4.getMark(), "X", "cell4 is still X" );
	cell4.setMark( "A" );
	deepEqual( cell4.getMark(), "A", "cell4 has been changed to 'A'" );
	deepEqual( cell5.getMark(), "O", "cell5 is still O" );
});

test( "throw exception if cell not found in document", function() {
	expect( 1 );
	var cell3 = MyApp.createCell( "cell3", 3 );
	deepEqual( cell3, null, "cell3 should not be found, should get null");
});