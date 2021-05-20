// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

import './flip.less';
import FN from '../../SDK/Function/function';
import Ajax from '../../SDK/Ajax/ajax';

const W: Window = window,
    D: Document = document,
    $W: typeof $ = $(W),
    $D: typeof $ = $(D);

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
 * 翻页
 */
export default class Flip {
    private config: any = null; // 配置
    private total: number = 0; // 信息总数
    private isNet: boolean = false; // 是否正在请求开关
    private readonly network: any = {
        domain: 'https://cms.gaeamobile.net',
        getList: '/api/get-posts-list'
    };
    
    /**
     * 构造函数
     * @constructor Flip
     * @param {FlipConfig} config 配置
     */
    constructor(config: FlipConfig) {
        const _this = this;
        
        _this.config = {
            projectID: config.projectId,
            language: config.language || 'cn',
            group: config.group,
            type: config.type || 'page',
            page: config.page || 1,
            limit: config.limit || 10,
            showPage: config.showPage || 3,
            button: {
                prev: (config.button && config.button.prev) || '<',
                next: (config.button && config.button.next) || '>',
                first: (config.button && config.button.first) || '<<',
                last: (config.button && config.button.last) || '>>'
            },
            $dom: {
                $content: (config.$dom && config.$dom.$content) || $('#flip_content'),
                $list: (config.$dom && config.$dom.$list) || $('#flip_content > .list'),
                $page: (config.$dom && config.$dom.$page) || $('#flip_content > .page'),
                $scroll: (config.$dom && config.$dom.$scroll) || $('#flip_content > .more')
            },
            createDom: config.createDom || ((k: number, v: any) => {
                return `<a href="${ v.post_url }">
                        <span>【${ v.category_name }】</span>
                        <span>${ v.post_date.substring(5, 10) }</span>
                        <span>${ v.post_title }</span>
                    </a>`;
            }),
            callback: config.callback || null
        };
        
        _this.config.type === 'scroll' && $D.scroll(_this.scrollFun);
    }
    
    /**
     * 获取数据
     */
    public getData(): void {
        const _this = this,
            config = _this.config;
        
        if (!config) return;
        if (_this.isNet) return;
        _this.isNet = true;
        
        config.type === 'scroll' && config.$dom.$scroll.addClass('loading');
        
        const a = {
            url: _this.network.domain + _this.network.getList,
            data: {
                project_id: config.projectID,
                taxonomy: 'category',
                termStr: config.group,
                resourceType: 'post',
                page: config.page,
                limit: config.limit,
                lang: config.language
            },
            successCallback: (result: any) => {
                _this.isNet = false;
                
                if (result.retCode !== 0) return;
                
                _this.total = result.total;
                
                // 创建列表
                _this.creatList(result.data, (dom: HTMLElement) => {
                    if (config.type === 'page') { // 翻页模式
                        config.$dom.$list.html(dom);
                    } else if (config.type === 'scroll') { // 滚动模式
                        const list = config.$dom.$list.html();
                        config.$dom.$list.html(list + dom);
                    }
                });
                
                if (config.type === 'page') { // 翻页模式
                    config.$dom.$page.show();
                    config.$dom.$scroll.hide();
                    _this.creatPage();
                } else if (config.type === 'scroll') { // 滚动模式
                    config.$dom.$page.hide();
                    config.$dom.$scroll.show();
                    config.page++;
                    config.$dom.$scroll.removeClass('loading');
                    
                    if ((result.data.length === 0) || // 滚到底
                        (result.data.length < config.limit)) {
                        _this.isNet = true;
                        config.$dom.$scroll.addClass('over');
                    }
                }
                config.callback && config.callback(result);
            },
            errorCallback: () => {
                _this.isNet = false;
            }
        };
        
        // 请求数据
        Ajax.encryptAESAjax({
            type: 'get',
            dataType: 'jsonp',
            url: a.url,
            data: a.data,
            success: a.successCallback,
            error: a.errorCallback
        }, {
            length: 16
        });
    }
    
    /**
     * 创建列表
     * @param {array} array 数据列表
     * @param {Function} callback 回调
     */
    private creatList(array: any[], callback: Function): void {
        const _this = this,
            config = _this.config;
        
        let dom = '';
        
        if (!config) return;
        
        FN.array.traversing(array, (k: number, v: string) => {
            dom += config.createDom(k, v);
        });
        
        callback && callback(dom);
    }
    
    /**
     * 创建分页器
     */
    private creatPage(): void {
        const _this = this,
            config = _this.config;
        
        if (!config) return;
        
        const page = config.page,
            total = _this.total,
            limit = config.limit,
            showPage = config.showPage,
            maxPage = Math.ceil(total / limit);
        
        let prevDom = page - 1,
            prevDisabled = '',
            prevMore = '',
            nextDom = page + 1,
            nextDisabled = '',
            nextMore = '',
            dom = `<button class="active" data-page="${ page }"><span>${ page }<span></button>`;
        
        // 约束最小值最大值
        if (prevDom <= 0) prevDom = page;
        if (nextDom > maxPage) nextDom = maxPage;
        
        // 生成当前页左侧页数
        for (let i = page; i > page - (showPage + 1); i--) {
            if (i !== page && i > 0) dom = `<button data-page="${ i }"><span>${ i }<span></button>${ dom }`;
        }
        
        // 生成当前页右侧页数
        for (let ii = page; ii < page + (showPage + 1); ii++) {
            if (ii !== page && ii <= maxPage) dom += `<button data-page="${ ii }"><span>${ ii }<span></button>`;
        }
        
        // 显示上一页下一页按钮
        if (page === 1) prevDisabled = 'disabled';
        if (page === nextDom || total <= limit) nextDisabled = 'disabled';
        
        // 显示更多
        if (page - showPage > 1) prevMore = `<button class="more">...</button>`;
        if (page + showPage < maxPage) nextMore = `<button class="more">...</button>`;
        
        dom =
            `<button class="first ${ prevDisabled }" data-page="1">${ config.button.first }</button>
            <button class="prev ${ prevDisabled }" data-page="${ prevDom }">${ config.button.prev }</button>
            ${ prevMore }${ dom }${ nextMore }
            <button class="next ${ nextDisabled }" data-page="${ nextDom }">${ config.button.next }</button>
            <button class="last #{nextDisabled}" data-page="${ maxPage }">${ config.button.last }</button>`;
        
        config.$dom.$page.html(dom);
        config.$dom.$page.children('button').on('click', (e: Event) => {
            config.page = parseInt($(e.currentTarget).attr('data-page'), 10);
            _this.getData();
        });
    }
    
    /**
     * 滚动加载更多
     */
    private scrollFun(): void {
        const _this = this,
            top = $W.scrollTop(),
            winHeight = $D.height();
        if (top < winHeight - $W.height() - 2 * FN.getRem()) return;
        _this.getData();
    }
}
