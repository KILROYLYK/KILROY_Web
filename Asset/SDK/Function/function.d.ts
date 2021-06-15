// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

/**
 * 函数
 */
declare module 'fn' {
    export interface ProbabilityConfig { // 概率配置
        min: number; // 范围最小值
        max: number; // 范围最大值
    }
    
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
        public static readonly time: any; // 时间
        public static readonly dom: any; // 节点
        public static readonly image: any; // 图片
        public static readonly file: any; // 文件
        
        /**
         * 获取数据类型
         * @param {*} param 参数
         * @return {string} 数据类型
         */
        public static getType(param: any): string;
    
        /**
         * 获取当前Rem
         * @return {number} rem
         */
        public static getRem(): number;
    
        /**
         * 记忆函数
         * @param {function} callback 回调
         * @return {function} 记忆函数
         */
        public static cached(callback: Function): Function;
    
        /**
         * 监听屏幕变化
         * @param {function} callback 回调
         * @param {number} time 间隔时间
         */
        public static resize(callback: Function, time: number): void;
    
        /**
         * 监听陀螺仪
         * @param {function} callback 回调
         * @param {number} time 间隔时间
         */
        public static gyroscope(callback: Function, time: number): void;
    
        /**
         * 监听滑轮事件
         * @param {$} $dom Jquery节点
         * @param {*} callback 回调
         * @param {number} time 间隔时间
         */
        public static scroll($dom: $, top: Function, bottom: Function): void;
    
        /**
         * 监听长按
         * @param {$} $dom Jquery节点
         * @param {function} callback
         * @param {number} time
         */
        public static press($dom: $, callback: Function, time: number): void;
    
        /**
         * 内链跳转保留参数
         */
        public static innerChainSaveParam(): void;
    
        /**
         * 禁用Console
         * @param {'log'|'assert'|'warn'|'error'} type 类型
         */
        public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void;
    }
}
