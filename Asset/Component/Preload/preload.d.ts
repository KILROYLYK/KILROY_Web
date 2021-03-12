/**
 * 预加载
 */
declare module 'preload' {
    export interface PreloadConfig { // 预加载配置
        loaded(index: number, total: number, progress: number): void; // 加载完成（单个资源）
        finish(): void; // 加载完成（全部资源）
    }
    
    /**
     * Preload
     */
    export default class Preload {
        constructor(config: PreloadConfig); // 构造函数
    }
}
