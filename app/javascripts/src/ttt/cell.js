/** 
    Creates a new Cell
    @constructor
    @param {Number} index the index of the cell in the grid, 0-8
    @throws {Error} if index is out of range
    */
Cell = function(index) {
    // index must be in range 0-8
    if ( index < 0 || index > 8 ) {
        throw new Error( "index must be in range 0-8" );
    }

    /** 
        read-only, a reference to the cell in the document
        @type {Element}
        */
    this.cellRef = $('cell' + index);
    /**
        read-only, indicates if the cell is already used
        @type {Boolean}
        */
    this.isMarked = false;
    /** 
        read-only, the player that marked this cell
        @type {Player}
        */
    this.player = null;
}

Cell.prototype =  {  
    /**
        Indicates that a cell is is claimed by a player, i.e. records
        the player's move.
        @ param {Player} player the player that moved on this cell
     */
    setPlayer: function (player) {
        this.player = player;
        this.isMarked = true;
    },

    /**
        Show that this cell is included in the winning 3-in-a-row.
     */
    showWin: function () {
        this.cellRef.attr("class", "tokenWin");
    },

    /**
        Reset this this cell back to the initial unused state.
     */
    reset: function () {
        this.player = null;
        this.isMarked = false;
        this.cellRef.attr("class", "tokenNormal");
    }
}