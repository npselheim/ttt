/*global MyApp */

MyApp.strategy = {

    getNextMove: function (grid) {
        "use strict";

        var CORNERS = [0, 2, 6, 8],
            SIDES = [1, 3, 5, 7],
            CENTER = 4,
            moveNo = grid.getMoveNo(),
            myMark = moveNo % 2 === 1 ? "X" : "O",
            opponent = myMark === "X" ? "O" : "X",
            move = grid.findWinningMoveFor(myMark);

        // if there's a winner, take it
        if (move !== null) {
            return move;
        }

        // if opponent might win, block it
        move = grid.findWinningMoveFor(opponent);
        if (move !== null) {
            return move;
        }

        switch (grid.getMoveNo()) {

        // "X" moves
        case 1:
            // always take a corner
            // move = CORNER[Math.floor(Math.random()*4)];
            move = 0;
            break;

        case 3:
            // now try to get the opposite corner
            // if not available, one of the other corners will do
            move = grid.isMarked(8) ? 2 : 8;
            break;

        case 5:
            // if we get this far and there's no win or block,
            // one of the corners must be open - take it
            move = grid.isMarked(2) ? 6 : 2;
            break;


        // "O" moves
        case 2:
            // always take center, if available
            if (!grid.isMarked(CENTER)) {
                move = CENTER;
            } else {
                // otherwise, take a corner
                move = grid.findFirstOpenCell(CORNERS);
            }
            break;

        case 4:
            // if X has a side, take a corner
            if (SIDES.some(function (item, index, array) {
                return grid.isMarked(item);
            })) {
                move = grid.findFirstOpenCell(CORNERS);
            } else {
                // take a side cell to force X to block
                move = grid.findFirstOpenCell(SIDES);
            }
            break;

        // all other moves should be block, win, or find last
        // remaining open cell
        default:
            move = grid.findFirstOpenCell();
        }

        return move;
    }
};