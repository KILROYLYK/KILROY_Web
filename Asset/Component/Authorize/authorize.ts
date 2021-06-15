import FN from '../../SDK/Function/function';
import Ajax from '../../SDK/Ajax/ajax';

const W: Window = window;

export interface AuthorizeConfig { // 授权配置
    redirect?: string; // 授权成功回调地址
    success?(openId: string): void; // 授权并获取ID成功
    
    interface: string; // 授权接口
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
        code: FN.url.getParam('code') || '' // 微信Code
    };
    private success: Function = (openId: string) => { // 授权并获取ID成功
        console.log(openId);
    };
    
    /**
     * 构造函数
     * @constructor Authorize
     * @param {AuthorizeConfig} config 配置
     */
    public constructor(config: AuthorizeConfig) {
        const _this = this;
        
        _this.serverInfo.interface = config.interface;
        _this.serverInfo.redirect = config.redirect || W.location.href;
        _this.userInfo.appId = config.appId;
        
        config.success && (_this.success = config.success);
        
        if (_this.userInfo.openId) { // 已登录
            _this.success(_this.userInfo.openId);
        } else if (_this.userInfo.code) { // // 已授权
            _this.getAuthorize();
        } else { // 未登录并且未授权
            _this.getCode();
        }
    }
    
    /**
     * 获取Code
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
     * 获取授权
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
                const data = result.data;
                
                if (result.retCode !== 0) {
                    console.log(result.retMsg);
                    return;
                }
                
                FN.cookie.set('openId', data.openid);
                
                _this.userInfo.openId = data.openId;
                _this.success(_this.userInfo.openId);
            },
            error: (e: any) => {
                console.log(e);
            }
        });
    }
}

