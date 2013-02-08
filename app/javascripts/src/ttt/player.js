function player(mark) {
    var playerToken = token(mark);
    return {
        getToken: function () {
            return playerToken;
        },
        move: function () {
            // wait for the user to click on a cell
        }
    };
}