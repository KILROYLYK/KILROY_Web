// @ts-nocheck
import Base from '../../../_Base/Asset/javascript/base';

interface PreloadConfig { // 预加载配置
    loadedCallback?: Function // 加载完成（单个资源）
    finishCallback?: Function // 加载完成（全部资源）
}

/**
 * Preload
 */
export default class Preload {
    private config: PreloadConfig | null = null; // 配置
    private loadedCallback: Function | null = null; // 加载单独文件完成回调
    private finishCallback: Function | null = null; // 加载全部文件完成回调
    
    private list: string[] = []; // 文件列表
    private index: number = 0; // 文件下标
    private total: number = 0; // 文件总数
    
    /**
     * 构造函数
     * @constructor Preload
     * @param {string[]} list 资源列表
     * @param {object} config 配置
     */
    constructor(list: string[], config: PreloadConfig = {}) {
        const _this = this;
        
        _this.config = config;
        _this.loadedCallback = _this.config.loadedCallback || ((index: number, total: number, progress: number) => {
            console.log(index, total, progress + '%');
        });
        _this.finishCallback = _this.config.finishCallback || (() => {
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
    private fileType(src: string, callback: Function): void {
        const _this = this;
        if (src.indexOf('.jpg') > -1 ||
            src.indexOf('.png') > -1 ||
            src.indexOf('.gif') > -1) {
            _this.readImage(src, callback);
        } else if (src.indexOf('.mp3') > -1 ||
            src.indexOf('.mp4') > -1) {
            _this.readMedia(src, callback);
        } else {
            console.log('文件格式不正确：' + src);
            callback();
        }
    }
    
    /**
     * 读取Image
     * @param {string} src 素材地址
     * @param {Function} callback 完成回调
     * @return {void}
     */
    private readImage(src: string, callback: Function): void {
        const _this = this,
            image = new Image();
        
        image.addEventListener('load', () => {
            callback();
        }, false);
        image.addEventListener('error', () => {
            callback();
        }, false);
        
        image.src = src;
    }
    
    /**
     * 读取Media
     * @param {string} src 素材地址
     * @param {Function} callback 完成回调
     * @return {void}
     */
    private readMedia(src: string, callback: Function): void {
        const _this = this,
            audio = new Audio();
        
        audio.addEventListener('load', () => {
            callback();
        }, false);
        audio.addEventListener('error', () => {
            callback();
        }, false);
        
        audio.src = src;
        audio.load();
        
        if (Base.isPSB.platform === 'Mobile') callback();
    }
    
    /**
     * 加载文件列表
     * @return {void}
     */
    private readSrc(): void {
        const _this = this;
        
        // 加载单个文件完成
        _this.loadedCallback && _this.loadedCallback(
            _this.index, _this.total,
            parseInt(String((_this.index + 1) / length * 100), 10)
        );
        
        // 加载全部文件完成
        if (_this.index === length - 1) {
            _this.finishCallback && _this.finishCallback();
            return;
        }
        
        _this.index++;
        _this.fileType(_this.list[_this.index], _this.readSrc);
    }
}
