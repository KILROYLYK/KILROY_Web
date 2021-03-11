"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = __importDefault(require("../../SDK/Function/function"));
var ajax_1 = __importDefault(require("../../SDK/Ajax/ajax"));
var W = window;
/**
 * 授权
 */
var Authorize = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Authorize
     */
    function Authorize(config) {
        this.serverInfo = {
            authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize',
            interface: '',
            redirect: '' // 授权成功回调地址
        };
        this.userInfo = {
            appId: '',
            openId: function_1.default.cookie.get('openId') || '',
            code: function_1.default.url.getParam('code') || '', // 微信Code
        };
        this.callback = function (result) {
            console.log(result);
        };
        var _this = this;
        _this.serverInfo.interface = config.interface;
        _this.serverInfo.redirect = config.redirect || W.location.href;
        _this.userInfo.appId = config.appId;
        config.callback && (_this.callback = config.callback);
    }
    /**
     *
     * @private
     */
    Authorize.prototype.verify = function () {
    };
    /**
     * 获取Code
     * @return {void}
     */
    Authorize.prototype.getCode = function () {
        var _this = this, url = function_1.default.url.delParam(['code'], _this.serverInfo.redirect);
        W.location.href = _this.serverInfo.authorize +
            '?appid=' + _this.userInfo.appId +
            '&redirect_uri=' + encodeURIComponent(url) +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=yd' +
            '#wechat_redirect';
    };
    /**
     * 授权
     * @return {void}
     */
    Authorize.prototype.getAuthorize = function () {
        var _this = this;
        ajax_1.default.baseAjax({
            url: _this.serverInfo.interface,
            type: 'post',
            dataType: 'json',
            data: {
                code: _this.userInfo.code,
                timestamp: function_1.default.getTimestamp()
            },
            success: function (result) {
                _this.callback && _this.callback(result);
            },
            error: function (e) {
                console.log(e);
            }
        });
    };
    return Authorize;
}());
exports.default = Authorize;
//# sourceMappingURL=authorize.js.map