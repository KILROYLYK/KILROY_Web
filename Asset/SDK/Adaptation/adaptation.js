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
    /**
     * 构造函数
     * @constructor Adaptation
     */
    function Adaptation() {
        var _this = this;
    }
    // ---------- Rem Start ---------- //
    /**
     * 监听屏幕
     * @param {RemConfig} config 配置
     * @return {void}
     */
    Adaptation.Rem = function (config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        function_1.default.resize(function () {
            _this.changeRem(config);
        }, config.time || 300);
    };
    /**
     * 改变Rem
     * @param {RemConfig} config 配置
     * @return {void}
     */
    Adaptation.changeRem = function (config) {
        if (config === void 0) { config = {}; }
        var _this = this, width = W.innerWidth, height = W.innerHeight, design = config.width || 750;
        var fontSize = width / design * 100;
        if (config.isMax && fontSize > 100)
            fontSize = 100;
        if (config.isScale && width / height >= 0.75)
            fontSize = 75;
        D.documentElement.style.fontSize = fontSize + 'px';
    };
    return Adaptation;
}());
exports.default = Adaptation;
//# sourceMappingURL=adaptation.js.map