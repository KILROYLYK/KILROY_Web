/**
 * 翻页
 */
declare module 'flip' {
    export interface FlipConfig { // 翻页配置
        projectId: number // CMS项目ID
        language?: string // 语言
        group: string
        type?: string
        page?: number
        limit?: number
        showPage?: number
        button?: {
            prev?: string
            next?: string
            first?: string
            last?: string
        },
        $dom?: { // Jquery元素
            $content?: any
            $list?: any
            $page?: any
            $scroll?: any
        },
        createDom?: Function
        callback?: Function
    }
    
    /**
     * Flip
     */
    export default class Flip {
        constructor(config: FlipConfig); // 构造函数
    }
}
