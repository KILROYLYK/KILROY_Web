"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
require("./popup.less");
var function_1 = __importDefault(require("../../SDK/Function/function"));
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
        this.$B = jquery_1.default('body');
        this.config = {};
        this.id = '';
        this.content = ''; // 内容
        this.setTime = {
            open: 0,
            close: 0
        };
        this.$id = null;
        this.$content = null;
        this.$close = null;
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
     * @return {void}
     */
    Popup.prototype.init = function () {
        var _this = this;
        _this.creatModal();
        _this.bindFun();
        _this.config.finish && _this.config.finish();
    };
    /**
     * 创建弹窗节点
     * @return {void}
     */
    Popup.prototype.creatModal = function () {
        var _this = this, template = "<div id=\"" + _this.id + "\" class=\"popup " + _this.id + "\">\n                <div class=\"box_popup\">\n                    <div class=\"box_content\">" + _this.content + "</div>\n                    <button class=\"btn_close\"><i></i></button>\n                </div></div>";
        _this.$id.remove(); // 清理已有节点
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
        if (_this.config.isScreenClose) { // 全屏关闭
            _this.$id.on('click', function (e) {
                e.stopPropagation();
                _this.close();
            });
            _this.$content.on('click', function (e) {
                e.stopPropagation();
            });
            _this.$close.hide();
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
     * @return {void}
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
     * @return {void}
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
     * @return {void}
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
     * @return {void}
     */
    Popup.prototype.reset = function () {
        var _this = this;
        _this.clearSetTime();
        _this.$id.removeClass('show active');
        _this.$content.html(_this.content);
        _this.config.finish && _this.config.finish();
    };
    return Popup;
}());
exports.default = Popup;
//# sourceMappingURL=popup.js.map