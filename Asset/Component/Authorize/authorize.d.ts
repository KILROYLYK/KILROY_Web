/**
 * 授权
 */
declare module 'authorize' {
    export interface AuthorizeConfig { // 授权配置
        redirect?: string; // 授权成功回调地址
        callback?(openId: string): void; // 授权并获取ID成功
        
        interface: string; // 授权接口
        appId: string; // 微信公众号
    }
    
    /**
     * Algorithm
     */
    export default class Authorize {
        constructor(config: AuthorizeConfig); // 构造函数
    }
}
