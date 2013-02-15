/**
    Creates cell objects. A cell is one square on the 
    tic-tac-toe board that starts out blank and can be
    marked with either an 'X' or an 'O'
    @class 
    */
MyApp.cell = function ( index ) {

    /** 
        a reference to the cell element in the document
        @type {Element}
        @private
        */
    var $cellRef,

    /** 
        the mark in this cell
        @type {String}
        @private
        */
        mark = '';

    if ( index < 0 || index > 8 ) {
        throw new Error( "index must be in range 0-8" );
    }
    $cellRef = $("td#cell" + index);
   
    return {
        /**
          * Marks the cell to record a player's move
          * @ param {String} value the mark to show in this cell, 'X' or 'O'
          */
        setMark: function (value) {
            if ( value !== 'X' && value !== 'O' ) {
                throw new Error( "mark must be 'X' or 'O'" );
            };
            mark = value;
        },

        /**
          * Retrieves the mark in this cell
          * @returns {String} the mark in this cell
          */
        getMark: function() {
            return mark;
        },

        /**
          * Indicates the state of the cell, marked or not
          * @returns {Boolean} true if the cell has been marked
          */
        isMarked: function () {
            return mark ? true : false;
        },

        /**
          * Show that this cell is included in the winning 3-in-a-row.
          * @returns nothing
          */
        showWin: function () {
            $cellRef.removeClass().addClass("tokenWin");
        },

        /**
          * Reset this cell back to the initial unused state.
          * @returns nothing
          */
        reset: function () {
            mark = '';
            $cellRef.removeClass().addClass("tokenNormal");
        }
    };
};