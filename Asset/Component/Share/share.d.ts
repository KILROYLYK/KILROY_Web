/**
 * 分享
 */
declare module 'share' {
    export interface ShareConfig { // 分享配置
        isCallApp?: boolean; // 是否开启调起App
        appId?: string; // 调起App的ID
        appButtonId?: string; // 调起App按钮ID
        success?(result: any): void; // 分享成功处理
        cancel?(result: any): void; // 分享取消处理
        
        interface: string; // 分享接口
        title: string; // 分享标题
        description: string; // 分享简介
        img: string; // 分享图片
        url: string; // 分享地址
    }
    
    /**
     * Share
     */
    export default class Share {
        /**
         * 构造函数
         * @constructor Share
         * @param {ShareConfig} config 配置
         */
        public constructor(config: ShareConfig);
    }
}
