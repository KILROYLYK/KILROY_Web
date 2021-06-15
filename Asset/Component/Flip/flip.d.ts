/**
 * 翻页
 */
declare module 'flip' {
    export interface FlipConfig { // 翻页配置
        language?: string; // 语言
        type?: 'page' | 'scroll'; // 类型（翻页|滚动）
        page?: number; // 页数
        limit?: number; // 条数
        showPage?: number; // 显示n页面切换按钮
        button?: { // 按钮文案
            prev?: string
            next?: string
            first?: string
            last?: string
        };
        $dom?: { // Dom节点
            $content?: any
            $list?: any
            $page?: any
            $scroll?: any
        };
        
        createDom?(): HTMLElement // 单条数据Dom
        callback?(result: any): void; // 获取数据成功回调
        
        projectId: number; // CMS项目ID
        group: string; // 内容分组
    }
    
    /**
     * Flip
     */
    export default class Flip {
        /**
         * 构造函数
         * @constructor Flip
         * @param {FlipConfig} config 配置
         */
        public constructor(config: FlipConfig);
    }
}
