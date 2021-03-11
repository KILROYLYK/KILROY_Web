"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
require("./popup.less");
/**
 * 弹窗
 */
var Popup = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Popup
     * @param {string} id 弹窗ID
     * @param {object} config 配置
     */
    function Popup(id, config) {
        this.id = '';
        this.config = null;
        this.content = ''; // 内容
        this.finishCallback = null; // 完成回调
        this.openCallback = null; // 打开回调
        this.closeCallback = null; // 关闭回调
        this.$B = jquery_1.default('body'); // Jquery的Body元素
        this.$id = null;
        this.$content = null;
        this.$close = null;
        this.setTime = {
            open: 0,
            close: 0
        };
        var _this = this;
        if ('undefined' === typeof id ||
            'object' === typeof id ||
            id === '') {
            return;
        }
        _this.id = id || 'popup';
        _this.$id = jquery_1.default('#' + _this.id);
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
    Popup.prototype.init = function () {
        var _this = this;
        _this.creatModal();
        _this.bindFun();
        _this.finishCallback && _this.finishCallback();
    };
    /**
     * 创建弹窗节点
     * @return {void}
     */
    Popup.prototype.creatModal = function () {
        var _this = this, template = "<div id=\"" + _this.id + "\" class=\"popup " + _this.id + "\">\n                <div class=\"box_popup\">\n                    <div class=\"box_content\">" + _this.content + "</div>\n                    <button class=\"btn_close\"><i /></button>\n                </div></div>";
        _this.$id.remove();
        _this.$B.append(template);
        _this.$id = jquery_1.default('#' + _this.id);
        _this.$content = _this.$id.find('.box_content');
        _this.$close = _this.$id.find('.btn_close');
    };
    /**
     * 绑定基础事件
     * @return {void}
     */
    Popup.prototype.bindFun = function () {
        var _this = this;
        // 关闭按钮
        _this.$close.on('click', function (e) {
            e.stopPropagation();
            _this.close();
        });
    };
    /**
     * 清除延时动画操作
     * @return {void}
     */
    Popup.prototype.clearSetTime = function () {
        var _this = this;
        Object.values(_this.setTime)
            .forEach(function (v, i, a) {
            clearTimeout(v);
        });
    };
    /**
     * 打开
     * @param {object} data 参数
     * @return {void}
     */
    Popup.prototype.open = function (data) {
        if (data === void 0) { data = null; }
        var _this = this;
        _this.clearSetTime();
        _this.$id.addClass('show');
        _this.openCallback && _this.openCallback(data);
        _this.setTime.open = setTimeout(function () {
            _this.$id.addClass('active');
        }, 50);
    };
    /**
     * 关闭
     * @return {void}
     */
    Popup.prototype.close = function () {
        var _this = this;
        _this.clearSetTime();
        _this.$id.removeClass('active');
        _this.setTime.close = setTimeout(function () {
            _this.$id.removeClass('show');
            _this.closeCallback && _this.closeCallback();
        }, 550);
    };
    /**
     * 重置
     * @return {void}
     */
    Popup.prototype.reset = function () {
        var _this = this;
        _this.clearSetTime();
        _this.$id.removeClass('show active');
        _this.$content.html(_this.content);
        _this.finishCallback && _this.finishCallback();
    };
    return Popup;
}());
exports.default = Popup;
//# sourceMappingURL=popup.js.map