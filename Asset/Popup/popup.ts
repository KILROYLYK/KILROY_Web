// @ts-nocheck
import $ from '/usr/local/lib/node_modules/jquery';

import './popup.less';

interface PopupConfig { // 弹窗配置
    content?: any // 内容
    finishCallback?: Function // 完成回调
    openCallback?: Function // 打开回调
    closeCallback?: Function // 关闭回调
}

/**
 * 弹窗
 */
export default class Popup {
    private id: string = '';
    private config: PopupConfig | null = null;
    private content: HTMLElement | string = ''; // 内容
    private finishCallback: Function | null = null; // 完成回调
    private openCallback: Function | null = null; // 打开回调
    private closeCallback: Function | null = null; // 关闭回调
    
    private readonly $B: any = $('body'); // Jquery的Body元素
    public $id: any = null;
    public $content: any = null;
    public $close: any = null;
    
    private readonly setTime = { // 定时控制器
        open: 0 as any,
        close: 0 as any
    };
    
    /**
     * 构造函数
     * @constructor Popup
     * @param {string} id 弹窗ID
     * @param {object} config 配置
     */
    constructor(id: string, config: PopupConfig) {
        const _this = this;
        
        if ('undefined' === typeof id ||
            'object' === typeof id ||
            id === '') {
            return;
        }
        
        _this.id = id || 'popup';
        _this.$id = $('#' + _this.id);
        _this.config = config || {
            content: '',
            finishCallback: null,
            openCallback: null,
            closeCallback: null,
        };
        _this.content = _this.config.content || _this.$id.html();
        _this.finishCallback = _this.config.finishCallback || null;
        _this.openCallback = _this.config.openCallback || null;
        _this.closeCallback = _this.config.closeCallback || null;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.creatModal();
        _this.bindFun();
        _this.finishCallback && _this.finishCallback();
    }
    
    /**
     * 创建弹窗节点
     * @return {void}
     */
    private creatModal(): void {
        const _this = this,
            template = `<div id="${ _this.id }" class="popup ${ _this.id }">
                <div class="box_popup">
                    <div class="box_content">${ _this.content }</div>
                    <button class="btn_close"><i /></button>
                </div></div>`;
        
        _this.$id.remove();
        _this.$B.append(template);
        _this.$id = $('#' + _this.id);
        _this.$content = _this.$id.find('.box_content');
        _this.$close = _this.$id.find('.btn_close');
    }
    
    /**
     * 绑定基础事件
     * @return {void}
     */
    private bindFun(): void {
        const _this = this;
        
        // 关闭按钮
        _this.$close.on('click', (e: Event) => {
            e.stopPropagation();
            _this.close();
        });
    }
    
    /**
     * 清除延时动画操作
     * @return {void}
     */
    private clearSetTime(): void {
        const _this = this;
        Object.values(_this.setTime)
            .forEach((v, i, a) => {
                clearTimeout(v);
            });
    }
    
    /**
     * 打开
     * @param {object} data 参数
     * @return {void}
     */
    public open(data = null): void {
        const _this = this;
        
        _this.clearSetTime();
        
        _this.$id.addClass('show');
        _this.openCallback && _this.openCallback(data);
        _this.setTime.open = setTimeout(() => {
            _this.$id.addClass('active');
        }, 50);
    }
    
    /**
     * 关闭
     * @return {void}
     */
    public close(): void {
        const _this = this;
        
        _this.clearSetTime();
        
        _this.$id.removeClass('active');
        _this.setTime.close = setTimeout(() => {
            _this.$id.removeClass('show');
            _this.closeCallback && _this.closeCallback();
        }, 550);
    }
    
    /**
     * 重置
     * @return {void}
     */
    public reset(): void {
        const _this = this;
        
        _this.clearSetTime();
        
        _this.$id.removeClass('show active');
        _this.$content.html(_this.content);
        _this.finishCallback && _this.finishCallback();
    }
    
}
