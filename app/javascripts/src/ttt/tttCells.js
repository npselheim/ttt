MyApp.tttCells = function () {

    var cells = [],

        WIN_ROWS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
    	],

	// ARRAY_LENGTH: this.WIN_ROWS.length

    getCellValue = function ( index ) {
        var mark = cells[ index ].getMark();
        return mark ? mark.charCodeAt( 0 ) : 0
    },

    getRowValue = function ( row ) {
        var i,
            sum = 0;
       for ( i = 0; i < row.length; i += 1 ) {
            sum += getCellValue( row[ i ] );
        };
        return sum;
    };

    return this;
};