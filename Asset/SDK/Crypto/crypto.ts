// @ts-ignore
import Crypto from '/usr/local/lib/node_modules/crypto-js';

import FN from '../Function/function';

/**
 * 加密
 */
export default class Ajax {
    /**
     * 创建Key
     * @param {number} length Key长度
     * @return {string} 返回Key
     */
    public static createKey(length: number): string {
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
        
        return Crypto.enc.Utf8.parse(key);
    }
    
    /**
     * Base64加密
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    public static encryptBase64(data: any): string {
        const content = Crypto.enc.Utf8.parse(JSON.stringify(data)),
            encryptData = Crypto.enc.Base64.stringify(content);
        return encodeURIComponent(encryptData);
    }
    
    /**
     * MD5加密
     * @param {string} key 加密的Key
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    public static encryptMD5(key: string, data: any): string {
        const _this = this,
            sortData = FN.sortObject(data),
            paramData = FN.paramObject(sortData);
        
        return Crypto.MD5(paramData + '&key=' + key).toString();
    }
    
    /**
     * AES加密
     * @param {string} key 加密的Key
     * @param {*} data 数据
     * @return {string} 加密后的数据字符串
     */
    public static encryptAES(key: string, data: any): string {
        const _this = this;
        
        let encryptData = Crypto.AES.encrypt(
            JSON.stringify(data), key,
            {
                mode: Crypto.mode.CBC,
                padding: Crypto.pad.ZeroPadding,
                iv: key
            });
        
        encryptData = encryptData.replace(/\+/g, '-');
        encryptData = encryptData.replace(/\//g, '_');
        encryptData = encryptData.replace(/\=/g, '');
        
        return encryptData;
    }
}
