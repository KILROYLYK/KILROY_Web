"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = exports.Share = exports.Flip = exports.Popup = exports.Preload = exports.Ajax = exports.Crypto = exports.Adaptation = exports.Algorithm = exports.FN = exports.Console = exports.$ = exports.D = exports.W = void 0;
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/@types/jquery")); // JQuery
// @ts-ignore
var vconsole_1 = __importDefault(require("/usr/local/lib/node_modules/vconsole")); // 日志
var function_1 = __importDefault(require("../SDK/Function/function")); // 函数
var algorithm_1 = __importDefault(require("../SDK/Algorithm/algorithm")); // 算法
var adaptation_1 = __importDefault(require("../SDK/Adaptation/adaptation")); // 适配
var crypto_1 = __importDefault(require("../SDK/Crypto/crypto")); // 加密
var ajax_1 = __importDefault(require("../SDK/Ajax/ajax")); // 远程请求
var preload_1 = __importDefault(require("../Component/Preload/preload")); // 预加载
var popup_1 = __importDefault(require("../Component/Popup/popup")); // 弹窗
var flip_1 = __importDefault(require("../Component/Flip/flip")); // 翻页
var share_1 = __importDefault(require("../Component/Share/share")); // 分享
var authorize_1 = __importDefault(require("../Component/Authorize/authorize")); // 授权
/**
 * Base
 */
exports.W = window, exports.D = document;
/**
 * Plugin
 */
exports.$ = jquery_1.default, exports.Console = vconsole_1.default;
/**
 * SDK
 */
exports.FN = function_1.default, exports.Algorithm = algorithm_1.default, exports.Adaptation = adaptation_1.default, exports.Crypto = crypto_1.default, exports.Ajax = ajax_1.default;
/**
 * Component
 */
exports.Preload = preload_1.default, exports.Popup = popup_1.default, exports.Flip = flip_1.default, exports.Share = share_1.default, exports.Authorize = authorize_1.default;
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
    Global.FN = exports.FN;
    Global.Algorithm = exports.Algorithm;
    Global.Adaptation = exports.Adaptation;
    Global.Crypto = exports.Crypto;
    Global.Ajax = exports.Ajax;
    Global.Preload = exports.Preload;
    Global.Popup = exports.Popup;
    Global.Flip = exports.Flip;
    Global.Share = exports.Share;
    Global.Authorize = exports.Authorize;
    return Global;
}());
exports.default = Global;
//# sourceMappingURL=global.js.map