/**
 * 函数
 */
declare module 'fn' {
    /**
     * FN
     */
    export default class FN {
        public static readonly calc: any; // 精准计算
        public static readonly agent: any; // 代理信息
        public static readonly cookie: any; // Cookie
        public static readonly url: any; // Url
        public static readonly array: any; // 数组
        public static readonly object: any; // 对象
        public static readonly class: any; // 操作节点类
        
        public static getRem(): number;
        
        public static getTimestamp(): number;
        
        public static getRawType(param: any): string;
        
        public static getTime(time: number | string): string;
        
        public static getRandomInt(n1: number, n2: number): number;
        
        public static cached(callback: Function): Function;
        
        public static resize(callback: Function, time: number): void;
        
        public static scroll(id: string, top: Function, bottom: Function): void;
        
        public static transform(element: HTMLElement, style: string): void;
        
        public static innerChainSaveParam(): void;
    
        public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void;
    }
}
