function game() {
    var players = [player("X"), player("O")],
        myGrid = grid(),
        currentPlayer = 0,
        token = null,
        isWon = false,
        gridDiv = document.getElementById('grid'),
        that = this;
        gridClickHandler = function (e) {
            function moveWork(src) {
                var index = src.id.charAt(4);
                that.moveTo(index);
            }
            clickUtils.clickHandler(e, moveWork);
        },
        programMove = function () {
            var myToken = currentPlayer.getToken();
        },
        startBtn = document.getElementById('startBtn');

    return {
        start: function (e) {
            function startWork(src) {
                startBtn.value = "Reset Game";
                myGrid.clear();
                currentPlayer = 0;
                clickUtils.addListener(gridDiv, 'click', gridClickHandler);
            }
            clickUtils.clickHandler(e, startWork);
        },
        finish: function (row) {
            myGrid.showWin(row);
            clickUtils.removeListener(gridDiv, 'click', gridClickHandler);
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
        },
        handler: function (e) {            
            function mmm(src) {
                var index = src.id.charAt(4);
                this.moveTo(index);
            }
            clickUtils.clickHandler(e, moveWork);
        }
    };
}