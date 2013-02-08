function cell(index) {
    var cellToken = token('&nbsp;'),
        cellState = 'empty';
    return {
        getElement: function () {
            return document.getElementById('cell' + index);
        },
        setToken: function (char) {
            var el = this.getElement();
            cellToken = token(char);
            cellState = char === '&nbsp;' ? 'empty' : 'used';
            el.innerHTML = char;
            el.className = 'tokenNormal';
        },
        getValue: function () {
            return cellToken.getValue();
        },
        showWin: function () {
            this.getElement().className = 'tokenWin';
        },
        clear: function () {
            this.setToken('&nbsp;');
        },
        getCellState: function () {
            return cellState;
        }
    };
}