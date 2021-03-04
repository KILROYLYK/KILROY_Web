// @ts-nocheck
// import $ from '/usr/local/lib/node_modules/jquery';
import CryptoJS from '/usr/local/lib/node_modules/crypto-js';

interface AjaxConfig { // 请求配置
    type?: string // 请求类型
    url: string // 接口地址
    data: object // 数据对象
    successCallback?: Function // 成功回调
    errorCallback?: Function // 失败回调
    cache?: false // 开关缓存
    async?: true // 开关同步
    preid?: string // 加密ID
    key?: string // 加密Key
}

/**
 * 远程请求
 */
export default class Ajax {
    /**
     * 通用Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    public static commonAjax(config: AjaxConfig): void {
        const _this = this;
        $.ajax({
            url: config.url,
            data: config.data,
            dataType: 'json',
            type: config.type,
            cache: config.cache,
            async: config.async,
            success: (result: any) => {
                config.successCallback && config.successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    }
    
    /**
     * 跨域Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    public static crossAjax(config: AjaxConfig): void {
        const _this = this;
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
            success: (result: any) => {
                config.successCallback && config.successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    }
    
    /**
     * Jsonp跨域Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    public static jsonpAjax(config: AjaxConfig): void {
        const _this = this;
        $.ajax({
            url: config.url,
            data: config.data,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: (result: any) => {
                config.successCallback && config.successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    }
    
    /**
     * 随机Key加密Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    public static encryptAjax(config: AjaxConfig): void {
        const _this = this;
        $.ajax({
            url: _this.randomEncrypt(config.url, config.data),
            data: {},
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: (result: any) => {
                config.successCallback && config.successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    }
    
    /**
     * 指定Key加密Ajax请求
     * @param {object} config 配置
     * @return {void}
     */
    public static encryptKeyAjax(config: AjaxConfig): void {
        const _this = this;
        $.ajax({
            url: _this.specialEncrypt(config.preid || '', config.key || '', config.url, config.data),
            data: {},
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            cache: config.cache,
            async: config.async,
            success: (result: any) => {
                config.successCallback && config.successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                config.errorCallback && config.errorCallback(e);
            }
        });
    }
    
    /**
     * 构造length长度的Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    private static createKey(length: number): string {
        const _this = this,
            time = Math.floor(length / 8),
            remainder = length % 8;
        
        let k = '';
        
        for (let i = 0; i < time; i++) {
            k += Math.random()
                .toString(36)
                .slice(2, 10);
        }
        
        k += Math.random()
            .toString(36)
            .slice(2, 2 - remainder);
        
        return k;
    }
    
    /**
     * 随机Key加密
     * @param {string} url 接口Url
     * @param {object} data 数据
     * @return {string} 加密后的Url
     */
    private static randomEncrypt(url: string, data: any): string {
        const _this = this,
            key = _this.createKey(16),
            encryptKey = CryptoJS.enc.Utf8.parse(key),
            newData = _this.encryptData(encryptKey, JSON.stringify(data)),
            newUrl = url + '?encryptedData=' + newData + '&key=' + key;
        
        return newUrl.replace(/\+/g, '%2B');
    }
    
    /**
     * 指定Key加密
     * @param {string} preID 通行证
     * @param {string} key 加密的Key
     * @param {string} url 接口Url
     * @param {object} data 数据
     * @return {string} 加密后的Url
     */
    private static specialEncrypt(preID: string, key: string, url: string, data: object): string {
        const _this = this,
            encryptKey = CryptoJS.enc.Utf8.parse(key);
        
        let newData = _this.encryptData(encryptKey, JSON.stringify(data));
        
        newData = newData.replace(/\+/g, '-');
        newData = newData.replace(/\//g, '_');
        newData = newData.replace(/\=/g, '');
        
        return url + '?data=' + newData + '&preid=' + preID;
    }
    
    /**
     * 加密数据
     * @param {string} data 数据
     * @param {string} key 加密的Key
     * @return {string} 加密后的数据字符串
     */
    private static encryptData(key: string, data: string): string {
        const _this = this;
        return CryptoJS.AES.encrypt(data, key, {
            iv: key,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    }
}
