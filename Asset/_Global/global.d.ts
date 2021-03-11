/**
 * 全局
 */
declare module 'global' {
    /**
     * Base
     */
    export const
        W: typeof window,
        D: typeof document;
    
    /**
     * Plugin
     */
    export const
        $: any,
        Console: any,
        GSAP: any,
        Tween: any;
    
    /**
     * SDK
     */
    export const
        FN: any, // 函数
        Algorithm: any, // 算法
        Adaptation: any, // 适配
        Preload: any, // 预加载
        Crypto: any, // 加密
        Ajax: any, // 远程请求
        Popup: any, // 弹窗
        Flip: any, // 翻页
        Authorize: any; // 授权
    
    /**
     * Global
     */
    export default class Global {
        public static readonly W: Window;
        public static readonly D: Document;
        
        public static readonly $: typeof $;
        public static readonly Console: typeof Console;
        public static readonly GSAP: typeof GSAP;
        public static readonly Tween: typeof Tween;
        
        public static readonly FN: typeof FN;
        public static readonly Algorithm: typeof Algorithm;
        public static readonly Adaptation: typeof Adaptation;
        public static readonly Preload: typeof Preload;
        public static readonly Crypto: typeof Crypto;
        public static readonly Ajax: typeof Ajax;
        public static readonly Popup: typeof Popup;
        public static readonly Flip: typeof Flip;
        public static readonly Authorize: typeof Authorize;
    }
}
