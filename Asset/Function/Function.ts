/**
 * 函数
 */
export default class FN {
    public static readonly window: Window = window; // 全局对象
    public static readonly document: Document = document; // 文档对象
    
    public static readonly agent: string = window.navigator.userAgent.toLowerCase(); // 代理信息
    
    public static readonly isPSB: any = { // 判断设备信息
        /**
         * 判断Platform
         * @return {string} 返回平台信息
         */
        platform: (): string => {
            const _this = FN,
                platform = {
                    PC: /Windows|Mac|Linux/i as RegExp,
                    Mobile: /Mobile|Android|webOS|Windows Phone|BlackBerry|SymbianOS|\(i[^;]+;( U;)? CPU.+Mac OS X/i as RegExp
                };
            
            if (platform.Mobile.test(_this.agent)) { // Mobile（优先判断）
                return 'Mobile';
            } else if (platform.PC.test(_this.agent)) { // PC
                return 'PC';
            }
            
            console.log('未知平台：' + _this.agent);
            return _this.agent;
        },
        
        /**
         * 判断System
         * @return {string} 返回系统信息
         */
        system: (): string => {
            const _this = FN;
            
            if ((/Android/i).test(_this.agent) || (/Adr/i).test(_this.agent)) {
                return 'Android';
            } else if ((/\(i[^;]+;( U;)? CPU.+Mac OS X/i).test(_this.agent)) {
                return 'iOS';
            } else if ((/BlackBerry/i).test(_this.agent)) {
                return 'BlackBerry';
            } else if ((/SymbianOS/i).test(_this.agent)) {
                return 'SymbianOS';
            } else if ((/Windows/i).test(_this.agent)) {
                return 'Windows';
            } else if ((/Mac/i).test(_this.agent)) {
                return 'Mac';
            } else if ((/Linux/i).test(_this.agent)) {
                return 'Linux';
            }
            
            console.log('未知系统：' + _this.agent);
            return _this.agent;
        },
        
        /**
         * 判断Browser
         * @return {string} 返回浏览器信息
         */
        browser: (): string => {
            const _this = FN;
            
            if ((/Huawei/i).test(_this.agent)) {
                // Huawei 特殊判断
                if ((/MicroMessenger/i).test(_this.agent)) {
                    return 'WeChat';
                } else if ((/pixel|statusbar/i).test(_this.agent)) {
                    return 'HuaWei';
                } else {
                    return 'QQBrowser';
                }
            } else if ((/MQQBrowser/i).test(_this.agent)) {
                return 'QQBrowser';
            } else if ((/QQ/i).test(_this.agent)) {
                return 'QQ';
            } else if ((/MicroMessenger/i).test(_this.agent)) {
                return 'WeChat';
            } else if ((/WeiBo/).test(_this.agent)) {
                return 'WeiBo';
            } else if ((/Chrome/i).test(_this.agent)) {
                return 'Chrome';
            } else if ((/Firefox/i).test(_this.agent)) {
                return 'Firefox';
            } else if ((/Safari/i).test(_this.agent)) {
                return 'Safari';
            } else if ((/Edge/i).test(_this.agent)) {
                return 'Edge';
            } else if ((_this.window as any).ActiveXObject || 'ActiveXObject' in _this.window) {
                return 'IE';
            }
            
            console.log('未知浏览器：' + _this.agent);
            return _this.agent;
        }
    };
    public static readonly cookie: any = { // 操作Cookie
        /**
         * 设置Cookie
         * @param {string} name 名称
         * @param {string} value 值
         * @param {number} day 天数
         * @param {string} domain 域名
         * @return {void}
         */
        set: (name: string, value: string, day: number = 0, domain: string = '/'): void => {
            const _this = FN;
            let time = '' as any;
            
            if (day > 0) {
                time = new Date();
                time.setTime(time + day * 24 * 60 * 60 * 1000);
                time = 'expires=' + time.toUTCString() + ';';
            }
            
            _this.document.cookie = name + '=' + encodeURIComponent(value) + ';' + time + 'path=' + domain;
        },
        
        /**
         * 获取Cookie
         * @param {string} name 名称
         * @return {string|null} 返回value|null
         */
        get: (name: string): string | null => {
            const _this = FN,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
                value = _this.document.cookie.match(reg);
            if (value !== null) return decodeURIComponent(value[2]); else return null;
        },
        
        /**
         * 删除Cookie
         * @param {string} name 名称
         * @param {string} domain 域名
         * @return {void}
         */
        del: (name: string, domain: string = '/'): void => {
            const _this = FN,
                exp = new Date(),
                value = _this.cookie.get(name);
            
            exp.setTime(exp.getTime() - 1);
            if (value !== null) _this.document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=' + domain;
        }
    };
    public static readonly url: any = { // 操作Url
        /**
         * 获取参数值
         * @param {string} name Url参数的key
         * @param {string} url Url
         * @return {string|null} 返回Url参数的value
         */
        getParam: (name: string, url: string = FN.window.location.search.substr(1)): string | null => {
            const _this = FN,
                reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i');
            let param = null;
            
            if ((/\?/i).test(url)) url = url.split('?')[1];
            param = url.match(reg);
            
            if (param) return decodeURIComponent(param[2]); else return null;
        },
        
        /**
         * 获取全部参数值
         * @param {string} url Url
         * @return {array|null} 返回Url参数数组
         */
        getAllParam: (url: string = FN.window.location.search.substr(1)): string[] | null => {
            const _this = FN,
                param = [];
            let u = '' as any;
            
            if ((/\?/i).test(url)) u = url.split('?')[1];
            u = u.split('&');
            for (const key of u) {
                const p = u[key].split('=');
                if (p[0]) {
                    param[p[0]] = decodeURIComponent(p[1]);
                }
            }
            
            return param;
        },
        
        /**
         * 添加或修改参数
         * @param {object} object 参数一维对象
         * @param {string} url Url字符串
         * @return {string} 返回Url
         */
        addParam: (object: any, url: string = FN.window.location.href): string => {
            const _this = FN,
                href = url.split('?')[0] || '',
                hash = url.split('#')[1] || '';
            
            let search = url.split('?')[1] || '',
                param = '';
            
            if (Object.keys(object).length === 0) return url;
            
            if (hash) search = search.replace('#' + hash, '');
            
            _this.traversingObject(object, (key: string, value: string) => {
                const reg = new RegExp('(^|\\?|&)' + key + '=([^&]*)(&|$)', 'i');
                let hasParam = '' as any;
                
                if (search) hasParam = search.match(reg);
                if (hasParam) search = search.replace(hasParam[0], '');
                if (param !== '') param += '&';
                param += key + '=' + value;
            });
            
            if (search) {
                if (search[0] === '&') {
                    search = '?' + param + search;
                } else {
                    search = '?' + param + '&' + search;
                }
            } else {
                search = '?' + param;
            }
            
            if (hash) search += '#' + hash;
            
            return href + search;
        },
        
        /**
         * 删除参数
         * @param {array} array 参数数组
         * @param {string} url Url字符串
         * @return {string} 返回Url
         */
        delParam: (array: string[], url = FN.window.location.href): string => {
            const _this = FN,
                href = url.split('?')[0] || '',
                hash = url.split('#')[1] || '';
            
            let search = url.split('?')[1] || '';
            
            if (array.length === 0) return url;
            
            if (hash) search = search.replace('#' + hash, '');
            
            _this.traversingArray(array, (key: string, value: string) => {
                const reg = new RegExp('(^|\\?|&)' + value + '=([^&]*)(&|$)', 'i');
                let hasParam = '' as any;
                
                if (search) hasParam = search.match(reg);
                if (hasParam) search = search.replace(hasParam[0], '');
            });
            
            if (search) search = '?' + search;
            
            if (hash) search += '#' + hash;
            
            return href + search;
        },
        
        /**
         * 获取哈希值
         * @return {string} 返回Url的hash值
         */
        getHash: (): string => {
            const _this = FN,
                hash = decodeURIComponent(_this.window.location.hash);
            return hash.substring(1, hash.length);
        }
    };
    public static readonly rem: any = { // 操作Rem
        /**
         * 设置标准Rem
         * @param {number} psdWidth PSD宽度
         * @param {number} time 间隔时间
         * @param {boolean} scale 是否缩放
         * @return {void}
         */
        set: (psdWidth: number = 750, time: number = 300, scale: boolean = false): void => {
            const _this = FN;
            _this.resize(() => {
                const width = _this.document.documentElement.clientWidth,
                    height = _this.document.documentElement.clientHeight;
                
                let fontSize = width / psdWidth * 100;
                
                if (fontSize > 100) fontSize = 100;
                if (scale && width / height >= 0.75) fontSize = 85;
                
                _this.document.documentElement.style.fontSize = fontSize + 'px';
            }, time);
        },
        
        /**
         * 获取Rem
         * @return {number} Rem
         */
        get: (): number => {
            const _this = FN,
                size = _this.document.documentElement.style.fontSize;
            return Number(size.replace(/px/g, ''));
        }
    };
    public static readonly class: any = { // 操作Class
        /**
         * 判断是否含有Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         * @return {boolean} 是否含有Class
         */
        hasClass: (element: HTMLElement, name: string): boolean => {
            const _this = FN,
                reg = /\s/g, // 查询全局空字符串
                className = name || '';
            
            if (className.replace(reg, '').length === 0) return false;
            return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
        },
        
        /**
         * 添加Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         * @return {void}
         */
        addClass: (element: HTMLElement, name: string): void => {
            const _this = FN;
            if (_this.class.hasClass(element, name)) return;
            element.className = element.className === '' ? name : element.className + ' ' + name;
        },
        
        /**
         * 删除Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         * @return {void}
         */
        removeClass: (element: HTMLElement, name: string): void => {
            const _this = FN;
            
            if (!_this.class.hasClass(element, name)) return;
            
            const reg1 = /[\t\r\n]/g, // 查询空格
                reg2 = /^\s+|\s+$/g; // 查询空格
            let newClass = ' ' + element.className.replace(reg1, '') + ' ';
            
            while (newClass.indexOf(' ' + name + ' ') >= 0) {
                newClass = newClass.replace(' ' + name + ' ', ' ');
            }
            element.className = newClass.replace(reg2, '');
        }
    };
    public static readonly calc: any = { // 精准计算
        /**
         * 加法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        add: (n1: number, n2: number, decimal: number): number => {
            const _this = FN,
                arg1 = n1.toString(),
                arg2 = n2.toString(),
                arg1Arr = arg1.split('.'),
                arg2Arr = arg2.split('.'),
                d1 = arg1Arr.length === 2 ? arg1Arr[1] : '',
                d2 = arg2Arr.length === 2 ? arg2Arr[1] : '',
                maxLen = Math.max(d1.length, d2.length),
                m = Math.pow(10, maxLen),
                result = Number(((n1 * m + n2 * m) / m).toFixed(maxLen));
            
            return Number(result.toFixed(decimal));
        },
        
        /**
         * 减法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        sub: (n1: number, n2: number, decimal: number): number => {
            const _this = FN;
            return _this.calc.add(n1, -Number(n2), decimal);
        },
        
        /**
         * 乘法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        mul: (n1: number, n2: number, decimal: number): number => {
            const _this = FN,
                r1 = n1.toString(),
                r2 = n2.toString(),
                m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) +
                    (r2.split('.')[1] ? r2.split('.')[1].length : 0),
                result = Number(r1.replace('.', '')) *
                    Number(r2.replace('.', '')) /
                    Math.pow(10, m);
            
            return Number(result.toFixed(decimal));
        },
        
        /**
         * 除法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        div: (n1: number, n2: number, decimal: number): number => {
            const _this = FN,
                r1 = n1.toString(),
                r2 = n2.toString(),
                m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) -
                    (r1.split('.')[1] ? r1.split('.')[1].length : 0),
                result = Number(r1.replace('.', '')) /
                    Number(r2.replace('.', '')) *
                    Math.pow(10, m);
            
            return Number(result.toFixed(decimal));
        }
    };
    
    /**
     * 获取数据类型
     * @param {*} param 参数
     * @return {string} 数据类型
     */
    public static getRawType(param: any): string {
        const _this = this;
        return Object.prototype.toString.call(param).slice(8, -1);
    }
    
    /**
     * 获取时间
     * @param {number|string} time 标准时间
     * @return {string} 返回时间字符串
     */
    public static getTime(time: number | string = ''): string {
        const _this = this;
        
        let t = null;
        
        if (time) {
            t = new Date(time);
        } else {
            t = new Date();
        }
        
        const year = t.getFullYear();
        
        let month = (t.getMonth() + 1).toString(),
            date = t.getDate().toString(),
            hour = t.getHours().toString(),
            minute = t.getMinutes().toString();
        
        if (month.length < 2) month = '0' + month;
        if (date.length < 2) date = '0' + date;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;
        
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    }
    
    /**
     * 获取随机整数
     * @param {number} n1 范围1
     * @param {number} n2 范围2
     * @return {number} 返回随机数
     */
    public static getRandomInt(n1: number, n2: number): number {
        const _this = this;
        return Math.floor(Math.random() * (n2 - n1 + 1) + n1);
    }
    
    /**
     * 取消对象关联
     * @param {object} object 对象
     * @return {object} 新对象
     */
    public static unlinkObject(object: Object): Object {
        const _this = this;
        return JSON.parse(JSON.stringify(object));
    }
    
    /**
     * 遍历数组
     * @param {array} array 数组
     * @param {function} callback 回调
     * @return {void}
     */
    public static traversingArray(array: any[], callback: Function): void {
        const _this = this;
        for (const key of array) {
            callback(key, array[key]);
        }
    }
    
    /**
     * 遍历对象
     * @param {object} object 对象
     * @param {function} callback 回调
     * @return {void}
     */
    public static traversingObject(object: any, callback: Function): void {
        const _this = this;
        for (const key in object) {
            callback(key, object[key]);
        }
    }
    
    /**
     * 排序数组
     * @param {array} array 数组
     * @param {string} name 根据属性名称排序（只对对象数组有效）
     * @return {array} 返回排序后数组
     */
    public static sortArray(array: any[], name?: string): any[] {
        const _this = this;
        
        if (array.length === 0) return [];
        
        if (!(array[0] instanceof Object) || !name) return array.sort() // 非对象数组
        
        return array.sort((x, y) => {
            return x[name] > y[name] ? 1 : -1;
        });
    }
    
    /**
     * 乱序数组
     * @param {array} array 数组
     * @return {array} 返回乱序后数组
     */
    public static randomArray(array: any[]): any[] {
        const _this = this;
        return array.sort((x, y) => {
            return Math.random() > 0.5 ? -1 : 1;
        });
    }
    
    /**
     * 数组去重
     * @param {array} array 数组
     * @return {array} 新数组
     */
    public static uniqArray(array: any[]): any[] {
        const _this = this,
            newArray = [],
            length = array.length;
        
        for (let i = 0; i < length; i++) {
            for (let j = i + 1; j < length; j++) {
                if (array[i] === array[j]) {
                    i++;
                    j = i;
                }
            }
            newArray.push(array[i]);
        }
        
        return newArray;
    }
    
    /**
     * 记忆函数
     * @param {function} callback 回调
     * @return {function} 记忆函数
     */
    public static cached(callback: Function): Function {
        const _this = this;
        let cache: any = null;
        return (param: any) => {
            !cache && (cache = callback(param));
            return cache;
        }
    }
    
    /**
     * 监听滑轮事件
     * @param {string} id 节点id
     * @param {object} config 上下滚动回调
     * @return {void}
     */
    public static scroll(id: string, config?: {
        topCallback?: Function,
        bottomCallback?: Function
    }): void {
        const _this = this,
            dom = _this.document.getElementById(id),
            scrollFun = (e: Event) => { // 判断方向
                const event = e as any;
                
                let detail = 0;
                
                if (_this.isPSB.system() === 'Mac') detail = 30; // Mac兼容,降低灵敏度
                
                if (!config) return;
                
                if (event.wheelDelta) { // 默认
                    if (event.wheelDelta > detail && config.topCallback) config.topCallback(); // 当滑轮向上滚动时
                    if (event.wheelDelta < -detail && config.bottomCallback) config.bottomCallback(); // 当滑轮向下滚动时
                } else if (event.detail) { // Firefox兼容
                    if (event.detail > detail && config.bottomCallback) config.bottomCallback(); // 当滑轮向上滚动时
                    if (event.detail < -detail && config.topCallback) config.topCallback(); // 当滑轮向下滚动时
                }
            }
        
        let type = 'mousewheel';
        if (_this.isPSB.browser() === 'Firefox') type = 'DOMMouseScroll';
        dom && dom.addEventListener(type, scrollFun, false);
    }
    
    /**
     * 监听屏幕变化
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     * @return {void}
     */
    public static resize(callback: Function, time: number = 300): void {
        const _this = this;
        let resizeSetTime = 0;
        
        callback();
        
        // 监听屏幕
        _this.window.addEventListener('onorientationchange' in _this.window ? 'orientationchange' : 'resize', () => {
            clearTimeout(resizeSetTime);
            resizeSetTime = setTimeout(callback, time);
        }, false);
        _this.window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                clearTimeout(resizeSetTime);
                resizeSetTime = setTimeout(callback, time);
            }
        }, false);
    }
    
    /**
     * 元素添加Transform
     * @param {HTMLElement} element JQuery对象
     * @param {string} style 样式字符串
     * @return {void}
     */
    public static transform(element: HTMLElement, style: string): void {
        const _this = this;
        element.style.setProperty('-webkit-transform', style);
        element.style.setProperty('-moz-transform', style);
        element.style.setProperty('-o-transform', style);
        element.style.setProperty('-ms-transform', style);
        element.style.setProperty('transform', style);
    }
    
    /**
     * 当前域名内跳转携带Url参数
     * @return {void}
     */
    public static linkAddParam(): void {
        const _this = this,
            array = _this.document.getElementsByTagName('a'),
            length = array.length;
        
        for (let i = 0; i < length; i++) {
            array[i].addEventListener('click', () => {
                const a = array[i];
                
                let src = '',
                    href = a.getAttribute('href') as any;
                
                // 忽略非跳转链接
                if (href.indexOf('void(0)') !== -1) return;
                
                // 忽略非跳转当前域名链接
                if ((href.indexOf('http://') > -1 ||
                    href.indexOf('https://') > -1) &&
                    href.indexOf(_this.window.location.hostname) === -1) {
                    return;
                }
                
                // 添加Hash
                href = href.split('#');
                if (href.length > 1) {
                    src = href[0] + _this.window.location.search + '#' + href[1];
                } else {
                    src = href[0] + _this.window.location.search;
                }
                
                a.setAttribute('href', src);
            }, false);
        }
    }
    
    /**
     * 禁用Console
     * @param {'log'|'assert'|'warn'|'error'} type 类型
     * @return {void}
     */
    public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void {
        const _this = this;
        console[type] = () => {
        };
    }
}
