import FN from '../Function/function';

const W: Window = window,
    D: Document = document;

export interface RemConfig { // Rem配置
    width?: number; // 设计稿宽度
    time?: number; // 延时更新时间
    isMax?: boolean; // 是否限制最大值
    isScale?: boolean; // 是否缩放
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
            height = W.innerHeight,
            design = config.width || 750;
        
        let fontSize = width / design * 100;
        
        if (config.isMax && fontSize > 100) fontSize = 100;
        if (config.isScale && width / height >= 0.75) fontSize = 75;
        
        D.documentElement.style.fontSize = fontSize + 'px';
    }
    
    // ---------- Rem End ---------- //
}
