// @ts-nocheck

export const
    Path = {
        npm: '/usr/local/lib/node_modules/', // NPM包全局环境
        sdk: '../' // SDK
    },
    W = window,
    D = document;

/**
 * Plugin
 */
export const
    $ = require(Path.npm + 'jquery'), // JQuery
    CryptoJS = require(Path.npm + 'crypto-js'), // 加密
    VConsole = require(Path.npm + 'vconsole'), // 移动端日志
    GSAP = require(Path.npm + 'gsap'), // 动效
    Tween = require(Path.npm + '@tweenjs/tween.js'); // 过渡

/**
 * SDK
 */
export const
    FN = require(Path.npm + 'Function/function'), // 函数
    Algorithm = require(Path.npm + 'Algorithm/algorithm'), // 算法
    Adaptation = require(Path.npm + 'Adaptation/adaptation'), // 适配
    Preload = require(Path.npm + 'Preload/preload'), // 预加载
    Ajax = require(Path.npm + 'Ajax/ajax'), // 远程请求
    Popup = require(Path.npm + 'Popup/popup'), // 弹窗
    Flip = require(Path.npm + 'Flip/flip'), // 翻页
    Authorization = require(Path.npm + 'Authorization/authorization'); // 授权

/**
 * Global
 */
export default class Global {
    public static readonly W: Window = W;
    public static readonly D: Document = D;
    public static readonly Path: any = Path;
    
    public static readonly $: any = $;
    public static readonly CryptoJS: any = CryptoJS;
    public static readonly VConsole: any = VConsole;
    public static readonly GSAP: any = GSAP;
    public static readonly Tween: any = Tween;
    
    public static readonly FN: any = FN;
    // public static readonly Algorithm: any = Algorithm;
    public static readonly Adaptation: any = Adaptation;
    // public static readonly Preload: any = Preload;
    // public static readonly Ajax: any = Ajax;
    public static readonly Popup: any = Popup;
    // public static readonly Flip: any = Flip;
    public static readonly Authorization: any = Authorization;
}
