var Random = (function () {
    var methods = {};
    //TODO More frequency around 0 degree
    methods.angle = function (range) {
        var angle = methods.int(range);
        angle *= methods.int(2) == 1 ? 1 : -1;
        return angle;
    };
    methods.int = function (range) {
        return Math.floor(Math.random() * range) + 1;
    };
    return methods;
})();

var Stamps = (function () {
    var methods = {};
    methods.intersect = function (r1, r2) {
        var a = r1.getBoundingClientRect();
        var b = r2.getBoundingClientRect();

        //TODO Check for card bounds
        if (a.top < 0 || b.top < 0 ||
            a.left < 0 || b.left < 0 ||
            a.right > 400 || b.rigjt > 400 ||
            a.bottom > 720 || b.bottom > 720) {
            return false;
        }
        return !(b.left > a.right ||
        b.right < a.left ||
        b.top > a.bottom ||
        b.bottom < a.top);
    };
    methods.redraw = function () {
        canvg('canvas', draw.exportSvg(),
            {
                ignoreDimensions: false,
                scaleWidth: 400,
                scaleHeight: 720,
                renderCallback: function () {
                    var ctx = document.getElementById('canvas');
                    var base64Img = ctx.toDataURL('image/png');
                    setTimeout(function () {
                        $('canvas').click();
                    }, 500);
                }
            });
    };
    /**
     * Shifts svg element from third argument unless it stops intersect with first
     *
     * @param {HTMLImageElement}    a
     * @param {HTMLImageElement}    b
     * @param {object}              el
     */
    methods.shiftUnless = function (a, b, el) {
        while (Stamps.intersect(a, b)) {
            //TODO Shift in another direction, rotate 90deg
            for (var i = 0; (i < 10) || !Stamps.intersect(a, b); i++) {
                el.dx(1);
                if (!Stamps.intersect(a, b)) return;
            }
            for (var i = 0; (i < 10) || !Stamps.intersect(a, b); i++) {
                el.dy(1);
                if (!Stamps.intersect(a, b)) return;
            }
        }
    };
    return methods;
})();