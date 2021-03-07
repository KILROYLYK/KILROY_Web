"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.Flip = exports.Popup = exports.Ajax = exports.Preload = exports.Adaptation = exports.Algorithm = exports.FN = exports.Tween = exports.GSAP = exports.VConsole = exports.CryptoJS = exports.$ = exports.D = exports.W = exports.Path = void 0;
exports.Path = {
    npm: '/usr/local/lib/node_modules/',
    sdk: '../' // SDK
}, exports.W = window, exports.D = document;
/**
 * Plugin
 */
exports.$ = require(exports.Path.npm + 'jquery'), exports.CryptoJS = require(exports.Path.npm + 'crypto-js'), exports.VConsole = require(exports.Path.npm + 'vconsole'), exports.GSAP = require(exports.Path.npm + 'gsap'), exports.Tween = require(exports.Path.npm + '@tweenjs/tween.js'); // 过渡
/**
 * SDK
 */
exports.FN = require(exports.Path.npm + 'Function/function'), exports.Algorithm = require(exports.Path.npm + 'Algorithm/algorithm'), exports.Adaptation = require(exports.Path.npm + 'Adaptation/adaptation'), exports.Preload = require(exports.Path.npm + 'Preload/preload'), exports.Ajax = require(exports.Path.npm + 'Ajax/ajax'), exports.Popup = require(exports.Path.npm + 'Popup/popup'), exports.Flip = require(exports.Path.npm + 'Flip/flip'), exports.Authorization = require(exports.Path.npm + 'Authorization/authorization'); // 授权
/**
 * Global
 */
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.W = exports.W;
    Global.D = exports.D;
    Global.Path = exports.Path;
    Global.$ = exports.$;
    Global.CryptoJS = exports.CryptoJS;
    Global.VConsole = exports.VConsole;
    Global.GSAP = exports.GSAP;
    Global.Tween = exports.Tween;
    Global.FN = exports.FN;
    // public static readonly Algorithm: any = Algorithm;
    Global.Adaptation = exports.Adaptation;
    // public static readonly Preload: any = Preload;
    // public static readonly Ajax: any = Ajax;
    Global.Popup = exports.Popup;
    // public static readonly Flip: any = Flip;
    Global.Authorization = exports.Authorization;
    return Global;
}());
exports.default = Global;
//# sourceMappingURL=global.js.map