
/** @namespace */
MyApp.grid = (function (  ) {

    var cells = [],
        i = 0,
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
        ARRAY_LENGTH = WIN_ROWS.length,
        ROW_LENGTH = 3,
        CELLS_LENGTH = 9;

    for ( i = 0; i < CELLS_LENGTH; i += 1 ) {
        cells[ i ] = MyApp.createCell( i );
    };

    /** @scope MyApp.grid */
    return {

        getCells: function () {
            return $.extend( true, [], cells );
        },

        checkForWin: function ( winSum ) {
            var i, j, sum, row;
            for ( i = 0; i < ARRAY_LENGTH; i += 1 ) {
                sum = 0;
                row = WIN_ROWS[ i ];
                for ( j = 0; j < ROW_LENGTH; j += 1 ) {
                    sum += this.cells[ row[ j ] ].getValue();
                }
                if (sum === winSum) {
                    return row;
                }
            }
        },

        reset: function () {
            var i;
            for ( i = 0; i < CELLS_LENGTH; i += 1 ) {
                cells[ i ].reset();
            }
        },

        showWin: function ( row ) {
            var i;
            for ( i = 0; i < ROW_LENGTH; i += 1 ) {
                this.cells[ row[ i ] ].showWin();
            }
        },

        update: function( cellIndex, mark ) {
            if ( cells[ cellIndex ].isMarked() ) return;
            cells[ cellIndex ].setMark( mark );
        }
    };
}());