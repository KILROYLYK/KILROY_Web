/**
 * 预加载
 */
declare module 'preload' {
    export interface PreloadConfig { // 预加载配置
        loaded?(index: number, total: number, progress: number): void; // 加载完成（单个资源）
        finish?(): void; // 加载完成（全部资源）
    }
    
    /**
     * Preload
     */
    export default class Preload {
        /**
         * 构造函数
         * @constructor Preload
         * @param {string[]} list 资源列表
         * @param {PreloadConfig} config 配置
         */
        public constructor(list: string[], config: PreloadConfig);
    }
}
