"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = __importDefault(require("../Function/function"));
var W = window, D = document;
/**
 * 适配
 */
var Adaptation = /** @class */ (function () {
    function Adaptation() {
    }
    // ---------- Rem Start ---------- //
    /**
     * 监听屏幕
     * @param {RemConfig} config 配置
     */
    Adaptation.Rem = function (config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        function_1.default.resize(function () {
            _this.changeRem(config);
        }, config.time || 100);
    };
    /**
     * 改变Rem
     * @param {RemConfig} config 配置
     */
    Adaptation.changeRem = function (config) {
        if (config === void 0) { config = {}; }
        var _this = this, width = W.innerWidth, design = config.width || 750;
        var fontSize = width / design * 100;
        config.constraint && (fontSize = config.constraint(fontSize));
        D.documentElement.style.fontSize = fontSize + 'px';
    };
    return Adaptation;
}());
exports.default = Adaptation;
//# sourceMappingURL=adaptation.js.map