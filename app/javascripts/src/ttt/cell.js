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
    var cellRef,

        /** 
            the mark in this cell
            @type {String}
            @private
            */
        mark = '',

        /** 
            the constructor for creating Cell instances
            @function
            @private
            */
        Constr = null;

    Constr = function (index) {
        // verify that index is in range 0-8
        if ( index < 0 || index > 8 ) {
            throw new Error( "index must be in range 0-8" );
        }
        this.cellRef = $('cell' + index);
    };

   
   Constr.prototype = 
        /** @lends MyApp.Cell.prototype */
        {
        
        constructor: MyApp.Cell,

        /**
          * Marks the cell to record a player's move
          * @ param {String} value the mark to show in this cell, 'X' or 'O'
          */
        setMark: function (value) {
            if ( value !== 'X' && value !== 'O' ) {
                throw new Error( "mark must be 'X' or 'O'" );
            };
            this.mark = value;
        },

        /**
          * Retrieves the mark in this cell this cell
          * @returns {String} the mark in this cell
          */
        getMark: function() {
            return this.mark;
        },

        /**
          * Indicates the state of the cell, marked or not
          * @returns {Boolean} true if the cell has been marked
          */
        isMarked: function () {
            return this.mark ? true : false;
        },

        /**
          * Show that this cell is included in the winning 3-in-a-row.
          * @returns nothing
          */
        showWin: function () {
            this.cellRef.attr("class", "tokenWin");
        },

        /**
          * Reset this this cell back to the initial unused state.
          * @returns nothing
          */
        reset: function () {
            this.mark = '';
            this.cellRef.attr("class", "tokenNormal");
        }
    };

    /** @scope MyApp.Cell */
    return Constr;
    
}());    
