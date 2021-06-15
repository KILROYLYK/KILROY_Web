export interface SocketConfig { // 长链配置
    open?(e: Event): Function, // 打开
    close?(e: CloseEvent): Function, // 关闭
    error?(e: Event): Function, // 错误
    message?(e: MessageEvent): Function // 消息
}

export default class Socket {
    /**
     * 构造函数
     * @param {string} url 链接地址
     * @param {SocketConfig} config 配置
     */
    public constructor(url: string, config: SocketConfig);
    
    /**
     * 创建
     */
    public create(): void;
    
    /**
     * 销毁
     */
    public destroy(): void;
    
    /**
     * 发送
     * @param {*} data 数据
     */
    public send(data: any): void;
}
