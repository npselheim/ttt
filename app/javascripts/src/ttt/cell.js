/**
    Creates new Cell objects
    @constructor 
    */
MyApp.Cell = (function () {

    /** 
        a reference to the cell in the document
        @type {Element}
        @private
        */
    // var cellRef,

        /** 
            the mark in this cell
            @type {String}
            @private
            */
        // mark = '',

        /** 
            the constructor for creating Cell instances
            @function
            @private
            */
        // Constr = null;

    var Constr = function (index) {
        // verify that index is in range 0-8
        if ( index < 0 || index > 8 ) {
            throw new Error( "index must be in range 0-8" );
        }
        this.cellRef = $('cell' + index);
        this.mark = '';
    };
   
   Constr.prototype = 
        /** @lends MyApp.Cell.prototype */
        {
        
        constructor: MyApp.Cell,
        // mark: '',
        // cellRef: null,

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
            console.log( mark.length );
            return (mark ? true : false);
        },

        /**
          * Show that this cell is included in the winning 3-in-a-row.
          * @returns nothing
          */
        showWin: function () {
            cellRef.attr("class", "tokenWin");
        },

        /**
          * Reset this this cell back to the initial unused state.
          * @returns nothing
          */
        reset: function () {
            mark = '';
            cellRef.attr("class", "tokenNormal");
        }
    };

    /** @scope MyApp.Cell */
    return Constr;
    
}());    
