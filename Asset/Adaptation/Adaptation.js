"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 适配
 */
var Adaptation = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Rem
     */
    function Adaptation() {
        this.W = window;
        this.D = document;
        this.psdWidth = 750; // PSD宽度
        this.scale = true; // 是否在大屏开启缩放
        this.setTime = 0; // 定时器
        this.waitTime = 300; // 等待时间
        this.regMobile = /Mobile|Windows Phone|Android|iPhone|iPod|BlackBerry|SymbianOS|webOS/i;
        var _this = this;
    }
    /**
     * 跳转移动端
     * @param {string} position 移动端地址
     * @return {void}
     */
    Adaptation.prototype.jumpMobile = function (position) {
        if (position === void 0) { position = ''; }
        var _this = this;
        _this.regMobile.test(_this.W.navigator.userAgent) && (_this.W.location.href =
            _this.W.location.origin + position +
                _this.W.location.pathname +
                _this.W.location.search +
                _this.W.location.hash);
    };
    /**
     * 监听屏幕
     * @return {void}
     */
    Adaptation.prototype.openRem = function () {
        var _this = this;
        // 开启监听
        _this.D.addEventListener('DOMContentLoaded', function () {
            _this.changeRem();
        }, false);
        _this.W.addEventListener('onorientationchange' in _this.W ? 'orientationchange' : 'resize', function () {
            _this.setTimeChangeRem();
        }, false);
        _this.W.addEventListener('pageshow', function (e) {
            if (e.persisted)
                _this.setTimeChangeRem();
        }, false);
    };
    /**
     * 定时修改Rem
     * @return {void}
     */
    Adaptation.prototype.setTimeChangeRem = function () {
        var _this = this;
        clearTimeout(_this.setTime);
        _this.setTime = setTimeout(function () {
            _this.changeRem();
        }, _this.waitTime);
    };
    /**
     * 改变Rem
     * @return {void}
     */
    Adaptation.prototype.changeRem = function () {
        var _this = this, width = _this.W.innerWidth, height = _this.W.innerHeight;
        var fontSize = width / _this.psdWidth * 100;
        if (fontSize > 100)
            fontSize = 100;
        if (_this.scale && width / height >= 0.75)
            fontSize = 75;
        _this.D.documentElement.style.fontSize = fontSize + 'px';
    };
    return Adaptation;
}());
exports.default = Adaptation;
//# sourceMappingURL=Adaptation.js.map