goog.require('goog.dom.ViewportSizeMonitor');

$(document).ready (function () {
    var vsm = new goog.dom.ViewportSizeMonitor();
    var resizeFunc = function(e) {
        var screenSize = vsm.getSize();
        var layout = $('#layout');

        var newHeight = screenSize.height - layout.offset ().top - 5;
        layout.add('#products').css({
            height: newHeight + 'px',
        });
    };
    
    goog.events.listen(vsm, goog.events.EventType.RESIZE, resizeFunc);
})
