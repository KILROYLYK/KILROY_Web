"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tween = exports.GSAP = exports.VConsole = exports.$ = exports.Authorization = exports.Flip = exports.Popup = exports.Ajax = exports.Preload = exports.Adaptation = exports.Algorithm = exports.FN = exports.D = exports.W = void 0;
exports.W = window, exports.D = document;
/**
 * SDK
 */
exports.FN = require('../Function/Function').default, exports.Algorithm = require('../Algorithm/algorithm').default, exports.Adaptation = require('../Adaptation/adaptation.ts').default, exports.Preload = require('../Preload/preload.ts').default, exports.Ajax = require('../Ajax/ajax.ts').default, exports.Popup = require('../Popup/popup.ts').default, exports.Flip = require('../Flip/flip.ts').default, exports.Authorization = require('../Authorization/authorization.ts').default; // 授权
/**
 * Plugin
 * NodePath：/usr/local/lib/node_modules/
 */
exports.$ = require('/usr/local/lib/node_modules/jquery'), exports.VConsole = require('/usr/local/lib/node_modules/vconsole'), exports.GSAP = require('/usr/local/lib/node_modules/gsap'), exports.Tween = require('/usr/local/lib/node_modules/@tweenjs/tween.js').default; // 过渡
/**
 * Global
 */
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.W = exports.W;
    Global.D = exports.D;
    Global.FN = exports.FN;
    // public static readonly Algorithm: any = Algorithm;
    Global.Adaptation = exports.Adaptation;
    // public static readonly Preload: any = Preload;
    Global.Ajax = exports.Ajax;
    Global.Popup = exports.Popup;
    Global.Flip = exports.Flip;
    // public static readonly Authorization: any = Authorization;
    Global.$ = exports.$;
    Global.VConsole = exports.VConsole;
    Global.GSAP = exports.GSAP;
    Global.Tween = exports.Tween;
    return Global;
}());
exports.default = Global;
//# sourceMappingURL=Global.js.map