
/** @namespace */
MyApp.grid = (function() {

    var cells = [],
        i = 0,
        winRows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        isOpen = function ( index ) {
            console.log( cells[index] );
            return cells[index].isMarked();
        };
        // mark: function (index, mark) {
        //     cells[index].setMark(mark);
        // },

    for ( i = 0; i < 9; i++ ) {
        cells[i] = new MyApp.Cell( i );
    };

    /** @scope MyApp.grid */
    return {

        cells: cells,

        checkForWin: function ( winSum ) {
            var i, j, sum, row;
            for (i = 0; i < winRows.length; i += 1) {
                sum = 0;
                row = winRows[i];
                for (j = 0; j < row.length; j += 1) {
                    sum += cells[row[j]].getValue();
                }
                if (sum === winSum) {
                    return row;
                }
            }
        },
        clear: function () {
            var i;
            for (i = 0; i < cells.length; i += 1) {
                this.cells[i].clear();
            }
        },
        showWin: function ( row ) {
            var i;
            for (i = 0; i < row.length; i += 1) {
                this.cells[row[i]].showWin();
            }
        },
        update: function( cellIndex, mark ) {
            console.log( isOpen( cellIndex ) );
            if ( !isOpen( cellIndex ) ) return;
            console.log( "cell " + cellIndex + " is open");
            cells[cellIndex].setMark(mark);
        }
    };
}());