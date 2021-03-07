"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
var crypto_js_1 = __importDefault(require("/usr/local/lib/node_modules/crypto-js"));
/**
 * 远程请求
 */
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /**
     * 基础请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    Ajax.baseAjax = function (config, expand) {
        var _this = this;
        expand && expand(config);
        _this.$.ajax(config);
    };
    /**
     * 跨域请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
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
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
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
     * @param {any} config 配置
     * @param {EncryptInfo} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    Ajax.encryptMD5Ajax = function (config, encrypt, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            var key = encrypt.key || _this.createKey(encrypt.length || 0), sortData = _this.sortObject(ajaxConfig.data), sign = _this.encryptMD5(key, sortData);
            ajaxConfig.data = Object.assign(sortData, { sign: sign });
            expand && expand(ajaxConfig);
        });
    };
    /**
     * AES加密请求
     * @param {any} config 配置
     * @param {EncryptInfo} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    Ajax.encryptAESAjax = function (config, encrypt, expand) {
        var _this = this;
        _this.baseAjax(config, function (ajaxConfig) {
            var key = encrypt.key || _this.createKey(encrypt.length || 0), data = _this.encryptAES(key, ajaxConfig.data);
            ajaxConfig.data = { data: data, key: key };
            expand && expand(ajaxConfig);
        });
    };
    /**
     * CMSAES请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    Ajax.CMSAESAjax = function (config, expand) {
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
     * @param {any} config 配置
     * @param {string} id 通行证
     * @param {string} key 密钥
     * @param {Function} expand 拓展
     * @return {void}
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
    /**
     * 排序对象
     * @param {object} object 对象
     * @return {object} 返回排序后对象
     */
    Ajax.sortObject = function (object) {
        var _this = this, newObject = {};
        Object.keys(object).sort().forEach(function (key) {
            newObject[key] = object[key];
        });
        return newObject;
    };
    /**
     * 参数化对象
     * @param {any} object 对象
     * @return {string} 参数
     */
    Ajax.paramObject = function (object) {
        var _this = this;
        var param = '';
        for (var key in object)
            param += (param === '' ? '' : '&') + key + '=' + object[key];
        return param;
    };
    /**
     * 构造一定长度的Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    Ajax.createKey = function (length) {
        var _this = this, time = Math.floor(length / 8), remainder = length % 8;
        var key = '';
        for (var i = 0; i < time; i++) {
            key += Math.random()
                .toString(36)
                .slice(2, 10);
        }
        key += Math.random()
            .toString(36)
            .slice(2, 2 - remainder);
        return crypto_js_1.default.enc.Utf8.parse(key);
    };
    /**
     * MD5加密
     * @param {string} key 加密的Key
     * @param {any} data 数据
     * @return {string} 加密后的数据字符串
     */
    Ajax.encryptMD5 = function (key, data) {
        var _this = this, sortData = _this.sortObject(data), paramData = _this.paramObject(sortData);
        return _this.Crypto.MD5(paramData + '&key=' + key);
    };
    /**
     * AES加密
     * @param {string} key 加密的Key
     * @param {any} data 数据
     * @return {string} 加密后的数据字符串
     */
    Ajax.encryptAES = function (key, data) {
        var _this = this;
        var encryptData = _this.Crypto.AES.encrypt(JSON.stringify(data), key, {
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.ZeroPadding,
            iv: key
        });
        encryptData = encryptData.replace(/\+/g, '-');
        encryptData = encryptData.replace(/\//g, '_');
        encryptData = encryptData.replace(/\=/g, '');
        return encryptData;
    };
    Ajax.$ = jquery_1.default;
    Ajax.Crypto = crypto_js_1.default;
    return Ajax;
}());
exports.default = Ajax;
//# sourceMappingURL=ajax.js.map