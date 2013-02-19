
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
    // "use strict";

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
        WIN_ROWS_LENGTH = WIN_ROWS.length,
        GRID_CELLS_LENGTH = 9,

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
        },

        checkRowsForValue = function ( value ) {
            var i, row, sum;
            for ( i = 0; i < WIN_ROWS_LENGTH; i += 1 ) {
                row = WIN_ROWS[ i ];
                sum = getRowValue( row );
                if ( sum === value ) return row;
            }
            return null;
        };

    for ( i = 0; i < GRID_CELLS_LENGTH; i += 1 ) {
        cells[ i ] = MyApp.createCell( "cell" + i, i );
    };

    /** @scope MyApp.grid */
    return {

        getCells: function () {
            // return a deep copy of the cells array
            return jQuery.extend( true, [], cells );
        },

        findWinningRow: function ( mark ) {
            return checkRowsForValue( 3 * mark.charCodeAt( 0 ) );
            // var i, sum, row, win = 3 * mark.charCodeAt( 0 );
            // for ( i = 0; i < WIN_ROWS_LENGTH; i += 1 ) {
            //     row = WIN_ROWS[ i ];
            //     sum = getRowValue( row );
            //     if ( sum === win ) return row;
            // };

            // // no winning row found
            // return null;
        },

        findWinningMoveFor: function ( mark ) {
            var i, row;
            row = checkRowsForValue( 2 * mark.charCodeAt( 0 ) );
            if ( row === null ) return null;

            for ( i = 0; i < 3; i += 1 ) {
                if ( !cells[ row[ i ] ].isMarked() ) return row[ i ];
            }

            throw new Error( "should have found an empty cell in " + row );
        },

        formatWinningRow: function ( row ) {
            var i,
                rowLength = row.length;

            for ( i = 0; i < rowLength; i += 1 ) {
                jQuery( "td#cell" + row[i] ).addClass( "winner_cell" );
            };
        },

        update: function ( cellIndex, mark ) {

            // if the cell is alreay marked, do nothing
            if ( cells[ cellIndex ].isMarked() ) return false;

            // allow only "X" or "O"
            if ( mark !== "X" && mark !== "O" ) {
                throw new Error( "mark must be 'X' or 'O'" );
            };

            cells[ cellIndex ].setMark( mark );
            return true;
        },

        isFull: function () {
            var i;
            for ( i = 0; i < GRID_CELLS_LENGTH; i +=1 )
                if ( !cells[ i ].isMarked() ) return false;
            return true;
        },

        getMoveNo: function () {
            var i,
                move = 0;
            for ( i = 0; i < GRID_CELLS_LENGTH; i += 1 ) {
                move += cells[ i ].isMarked() ? 1 : 0;
            };
            return move + 1;
        },

        isMarked: function ( index ) {
            return cells[ index ].isMarked();
        },

    };
};