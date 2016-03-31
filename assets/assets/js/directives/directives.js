"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        app.directive('appSample', function () {
            return {
                restrict: 'E',
                controller: 'framifySampleController',
                templateUrl: 'views/2app-sample.html'
            };
        });
    }, {}], 2: [function (require, module, exports) {
        app.directive("appDirective", function () {
            return {
                restrict: "E",
                controller: "appController"
            };
        });
    }, {}], 3: [function (require, module, exports) {
        require("./app.dir.js");
        require('./app-sample.dir.js');
    }, { "./app-sample.dir.js": 1, "./app.dir.js": 2 }] }, {}, [3]);