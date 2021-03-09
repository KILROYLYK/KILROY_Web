/**
 * 适配
 */
export default class Adaptation {
    private static readonly W: Window = window;
    private static readonly D: Document = document;
    
    private static readonly reg: any = { // 正则
        PC: /Windows|Mac|Linux/i as RegExp,
        mobile: /Mobile|Windows Phone|Android|iPhone|iPod|BlackBerry|SymbianOS|webOS/i as RegExp
    };
    private static readonly scale: boolean = true; // 是否在大屏开启缩放
    private static readonly psdWidth: number = 750; // PSD宽度
    private static readonly waitTime: number = 300; // 等待时间
    private static setTime: number = 0; // 定时器
    
    /**
     * 构造函数
     * @constructor Rem
     */
    constructor() {
        const _this = this;
    }
    
    /**
     * 跳转移动端
     * @param {string} position 移动端地址
     * @return {void}
     */
    public static jumpMobile(position: string = ''): void {
        const _this = this;
        
        _this.reg.mobile.test(_this.W.navigator.userAgent) && (
            _this.W.location.href =
                _this.W.location.origin + position +
                _this.W.location.pathname +
                _this.W.location.search +
                _this.W.location.hash
        );
    }
    
    /**
     * 监听屏幕
     * @return {void}
     */
    public static openRem(): void {
        const _this = this;
        
        // 开启监听
        _this.D.addEventListener('DOMContentLoaded', () => {
            _this.changeRem();
        }, false);
        _this.W.addEventListener('onorientationchange' in _this.W ? 'orientationchange' : 'resize', () => {
            _this.setTimeChangeRem();
        }, false);
        _this.W.addEventListener('pageshow', (e: any) => {
            if (e.persisted) _this.setTimeChangeRem();
        }, false);
    }
    
    /**
     * 定时修改Rem
     * @return {void}
     */
    private static setTimeChangeRem(): void {
        const _this = this;
        
        clearTimeout(_this.setTime);
        _this.setTime = setTimeout(() => {
            _this.changeRem();
        }, _this.waitTime);
    }
    
    /**
     * 改变Rem
     * @return {void}
     */
    private static changeRem(): void {
        const _this = this,
            width = _this.W.innerWidth,
            height = _this.W.innerHeight;
        
        let fontSize = width / _this.psdWidth * 100;
        
        if (fontSize > 100) fontSize = 100;
        // if (_this.scale && width / height >= 0.75) fontSize = 75;
        
        _this.D.documentElement.style.fontSize = fontSize + 'px';
    }
}
