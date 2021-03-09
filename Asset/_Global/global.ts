// @ts-nocheck

export const
    W = window,
    D = document;

/**
 * Plugin
 */
export const
    $ = require('/usr/local/lib/node_modules/jquery'), // JQuery
    Console = require('/usr/local/lib/node_modules/vconsole'), // 日志
    Crypto = require('/usr/local/lib/node_modules/crypto-js'), // 加密
    GSAP = require('/usr/local/lib/node_modules/gsap'), // 动效
    Tween = require('/usr/local/lib/node_modules/@tweenjs/tween.js'); // 过渡

/**
 * SDK
 */
export const
    FN = require('../Function/function').default, // 函数
    Algorithm = require('../Algorithm/algorithm').default, // 算法
    Adaptation = require('../Adaptation/adaptation').default, // 适配
    Preload = require('../Preload/preload').default, // 预加载
    Ajax = require('../Ajax/ajax').default, // 远程请求
    Popup = require('../Popup/popup').default, // 弹窗
    Flip = require('../Flip/flip').default, // 翻页
    Authorization = require('../Authorization/authorization').default; // 授权

/**
 * Global
 */
export default class Global {
    public static readonly W: Window = W;
    public static readonly D: Document = D;
    
    public static readonly $: any = $;
    public static readonly Console: any = Console;
    public static readonly Crypto: any = Crypto;
    public static readonly GSAP: any = GSAP;
    public static readonly Tween: any = Tween;
    
    public static readonly FN: any = FN;
    // public static readonly Algorithm: any = Algorithm;
    public static readonly Adaptation: any = Adaptation;
    // public static readonly Preload: any = Preload;
    public static readonly Ajax: any = Ajax;
    public static readonly Popup: any = Popup;
    // public static readonly Flip: any = Flip;
    public static readonly Authorization: any = Authorization;
}
