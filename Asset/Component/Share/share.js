"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
require("./share.less");
var function_1 = __importDefault(require("../../SDK/Function/function"));
var ajax_1 = __importDefault(require("../../SDK/Ajax/ajax"));
var W = window;
/**
 * 分享
 */
var Share = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Share
     * @param {ShareConfig} config 配置
     */
    function Share(config) {
        this.serverInfo = {
            share: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
            interface: '' // 分享接口
        };
        this.shareInfo = {
            title: '',
            description: '',
            img: '',
            url: ''
        };
        this.appInfo = {
            id: '',
            buttonId: '',
            extinfo: ''
        };
        this.sdk = null; // 微信SDK
        this.success = function (result) {
            console.log(result);
        };
        this.cancel = function (result) {
            console.log(result);
        };
        this.template = {
            callApp: function () {
                var _this = this;
                return "<div class=\"box_call_app\">\n            <wx-open-launch-app\n                id=\"" + _this.appInfo.buttonId + "\"\n                appid=\"" + _this.appInfo.id + "\"\n                extinfo=\"" + _this.appInfo.extinfo + "\">\n                <!-- \u5FAE\u4FE1\u5185\u7F6E\u7A97\u53E3 Start -->\n                <template>\n                    <style>\n                    div {\n                      padding: 0;\n                    }\n                    .button {\n                      position: relative;\n                      width: 100px;\n                      height: 100px;\n                      padding: 0;\n                      background-color: transparent;\n                      border: none;\n                    }\n                    </style>\n                    <button class=\"button\"></button>\n                </template>\n                <!-- \u5FAE\u4FE1\u5185\u7F6E\u7A97\u53E3 End -->\n            </wx-open-launch-app>\n            </div>";
            }
        };
        var _this = this;
        _this.serverInfo.interface = config.interface;
        _this.shareInfo.title = config.title;
        _this.shareInfo.description = config.description;
        _this.shareInfo.img = config.img;
        _this.shareInfo.url = config.url;
        _this.appInfo.id = config.appId || '';
        _this.appInfo.buttonId = config.appButtonId || '';
        _this.appInfo.extinfo = config.appExtinfo || '';
        config.success && (_this.success = config.success);
        config.cancel && (_this.cancel = config.cancel);
        _this.getShare();
    }
    /**
     * 获取分享
     */
    Share.prototype.getShare = function () {
        var _this = this;
        ajax_1.default.baseAjax({
            url: _this.serverInfo.interface,
            type: 'post',
            dataType: 'json',
            data: {
                url: W.location.href,
                timestamp: function_1.default.time.getStamp()
            },
            success: function (result) {
                var data = jquery_1.default.parseJSON(result.data);
                if (result.retCode !== 0) {
                    console.log(result.retMsg);
                    return;
                }
                _this.shareInfo.appId = data.appId;
                _this.shareInfo.timestamp = data.timestamp;
                _this.shareInfo.nonceStr = data.nonceStr;
                _this.shareInfo.signature = data.signature;
                _this.initShare();
            },
            error: function (e) {
                console.log(e);
            }
        });
    };
    /**
     * 初始化分享
     */
    Share.prototype.initShare = function () {
        var _this = this;
        jquery_1.default.getScript(_this.serverInfo.share, function () {
            if (!('wx' in W))
                return;
            _this.sdk = W.wx;
            _this.sdk.config({
                debug: false,
                appId: _this.shareInfo.appId,
                timestamp: _this.shareInfo.timestamp,
                nonceStr: _this.shareInfo.nonceStr,
                signature: _this.shareInfo.signature,
                jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline'],
                openTagList: ['wx-open-launch-app']
            });
            _this.sdk.ready(_this.setShare);
        });
    };
    /**
     * 设置分享
     */
    Share.prototype.setShare = function () {
        var _this = this;
        // 校验
        _this.sdk.checkJsApi({
            jsApiList: ['wx-open-launch-app'],
            success: function (result) {
                console.log('微信分享-开放接口-可用', result);
            },
            fail: function (result) {
                console.log('微信分享-开放接口-不可用', result);
            }
        });
        // 报错
        _this.sdk.error(function (result) {
            console.log('微信分享-开放接口-报错', result);
        });
        // 分享给好友
        _this.sdk.onMenuShareAppMessage({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            type: 'link',
            dataUrl: '',
            // trigger: (result: any) => {
            // },
            success: function (result) {
                console.log('微信分享-好友-成功', result);
                _this.success(result);
            },
            cancel: function (result) {
                console.log('微信分享-好友-取消', result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        // 分享至朋友圈
        _this.sdk.onMenuShareTimeline({
            title: _this.shareInfo.title,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: function (result) {
                console.log('微信分享-朋友圈-成功', result);
                _this.success(result);
            },
            cancel: function (result) {
                console.log('微信分享-朋友圈-取消', result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        // 分享至QQ
        _this.sdk.onMenuShareQQ({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: function (result) {
                _this.success(result);
            },
            cancel: function (result) {
                console.log(result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        // 分享至QQ空间
        _this.sdk.onMenuShareQZone({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: function (result) {
                _this.success(result);
            },
            cancel: function (result) {
                console.log(result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
    };
    return Share;
}());
exports.default = Share;
//# sourceMappingURL=share.js.map