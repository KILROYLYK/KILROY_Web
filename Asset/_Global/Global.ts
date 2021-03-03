import '@types/node';

/**
 * Base
 */
export const
    Window = window,
    Document = document;

/**
 * Plugin
 * NodePath：/usr/local/lib/node_modules/
 */
export const
    $ = require('jquery'), // JQuery
    VConsole = require('vconsole'), // Console显示器
    GSAP = require('gsap'), // 动效
    Tween = require('@tweenjs/tween.js'); // 过渡

/**
 * SDK
 */
export const
    FN = require('../Function/Function').default, // 函数
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
    public static readonly W: Window = Window;
    public static readonly D: Document = Document;
    
    public static readonly $: any = $;
    public static readonly VConsole: any = VConsole;
    public static readonly GSAP: any = GSAP;
    public static readonly Tween: any = Tween;
    
    public static readonly FN: any = FN;
    // public static readonly Algorithm: any = Algorithm;
    public static readonly Adaptation: any = Adaptation;
    // public static readonly Preload: any = Preload;
    public static readonly Ajax: any = Ajax;
    public static readonly Popup: any = Popup;
    public static readonly Flip: any = Flip;
    // public static readonly Authorization: any = Authorization;
}
