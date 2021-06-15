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
        /**
         * 监听屏幕
         * @param {RemConfig} config 配置
         */
        public static Rem(config: RemConfig): void;
        
        /**
         * 改变Rem
         * @param {RemConfig} config 配置
         */
        private static changeRem(config: RemConfig): void;
    }
}
