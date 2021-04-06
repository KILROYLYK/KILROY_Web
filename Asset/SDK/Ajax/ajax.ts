// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

import FN from '../Function/function'; // 函数
import Crypto from '../Crypto/crypto'; // 加密

export interface AjaxConfig { // Ajax配置
    contentType?: string | boolean; // 内容编码类型（application/x-www-form-urlencoded）|false为禁止修改
    processData?: boolean, // 禁止修改数据
    global?: boolean; // 是否触发全局Ajax事件（true）
    timeout?: number; // 设置全局请求超时时间
    async?: boolean; // 是否开启异步（true）
    cache?: boolean; // 是否开启缓存（true，script | jsonp 为 false）
    context?: Object; // 回调作用域
    jsonpCallback?: string; // 为Jsonp请求指定一个回调函数名
    jsonp?: string; // 在Jsonp请求中重写回调函数名
    dataFilter?(data: any, type: string): void; // 对返回的原始数据进行预处理
    beforeSend?(xhr: XMLHttpRequest): void; // 发送之前进行处理
    complete?(xhr: XMLHttpRequest, state: string): void; // 完成回调
    success?(data: any): void; // 成功回调
    error?(xhr: XMLHttpRequest, message: string, abnormal: any): void; // 失败回调
    
    url: string; // 请求地址
    type: 'post' | 'get'; // 请求类型
    dataType: 'xml' | 'html' | 'script' | 'json' | 'jsonp' | 'text'; // 数据类型
    data: any; // 数据
}

export interface EncryptConfig { // 加密配置
    key?: string, // 加密key
    length?: number // 随机key长度
}

/**
 * 异步JS和XML
 */
export default class Ajax {
    /**
     * 基础请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static baseAjax(config: AjaxConfig, expand?: Function): void {
        const _this = this;
        
        expand && expand(config);
        $.ajax(config);
    }
    
    /**
     * 跨域请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static crossAjax(config: AjaxConfig, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: AjaxConfig) => {
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
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static jsonpAjax(config: AjaxConfig, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: AjaxConfig) => {
            Object.assign(ajaxConfig, {
                dataType: 'jsonp',
                jsonp: 'jsoncallback'
            });
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * MD5加密
     * @param {AjaxConfig} config 配置
     * @param {EncryptConfig} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static encryptMD5Ajax(config: AjaxConfig, encrypt: EncryptConfig, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: AjaxConfig) => {
            const key = encrypt.key || Crypto.createKey(encrypt.length || 0),
                sortData = FN.object.sort(ajaxConfig.data),
                sign = Crypto.encryptMD5(key, sortData);
            
            ajaxConfig.data = Object.assign(sortData, { sign });
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * AES加密请求
     * @param {AjaxConfig} config 配置
     * @param {EncryptConfig} encrypt 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    public static encryptAESAjax(config: AjaxConfig, encrypt: EncryptConfig, expand?: Function): void {
        const _this = this;
        
        _this.baseAjax(config, (ajaxConfig: AjaxConfig) => {
            const key = encrypt.key || Crypto.createKey(encrypt.length || 0),
                data = Crypto.encryptAES(key, ajaxConfig.data);
            
            ajaxConfig.data = { data, key };
            
            expand && expand(ajaxConfig);
        });
    }
    
    /**
     * CMSAES请求
     * @param {AjaxConfig} config 配置
     * @param {Function} expand 拓展
     * @return {void}
     */
    private static cmsAESAjax(config: AjaxConfig, expand?: Function): void {
        const _this = this;
        
        _this.encryptAESAjax(config, { length: 16 }, (ajaxConfig: AjaxConfig) => {
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
     * @param {AjaxConfig} config 配置
     * @param {string} id 通行证
     * @param {string} key 密钥
     * @param {Function} expand 拓展
     * @return {void}
     */
    private static activityAESAjax(config: AjaxConfig, id: string, key: string, expand?: Function): void {
        const _this = this;
        
        _this.encryptAESAjax(config, { key }, (ajaxConfig: AjaxConfig) => {
            const data = ajaxConfig.data;
            
            ajaxConfig.data = {
                data: data.data,
                preid: id
            };
            
            expand && expand(ajaxConfig);
        });
    }
}
