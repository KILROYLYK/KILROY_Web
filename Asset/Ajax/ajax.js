"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@types/node");
var $ = require('/usr/local/lib/node_modules/jquery'), CryptoJS = require('crypto-js');
/**
 * 远程请求
 */
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /**
     * 通用Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    Ajax.commonAjax = function (config) {
        var _this = this;
        $.ajax({
            url: config.url,
            data: config.data,
            dataType: 'json',
            type: config.type,
            cache: config.cache,
            async: config.async,
            success: function (result) {
                config.successCallback && config.successCallback(result);
            },
            error: function (e) {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    };
    /**
     * 跨域Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    Ajax.crossAjax = function (config) {
        var _this = this;
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            url: config.url,
            data: config.data,
            dataType: 'json',
            type: config.type,
            cache: config.cache,
            async: config.async,
            success: function (result) {
                config.successCallback && config.successCallback(result);
            },
            error: function (e) {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    };
    /**
     * Jsonp跨域Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    Ajax.jsonpAjax = function (config) {
        var _this = this;
        $.ajax({
            url: config.url,
            data: config.data,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: function (result) {
                config.successCallback && config.successCallback(result);
            },
            error: function (e) {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    };
    /**
     * 随机Key加密Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    Ajax.encryptAjax = function (config) {
        var _this = this;
        $.ajax({
            url: _this.randomEncrypt(config.url, config.data),
            data: {},
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: function (result) {
                config.successCallback && config.successCallback(result);
            },
            error: function (e) {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    };
    /**
     * 指定Key加密Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    Ajax.encryptKeyAjax = function (config) {
        var _this = this;
        $.ajax({
            url: _this.specialEncrypt(config.preid || '', config.key || '', config.url, config.data),
            data: {},
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: function (result) {
                config.successCallback && config.successCallback(result);
            },
            error: function (e) {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    };
    /**
     * 构造length长度的Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    Ajax.createKey = function (length) {
        var _this = this, time = Math.floor(length / 8), remainder = length % 8;
        var k = '';
        for (var i = 0; i < time; i++) {
            k += Math.random()
                .toString(36)
                .slice(2, 10);
        }
        k += Math.random()
            .toString(36)
            .slice(2, 2 - remainder);
        return k;
    };
    /**
     * 随机Key加密
     * @param {string} url 接口Url
     * @param {object} data 数据
     * @return {string} 加密后的Url
     */
    Ajax.randomEncrypt = function (url, data) {
        var _this = this, key = _this.createKey(16), encryptKey = CryptoJS.enc.Utf8.parse(key), newData = _this.encryptData(encryptKey, JSON.stringify(data)), newUrl = url + '?encryptedData=' + newData + '&key=' + key;
        return newUrl.replace(/\+/g, '%2B');
    };
    /**
     * 指定Key加密
     * @param {string} preID 通行证
     * @param {string} key 加密的Key
     * @param {string} url 接口Url
     * @param {object} data 数据
     * @return {string} 加密后的Url
     */
    Ajax.specialEncrypt = function (preID, key, url, data) {
        var _this = this, encryptKey = CryptoJS.enc.Utf8.parse(key);
        var newData = _this.encryptData(encryptKey, JSON.stringify(data));
        newData = newData.replace(/\+/g, '-');
        newData = newData.replace(/\//g, '_');
        newData = newData.replace(/\=/g, '');
        return url + '?data=' + newData + '&preid=' + preID;
    };
    /**
     * 加密数据
     * @param {string} data 数据
     * @param {string} key 加密的Key
     * @return {string} 加密后的数据字符串
     */
    Ajax.encryptData = function (key, data) {
        var _this = this;
        return CryptoJS.AES.encrypt(data, key, {
            iv: key,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    };
    return Ajax;
}());
exports.default = Ajax;
//# sourceMappingURL=ajax.js.map