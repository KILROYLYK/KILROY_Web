"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
require("./popup.less");
var function_1 = __importDefault(require("../../SDK/Function/function"));
var $D = jquery_1.default(document), $B = jquery_1.default('body');
/**
 * 弹窗
 */
var Popup = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Popup
     * @param {string} id 弹窗ID
     * @param {PopupConfig} config 配置
     */
    function Popup(id, config) {
        this.$id = null; // 根节点
        this.$content = null; // 内容容器
        this.$close = null; // 关闭按钮
        this.id = ''; // 标识
        this.config = {}; // 配置
        this.content = ''; // 内容
        this.setTime = {
            open: null,
            close: null
        };
        var _this = this;
        _this.id = id;
        _this.$id = jquery_1.default('#' + _this.id);
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
    Popup.prototype.init = function () {
        var _this = this;
        _this.creatModal();
        _this.bindFun();
        _this.config.finish && _this.config.finish(_this);
    };
    /**
     * 创建弹窗节点
     */
    Popup.prototype.creatModal = function () {
        var _this = this, template = "<div id=\"" + _this.id + "\" class=\"popup " + _this.id + "\">\n                <div class=\"box_popup\">\n                    <div class=\"popup_content\">" + _this.content + "</div>\n                    <button class=\"popup_close\"><i></i></button>\n                </div></div>";
        _this.$id.remove(); // 清理已有节点
        $B.append(template);
        _this.$id = jquery_1.default('#' + _this.id);
        _this.$content = _this.$id.find('.popup_content');
        _this.$close = _this.$id.find('.popup_close');
        if (_this.config.animation)
            _this.$id.addClass('popup_' + _this.config.animation);
    };
    /**
     * 绑定基础事件
     */
    Popup.prototype.bindFun = function () {
        var _this = this;
        if (_this.config.isScreenClose) { // 全屏关闭
            _this.$close.hide();
            _this.$id.on('click', function (e) {
                e.stopPropagation();
                _this.close();
            });
            _this.$content.on('click', function (e) {
                e.stopPropagation();
            });
        }
        else { // 按钮关闭
            _this.$close.on('click', function (e) {
                e.stopPropagation();
                _this.close();
            });
        }
    };
    /**
     * 清除延时动画操作
     */
    Popup.prototype.clearSetTime = function () {
        var _this = this;
        function_1.default.object.traversing(_this.setTime, function (k, v) {
            clearTimeout(v);
        });
    };
    /**
     * 打开
     * @param {*} data 参数
     */
    Popup.prototype.open = function (data) {
        if (data === void 0) { data = null; }
        var _this = this;
        _this.clearSetTime();
        _this.$id.addClass('show');
        _this.config.open && _this.config.open(data);
        _this.setTime.open = setTimeout(function () {
            _this.$id.addClass('active');
        }, 50);
    };
    /**
     * 关闭
     */
    Popup.prototype.close = function () {
        var _this = this;
        _this.clearSetTime();
        _this.$id.removeClass('active');
        _this.setTime.close = setTimeout(function () {
            _this.$id.removeClass('show');
            _this.config.close && _this.config.close();
        }, 550);
    };
    /**
     * 重置
     */
    Popup.prototype.reset = function () {
        var _this = this;
        _this.clearSetTime();
        _this.$id.removeClass('show active');
        _this.$content.append(_this.content);
        _this.config.finish && _this.config.finish(_this);
    };
    /**
     * 锁定方向弹窗
     * @param {'vertical'|'horizontal'} type 方向
     */
    Popup.direction = function (type) {
        if (type === void 0) { type = 'vertical'; }
        var _this = this;
        if (!_this.popup.direction) {
            _this.popup.direction = new Popup('popup_direction', {
                content: _this.template.direction,
                finish: function (popup) {
                    popup.$id.addClass('popup_' + type);
                }
            });
        }
        function_1.default.resize(function () {
            var width = $D.width(), height = $D.height(), isPC = function_1.default.agent.client() === 'PC', isVertical = width <= height;
            if (isPC)
                return;
            if ((isVertical && type !== 'vertical') ||
                (!isVertical && type === 'vertical')) {
                _this.popup.direction.open();
            }
            else {
                _this.popup.direction.close();
            }
        });
    };
    /**
     * 加载弹窗
     * @param {boolean} isOpen 是否显示
     * @param {boolean} showMask 是否显示黑透
     */
    Popup.load = function (isOpen, showMask) {
        if (isOpen === void 0) { isOpen = true; }
        if (showMask === void 0) { showMask = false; }
        var _this = this, className = 'mask';
        if (!_this.popup.load) {
            _this.popup.load = new Popup('popup_load', {
                content: _this.template.load,
                open: function (data) {
                    data ? _this.popup.load.$id.addClass(className) : _this.popup.load.$id.removeClass(className);
                }
            });
        }
        isOpen ? _this.popup.load.open(showMask) : _this.popup.load.close();
    };
    /**
     * 提示弹窗
     * @param {string} message 提示信息
     */
    Popup.toast = function (message) {
        var _this = this;
        if (!_this.popup.toast) {
            _this.popup.toast = new Popup('popup_toast', {
                content: _this.template.toast,
                animation: 'bottom',
                open: function (data) {
                    _this.popup.toast.$content.find('.content').text(data);
                    if (_this.setTime.toast)
                        clearTimeout(_this.setTime.toast);
                    _this.setTime.toast = setTimeout(function () {
                        _this.popup.toast.close();
                    }, 2500);
                },
                close: function () {
                    _this.popup.toast.$content.find('.content').text('');
                    clearTimeout(_this.setTime.toast);
                }
            });
        }
        _this.popup.toast.open(message);
    };
    // ---------- 静态函数 Start ---------- //
    Popup.setTime = {
        direction: null,
        load: null,
        toast: null // 提示
    };
    Popup.popup = {
        direction: null,
        load: null,
        toast: null // 提示
    };
    Popup.template = {
        direction: "<i></i>",
        load: "<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>",
        toast: "<div class=\"content\"></div>" // 提示
    };
    return Popup;
}());
exports.default = Popup;
//# sourceMappingURL=popup.js.map