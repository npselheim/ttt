var clickUtils = {
    addListener: function(el, type, fn) {},
    removeListener: function(el, type, fn) {},
    clickHandler: function (e, work) {
        var src;

        // get event and source element
        e = e || window.event;
        src = e.target || e.srcElement;

        // actual work
        work(src);

        // no bubble
        if (typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        if (e.cancelBubble !== 'undefined') {
            e.cancelBubble = true;
        }

        // prevent default action
        if (typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (e.returnValue !== 'undefined') {
            e.returnValue = false;
        }
    }
}