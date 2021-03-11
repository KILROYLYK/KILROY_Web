"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = exports.Flip = exports.Popup = exports.Ajax = exports.Crypto = exports.Preload = exports.Adaptation = exports.Algorithm = exports.FN = exports.Tween = exports.GSAP = exports.Console = exports.$ = exports.D = exports.W = void 0;
/**
 * Base
 */
exports.W = window, exports.D = document;
/**
 * Plugin
 */
exports.$ = require('/usr/local/lib/node_modules/jquery'), exports.Console = require('/usr/local/lib/node_modules/vconsole'), exports.GSAP = require('/usr/local/lib/node_modules/gsap'), exports.Tween = require('/usr/local/lib/node_modules/@tweenjs/tween.js'); // 过渡
/**
 * SDK
 */
exports.FN = require('../Function/function.ts').default, exports.Algorithm = require('../Algorithm/algorithm.ts').default, exports.Adaptation = require('../Adaptation/adaptation.ts').default, exports.Preload = require('../Preload/preload.ts').default, exports.Crypto = require('../Crypto/crypto.ts').default, exports.Ajax = require('../Ajax/ajax.ts').default, exports.Popup = require('../Popup/popup.ts').default, exports.Flip = require('../Flip/flip.ts').default, exports.Authorize = require('../Authorize/authorize.ts').default; // 授权
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
    Global.GSAP = exports.GSAP;
    Global.Tween = exports.Tween;
    Global.FN = exports.FN;
    Global.Algorithm = exports.Algorithm;
    Global.Adaptation = exports.Adaptation;
    Global.Preload = exports.Preload;
    Global.Crypto = exports.Crypto;
    Global.Ajax = exports.Ajax;
    Global.Popup = exports.Popup;
    Global.Flip = exports.Flip;
    Global.Authorize = exports.Authorize;
    return Global;
}());
exports.default = Global;
//# sourceMappingURL=global.js.map