// @ts-nocheck

/**
 * Base
 */
export const
    W: Window = window,
    D: Document = document;

/**
 * Plugin
 */
export const
    $: any = require('/usr/local/lib/node_modules/jquery'), // JQuery
    Console: any = require('/usr/local/lib/node_modules/vconsole'), // 日志
    GSAP: any = require('/usr/local/lib/node_modules/gsap'), // 动效
    Tween: any = require('/usr/local/lib/node_modules/@tweenjs/tween.js'); // 过渡

/**
 * SDK
 */
export const
    FN: any = require('../Function/function.ts').default, // 函数
    Algorithm: any = require('../Algorithm/algorithm.ts').default, // 算法
    Adaptation: any = require('../Adaptation/adaptation.ts').default, // 适配
    Preload: any = require('../Preload/preload.ts').default, // 预加载
    Crypto: any = require('../Crypto/crypto.ts').default, // 加密
    Ajax: any = require('../Ajax/ajax.ts').default, // 远程请求
    Popup: any = require('../Popup/popup.ts').default, // 弹窗
    Flip: any = require('../Flip/flip.ts').default, // 翻页
    Authorize: any = require('../Authorize/authorize.ts').default; // 授权

/**
 * Global
 */
export default class Global {
    public static readonly W: Window = W;
    public static readonly D: Document = D;
    
    public static readonly $: typeof $ = $;
    public static readonly Console: typeof Console = Console;
    public static readonly GSAP: typeof GSAP = GSAP;
    public static readonly Tween: typeof Tween = Tween;
    
    public static readonly FN: typeof FN = FN;
    public static readonly Algorithm: typeof Algorithm = Algorithm;
    public static readonly Adaptation: typeof Adaptation = Adaptation;
    public static readonly Preload: typeof Preload = Preload;
    public static readonly Crypto: typeof Crypto = Crypto;
    public static readonly Ajax: typeof Ajax = Ajax;
    public static readonly Popup: typeof Popup = Popup;
    public static readonly Flip: typeof Flip = Flip;
    public static readonly Authorize: typeof Authorize = Authorize;
}
