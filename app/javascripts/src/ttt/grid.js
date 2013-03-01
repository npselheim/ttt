/*global MyApp, jQuery, _ */


/**
 *
 *
 *         |       |
 *   cell0 | cell1 | cell2
 *         |       |
 *  -------+-------+-------
 *         |       |
 *   cell3 | cell4 | cell5
 *         |       |
 *  -------+-------+-------
 *         |       |
 *   cell6 | cell7 | cell8
 *         |       |
 *   @namespace
 */
MyApp.grid = function () {
    "use strict";

    var i = 0,
        cells = [],
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

        /**
         * produces the total sum value for multiple cells
         * @param  {array of number} row an array of cell indexes identifying
         * the cell values to be summed
         * @return {number} the sum of the values of the specified cells
         */
        getRowValue = function (row) {
            return _(row).reduce(function (memo, num) {
                return memo + cells[num].valueOf();
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
        checkRowsForValue = function (targetRowValue) {
            var result = _.chain(WIN_ROWS)
                    .map(function (item, index, array) {
                        return getRowValue(item);
                    })
                    .indexOf(targetRowValue)
                    .value();

            return result < 0 ? null : WIN_ROWS[result];
        };


    // initialilze the cells array
    for (i = 0; i < 9; i += 1) {
        cells.push(new MyApp.Cell("cell", i));
    }

    return {

        /**
         * Makes a deep copy of the cells array and returns the copy.
         * @return {array} deep copy of the cells array
         */
        getCells: function () {
            // return a deep copy of the cells array
            return jQuery.extend(true, [], cells);
        },

        /**
         * Examines the cells array to determine if any of the winnning row
         * combinations all contain the same mark.
         * @param  {string} mark the mark to look for in the cells array
         * @return {array} the indexes of the cells in the identified row, or
         * null if no winning row is found
         */
        findWinningRow: function (mark) {
            return checkRowsForValue(3 * mark.charCodeAt(0));
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
            var row = checkRowsForValue(2 * mark.charCodeAt(0));
            return row === null ? null : this.findFirstOpenCell(row);
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
            // if the cell is alreay marked, do nothing
            if (this.isMarked(cellIndex)) {
                return false;
            }

            // allow only "X" or "O"
            if (mark !== "X" && mark !== "O") {
                throw new Error("mark must be 'X' or 'O'");
            }

            cells[cellIndex].setMark(mark);
            return true;
        },

        /**
         * Indicates whether there are any more moves available on the game
         * grid.
         * @return {Boolean} true if the game grid is filled and no more moves
         * are available.
         */
        isFull: function () {
            return this.findFirstOpenCell() < 0 ? true : false;
        },

        /**
         * Get the current move number in the sequence of moves, where X makes
         * move 1, O makes move 2, etc.
         * @return {number} the current move number, i.e. the number of previous
         * moves plus one.
         */
        getMoveNo: function () {
            return _(cells).reduce(function (prev, cur, index, array) {
                return prev + (cur.isMarked() ? 1 : 0);
            }, 0) + 1;
        },

        /**
         * Indicates whether the specified cell contains a mark.
         * @param  {number}  index the index of the cell in the cells array
         * @return {Boolean} true if the cell is marked
         */
        isMarked: function (index) {
            return cells[index].isMarked();
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
            var list = cellList || [0, 1, 2, 3, 4, 5, 6, 7, 8],
                pick = _.chain(list).map(function (item, index, array) {
                    return cells[item].isMarked();
                }).indexOf(false).value();

            return pick < 0 ? -1 : list[pick];
        },

        toString: function () {
            return _(cells).map(function (item, index, array) {
                return item.toString();
            }).join(" ");
        }
    };
};
