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
    var cellRef,
    /** 
      * the mark in this cell
      * @type {Player}
      * @private
      */
        mark = '';

    // verify that index is in range 0-8
    if ( index < 0 || index > 8 ) {
        throw new Error( "index must be in range 0-8" );
    }
    cellRef = $('cell' + index);

    /** @scope MyApp.cell */
    return {  
        /**
          * Indicates that a cell is is claimed by a player,
          * i.e. records the player's move.
          * @ param {Player} player the player that moved on this cell
          */
        setMark: function (value) {
            if ( value !== 'X' && value !== 'O' ) {
                throw new Error( "mark must be 'X' or 'O'" );
            };
            mark = value;
        },
        /**
          * Retrieves a reference to the player who marked this cell
          * @return {Player} the player who marked this cell
          */
        getMark: function() {
            return mark;
        },
        /**
          * Indicates the state of the cell, marked or not
          * @return {Boolean} true if the cell has been marked
          */
        isMarked: function () {
            return mark ? true : false;
        },
        /**
          * Show that this cell is included in the winning 3-in-a-row.
          * @return nothing
          */
        showWin: function () {
            cellRef.attr("class", "tokenWin");
        },
        /**
          * Reset this this cell back to the initial unused state.
          * @return nothing
          */
        reset: function () {
            mark = '';
            cellRef.attr("class", "tokenNormal");
        }
    };
};