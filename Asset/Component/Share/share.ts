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
    isCallApp?: boolean; // 是否开启调起App
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
    private readonly template: any = { // 模板
        callApp: `<div class="box_call_app">
            <wx-open-launch-app
                id=""
                appid=""
                extinfo="">
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
    };
    private success: Function = (result: any) => { // 分享成功处理
        console.log(result);
    };
    private cancel: Function = (result: any) => { // 分享取消处理
        console.log(result);
    };
    private WXSDK: any = null; // 微信SDK
    
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
        
        config.success && (_this.success = config.success);
        config.cancel && (_this.cancel = config.cancel);
        
        _this.getShare();
    }
    
    /**
     * 设置分享
     * @private
     */
    private setShare(): void {
        const _this = this;
        
        $.getScript(_this.serverInfo.share, () => {
            if (!('wx' in W)) return;
            
            _this.WXSDK = W.wx;
            
            _this.WXSDK.config({
                debug: false,
                appId: _this.shareInfo.appId,
                timestamp: _this.shareInfo.timestamp,
                nonceStr: _this.shareInfo.nonceStr,
                signature: _this.shareInfo.signature,
                jsApiList: [ 'checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline' ],
                openTagList: [ 'wx-open-launch-app' ]
            });
            
            _this.WXSDK.ready(() => {
                _this.WXSDK.checkJsApi({
                    jsApiList: [ 'wx-open-launch-app' ],
                    success: (result: any) => {
                        console.log('微信开放接口可用');
                    },
                    fail: (result: any) => {
                        console.log('微信开放接口不可用');
                    }
                })
                
                // 分享给好友
                _this.WXSDK.onMenuShareAppMessage({
                    title: _this.shareInfo.title,
                    desc: _this.shareInfo.description,
                    link: _this.shareInfo.url,
                    imgUrl: _this.shareInfo.img,
                    type: 'link',
                    dataUrl: '',
                    success: (result: any) => {
                        _this.success(result);
                    },
                    cancel: (result: any) => {
                        console.log(result);
                        _this.cancel(result);
                    }
                });
                
                // 分享至朋友圈
                _this.WXSDK.onMenuShareTimeline({
                    title: _this.shareInfo.title,
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
                
                // 分享至QQ
                _this.WXSDK.onMenuShareQQ({
                    title: _this.shareInfo.title,
                    desc: _this.shareInfo.description,
                    link: _this.shareInfo.url,
                    imgUrl: _this.shareInfo.img,
                    success: (result: any) => {
                        _this.success(result);
                    },
                    cancel: (result: any) => {
                        console.log(result);
                        _this.cancel(result);
                    }
                });
                
                // 分享至QQ空间
                _this.WXSDK.onMenuShareQZone({
                    title: _this.shareInfo.title,
                    desc: _this.shareInfo.description,
                    link: _this.shareInfo.url,
                    imgUrl: _this.shareInfo.img,
                    success: (result: any) => {
                        _this.success(result);
                    },
                    cancel: (result: any) => {
                        console.log(result);
                        _this.cancel(result);
                    }
                });
                
                // 报错
                _this.WXSDK.error((result: any) => {
                    console.log(result);
                });
            });
        });
    }
    
    /**
     * 获取分享
     * @return {void}
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
                
                _this.setShare();
            },
            error: (e: any) => {
                console.log(e);
            }
        });
    }
}
