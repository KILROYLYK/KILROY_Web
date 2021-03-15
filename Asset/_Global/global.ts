// @ts-ignore
import jQuery from '/usr/local/lib/node_modules/@types/jquery'; // JQuery
// @ts-ignore
import vConsole from '/usr/local/lib/node_modules/vconsole'; // 日志

import fn from '../SDK/Function/function'; // 函数
import algorithm from '../SDK/Algorithm/algorithm'; // 算法
import adaptation from '../SDK/Adaptation/adaptation'; // 适配
import crypto from'../SDK/Crypto/crypto'; // 加密
import ajax from'../SDK/Ajax/ajax'; // 远程请求

import preload from'../Component/Preload/preload'; // 预加载
import popup from'../Component/Popup/popup'; // 弹窗
import flip from'../Component/Flip/flip'; // 翻页
import share from '../Component/Share/share'; // 分享
import authorize from '../Component/Authorize/authorize'; // 授权

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
    $: any = jQuery,
    Console: any = vConsole;

/**
 * SDK
 */
export const
    FN: any = fn,
    Algorithm: any = algorithm,
    Adaptation: any = adaptation,
    Crypto: any = crypto,
    Ajax: any = ajax;

/**
 * Component
 */
export const
    Preload: any = preload,
    Popup: any = popup,
    Flip: any = flip,
    Share: any = share,
    Authorize: any = authorize;

/**
 * Global
 */
export default class Global {
    public static readonly W: Window = W;
    public static readonly D: Document = D;
    
    public static readonly $: typeof $ = $;
    public static readonly Console: typeof Console = Console;
    
    public static readonly FN: typeof FN = FN;
    public static readonly Algorithm: typeof Algorithm = Algorithm;
    public static readonly Adaptation: typeof Adaptation = Adaptation;
    public static readonly Crypto: typeof Crypto = Crypto;
    public static readonly Ajax: typeof Ajax = Ajax;
    
    public static readonly Preload: typeof Preload = Preload;
    public static readonly Popup: typeof Popup = Popup;
    public static readonly Flip: typeof Flip = Flip;
    public static readonly Share: typeof Share = Share;
    public static readonly Authorize: typeof Authorize = Authorize;
}
