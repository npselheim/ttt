/**
    Creates a new Player
    @constructor
    @param {String} mark
    @throws {Error} if mark is not 'X' or 'O'
    */
Player = function(mark) {
    // mark must be 'X' or 'O'
    if ( mark !== 'X' && mark !== 'O') {
        throw new Error( "new Player must be constructed with 'X' or 'O'");
    }
    /**
        read-only, the mark to display for this player
        @type {String}
        */
    this.mark = mark;

    // set the numeric value to the ASCII value of the mark character
    this.markValue = mark.charCodeAt(0);

    // set the value for three marks in a row to detect a win
    this.winValue = this.markValue * 3;
}