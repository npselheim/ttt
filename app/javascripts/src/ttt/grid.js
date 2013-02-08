function grid() {
    var cells = [
            cell(0), cell(1), cell(2),
            cell(3), cell(4), cell(5),
            cell(6), cell(7), cell(8)
        ],
        i = 0,
        j = 0,
        sum = 0,
        row = [],
        winRows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

    return {
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
        }
    };
}