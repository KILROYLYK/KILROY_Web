"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var crypto_js_1 = __importDefault(require("/usr/local/lib/node_modules/crypto-js"));
var function_1 = __importDefault(require("../Function/function"));
/**
 * 加密
 */
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    /**
     * 创建Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    Crypto.createKey = function (length) {
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
     * Base64加密
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    Crypto.encryptBase64 = function (data) {
        var content = crypto_js_1.default.enc.Utf8.parse(JSON.stringify(data)), encryptData = crypto_js_1.default.enc.Base64.stringify(content);
        return encodeURIComponent(encryptData);
    };
    /**
     * MD5加密
     * @param {string} key 加密的Key
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    Crypto.encryptMD5 = function (key, data) {
        var _this = this, sortData = function_1.default.object.sort(data), paramData = function_1.default.object.param(sortData);
        return crypto_js_1.default.MD5(paramData + '&key=' + key).toString();
    };
    /**
     * AES加密
     * @param {string} key 加密的Key
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    Crypto.encryptAES = function (key, data) {
        var _this = this;
        var encryptData = crypto_js_1.default.AES.encrypt(JSON.stringify(data), key, {
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.ZeroPadding,
            iv: key
        });
        encryptData = encryptData.replace(/\+/g, '-');
        encryptData = encryptData.replace(/\//g, '_');
        encryptData = encryptData.replace(/\=/g, '');
        return encryptData;
    };
    return Crypto;
}());
exports.default = Crypto;
//# sourceMappingURL=crypto.js.map