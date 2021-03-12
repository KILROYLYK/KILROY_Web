/**
 * 弹窗
 */
declare module 'popup' {
    export interface PopupConfig { // 弹窗配置
        content?: any; // 内容
        isScreenClose?: boolean; // 是否全屏关闭
        finish?(): void; // 完成回调
        open?(data: any): void; // 打开回调
        close?(): void; // 关闭回调
    }
    
    /**
     * Popup
     */
    export default class Popup {
        constructor(config: PopupConfig); // 构造函数
        
        public open(data: any): void;
        
        public close(): void;
        
        public reset(): void;
    }
}
