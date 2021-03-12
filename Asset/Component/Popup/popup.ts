// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

import './popup.less';
import FN from '../../SDK/Function/function';

export interface PopupConfig { // 弹窗配置
    content?: any; // 内容
    isScreenClose?: boolean; // 是否全屏关闭
    finish?(): void; // 完成回调
    open?(data: any): void; // 打开回调
    close?(): void; // 关闭回调
}

/**
 * 弹窗
 */
export default class Popup {
    private readonly $B: any = $('body');
    private config: PopupConfig = {};
    private id: string = '';
    private content: HTMLElement | string = ''; // 内容
    private readonly setTime: any = { // 定时控制器
        open: 0,
        close: 0
    };
    public $id: any = null;
    public $content: any = null;
    public $close: any = null;
    
    /**
     * 构造函数
     * @constructor Popup
     * @param {string} id 弹窗ID
     * @param {PopupConfig} config 配置
     */
    constructor(id: string, config: PopupConfig) {
        const _this = this;
        
        _this.id = id;
        _this.$id = $('#' + _this.id);
        _this.config = config || {
            content: '',
            isScreenClose: false,
            finish: null,
            open: null,
            close: null
        };
        _this.content = _this.config.content || _this.$id.html();
        
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
        
        _this.config.finish && _this.config.finish();
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
                    <button class="btn_close"><i></i></button>
                </div></div>`;
        
        _this.$id.remove(); // 清理已有节点
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
        
        if (_this.config.isScreenClose) { // 全屏关闭
            _this.$id.on('click', (e: Event) => {
                e.stopPropagation();
                _this.close();
            });
            _this.$content.on('click', (e: Event) => {
                e.stopPropagation();
            });
            _this.$close.hide();
        } else { // 按钮关闭
            _this.$close.on('click', (e: Event) => {
                e.stopPropagation();
                _this.close();
            });
        }
    }
    
    /**
     * 清除延时动画操作
     * @return {void}
     */
    private clearSetTime(): void {
        const _this = this;
        
        FN.object.traversing(_this.setTime, (k: any, v: any) => {
            clearTimeout(v);
        });
    }
    
    /**
     * 打开
     * @param {*} data 参数
     * @return {void}
     */
    public open(data: any = null): void {
        const _this = this;
        
        _this.clearSetTime();
        
        _this.$id.addClass('show');
        _this.config.open && _this.config.open(data);
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
            _this.config.close && _this.config.close();
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
        _this.config.finish && _this.config.finish();
    }
}
