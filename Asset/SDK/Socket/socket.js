"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var W = window;
var Socket = /** @class */ (function () {
    /**
     * 构造函数
     * @param {string} url 链接地址
     * @param {SocketConfig} config 配置
     */
    function Socket(url, config) {
        this.isActive = false; // 是否激活
        this.url = ''; // 链接地址
        this.config = null; // 配置
        this.socket = null; // 长链
        var _this = this;
        _this.url = url;
        _this.config = config;
    }
    /**
     * 创建
     */
    Socket.prototype.create = function () {
        var _this = this;
        if (_this.isActive)
            return;
        _this.isActive = true;
        _this.socket = new WebSocket(_this.url);
        _this.socket.onopen = _this.open;
        _this.socket.onclose = _this.close;
        _this.socket.onerror = _this.error;
        _this.socket.onmessage = _this.message;
    };
    /**
     * 销毁
     */
    Socket.prototype.destroy = function () {
        var _this = this;
        if (!_this.isActive)
            return;
        _this.isActive = false;
        _this.socket = null;
    };
    /**
     * 打开
     * @param {Event} e 事件
     */
    Socket.prototype.open = function (e) {
        var _this = this;
        console.log('---------- Socket 打开 ----------');
        _this.config.open && _this.config.open(e);
    };
    /**
     * 关闭
     * @param {CloseEvent} e 事件
     */
    Socket.prototype.close = function (e) {
        var _this = this;
        console.log('---------- Socket 关闭 ----------');
        _this.config.close && _this.config.close(e);
    };
    /**
     * 错误
     * @param {Event} e 事件
     */
    Socket.prototype.error = function (e) {
        var _this = this;
        _this.config.error && _this.config.error(e);
    };
    /**
     * 消息
     * @param {MessageEvent} e 事件
     */
    Socket.prototype.message = function (e) {
        var _this = this;
        _this.config.message && _this.config.message(e);
    };
    /**
     * 发送
     * @param {*} data 数据
     */
    Socket.prototype.send = function (data) {
        var _this = this;
        if (!_this.isActive)
            return;
        _this.socket.send(JSON.stringify(data));
    };
    return Socket;
}());
exports.default = Socket;
//# sourceMappingURL=socket.js.map