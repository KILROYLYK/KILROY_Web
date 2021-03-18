/**
 * 适配
 */
declare module 'adaptation' {
    export interface RemConfig { // Rem配置
        width?: number; // 设计稿宽度
        time?: number; // 延时更新时间
        constraint?(fontSize: number): number; // 约束处理
    }
    
    /**
     * Adaptation
     */
    export default class Adaptation {
        public static Rem(config: RemConfig): void;
    }
}
