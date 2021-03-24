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
 * 全局
 */
declare module 'global' {
    /**
     * Plugin
     */
    export const
        $: typeof jquery,
        Console: typeof vConsole;
    
    /**
     * Base
     */
    export const
        W: Window,
        $W: typeof $,
        D: Document,
        $D: typeof $,
        B: HTMLElement,
        $B: typeof $;
    
    /**
     * SDK
     */
    export const
        FN: typeof fn,
        Algorithm: typeof algorithm,
        Adaptation: typeof adaptation,
        Crypto: typeof crypto,
        Ajax: typeof ajax;
    
    /**
     * Component
     */
    export const
        Preload: typeof preload,
        Popup: typeof popup,
        Flip: typeof flip,
        Share: typeof share,
        Authorize: typeof authorize;
    
    /**
     * Global
     */
    export default class Global {
        public static readonly $: typeof $;
        public static readonly Console: typeof Console;
        
        public static readonly W: Window;
        public static readonly $W: typeof $;
        public static readonly D: Document;
        public static readonly $D: typeof $;
        public static readonly B: HTMLElement;
        public static readonly $B: typeof $;
        
        public static readonly FN: typeof FN;
        public static readonly Algorithm: typeof Algorithm;
        public static readonly Adaptation: typeof Adaptation;
        public static readonly Crypto: typeof Crypto;
        public static readonly Ajax: typeof Ajax;
        
        public static readonly Preload: typeof Preload;
        public static readonly Popup: typeof Popup;
        public static readonly Flip: typeof Flip;
        public static readonly Share: typeof Share;
        public static readonly Authorize: typeof Authorize;
    }
}
