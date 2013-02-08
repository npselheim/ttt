function token(char) {
    return {
        getText: function () {
            return char;
        },
        getValue: function () {
            return char === 'nbsp;' ? 0 : char.charCodeAt(0);
        },
        getWinValue: function () {
            return this.getValue() * 3;
        }
    };
}