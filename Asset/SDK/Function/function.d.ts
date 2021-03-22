/**
 * 函数
 */
declare module 'fn' {
    /**
     * FN
     */
    export default class FN {
        public static readonly calc: any;
        public static readonly agent: any;
        public static readonly cookie: any;
        public static readonly url: any;
        public static readonly array: any;
        public static readonly object: any;
        public static readonly class: any;
        public static readonly transform: any;
        public static readonly image: any;
        public static readonly file: any;
        
        public static getType(param: any): string;
        
        public static getTimestamp(): number;
        
        public static getTime(time: number | string): string;
        
        public static getRem(): number;
        
        public static cached(callback: Function): Function;
        
        public static resize(callback: Function, time: number): void;
        
        public static scroll(id: string, top: Function, bottom: Function): void;
        
        public static gyroscope(callback: Function, time: number): void;
        
        public static innerChainSaveParam(): void;
        
        public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void;
    }
}
