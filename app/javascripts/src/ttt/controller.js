MyApp = {};

MyApp.controller = function () {
    "use strict";

    var $startBtn,
        $message,
        $grid,
        $mode,
        $xo,
        mode,
        mark,
        grid,
        playerMark,

    init = function () {
        $startBtn = jQuery( "input#startBtn" );
        $grid = jQuery( "div#grid" );
        $message = jQuery( "td#message" );
        $mode = jQuery( 'input[name="modeGroup"]' );
        $xo = jQuery( 'input[name="xoGroup"]' );

        $startBtn.one( "click", start );
        $mode.change( setMode );
        $xo.change( setPlayerMark );
        $mode.change();
        $xo.change();
        $message.text( "Start button is now activated" );
    },

    setMode = function () {
        var $xoForm;

        mode = jQuery( "#modeForm input:checked" ).val();
        $xoForm = jQuery( "#xoForm" );

        // disable X/O selection for 2-player mode
        if ( mode === "2" ) {
            $xo.prop( "disabled", true );
            $xoForm.addClass( "gray-out" );
        } else {
            $xo.prop( "disabled", false );
            $xoForm.removeClass( "gray-out" );
        }
    },

    setPlayerMark = function () {
        var mark;
        mark = jQuery( "#xoForm input:checked" ).val();
        // internal player gets the opposite of user selection
        playerMark = mark === "X" ? "O" : "X";
    },

    start = function () {
        console.log( "start ..." );
        reset();

        if ( mode === "1" ) {
            MyApp.player.setup( playerMark );
        };

        $grid.click( processMove );
        $message.text ( "Game started: X moves first" );

        $.publish( "grid-update", [ mark, grid ] );
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
        $.publish( "grid-update", [ mark, grid ] );
        return false;
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