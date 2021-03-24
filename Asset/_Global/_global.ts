// @ts-ignore
import jquery from '/usr/local/lib/node_modules/jquery'; // JQuery
// @ts-ignore
import vConsole from '/usr/local/lib/node_modules/vconsole'; // 日志

import fn from '../SDK/Function/function'; // 函数
import algorithm from '../SDK/Algorithm/algorithm'; // 算法
import adaptation from '../SDK/Adaptation/adaptation'; // 适配
import crypto from '../SDK/Crypto/crypto'; // 加密
import ajax from '../SDK/Ajax/ajax'; // 远程请求

import preload from '../Component/Preload/preload'; // 预加载
import popup from '../Component/Popup/popup'; // 弹窗
import flip from '../Component/Flip/flip'; // 翻页
import share from '../Component/Share/share'; // 分享
import authorize from '../Component/Authorize/authorize'; // 授权

/**
 * Plugin
 */
export const
    $: typeof jquery = jquery,
    Console: typeof vConsole = vConsole;

/**
 * Base
 */
export const
    W: Window = window,
    $W: typeof $ = $(W),
    D: Document = document,
    $D: typeof $ = $(D),
    B: HTMLElement = D.body,
    $B: typeof $ = $(B);

/**
 * SDK
 */
export const
    FN: typeof fn = fn,
    Algorithm: typeof algorithm = algorithm,
    Adaptation: typeof adaptation = adaptation,
    Crypto: typeof crypto = crypto,
    Ajax: typeof ajax = ajax;

/**
 * Component
 */
export const
    Preload: typeof preload = preload,
    Popup: typeof popup = popup,
    Flip: typeof flip = flip,
    Share: typeof share = share,
    Authorize: typeof authorize = authorize;

/**
 * Global
 */
export default class Global {
    public static readonly $: typeof $ = $;
    public static readonly Console: typeof Console = Console;
    
    public static readonly W: Window = W;
    public static readonly $W: typeof $ = $W;
    public static readonly D: Document = D;
    public static readonly $D: typeof $ = $D;
    public static readonly B: HTMLElement = B;
    public static readonly $B: typeof $ = $B;
    
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
