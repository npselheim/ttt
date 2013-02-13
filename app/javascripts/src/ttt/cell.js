/** 
    Creates a new Cell
    @constructor
    @param {Number} index the index of the cell in the grid, 0-8
    @throws {Error} if index is out of range
    */
MyApp.cell = function (index) {
    /** 
        a reference to the cell in the document
        @type {Element}
        @private
        */
    var _cellRef,
    /** 
        the player that marked this cell
        @type {Player}
        @private
        */
        _player = null,
    /**
        indicates whether the cell is 'taken'
      */
        _isMarked = false;

    // verify that index is in range 0-8
    if ( index < 0 || index > 8 ) {
        throw new Error( "index must be in range 0-8" );
    }
    _cellRef = $('cell' + index);

    return {  
        /**
            Indicates that a cell is is claimed by a player, i.e. records
            the player's move.
            @ param {Player} player the player that moved on this cell
          */
        setPlayer: function (player) {
            _player = player;
            _isMarked = true;
        },

        /**
            Retrieves a refernce to the player who moved on the cell
            @return {Player} the player who owns this cell
            */
        getPlayer: function() {
            return _player;
        },

        isMarked: function () {
            console.log(_player);
            return _isMarked;
        },

        /**
            Show that this cell is included in the winning 3-in-a-row.
         */
        showWin: function () {
            _cellRef.attr("class", "tokenWin");
        },

        /**
            Reset this this cell back to the initial unused state.
         */
        reset: function () {
            _player = null;
            _isMarked = false;
            _cellRef.attr("class", "tokenNormal");
        }
    };
}