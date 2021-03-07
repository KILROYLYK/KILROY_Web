// @ts-nocheck
import $ from '/usr/local/lib/node_modules/jquery';
import CryptoJS from '/usr/local/lib/node_modules/crypto-js';

interface EncryptInfo { // 加密信息
    key?: string, // 加密key
    length?: number // 随机key长度
}

/**
 * 远程请求
 */
export default class Ajax {
    private static readonly $: any = $;
    private static readonly Crypto: any = CryptoJS;
    
    /**
     * 基础请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static baseAjax(config: any, expand?: Function): void {
        const _this = this;
        
        expand && expand(config);
        $.ajax(config);
    }
    
    /**
     * 跨域请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static crossAjax(config: any, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: any) => {
            Object.assign(ajaxConfig, {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * Jsonp请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static jsonpAjax(config: any, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: any) => {
            Object.assign(ajaxConfig, {
                dataType: 'jsonp',
                jsonp: 'jsoncallback'
            });
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * MD5加密
     * @param {any} config 配置
     * @param {EncryptInfo} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static encryptMD5Ajax(config: any, encrypt: EncryptInfo, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: any) => {
            const key = encrypt.key || _this.createKey(encrypt.length || 0),
                sortData = _this.sortObject(ajaxConfig.data),
                sign = _this.encryptMD5(key, sortData);
            
            ajaxConfig.data = Object.assign(sortData, { sign });
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * AES加密请求
     * @param {any} config 配置
     * @param {EncryptInfo} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static encryptAESAjax(config: any, encrypt: EncryptInfo, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: any) => {
            const key = encrypt.key || _this.createKey(encrypt.length || 0),
                data = _this.encryptAES(key, ajaxConfig.data);
            
            ajaxConfig.data = { data, key };
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * CMSAES请求
     * @param {any} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    private static CMSAESAjax(config: any, expand?: Function): void {
        const _this = this;
        
        _this.encryptAESAjax(config, { length: 16 }, (ajaxConfig: any) => {
            const data = ajaxConfig.data;
            
            ajaxConfig.data = {
                encryptedData: data.data,
                key: data.key
            };
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * 活动AES请求
     * @param {any} config 配置
     * @param {string} id 通行证
     * @param {string} key 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    private static activityAESAjax(config: any, id: string, key: string, expand?: Function): void {
        const _this = this;
        
        _this.encryptAESAjax(config, { key }, (ajaxConfig: any) => {
            const data = ajaxConfig.data;
            
            ajaxConfig.data = {
                data: data.data,
                preid: id
            };
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * 排序对象
     * @param {object} object 对象
     * @return {object} 返回排序后对象
     */
    private static sortObject(object: any): any {
        const _this = this,
            newObject: any = {};
        
        Object.keys(object).sort().forEach((key: string) => {
            newObject[key] = object[key];
        });
        
        return newObject;
    }
    
    /**
     * 参数化对象
     * @param {any} object 对象
     * @return {string} 参数
     */
    public static paramObject(object: any): string {
        const _this = this;
        
        let param = '';
        
        for (const key in object) param += (param === '' ? '' : '&') + key + '=' + object[key];
        
        return param;
    }
    
    /**
     * 构造一定长度的Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    private static createKey(length: number): string {
        const _this = this,
            time = Math.floor(length / 8),
            remainder = length % 8;
        
        let key = '';
        
        for (let i = 0; i < time; i++) {
            key += Math.random()
                .toString(36)
                .slice(2, 10);
        }
        
        key += Math.random()
            .toString(36)
            .slice(2, 2 - remainder);
        
        return CryptoJS.enc.Utf8.parse(key);
    }
    
    /**
     * MD5加密
     * @param {string} key 加密的Key
     * @param {any} data 数据
     * @return {string} 加密后的数据字符串
     */
    private static encryptMD5(key: string, data: any): string {
        const _this = this,
            sortData = _this.sortObject(data),
            paramData = _this.paramObject(sortData);
        
        return _this.Crypto.MD5(paramData + '&key=' + key).toString();
    }
    
    /**
     * AES加密
     * @param {string} key 加密的Key
     * @param {any} data 数据
     * @return {string} 加密后的数据字符串
     */
    private static encryptAES(key: string, data: any): string {
        const _this = this;
        
        let encryptData = _this.Crypto.AES.encrypt(
            JSON.stringify(data), key,
            {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding,
                iv: key
            });
        
        encryptData = encryptData.replace(/\+/g, '-');
        encryptData = encryptData.replace(/\//g, '_');
        encryptData = encryptData.replace(/\=/g, '');
        
        return encryptData;
    }
}
