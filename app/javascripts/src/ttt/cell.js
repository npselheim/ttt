/** 
  * @namespace
  * @param {Number} index the index of the cell in the grid, 0-8
  * @throws {Error} if index is out of range
  */
MyApp.cell = function (index) {
    /** 
      * a reference to the cell in the document
      * @type {Element}
      * @private
      */
    var _cellRef,
    /** 
      * the player that marked this cell
      * @type {Player}
      * @private
      */
        _player = '',
    /**
      * indicates whether the cell is 'taken'
      * @type {Boolean}
      * @private
      */
        _isMarked = false;

    // verify that index is in range 0-8
    if ( index < 0 || index > 8 ) {
        throw new Error( "index must be in range 0-8" );
    }
    _cellRef = $('cell' + index);

    /** @scope MyApp.cell */
    return {  
        /**
          * Indicates that a cell is is claimed by a player,
          * i.e. records the player's move.
          * @ param {Player} player the player that moved on this cell
          */
        setPlayer: function (value) {
            _player = value;
            _isMarked = true;
        },
        /**
          * Retrieves a reference to the player who marked this cell
          * @return {Player} the player who marked this cell
          */
        getPlayer: function() {
            return _player;
        },
        /**
          * Indicates the state of the cell, marked or not
          * @return {Boolean} true if the cell has been marked
          */
        isMarked: function () {
            return _isMarked;
        },
        /**
          * Show that this cell is included in the winning 3-in-a-row.
          * @return nothing
          */
        showWin: function () {
            _cellRef.attr("class", "tokenWin");
        },
        /**
          * Reset this this cell back to the initial unused state.
          * @return nothing
          */
        reset: function () {
            _player = null;
            _isMarked = false;
            _cellRef.attr("class", "tokenNormal");
        }
    };
};