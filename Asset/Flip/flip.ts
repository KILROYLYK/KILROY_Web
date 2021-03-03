// @ts-nocheck
import './flip.less';
import $ from '/usr/local/lib/node_modules/jquery';
import Base from '../../../_Base/Asset/javascript/base';
import Ajax from '../Ajax/ajax';

interface FlipConfig { // 翻页配置
    projectID: number // CMS项目ID
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
 * 翻页
 */
export default class Flip {
    private config: FlipConfig | null = null; // 配置
    private total: number = 0; // 信息总数
    private isNet: boolean = false; // 是否正在请求开关
    private readonly network: any = {
        domain: 'https://cms.gaeamobile.net' as string,
        getList: '/api/get-posts-list' as string
    };
    
    private readonly $W: any = $(Base.Window); // Jquery的Window元素
    private readonly $D: any = $(Base.Document); // Jquery的Document元素
    
    /**
     * 构造函数
     * @constructor Page
     * @param {object} config 配置
     */
    constructor(config: FlipConfig) {
        const _this = this;
        
        _this.config = {
            projectID: config.projectID,
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
                $content: (config.$dom && config.$dom.$content) || $('#content'),
                $list: (config.$dom && config.$dom.$list) || $('#content > .list'),
                $page: (config.$dom && config.$dom.$page) || $('#content > .page'),
                $scroll: (config.$dom && config.$dom.$scroll) || $('#content > .more')
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
        
        _this.config.type === 'scroll' && _this.$D.scroll(_this.scrollFun);
    }
    
    /**
     * 获取数据
     * @return {void}
     */
    public getData(): void {
        const _this = this;
        
        if (_this.isNet) return;
        _this.isNet = true;
        
        _this.config.type === 'scroll' && _this.config.$dom.$scroll.addClass('loading');
        
        const a = {
            url: _this.network.domain + _this.network.getList,
            data: {
                project_id: _this.config.projectID,
                taxonomy: 'category',
                termStr: _this.config.group,
                resourceType: 'post',
                page: _this.config.page,
                limit: _this.config.limit,
                lang: _this.config.language
            },
            successCallback: (result: any) => {
                _this.isNet = false;
                if (result.retCode !== 0) return;
                _this.total = result.total;
                
                // 创建列表
                _this.creatList(result.data, (dom: HTMLElement) => {
                    if (_this.config.type === 'page') { // 翻页模式
                        _this.config.$dom.$list.html(dom);
                    } else if (_this.config.type === 'scroll') { // 滚动模式
                        const list = _this.config.$dom.$list.html();
                        _this.config.$dom.$list.html(list + dom);
                    }
                });
                
                if (_this.config.type === 'page') { // 翻页模式
                    _this.config.$dom.$page.show();
                    _this.config.$dom.$scroll.hide();
                    _this.creatPage();
                } else if (_this.config.type === 'scroll') { // 滚动模式
                    _this.config.$dom.$page.hide();
                    _this.config.$dom.$scroll.show();
                    _this.config.page++;
                    _this.config.$dom.$scroll.removeClass('loading');
                    
                    if ((result.data.length === 0) || // 滚到底
                        (result.data.length < _this.config.limit)) {
                        _this.isNet = true;
                        _this.config.$dom.$scroll.addClass('over');
                    }
                }
                _this.config.callback && _this.config.callback(result);
            },
            errorCallback: () => {
                _this.isNet = false;
            }
        };
        
        // 请求数据
        Ajax.encryptAjax({
            url: a.url,
            data: a.data,
            successCallback: a.successCallback,
            errorCallback: a.errorCallback
        });
    }
    
    /**
     * 创建列表
     * @param {array} array 数据列表
     * @param {Function} callback 回调
     * @return {void}
     */
    private creatList(array: any[], callback: Function): void {
        const _this = this;
        
        let dom = '';
        
        Base.traversingArray(array, (k: number, v: string) => {
            dom += _this.config.createDom(k, v);
        });
        
        callback && callback(dom);
    }
    
    /**
     * 创建分页器
     * @return {void}
     */
    private creatPage(): void {
        const _this = this,
            page = _this.config.page,
            total = _this.total,
            limit = _this.config.limit,
            showPage = _this.config.showPage,
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
            `<button class="first ${ prevDisabled }" data-page="1">${ _this.config.button.first }</button>
            <button class="prev ${ prevDisabled }" data-page="${ prevDom }">${ _this.config.button.prev }</button>
            ${ prevMore }${ dom }${ nextMore }
            <button class="next ${ nextDisabled }" data-page="${ nextDom }">${ _this.config.button.next }</button>
            <button class="last #{nextDisabled}" data-page="${ maxPage }">${ _this.config.button.last }</button>`;
        
        _this.config.$dom.$page.html(dom);
        _this.config.$dom.$page.children('button').on('click', (e: Event) => {
            _this.config.page = parseInt($(e.currentTarget).attr('data-page'), 10);
            _this.getData();
        });
    }
    
    /**
     * 滚动加载更多
     * @return {void}
     */
    private scrollFun(): void {
        const _this = this,
            top = _this.$W.scrollTop(),
            winHeight = _this.$D.height();
        if (top < winHeight - _this.$W.height() - 2 * Base.rem.get()) return;
        _this.getData();
    }
}
