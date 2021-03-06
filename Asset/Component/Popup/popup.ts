// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

import './popup.less';
import FN from '../../SDK/Function/function';

const $D: typeof $ = $(document),
    $B: typeof $ = $('body');

export interface PopupConfig { // 弹窗配置
    content?: HTMLElement | string; // 内容
    animation?: 'top' | 'bottom' | 'left' | 'right'; // 动画
    isScreenClose?: boolean; // 是否全屏关闭
    finish?(popup: Popup): void; // 完成回调
    open?(data: any): void; // 打开回调
    close?(): void; // 关闭回调
}

/**
 * 弹窗
 */
export default class Popup {
    public $id: typeof $ = null; // 根节点
    public $content: typeof $ = null; // 内容容器
    public $close: typeof $ = null; // 关闭按钮
    private id: string = ''; // 标识
    private config: PopupConfig = {}; // 配置
    private content: HTMLElement | string = ''; // 内容
    private readonly setTime: any = { // 定时器列表
        open: null,
        close: null
    };
    
    /**
     * 构造函数
     * @constructor Popup
     * @param {string} id 弹窗ID
     * @param {PopupConfig} config 配置
     */
    public constructor(id: string, config: PopupConfig) {
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
     */
    private init(): void {
        const _this = this;
        
        _this.creatModal();
        _this.bindFun();
        
        _this.config.finish && _this.config.finish(_this);
    }
    
    /**
     * 创建弹窗节点
     */
    private creatModal(): void {
        const _this = this,
            template = `<div id="${ _this.id }" class="popup ${ _this.id }">
                <div class="box_popup">
                    <div class="popup_content">${ _this.content }</div>
                    <button class="popup_close"><i></i></button>
                </div></div>`;
        
        _this.$id.remove(); // 清理已有节点
        $B.append(template);
        
        _this.$id = $('#' + _this.id);
        _this.$content = _this.$id.find('.popup_content');
        _this.$close = _this.$id.find('.popup_close');
        
        if (_this.config.animation) _this.$id.addClass('popup_' + _this.config.animation);
    }
    
    /**
     * 绑定基础事件
     */
    private bindFun(): void {
        const _this = this;
        
        if (_this.config.isScreenClose) { // 全屏关闭
            _this.$close.hide();
            _this.$id.on('click', (e: Event) => {
                e.stopPropagation();
                _this.close();
            });
            _this.$content.on('click', (e: Event) => {
                e.stopPropagation();
            });
        } else { // 按钮关闭
            _this.$close.on('click', (e: Event) => {
                e.stopPropagation();
                _this.close();
            });
        }
    }
    
    /**
     * 清除延时动画操作
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
     */
    public reset(): void {
        const _this = this;
        
        _this.clearSetTime();
        
        _this.$id.removeClass('show active');
        _this.$content.append(_this.content);
        _this.config.finish && _this.config.finish(_this);
    }
    
    // ---------- 静态函数 Start ---------- //
    private static readonly setTime: any = { // 定时器
        direction: null, // 锁定方向
        load: null, // 加载
        toast: null // 提示
    };
    private static readonly popup: any = { // 弹窗
        direction: null, // 锁定方向
        load: null, // 加载
        toast: null // 提示
    };
    private static readonly template: any = { // 模板
        direction: `<i></i>`, // 锁定方向
        load: `<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>`, // 加载
        toast: `<div class="content"></div>` // 提示
    };
    
    /**
     * 锁定方向弹窗
     * @param {'vertical'|'horizontal'} type 方向
     */
    public static direction(type: 'vertical' | 'horizontal' = 'vertical'): void {
        const _this = this;
        
        if (!_this.popup.direction) {
            _this.popup.direction = new Popup('popup_direction', {
                content: _this.template.direction,
                finish(popup: Popup) {
                    popup.$id.addClass('popup_' + type);
                }
            });
        }
        
        FN.resize(() => {
            const width = $D.width(),
                height = $D.height(),
                isPC = FN.agent.client() === 'PC',
                isVertical = width <= height;
            
            if (isPC) return;
            
            if ((isVertical && type !== 'vertical') ||
                (!isVertical && type === 'vertical')) {
                _this.popup.direction.open();
            } else {
                _this.popup.direction.close();
            }
        });
    }
    
    /**
     * 加载弹窗
     * @param {boolean} isOpen 是否显示
     * @param {boolean} showMask 是否显示黑透
     */
    public static load(isOpen: boolean = true, showMask: boolean = false): void {
        const _this = this,
            className = 'mask';
        
        if (!_this.popup.load) {
            _this.popup.load = new Popup('popup_load', {
                content: _this.template.load,
                open(data: boolean) {
                    data ? _this.popup.load.$id.addClass(className) : _this.popup.load.$id.removeClass(className);
                }
            });
        }
        
        isOpen ? _this.popup.load.open(showMask) : _this.popup.load.close();
    }
    
    /**
     * 提示弹窗
     * @param {string} message 提示信息
     */
    public static toast(message: string): void {
        const _this = this;
        
        if (!_this.popup.toast) {
            _this.popup.toast = new Popup('popup_toast', {
                content: _this.template.toast,
                animation: 'bottom',
                open(data: any): void {
                    _this.popup.toast.$content.find('.content').text(data);
                    
                    if (_this.setTime.toast) clearTimeout(_this.setTime.toast);
                    _this.setTime.toast = setTimeout(() => {
                        _this.popup.toast.close();
                    }, 2500);
                },
                close(): void {
                    _this.popup.toast.$content.find('.content').text('');
                    
                    clearTimeout(_this.setTime.toast);
                }
            });
        }
        
        _this.popup.toast.open(message);
    }
    
    // ---------- 静态函数 End ---------- //
}
