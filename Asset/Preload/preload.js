"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Function_1 = __importDefault(require("../Function/Function"));
/**
 * Preload
 */
var Preload = /** @class */ (function () {
    /**
     * 构造函数
     * @constructor Preload
     * @param {string[]} list 资源列表
     * @param {object} config 配置
     */
    function Preload(list, config) {
        if (config === void 0) { config = {}; }
        this.config = null; // 配置
        this.loadedCallback = null; // 加载单独文件完成回调
        this.finishCallback = null; // 加载全部文件完成回调
        this.list = []; // 文件列表
        this.index = 0; // 文件下标
        this.total = 0; // 文件总数
        var _this = this;
        _this.config = config;
        _this.loadedCallback = _this.config.loadedCallback || (function (index, total, progress) {
            console.log(index, total, progress + '%');
        });
        _this.finishCallback = _this.config.finishCallback || (function () {
            console.log('预加载完成');
        });
        _this.list = list;
        _this.index = 0;
        _this.total = list.length;
        if (!_this.list || length === 0) { // 文件列表为空
            _this.loadedCallback && _this.loadedCallback(_this.index, _this.total, 100);
            _this.finishCallback && _this.finishCallback();
            return;
        }
        _this.fileType(_this.list[_this.index], _this.readSrc); // 开始加载第一个文件
    }
    /**
     * 根据文件类型执行不同加载
     * @param {string} src 素材地址
     * @param {Function} callback 完成回调
     * @return {void}
     */
    Preload.prototype.fileType = function (src, callback) {
        var _this = this;
        if (src.indexOf('.jpg') > -1 ||
            src.indexOf('.png') > -1 ||
            src.indexOf('.gif') > -1) {
            _this.readImage(src, callback);
        }
        else if (src.indexOf('.mp3') > -1 ||
            src.indexOf('.mp4') > -1) {
            _this.readMedia(src, callback);
        }
        else {
            console.log('文件格式不正确：' + src);
            callback();
        }
    };
    /**
     * 读取Image
     * @param {string} src 素材地址
     * @param {Function} callback 完成回调
     * @return {void}
     */
    Preload.prototype.readImage = function (src, callback) {
        var _this = this, image = new Image();
        image.addEventListener('load', function () {
            callback();
        }, false);
        image.addEventListener('error', function () {
            callback();
        }, false);
        image.src = src;
    };
    /**
     * 读取Media
     * @param {string} src 素材地址
     * @param {Function} callback 完成回调
     * @return {void}
     */
    Preload.prototype.readMedia = function (src, callback) {
        var _this = this, audio = new Audio();
        audio.addEventListener('load', function () {
            callback();
        }, false);
        audio.addEventListener('error', function () {
            callback();
        }, false);
        audio.src = src;
        audio.load();
        if (Function_1.default.isPSB.platform === 'Mobile')
            callback();
    };
    /**
     * 加载文件列表
     * @return {void}
     */
    Preload.prototype.readSrc = function () {
        var _this = this;
        // 加载单个文件完成
        _this.loadedCallback && _this.loadedCallback(_this.index, _this.total, parseInt(String((_this.index + 1) / length * 100), 10));
        // 加载全部文件完成
        if (_this.index === length - 1) {
            _this.finishCallback && _this.finishCallback();
            return;
        }
        _this.index++;
        _this.fileType(_this.list[_this.index], _this.readSrc);
    };
    return Preload;
}());
exports.default = Preload;
//# sourceMappingURL=preload.js.map