/*global MyApp, jQuery */


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
MyApp.Grid = function () {
    "use strict";

    this.cells = [],
    this.WIN_ROWS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // initialilze the cells array
    for (var i = 0; i < 9; i += 1) {
        // cells[i] = new MyApp.Cell("cell", i);
        this.cells.push(new MyApp.Cell("cell", i));
    }
}

MyApp.Grid.prototype = {

    constructor: MyApp.Grid,

     /**
     * produces the total sum value for multiple cells
     * @param  {array of number} row an array of cell indexes identifying
     * the cell values to be summed
     * @return {number} the sum of the values of the specified cells
     */
    getRowValue: function (row) {
        "use strict";
        var that = this;

        return _(row).reduce( function (memo, num) {
            return memo + that.cells[num].valueOf();
        }, 0);
    },

    /**
     * Compares the provided value with the total row values of each
     * possible winning combination. If there's a match then an array
     * of cell indexes representing the winning row is returned.
     * @param  {number} value the value to match.
     * @return {array} the indexes of the cells in the identified row, or
     * null if no matching row is found
     */
    checkRowsForValue: function (targetRowValue) {
        "use strict";

        var that = this,
            result = _.chain(this.WIN_ROWS)
                .map(function (item, index, array) {
                    return that.getRowValue(item);
                })
                .indexOf(targetRowValue)
                .value();

        return result < 0 ? null : this.WIN_ROWS[result];
    },

    /**
     * Makes a deep copy of the cells array and returns the copy.
     * @return {array} deep copy of the cells array
     */
    getCells: function () {
        "use strict";

        // return a deep copy of the cells array
        return jQuery.extend(true, [], this.cells);
    },

    /**
     * Examines the cells array to determine if any of the winnning row
     * combinations all contain the same mark.
     * @param  {string} mark the mark to look for in the cells array
     * @return {array} the indexes of the cells in the identified row, or
     * null if no winning row is found
     */
    findWinningRow: function (mark) {
        "use strict";

        // console.log(mark, mark.charCodeAt(0));
        return this.checkRowsForValue(3 * mark.charCodeAt(0));
    },

    /**
     * Examines the cells array to determine if a winning move is available,
     * identified as a winning row combination with two cells containing the
     * target mark and one cell that is not marked.
     * @param  {string} mark the mark to look for in the cells array
     * @return {array} the index of the cell in the cells array that will
     * win the game, or null if no winning move is found
     */
    findWinningMoveFor: function (mark) {
        "use strict";

        var row = this.checkRowsForValue(2 * mark.charCodeAt(0));
        return row === null ? null : this.findFirstOpenCell(row);
    },

    /**
     * Adds a class attribute to each of the cells in the winning row.
     * @param  {array} row the indexes of the cells
     * @return nothing
     */
    formatWinningRow: function (row) {
        "use strict";

        _(row).forEach(function (item, index, array) {
            jQuery("td#cell" + item).addClass("winner_cell");
        });
    },

    /**
     * Record the user's move by applying the specified mark to the
     * specified cell.
     * @param  {number} cellIndex the index of the cell to mark
     * @param  {string} mark the mark to place on the cell
     * @return {boolean} true if the update is successful, false if the cell
     * is already marked
     */
    update: function (cellIndex, mark) {
        "use strict";

        // if the cell is alreay marked, do nothing
        if (this.isMarked(cellIndex)) {
            return false;
        }

        // allow only "X" or "O"
        if (mark !== "X" && mark !== "O") {
            throw new Error("mark must be 'X' or 'O'");
        }

        this.cells[cellIndex].setMark(mark);
        return true;
    },

    /**
     * Indicates whether there are any more moves available on the game
     * grid.
     * @return {Boolean} true if the game grid is filled and no more moves
     * are available.
     */
    isFull: function () {
        "use strict";

        return this.findFirstOpenCell() < 0 ? true : false;
    },

    /**
     * Get the current move number in the sequence of moves, where X makes
     * move 1, O makes move 2, etc.
     * @return {number} the current move number, i.e. the number of previous
     * moves plus one.
     */
    getMoveNo: function () {
        "use strict";

        return _(this.cells).reduce(function (prev, cur, index, array) {
            return prev + (cur.isMarked() ? 1 : 0);
        }, 0) + 1;
    },

    /**
     * Indicates whether the specified cell contains a mark.
     * @param  {number}  index the index of the cell in the cells array
     * @return {Boolean} true if the cell is marked
     */
    isMarked: function (index) {
        "use strict";

        return this.cells[index].isMarked();
    },

    /**
     * Finds the first cell in the list of cell indexes provided that
     * does not contain a mark.
     * @param  {arrray} cellList indexes of the cells to examine in the cells
     * array
     * @return {number} the index of the first umnarked cell found, or -1
     * if none found
     */
    findFirstOpenCell: function (cellList) {
        "use strict";

        var that = this,
            list = cellList || [0, 1, 2, 3, 4, 5, 6, 7, 8],

            pick = _.chain(list).map(function (item, index, array) {
                return that.cells[item].isMarked();
            }).indexOf(false).value();

        return pick < 0 ? -1 : list[pick];
    },

    toString: function () {
        "use strict";

        return _(this.cells).map(function (item, index, array) {
            return item.toString();
        }).join(" ");
    }
};
