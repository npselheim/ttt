var MYAPP = {};

MYAPP.ttt = (function () {
    'use strict';

    var utils = {
            addListener: null,
            removeListener: null,
            clickHandler: function (e, work) {
                var src;

                // get event and source element
                e = e || window.event;
                src = e.target || e.srcElement;

                // actual work
                work(src);

                // no bubble
                if (typeof e.stopPropagation === 'function') {
                    e.stopPropagation();
                }
                if (e.cancelBubble !== 'undefined') {
                    e.cancelBubble = true;
                }

                // prevent default action
                if (typeof e.preventDefault === 'function') {
                    e.preventDefault();
                }
                if (e.returnValue !== 'undefined') {
                    e.returnValue = false;
                }
            }
        },
        startBtn = document.getElementById('startBtn'),
        gridDiv = document.getElementById('grid'),
        myGame = null;

    function token(char) {
        return {
            getText: function () {
                return char;
            },
            getValue: function () {
                return char === 'nbsp;' ? 0 : char.charCodeAt(0);
            },
            getWinValue: function () {
                return this.getValue() * 3;
            }
        };
    }

    function cell(index) {
        var cellToken = token('&nbsp;'),
            cellState = 'empty';
        return {
            getElement: function () {
                return document.getElementById('cell' + index);
            },
            setToken: function (char) {
                var el = this.getElement();
                cellToken = token(char);
                cellState = char === '&nbsp;' ? 'empty' : 'used';
                el.innerHTML = char;
                el.className = 'tokenNormal';
            },
            getValue: function () {
                return cellToken.getValue();
            },
            showWin: function () {
                this.getElement().className = 'tokenWin';
            },
            clear: function () {
                this.setToken('&nbsp;');
            },
            getCellState: function () {
                return cellState;
            }
        };
    }

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

    function player(mark) {
        var playerToken = token(mark);
        return {
            getToken: function () {
                return playerToken;
            },
            move: function () {
                // wait for the user to click on a cell
            }
        };
    }

    function game() {
        var players = [player("X"), player("O")],
            myGrid = grid(),
            currentPlayer = 0,
            token = null,
            isWon = false,
            gridClickHandler = function (e) {
                function moveWork(src) {
                    var index = src.id.charAt(4);
                    myGame.moveTo(index);
                }
                utils.clickHandler(e, moveWork);
            },
            programMove = function () {
                var myToken = currentPlayer.getToken();

            };
        return {
            start: function (e) {
                function startWork(src) {
                    myGrid.clear();
                    currentPlayer = 0;
                    utils.addListener(gridDiv, 'click', gridClickHandler);
                }
                utils.clickHandler(e, startWork);
            },
            finish: function (row) {
                myGrid.showWin(row);
                utils.removeListener(gridDiv, 'click', gridClickHandler);
            },
            moveTo: function (index) {
                if (myGrid.isOpen(index)) {
                    token = players[currentPlayer].getToken();
                    myGrid.mark(index, token.getText());
                    isWon = myGrid.checkForWin(token.getWinValue());
                    if (isWon) {
                        this.finish(isWon);
                        return;
                    }
                } else {
                    return;
                }
                currentPlayer = currentPlayer === 0 ? 1 : 0;
                players[currentPlayer].move();
            }
        };
    }

    // set up utility functions
    if (typeof window.addEventListener === 'function') {
        utils.addListener = function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
        utils.removeListener = function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else if (typeof document.attachEvent === 'function') {    // IE
        utils.addListener = function (el, type, fn) {
            el.attachEvent('on' + type, fn);
        };
        utils.removeListener = function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    } else {    // older browsers
        utils.addListener = function (el, type, fn) {
            el['on' + type] = fn;
        };
        utils.removeListener = function (el, type, fn) {
            el['on' + type] = null;
        };
    }

    // set click event for the start button
    myGame = game();
    utils.addListener(startBtn, 'click', myGame.start);

}());