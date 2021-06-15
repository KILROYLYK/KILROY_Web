const W: Window = window;

export interface SocketConfig { // 长链配置
    open?(e: Event): Function, // 打开
    close?(e: CloseEvent): Function, // 关闭
    error?(e: Event): Function, // 错误
    message?(e: MessageEvent): Function // 消息
}

export default class Socket {
    private isActive: boolean = false; // 是否激活
    private url: string = ''; // 链接地址
    private config: SocketConfig = null; // 配置
    private socket: WebSocket = null; // 长链
    
    /**
     * 构造函数
     * @param {string} url 链接地址
     * @param {SocketConfig} config 配置
     */
    public constructor(url: string, config: SocketConfig) {
        const _this = this;
        
        _this.url = url;
        _this.config = config;
    }
    
    /**
     * 创建
     */
    public create(): void {
        const _this = this;
        
        if (_this.isActive) return;
        
        _this.isActive = true;
        _this.socket = new WebSocket(_this.url);
        _this.socket.onopen = _this.open;
        _this.socket.onclose = _this.close;
        _this.socket.onerror = _this.error;
        _this.socket.onmessage = _this.message;
    }
    
    /**
     * 销毁
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isActive) return;
        
        _this.isActive = false;
        _this.socket = null;
    }
    
    /**
     * 打开
     * @param {Event} e 事件
     */
    private open(e: Event): void {
        const _this = this;
        
        console.log('---------- Socket 打开 ----------');
        _this.config.open && _this.config.open(e);
    }
    
    /**
     * 关闭
     * @param {CloseEvent} e 事件
     */
    private close(e: CloseEvent): void {
        const _this = this;
        
        console.log('---------- Socket 关闭 ----------');
        _this.config.close && _this.config.close(e);
    }
    
    /**
     * 错误
     * @param {Event} e 事件
     */
    private error(e: Event): void {
        const _this = this;
        
        _this.config.error && _this.config.error(e);
    }
    
    /**
     * 消息
     * @param {MessageEvent} e 事件
     */
    private message(e: MessageEvent): void {
        const _this = this;
        
        _this.config.message && _this.config.message(e);
    }
    
    /**
     * 发送
     * @param {*} data 数据
     */
    public send(data: any): void {
        const _this = this;
        
        if (!_this.isActive) return;
        
        _this.socket.send(JSON.stringify(data));
    }
}
