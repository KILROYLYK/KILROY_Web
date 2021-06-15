// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

/**
 * 弹窗
 */
declare module 'popup' {
    export interface PopupConfig { // 弹窗配置
        content?: HTMLElement | string; // 内容
        animation?: 'top' | 'bottom' | 'left' | 'right'; // 动画
        isScreenClose?: boolean; // 是否全屏关闭
        finish?(popup: Popup): void; // 完成回调
        open?(data: any): void; // 打开回调
        close?(): void; // 关闭回调
    }
    
    /**
     * Popup
     */
    export default class Popup {
        public $id: typeof $; // 根节点
        public $content: typeof $; // 内容容器
        public $close: typeof $; // 关闭按钮
        
        /**
         * 构造函数
         * @constructor Popup
         * @param {string} id 弹窗ID
         * @param {PopupConfig} config 配置
         */
        public constructor(config: PopupConfig);
        
        /**
         * 打开
         * @param {*} data 参数
         */
        public open(data: any): void;
        
        /**
         * 关闭
         */
        public close(): void;
        
        /**
         * 重置
         */
        public reset(): void;
        
        /**
         * 锁定方向弹窗
         * @param {'vertical'|'horizontal'} type 方向
         */
        public static direction(type: 'vertical' | 'horizontal'): void;
        
        /**
         * 加载弹窗
         * @param {boolean} isOpen 是否显示
         * @param {boolean} showMask 是否显示黑透
         */
        public static load(isOpen: boolean, showMask: boolean): void;
        
        /**
         * 提示弹窗
         * @param {string} message 提示信息
         */
        public static toast(message: string): void;
    }
}
