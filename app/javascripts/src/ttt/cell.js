/**
    Creates cell objects. A cell is one square on the 
    tic-tac-toe board that starts out blank and can be
    marked with either an 'X' or an 'O'
    @class 
    */
MyApp.createCell = function ( name, index ) {

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

    $cellRef = jQuery( "td#" + name );

    if ( $cellRef.length === 0 ) return null;

    if ( index < 0 || index > 8 ) return null;
   
    return {
        /**
            Marks the cell to record a player's move
            @ param {string} value of the mark to show in this cell
            */
        setMark: function (value) {
            if ( typeof value !== "string" ) return;

            mark = value[0];
        },

        /**
            Retrieves the mark in this cell
            @returns {String} the mark in this cell
            */
        getMark: function() {
            return mark;
        },

        /**
            Indicates the state of the cell, marked or not
            @returns {Boolean} true if the cell has been marked
            */
        isMarked: function () {
            return mark ? true : false;
        },

        /**
            Show that this cell is included in the winning 3-in-a-row.
            @returns nothing
            */
        // showAsWinner: function () {
        //     $cellRef.removeClass().addClass("tokenWin");
        // },

        /**
            Reset this cell back to the initial unused state.
            @returns nothing
            */
        // reset: function () {
        //     mark = '';
        //     $cellRef.removeClass().addClass("tokenNormal");
        // }
    };
};