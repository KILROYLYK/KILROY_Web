import FN from '../Function/function';

const W: Window = window,
    D: Document = document;

export interface RemConfig { // Rem配置
    width?: number; // 设计稿宽度
    time?: number; // 延时更新时间
    constraint?(fontSize: number): number; // 约束处理
}

/**
 * 适配
 */
export default class Adaptation {
    /**
     * 构造函数
     * @constructor Adaptation
     */
    constructor() {
        const _this = this;
    }
    
    // ---------- Rem Start ---------- //
    /**
     * 监听屏幕
     * @param {RemConfig} config 配置
     * @return {void}
     */
    public static Rem(config: RemConfig = {}): void {
        const _this = this;
        
        FN.resize(() => {
            _this.changeRem(config);
        }, config.time || 300);
    }
    
    /**
     * 改变Rem
     * @param {RemConfig} config 配置
     * @return {void}
     */
    private static changeRem(config: RemConfig = {}): void {
        const _this = this,
            width = W.innerWidth,
            design = config.width || 750;
        
        let fontSize = width / design * 100;
        config.constraint && (fontSize = config.constraint(fontSize));
        
        D.documentElement.style.fontSize = fontSize + 'px';
    }
    
    // ---------- Rem End ---------- //
}
