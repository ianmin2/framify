// point.js
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
};

exports.Point = Point;

if (require.main === module) {
    var pt = new Point(7, 4);
    console.log("My point: " + JSON.stringify(pt));
}
