"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
var function_1 = __importDefault(require("../Function/function")); // 函数
var crypto_1 = __importDefault(require("../Crypto/crypto")); // 加密
/**
 * 异步JS和XML
 */
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /**
     * 基础请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     */
    Ajax.baseAjax = function (config, expand) {
        var _this = this;
        expand && expand(config);
        jquery_1.default.ajax(config);
    };
    /**
     * 跨域请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     */
    Ajax.crossAjax = function (config, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            Object.assign(ajaxConfig, {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });
            expand && expand(ajaxConfig);
        });
    };
    /**
     * Jsonp请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     */
    Ajax.jsonpAjax = function (config, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            Object.assign(ajaxConfig, {
                dataType: 'jsonp',
                jsonp: 'jsoncallback'
            });
            expand && expand(ajaxConfig);
        });
    };
    /**
     * MD5加密
     * @param {AjaxConfig} config 配置
     * @param {EncryptConfig} encrypt 密钥
     * @param {Function} expand 拓展
     */
    Ajax.encryptMD5Ajax = function (config, encrypt, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            var key = encrypt.key || crypto_1.default.createKey(encrypt.length || 0), sortData = function_1.default.object.sort(ajaxConfig.data), sign = crypto_1.default.encryptMD5(key, sortData);
            ajaxConfig.data = Object.assign(sortData, { sign: sign });
            expand && expand(ajaxConfig);
        });
    };
    /**
     * AES加密请求
     * @param {AjaxConfig} config 配置
     * @param {EncryptConfig} encrypt 密钥
     * @param {Function} expand 拓展
     */
    Ajax.encryptAESAjax = function (config, encrypt, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            var key = encrypt.key || crypto_1.default.createKey(encrypt.length || 0), data = crypto_1.default.encryptAES(key, ajaxConfig.data);
            ajaxConfig.data = { data: data, key: key };
            expand && expand(ajaxConfig);
        });
    };
    /**
     * CMSAES请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     */
    Ajax.cmsAESAjax = function (config, expand) {
        var _this = this;
        _this.encryptAESAjax(config, { length: 16 }, function (ajaxConfig) {
            var data = ajaxConfig.data;
            ajaxConfig.data = {
                encryptedData: data.data,
                key: data.key
            };
            expand && expand(ajaxConfig);
        });
    };
    /**
     * 活动AES请求
     * @param {AjaxConfig} config 配置
     * @param {string} id 通行证
     * @param {string} key 密钥
     * @param {Function} expand 拓展
     */
    Ajax.activityAESAjax = function (config, id, key, expand) {
        var _this = this;
        _this.encryptAESAjax(config, { key: key }, function (ajaxConfig) {
            var data = ajaxConfig.data;
            ajaxConfig.data = {
                data: data.data,
                preid: id
            };
            expand && expand(ajaxConfig);
        });
    };
    return Ajax;
}());
exports.default = Ajax;
//# sourceMappingURL=ajax.js.map