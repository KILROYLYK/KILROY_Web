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
     * @param {AuthorizeConfig} config 配置
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
            code: function_1.default.url.getParam('code') || '' // 微信Code
        };
        this.success = function (openId) {
            console.log(openId);
        };
        var _this = this;
        _this.serverInfo.interface = config.interface;
        _this.serverInfo.redirect = config.redirect || W.location.href;
        _this.userInfo.appId = config.appId;
        config.success && (_this.success = config.success);
        if (_this.userInfo.openId) { // 已登录
            _this.success(_this.userInfo.openId);
        }
        else if (_this.userInfo.code) { // // 已授权
            _this.getAuthorize();
        }
        else { // 未登录并且未授权
            _this.getCode();
        }
    }
    /**
     * 获取Code
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
     * 获取授权
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
                var data = result.data;
                if (result.retCode !== 0) {
                    console.log(result.retMsg);
                    return;
                }
                function_1.default.cookie.set('openId', data.openid);
                _this.userInfo.openId = data.openId;
                _this.success(_this.userInfo.openId);
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