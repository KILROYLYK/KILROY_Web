"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.Flip = exports.Popup = exports.Ajax = exports.Preload = exports.Adaptation = exports.Algorithm = exports.FN = exports.Tween = exports.GSAP = exports.Crypto = exports.Console = exports.$ = exports.D = exports.W = void 0;
exports.W = window, exports.D = document;
/**
 * Plugin
 */
exports.$ = require('/usr/local/lib/node_modules/jquery'), exports.Console = require('/usr/local/lib/node_modules/vconsole'), exports.Crypto = require('/usr/local/lib/node_modules/crypto-js'), exports.GSAP = require('/usr/local/lib/node_modules/gsap'), exports.Tween = require('/usr/local/lib/node_modules/@tweenjs/tween.js'); // 过渡
/**
 * SDK
 */
exports.FN = require('../Function/function').default, exports.Algorithm = require('../Algorithm/algorithm').default, exports.Adaptation = require('../Adaptation/adaptation').default, exports.Preload = require('../Preload/preload').default, exports.Ajax = require('../Ajax/ajax').default, exports.Popup = require('../Popup/popup').default, exports.Flip = require('../Flip/flip').default, exports.Authorization = require('../Authorization/authorization').default; // 授权
/**
 * Global
 */
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.W = exports.W;
    Global.D = exports.D;
    Global.$ = exports.$;
    Global.Console = exports.Console;
    Global.Crypto = exports.Crypto;
    Global.GSAP = exports.GSAP;
    Global.Tween = exports.Tween;
    Global.FN = exports.FN;
    // public static readonly Algorithm: any = Algorithm;
    Global.Adaptation = exports.Adaptation;
    // public static readonly Preload: any = Preload;
    Global.Ajax = exports.Ajax;
    Global.Popup = exports.Popup;
    // public static readonly Flip: any = Flip;
    Global.Authorization = exports.Authorization;
    return Global;
}());
exports.default = Global;
//# sourceMappingURL=global.js.map