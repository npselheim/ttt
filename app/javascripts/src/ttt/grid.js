Grid = function() {
    this.cells = [];
    for (i = 0; i < 9; i++) {
        this.cells[i] = new Cell(i);
    };
}

Grid.prototype = {
    i: 0,
    j: 0,
    sum: 0,
    row: [],
    winRows: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    mark: function (index, char) {
        cells[index].setToken(char);
    },
    checkForWin: function (winSum) {

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
    isOpen: function (index) {
        return cells[index].getCellState() === 'empty';
    },
    clear: function () {
        for (i = 0; i < cells.length; i += 1) {
            cells[i].clear();
        }
    },
    showWin: function (row) {
        for (i = 0; i < row.length; i += 1) {
            cells[row[i]].showWin();
        }
    },
    update: function(cellIndex, token) {
        if (!isOpen(cellIndex)) return;

        cells[cellIndex].setToken(token.getText());


    }
}