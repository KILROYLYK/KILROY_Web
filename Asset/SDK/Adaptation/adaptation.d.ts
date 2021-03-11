/**
 * 适配
 */
declare module 'adaptation' {
    export interface RemConfig { // Rem配置
        width?: number; // 设计稿宽度
        time?: number; // 延时更新时间
        isMax?: boolean; // 是否限制最大值
        isScale?: boolean; // 是否缩放
    }
    
    /**
     * Adaptation
     */
    export default class Adaptation {
        public static Rem(config: RemConfig): void;
    }
}
