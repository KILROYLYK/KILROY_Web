/**
 * 全局
 */
declare module 'global' {
    /**
     * Plugin
     */
    export const
        $: any,
        Console: any;
    
    /**
     * Base
     */
    export const
        W: Window,
        D: Document,
        $W: typeof $,
        $D: typeof $;
    
    /**
     * SDK
     */
    export const
        FN: any,
        Algorithm: any,
        Adaptation: any,
        Crypto: any,
        Ajax: any;
    
    /**
     * Component
     */
    export const
        Preload: any,
        Popup: any,
        Flip: any,
        Share: any,
        Authorize: any;
    
    /**
     * Global
     */
    export default class Global {
        public static readonly $: typeof $;
        public static readonly Console: typeof Console;
        
        public static readonly W: Window;
        public static readonly D: Document;
        public static readonly $W: typeof $;
        public static readonly $D: typeof $;
        
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
