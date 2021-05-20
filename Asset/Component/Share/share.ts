// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

import './share.less';
import FN from '../../SDK/Function/function';
import Ajax from '../../SDK/Ajax/ajax';

declare global {
    interface Window {
        wx: any; // 微信分享SDK
    }
}

const W: Window = window;

export interface ShareConfig { // 分享配置
    appId?: string; // 调起App的ID
    appButtonId?: string; // 调起App按钮ID
    appExtinfo?: string; // 调起App参数
    success?(result: any): void; // 分享成功处理
    cancel?(result: any): void; // 分享取消处理
    
    interface: string; // 分享接口
    title: string; // 分享标题
    description: string; // 分享简介
    img: string; // 分享图片
    url: string; // 分享地址
}

/**
 * 分享
 */
export default class Share {
    private readonly serverInfo: any = { // 服务器信息
        share: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js', // 微信分享SDK
        interface: '' // 分享接口
    };
    private readonly shareInfo: any = { // 分享信息
        title: '',
        description: '',
        img: '',
        url: ''
    };
    private readonly appInfo: any = { // 应用信息
        id: '',
        buttonId: '',
        extinfo: ''
    };
    private sdk: any = null; // 微信SDK
    private success: Function = (result: any) => { // 分享成功处理
        console.log(result);
    };
    private cancel: Function = (result: any) => { // 分享取消处理
        console.log(result);
    };
    public readonly template: any = { // 模板
        callApp() { // 唤起App
            const _this = this;
            return `<div class="box_call_app">
            <wx-open-launch-app
                id="${ _this.appInfo.buttonId }"
                appid="${ _this.appInfo.id }"
                extinfo="${ _this.appInfo.extinfo }">
                <!-- 微信内置窗口 Start -->
                <template>
                    <style>
                    div {
                      padding: 0;
                    }
                    .button {
                      position: relative;
                      width: 100px;
                      height: 100px;
                      padding: 0;
                      background-color: transparent;
                      border: none;
                    }
                    </style>
                    <button class="button"></button>
                </template>
                <!-- 微信内置窗口 End -->
            </wx-open-launch-app>
            </div>`
        }
    };
    
    /**
     * 构造函数
     * @constructor Share
     * @param {ShareConfig} config 配置
     */
    constructor(config: ShareConfig) {
        const _this = this;
        
        _this.serverInfo.interface = config.interface;
        
        _this.shareInfo.title = config.title;
        _this.shareInfo.description = config.description;
        _this.shareInfo.img = config.img;
        _this.shareInfo.url = config.url;
        
        _this.appInfo.id = config.appId || '';
        _this.appInfo.buttonId = config.appButtonId || '';
        _this.appInfo.extinfo = config.appExtinfo || '';
        
        config.success && (_this.success = config.success);
        config.cancel && (_this.cancel = config.cancel);
        
        _this.getShare();
    }
    
    /**
     * 获取分享
     */
    private getShare(): void {
        const _this = this;
        
        Ajax.baseAjax({
            url: _this.serverInfo.interface,
            type: 'post',
            dataType: 'json',
            data: {
                url: W.location.href,
                timestamp: FN.getTimestamp()
            },
            success: (result: any) => {
                const data = $.parseJSON(result.data);
                
                if (result.retCode !== 0) {
                    console.log(result.retMsg);
                    return;
                }
                
                _this.shareInfo.appId = data.appId;
                _this.shareInfo.timestamp = data.timestamp;
                _this.shareInfo.nonceStr = data.nonceStr;
                _this.shareInfo.signature = data.signature;
                
                _this.initShare();
            },
            error: (e: any) => {
                console.log(e);
            }
        });
    }
    
    /**
     * 初始化分享
     */
    private initShare(): void {
        const _this = this;
        
        $.getScript(_this.serverInfo.share, () => {
            if (!('wx' in W)) return;
            
            _this.sdk = W.wx;
            
            _this.sdk.config({
                debug: false,
                appId: _this.shareInfo.appId,
                timestamp: _this.shareInfo.timestamp,
                nonceStr: _this.shareInfo.nonceStr,
                signature: _this.shareInfo.signature,
                jsApiList: [ 'checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline' ],
                openTagList: [ 'wx-open-launch-app' ]
            });
            
            _this.sdk.ready(_this.setShare);
        });
    }
    
    /**
     * 设置分享
     */
    private setShare(): void {
        const _this = this;
        
        // 校验
        _this.sdk.checkJsApi({
            jsApiList: [ 'wx-open-launch-app' ],
            success: (result: any) => {
                console.log('微信分享-开放接口-可用', result);
            },
            fail: (result: any) => {
                console.log('微信分享-开放接口-不可用', result);
            }
        });
        
        // 报错
        _this.sdk.error((result: any) => {
            console.log('微信分享-开放接口-报错', result);
        });
        
        // 分享给好友
        _this.sdk.onMenuShareAppMessage({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            type: 'link',
            dataUrl: '',
            // trigger: (result: any) => {
            // },
            success: (result: any) => {
                console.log('微信分享-好友-成功', result);
                _this.success(result);
            },
            cancel: (result: any) => {
                console.log('微信分享-好友-取消', result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        
        // 分享至朋友圈
        _this.sdk.onMenuShareTimeline({
            title: _this.shareInfo.title,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: (result: any) => {
                console.log('微信分享-朋友圈-成功', result);
                _this.success(result);
            },
            cancel: (result: any) => {
                console.log('微信分享-朋友圈-取消', result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        
        // 分享至QQ
        _this.sdk.onMenuShareQQ({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: (result: any) => {
                _this.success(result);
            },
            cancel: (result: any) => {
                console.log(result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
        
        // 分享至QQ空间
        _this.sdk.onMenuShareQZone({
            title: _this.shareInfo.title,
            desc: _this.shareInfo.description,
            link: _this.shareInfo.url,
            imgUrl: _this.shareInfo.img,
            // trigger: (result: any) => {
            // },
            success: (result: any) => {
                _this.success(result);
            },
            cancel: (result: any) => {
                console.log(result);
                _this.cancel(result);
            },
            // fail: (result: any) => {
            // }
        });
    }
}
