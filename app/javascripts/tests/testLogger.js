YUI().use('node', 'test-console', 'test', function (Y) {

	Y.namespace("MYAPP.test");

	Y.MYAPP.test.CellTestCase = new Y.Test.Case({
		name : "Cell Tests",

		//---------------------------------------------------------------------
		// setUp and tearDown methods - optional
		//---------------------------------------------------------------------

		/*
		 * Sets up data that is needed by each test
		 */
		setUp : function () {
			this.cell = new Cell(4);
		},

		/*
		 * clenas up everything that was created by setUp().
		 */
		 tearDown : function () {
		 	delete this.cell;
		 },


		//---------------------------------------------------------------------
		// Test methods - names must begin with "test"
		//---------------------------------------------------------------------
		
		test_cell_should_be_empty : function () {
			var Assert = Y.Assert;

			Assert.isObject(this.cell);
			Assert.isBoolean(this.cell.isTaken);
			Assert.isFalse(this.cell.isTaken);
		}
	});

	// create the console
	(new Y.Test.Console({
		newestOnTop : false,
		filters: {
			pass: true,
			fail: true
		}
	})).render('#testLogger');

	Y.Test.Runner.add(Y.MYAPP.test.CellTestCase);

	// run the tests
	Y.Test.Runner.run();

});