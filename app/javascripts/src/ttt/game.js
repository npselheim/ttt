function game(grid, players, status) {
    'use strict';

    var currentPlayer = 0,
        token, isWon,
        gridDiv = document.getElementById('grid'),
        gridClickHandler = function (e) {
            var that = this;
            function moveWork(src) {
                var index = src.id.charAt(4);
                console.log(that);
                that.moveTo(index);
            }
            clickUtils.clickHandler(e, moveWork);
        },
        // programMove = function () {
        //     var myToken = currentPlayer.getToken();
        // },
        startBtn = document.getElementById('startBtn');

    return {
         start: function(startBtn) {
            clickUtils.addListener(startBtn, 'click', startButtonHandler);
        },
        //  function (e) {

        //     function startWork(src) {
        //         startBtn.value = "Reset Game";
        //         grid.clear();
        //         currentPlayer = 0;
        //         clickUtils.addListener(gridDiv, 'click', gridClickHandler);
        //     }

        //     clickUtils.clickHandler(e, startWork);
        // },
        finish: function (row) {
            grid.showWin(row);
            clickUtils.removeListener(gridDiv, 'click', gridClickHandler);
        },
        moveTo: function (index) {
            if (grid.isOpen(index)) {
                token = players[currentPlayer].getToken();
                grid.mark(index, token.getText());
                isWon = grid.checkForWin(token.getWinValue());
                if (isWon) {
                    this.finish(isWon);
                    return;
                }
            } else {
                return;
            }
            currentPlayer = currentPlayer === 0 ? 1 : 0;
            players[currentPlayer].move(status);
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