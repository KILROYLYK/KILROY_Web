/**
 * 异步JS和XML
 */
declare module 'ajax' {
    export interface AjaxConfig { // Ajax配置
        contentType?: string; // 内容编码类型
        global?: boolean; // 是否触发全局Ajax事件
        timeout?: number; // 设置全局请求超时时间
        async?: boolean; // 是否开启异步
        cache?: boolean; // 是否开启缓存
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
     * Ajax
     */
    export default class Ajax {
        public static baseAjax(config: AjaxConfig, expand?: Function): void;
        
        public static crossAjax(config: AjaxConfig, expand?: Function): void;
        
        public static jsonpAjax(config: AjaxConfig, expand?: Function): void;
        
        public static encryptMD5Ajax(config: AjaxConfig, encrypt: EncryptConfig, expand?: Function): void;
        
        public static encryptAESAjax(config: AjaxConfig, encrypt: EncryptConfig, expand?: Function): void;
        
        public static cmsAESAjax(config: AjaxConfig, expand?: Function): void;
        
        public static activityAESAjax(config: AjaxConfig, expand?: Function): void;
    }
}
