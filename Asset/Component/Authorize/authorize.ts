import FN from '../../SDK/Function/function';
import Ajax from '../../SDK/Ajax/ajax';

const W: Window = window;

export interface AuthorizeConfig { // 授权配置
    redirect?: string; // 授权成功回调地址
    callback?(result: any): void; // 授权完成处理
    
    interface: string; // 授权接口（https://activity-api-test.iyingdi.com/tree/wechat-auth）
    appId: string; // 微信公众号
}

/**
 * 授权
 */
export default class Authorize {
    private readonly serverInfo: any = { // 服务器信息
        authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize', // 微信授权接口
        interface: '', // 授权接口
        redirect: '' // 授权成功回调地址
    };
    private readonly userInfo: any = { // 用户信息
        appId: '', // 微信公众号ID
        openId: FN.cookie.get('openId') || '', // 微信OpenID
        code: FN.url.getParam('code') || '', // 微信Code
    };
    private callback: Function = (result: any) => { // 完成回调
        console.log(result);
    };
    
    /**
     * 构造函数
     * @constructor Authorize
     */
    constructor(config: AuthorizeConfig) {
        const _this = this;
        
        _this.serverInfo.interface = config.interface;
        _this.serverInfo.redirect = config.redirect || W.location.href;
        _this.userInfo.appId = config.appId;
        
        config.callback && (_this.callback = config.callback);
    }
    
    /**
     *
     * @private
     */
    private verify() {
    
    }
    
    /**
     * 获取Code
     * @return {void}
     */
    private getCode(): void {
        const _this = this,
            url = FN.url.delParam([ 'code' ], _this.serverInfo.redirect);
        
        W.location.href = _this.serverInfo.authorize +
            '?appid=' + _this.userInfo.appId +
            '&redirect_uri=' + encodeURIComponent(url) +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=yd' +
            '#wechat_redirect';
    }
    
    /**
     * 授权
     * @return {void}
     */
    private getAuthorize(): void {
        const _this = this;
        
        Ajax.baseAjax({
            url: _this.serverInfo.interface,
            type: 'post',
            dataType: 'json',
            data: {
                code: _this.userInfo.code,
                timestamp: FN.getTimestamp()
            },
            success: (result: any) => {
                _this.callback && _this.callback(result);
            },
            error: (e: any) => {
                console.log(e);
            }
        });
    }
}

