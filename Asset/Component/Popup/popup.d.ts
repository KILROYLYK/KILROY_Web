// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

/**
 * 弹窗
 */
declare module 'popup' {
    export interface PopupConfig {
        content?: HTMLElement | string;
        animation?: 'top' | 'bottom' | 'left' | 'right';
        isScreenClose?: boolean;
        
        finish?(popup: Popup): void;
        
        open?(data: any): void;
        
        close?(): void;
    }
    
    /**
     * Popup
     */
    export default class Popup {
        public $id: typeof $; // 根节点
        public $content: typeof $; // 内容容器
        public $close: typeof $; // 关闭按钮
        
        constructor(config: PopupConfig); // 构造函数
        
        public open(data: any): void;
        
        public close(): void;
        
        public reset(): void;
        
        public static direction(type: 'vertical' | 'horizontal'): void;
        
        public static load(mask: boolean): void;
        
        public static toast(message: string): void;
    }
}
