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
        
        public static getType(param: any): string; // 获取数据类型
        
        public static getTimestamp(): number; // 获取当前时间戳
        
        public static getTime(time: number | string): string; // 获取当前时间
        
        public static getRandomInt(n1: number, n2: number): number; // 获取随机整数
    
        public static getRem(): number; // 获取当前Rem
        
        public static cached(callback: Function): Function; // 记忆函数
        
        public static resize(callback: Function, time: number): void; // 监听屏幕变化
        
        public static scroll(id: string, top: Function, bottom: Function): void; // 监听滑轮事件
        
        public static transform(element: HTMLElement, style: string): void; // 元素添加Transform
        
        public static innerChainSaveParam(): void; // 内链跳转保留参数
        
        public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void; // 禁用Console
    }
}
