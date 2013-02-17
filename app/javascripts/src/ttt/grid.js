
/** 

           |       |
     cell0 | cell1 | cell2
           |       | 
    -------+-------+-------
           |       |
     cell3 | cell4 | cell5
           |       |
    -------+-------+-------
           |       |
     cell6 | cell7 | cell8
           |       | 

    @namespace
 */
MyApp.createGrid = function (  ) {

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
        CELLS_LENGTH = 9,
        getValue = function ( index ) {
            var mark = cells[ index ].getMark();
            return mark ? mark.charCodeAt( 0 ) : 0;
        };

    for ( i = 0; i < CELLS_LENGTH; i += 1 ) {
        cells[ i ] = MyApp.createCell( "cell" + i, i );
    };

    /** @scope MyApp.grid */
    return {

        getCells: function () {
            // return a deep copy of the cells array
            return jQuery.extend( true, [], cells );
        },

        findWinningRow: function ( mark ) {
            var i, j, sum, row, win = 3 * mark.charCodeAt( 0 );
            for ( i = 0; i < ARRAY_LENGTH; i += 1 ) {
                sum = 0;
                row = WIN_ROWS[ i ];
                for ( j = 0; j < ROW_LENGTH; j += 1 ) {
                    sum += getValue( row[j] );
                };
                if ( sum === win ) return row;
            };

            // no winning row found
            return null;
        },

        // reset: function () {
        //     var i;
        //     for ( i = 0; i < CELLS_LENGTH; i += 1 ) {
        //         cells[ i ].reset();
        //     };
        // },

        formatWinningRow: function ( row ) {
            var i, 
                rowLength = row.length;

            for ( i = 0; i < rowLength; i += 1 ) {
                jQuery( "td#cell" + row[i] ).removeClass().addClass( "tokenWin" );
            };
        },

        update: function( cellIndex, mark ) {

            // if the cell is alreay marked, do nothing
            if ( cells[ cellIndex ].isMarked() ) return;

            // allow only "X" or "O"
            if ( mark !== 'X' && mark !== 'O' ) {
                throw new Error( "mark must be 'X' or 'O'" );
            };

            cells[ cellIndex ].setMark( mark );
        }
    };
};