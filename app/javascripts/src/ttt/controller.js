

MyApp = {};

MyApp.controller = function () {
    "use strict";

    var $startBtn,
        $message,
        $grid,
        mark,
        grid,

    init = function () {
        $startBtn = jQuery( "input#startBtn" );
        $grid = jQuery( "div#grid" );
        $message = jQuery( "td#message" );
        $startBtn.one( "click", start );
        $message.text( "Start button is now activated" );
    },

    start = function () {
        reset();
        $grid.on( "click", processMove );
        $message.text ( "Game started: X moves first" );
        return false;
    }, 

    processMove = function ( e ) {
        // setup
        var cell, $cell, row, index;
        cell = e.target.id;
        $cell = jQuery( "td#" + cell );
        index = cell.charAt( 4 );

        // reject a click on an occupied cell
        if ( !grid.update( index, mark ) ) return false;

        // show the player's move on the grid
        $cell.text( mark );
        
        row = grid.findWinningRow( mark );
        if ( row !== null ) {
            // we have a winner!
            grid.formatWinningRow( row );
            $message.text( "We have a winner!" );
            gameOver();
            return false;
        };

        if ( grid.isFull() ) {
            // we have a draw...
            $message.text( "Draw! Nobody wins! Try again?" );
            gameOver();
            return false;
        };

        mark = ( mark === "X" ) ? "O" : "X";
        $message.text( "Now it's " + mark + "'s turn to move" );

    },

    reset = function () {
        mark = "X";
        grid = MyApp.createGrid();
        jQuery( ".cell" )
            .removeClass( "winner_cell" )
            .html( "&nbsp;" );
    },

    gameOver = function () {
        $grid.off( "click", processMove );
        $startBtn.one( "click", start );
    };

    init();
};

jQuery( document ).ready( MyApp.controller );