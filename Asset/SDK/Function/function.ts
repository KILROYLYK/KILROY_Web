// @ts-ignore
import $ from '/usr/local/lib/node_modules/jquery';

const W: Window = window,
    D: Document = document,
    $W: typeof $ = $(W);

export interface ProbabilityConfig { // 概率配置
    min: number; // 范围最小值
    max: number; // 范围最大值
}

/**
 * 函数
 */
export default class FN {
    public static readonly calc: any = { // 精准计算
        /**
         * 加法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        add(n1: number, n2: number, decimal: number): number {
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
        sub(n1: number, n2: number, decimal: number): number {
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
        mul(n1: number, n2: number, decimal: number): number {
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
        div(n1: number, n2: number, decimal: number): number {
            const _this = FN,
                r1 = n1.toString(),
                r2 = n2.toString(),
                m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) -
                    (r1.split('.')[1] ? r1.split('.')[1].length : 0),
                result = Number(r1.replace('.', '')) /
                    Number(r2.replace('.', '')) *
                    Math.pow(10, m);
            
            return Number(result.toFixed(decimal));
        },
        
        /**
         * 获取随机数
         * @param {number} r1 范围1
         * @param {number} r2 范围2
         * @return {number} 返回随机数
         */
        random(r1: number, r2: number): number {
            const _this = FN;
            
            return Math.floor(Math.random() * (r2 - r1 + 1) + r1);
        },
        
        /**
         * 获取概率下标
         * @param {ProbabilityConfig[]} range 范围数组
         * @return {number|null} 返回随机数
         */
        probability(range: ProbabilityConfig[]): any {
            const _this = FN,
                random = Math.random();
            
            for (let i = 0, n = range.length; i < n; i++) {
                if (random >= range[i].min && (range[i].max === 1 ? random <= 1 : random < range[i].max)) return i;
            }
            
            return null;
        },
        
        /**
         * 初始化概率数组
         * @param {string} name 概率值名称
         * @param {any[]} data 数据数组
         * @return {ProbabilityConfig[]} 概率数组
         */
        initProbability(name: string, data: any[]): ProbabilityConfig[] {
            const _this = FN,
                list = [] as ProbabilityConfig[];
            
            let max = 0,
                probability = 0;
            
            data.forEach((v: any, i: number, a: any[]) => {
                max += v[name];
            });
            data.forEach((v: any, i: number, a: any[]) => {
                const range = v[name] / max;
                
                list.push({
                    min: probability,
                    max: probability + range
                });
                
                probability += range;
            });
            
            return list;
        }
    };
    public static readonly agent: any = { // 代理信息
        /**
         * 客户端
         * @return {string} 返回客户端信息
         */
        client(): string {
            const _this = FN,
                reg = {
                    pc: /Windows|Mac|Linux/i,
                    mobile: /Mobile|Android|webOS|Windows Phone|BlackBerry|SymbianOS|\(i[^;]+;( U;)? CPU.+Mac OS X/i
                },
                agent = W.navigator.userAgent.toLowerCase();
            
            if (reg.mobile.test(agent)) { // Mobile
                return 'Mobile';
            } else if (reg.pc.test(agent)) { // PC
                return 'PC';
            }
            
            console.log('未知平台：' + agent);
            return agent;
        },
        
        /**
         * 系统
         * @return {string} 返回系统信息
         */
        system(): string {
            const _this = FN,
                agent = W.navigator.userAgent.toLowerCase();
            
            if ((/Android/i).test(agent) || (/Adr/i).test(agent)) {
                return 'Android';
            } else if ((/\(i[^;]+;( U;)? CPU.+Mac OS X/i).test(agent)) {
                return 'iOS';
            } else if ((/BlackBerry/i).test(agent)) {
                return 'BlackBerry';
            } else if ((/SymbianOS/i).test(agent)) {
                return 'SymbianOS';
            } else if ((/Windows/i).test(agent)) {
                return 'Windows';
            } else if ((/Mac/i).test(agent)) {
                return 'Mac';
            } else if ((/Linux/i).test(agent)) {
                return 'Linux';
            }
            
            console.log('未知系统：' + agent);
            return agent;
        },
        
        /**
         * 浏览器
         * @return {string} 返回浏览器信息
         */
        browser(): string {
            const _this = FN,
                agent = W.navigator.userAgent.toLowerCase();
            
            if ((/Huawei/i).test(agent)) {
                // Huawei 特殊判断
                if ((/MicroMessenger/i).test(agent)) {
                    return 'WeChat';
                } else if ((/pixel|statusbar/i).test(agent)) {
                    return 'HuaWei';
                } else {
                    return 'QQBrowser';
                }
            } else if ((/MQQBrowser/i).test(agent)) {
                return 'QQBrowser';
            } else if ((/QQ/i).test(agent)) {
                return 'QQ';
            } else if ((/MicroMessenger/i).test(agent)) {
                return 'WeChat';
            } else if ((/WeiBo/).test(agent)) {
                return 'WeiBo';
            } else if ((/Chrome/i).test(agent)) {
                return 'Chrome';
            } else if ((/Firefox/i).test(agent)) {
                return 'Firefox';
            } else if ((/Safari/i).test(agent)) {
                return 'Safari';
            } else if ((/Edge/i).test(agent)) {
                return 'Edge';
            } else if ((W as any).ActiveXObject || 'ActiveXObject' in W) {
                return 'IE';
            }
            
            console.log('未知浏览器：' + agent);
            return agent;
        }
    };
    public static readonly cookie: any = { // Cookie
        /**
         * 设置Cookie
         * @param {string} name 名称
         * @param {string} value 值
         * @param {number} day 天数
         * @param {string} domain 域名
         */
        set(name: string, value: string, day: number = 0, domain: string = '/'): void {
            const _this = FN;
            
            let time = '' as any;
            
            if (day > 0) {
                time = new Date();
                time.setTime(time + day * 24 * 60 * 60 * 1000);
                time = 'expires=' + time.toUTCString() + ';';
            }
            
            D.cookie = name + '=' + encodeURIComponent(value) + ';' + time + 'path=' + domain;
        },
        
        /**
         * 获取Cookie
         * @param {string} name 名称
         * @return {string|null} 返回value|null
         */
        get(name: string): string | null {
            const _this = FN,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
                value = D.cookie.match(reg);
            
            if (value !== null) return decodeURIComponent(value[2]); else return null;
        },
        
        /**
         * 删除Cookie
         * @param {string} name 名称
         * @param {string} domain 域名
         */
        del(name: string, domain: string = '/'): void {
            const _this = FN,
                exp = new Date(),
                value = _this.cookie.get(name);
            
            exp.setTime(exp.getTime() - 1);
            if (value !== null) D.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=' + domain;
        }
    };
    public static readonly url: any = { // Url
        /**
         * 参数化
         * @param {*} o 对象
         * @param {boolean} hasQuestion 是否添加？
         * @return {string} 参数
         */
        toParam(o: any, hasQuestion: boolean = false): string {
            const _this = FN;
            
            let param = '';
            
            for (const key in o) param += (param === '' ? '' : '&') + key + '=' + o[key];
            
            return hasQuestion ? '?' + param : param;
        },
        
        /**
         * 获取参数值
         * @param {string} name Url参数的key
         * @param {string} url Url
         * @return {string|null} 返回Url参数的value
         */
        getParam(name: string, url: string = W.location.search.substr(1)): string | null {
            const _this = FN,
                reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i');
            
            let param = null as any;
            
            if ((/\?/i).test(url)) url = url.split('?')[1];
            
            param = url.match(reg);
            
            if (param) return decodeURIComponent(param[2]); else return null;
        },
        
        /**
         * 获取全部参数值
         * @param {string} url Url
         * @return {array|null} 返回Url参数数组
         */
        getAllParam(url: string = W.location.search.substr(1)): any {
            const _this = FN,
                param = {} as any;
            
            let u = '' as any;
            
            if (!url) return param;
            if ((/\?/i).test(url)) u = url.split('?')[1];
            if (!u) return param;
            
            u = u.split('&');
            
            _this.array.traversing(u, (key: number, value: string) => {
                const p = value.split('=');
                if (p[0]) param[p[0]] = decodeURIComponent(p[1]);
            });
            
            return param;
        },
        
        /**
         * 添加或修改参数
         * @param {*} o 参数一维对象
         * @param {string} url Url字符串
         * @return {string} 返回Url
         */
        addParam(o: any, url: string = W.location.href): string {
            const _this = FN,
                href = url.split('?')[0] || '',
                hash = url.split('#')[1] || '';
            
            let search = url.split('?')[1] || '',
                param = '';
            
            if (Object.keys(o).length === 0) return url;
            
            if (hash) search = search.replace('#' + hash, '');
            
            _this.object.traversing(o, (key: string, value: string) => {
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
        delParam(array: string[], url = W.location.href): string {
            const _this = FN,
                href = url.split('?')[0] || '',
                hash = url.split('#')[1] || '';
            
            let search = url.split('?')[1] || '';
            
            if (array.length === 0) return url;
            
            if (hash) search = search.replace('#' + hash, '');
            
            _this.array.traversing(array, (key: string, value: string) => {
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
        getHash(): string {
            const _this = FN,
                hash = decodeURIComponent(W.location.hash);
            
            return hash.substring(1, hash.length);
        }
    };
    public static readonly array: any = { // 数组
        /**
         * 遍历
         * @param {array} array 数组
         * @param {function} callback 回调
         */
        traversing(array: any[], callback: Function): void {
            const _this = FN;
            
            for (let i = 0, n = array.length; i < n; i++) callback(i, array[i]);
        },
        
        /**
         * 排序
         * @param {array} array 数组
         * @param {string} name 根据属性名称排序（只对对象数组有效）
         * @return {array} 返回排序后数组
         */
        sort(array: any[], name?: string): any[] {
            const _this = FN;
            
            if (array.length === 0) return [];
            
            if (!(array[0] instanceof Object) || !name) return array.sort() // 非对象数组
            
            return array.sort((x, y) => {
                return x[name] > y[name] ? 1 : -1;
            });
        },
        
        /**
         * 乱序
         * @param {array} array 数组
         * @return {array} 返回乱序后数组
         */
        random(array: any[]): any[] {
            const _this = FN;
            
            return array.sort((x, y) => {
                return Math.random() > 0.5 ? -1 : 1;
            });
        },
        
        /**
         * 去重
         * @param {array} array 数组
         * @return {array} 新数组
         */
        uniq(array: any[]): any[] {
            const _this = FN,
                newArray = [] as any[],
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
    };
    public static readonly object: any = { // 对象
        /**
         * 遍历
         * @param {*} o 对象
         * @param {function} callback 回调
         */
        traversing(o: any, callback: Function): void {
            const _this = FN;
            
            for (const key in o) callback(key, o[key]);
        },
        
        /**
         * 排序
         * @param {*} o 对象
         * @return {*} 返回排序后对象
         */
        sort(o: any): any {
            const _this = FN,
                newObject: any = {};
            
            Object.keys(o).sort()
                .forEach((key: string) => {
                    newObject[key] = o[key];
                });
            
            return newObject;
        },
        
        /**
         * 复制
         * @param {*} o 对象
         * @return {*} 新建的对象
         */
        copy(o: any): any {
            const _this = FN;
            
            return JSON.parse(JSON.stringify(o));
        },
        
        /**
         * 数组化
         * 将可枚举属性转为数组
         * @param {*} o 对象
         * @return {{key:string,value:*}[]} 由key和value组成的数组
         */
        toArray(o: any): { key: string, value: any }[] {
            const _this = FN,
                newArray: { key: string, value: any }[] = [];
            
            Object.keys(o).forEach((v: string) => {
                newArray.push({ key: v, value: o[v] });
            });
            
            return newArray;
        }
    };
    public static readonly time: any = { // 时间
        /**
         * 获取时间戳
         * @param {number|string} time 标准时间
         * @return {number} 时间戳
         */
        getStamp(time: number | string = ''): number {
            const _this = FN;
            
            return Date.parse((time !== '' ? new Date(time) : new Date()).toString()) / 1000;
        },
        
        /**
         * 获取时间
         * @param {number|string} time 标准时间
         * @return {string} 返回时间字符串
         */
        getFormat(time: number | string = ''): string {
            const _this = FN;
            
            let t = null as any;
            
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
    };
    public static readonly dom: any = { // 节点
        /**
         * 判断是否含有Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         * @return {boolean} 是否含有Class
         */
        hasClass(element: HTMLElement, name: string): boolean {
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
         */
        addClass(element: HTMLElement, name: string): void {
            const _this = FN;
            
            if (_this.dom.hasClass(element, name)) return;
            element.className = element.className === '' ? name : element.className + ' ' + name;
        },
        
        /**
         * 删除Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         */
        removeClass(element: HTMLElement, name: string): void {
            const _this = FN,
                reg1 = /[\t\r\n]/g, // 查询空格
                reg2 = /^\s+|\s+$/g; // 查询空格
            
            if (!_this.dom.hasClass(element, name)) return;
            
            let newClass = ' ' + element.className.replace(reg1, '') + ' ';
            
            while (newClass.indexOf(' ' + name + ' ') >= 0) {
                newClass = newClass.replace(' ' + name + ' ', ' ');
            }
            element.className = newClass.replace(reg2, '');
        },
        
        /**
         * 设置Transform
         * @param {*} $dom JQuery对象
         * @param {string} style 样式字符串
         */
        setTransform($dom: any, style: string): void {
            const _this = FN;
            
            $dom.css({
                '-webkit-transform': style,
                '-moz-transform': style,
                '-o-transform': style,
                '-ms-transform': style,
                transform: style
            });
        },
        
        /**
         * 获取Transform
         * @param {*} $dom JQuery对象
         * @return {*}
         */
        getTransform($dom: any): any {
            const _this = FN,
                reg = /[^0-9\-,]/g,
                matrix = $dom.css('transform').replace(reg, '').split(',');
            
            return {
                x: parseFloat(matrix[4]) || 0,
                y: parseFloat(matrix[5]) || 0
            };
        }
    };
    public static readonly image: any = { // 图片
        /**
         * 判断是否是图片
         * @param {string} name 图片名称
         * @return {boolean} 是否是图片
         */
        is(name: string): boolean {
            const _this = FN,
                reg = /^.+(\.jpg|\.jpeg|\.png)$/i;
            
            return reg.test(name);
        },
        
        /**
         * 获取图片尺寸
         * @param {string} src 资源地址
         * @param {Function} callback 回调
         */
        size(src: string, callback: Function): void {
            const _this = FN,
                image = new Image();
            
            image.onload = () => {
                callback(image.width, image.height);
            };
            image.src = src;
        },
        
        /**
         * 获取图片Base64
         * @param {string} src 资源地址
         * @param {Function} callback 回调
         * @param {number} size 最大宽高（不为0则压缩）
         */
        get(src: string, callback: Function, size: number = 0): void {
            const _this = FN,
                image = new Image(),
                canvas = D.createElement('canvas'),
                context = canvas.getContext('2d');
            
            image.crossOrigin = '*';
            image.onload = () => {
                let width = image.width,
                    height = image.height,
                    ratio = 0
                
                if (size > 0) {
                    ratio = width / height;
                    
                    if (width > height) {
                        width = size;
                        height = width / ratio;
                    } else if (width < height) {
                        height = size;
                        width = height * ratio;
                    } else {
                        width = height = size;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, 0, 0, width, height);
                callback(canvas.toDataURL('image/png'));
            };
            image.src = src;
        }
    };
    public static readonly file: any = { // 文件
        /**
         * 获取文件Base64
         * @param {File|Blob} file 文件
         * @param {Function} callback 回调
         */
        get(file: File | Blob, callback: Function): void {
            const _this = FN,
                reader = new FileReader();
            
            reader.onload = (e: ProgressEvent<FileReader>) => {
                callback(e.target);
            };
            reader.readAsDataURL(file);
        },
        
        /**
         * 创建文件
         * @param {string} src 资源地址
         * @param {string} name 文件
         * @return {File} 文件对象
         */
        createFile(src: string, name: string): File {
            const json = src.split(','),
                type = json[0].match(/:(.*?);/)[1],
                content = atob(json[1]),
                data = new Uint8Array(content.length);
            
            let n = content.length;
            
            while (n--) data[n] = content.charCodeAt(n);
            
            return new File([ data ], name, { type });
        },
        
        /**
         * 创建文件
         * @param {string} src 资源地址
         * @return {Blob} 文件对象
         */
        createBlob(src: string): Blob {
            const json = src.split(','),
                type = json[0].match(/:(.*?);/)[1],
                content = atob(json[1]),
                data = new Uint8Array(content.length);
            
            for (let i = 0, n = content.length; i < n; i++) data[i] = content.charCodeAt(i);
            
            return new Blob([ data ], { type });
        }
    };
    
    /**
     * 获取数据类型
     * @param {*} param 参数
     * @return {string} 数据类型
     */
    public static getType(param: any): string {
        const _this = this;
        
        return Object.prototype.toString.call(param).slice(8, -1);
    }
    
    /**
     * 获取当前Rem
     * @return {number} rem
     */
    public static getRem(): number {
        const _this = this,
            reg = /px/g,
            size = $('html').css('font-size');
        
        return Number(size.replace(reg, ''));
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
     * 监听屏幕变化
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     */
    public static resize(callback: Function, time: number = 150): void {
        const _this = this,
            resize = () => {
                if (setTime) clearTimeout(setTime);
                setTime = setTimeout(callback, time);
            };
        
        let setTime = null as any;
        
        resize();
        $W.bind('pageshow', (e: PageTransitionEvent) => {
            if (e.persisted) resize();
        }); // 屏幕显示
        $W.bind('resize', resize); // 屏幕尺寸变化
        'onorientationchange' in W && $W.bind('orientationchange', resize); // 屏幕旋转
    }
    
    /**
     * 监听陀螺仪
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     */
    public static gyroscope(callback: Function, time: number = 50): void {
        const _this = this;
        
        let openGyroscope = true,
            setTime = null as any;
        
        'DeviceOrientation' in W && $W.bind('deviceorientation', (e: DeviceOrientationEvent) => {
            if (!openGyroscope) return;
            openGyroscope = false;
            setTime = setTimeout(() => {
                openGyroscope = true;
            }, time);
            
            callback({
                absolute: e.absolute,
                alpha: parseInt(String(e.alpha), 10),
                beta: parseInt(String(e.beta), 10),
                gamma: parseInt(String(e.gamma), 10)
            });
        });
    }
    
    /**
     * 监听滑轮事件
     * @param {$} $dom Jquery节点
     * @param {*} callback 回调
     * @param {number} time 间隔时间
     */
    public static scroll($dom: $, callback: any = {}, time: number = 50): void {
        const _this = this,
            detail = _this.agent.system() === 'Mac' ? 30 : 0; // Mac兼容,降低灵敏度
        
        let openScroll = true,
            setTime = null as any;
        
        $dom.bind(_this.agent.browser() === 'Firefox' ? 'DOMMouseScroll' : 'mousewheel', (e: any) => {
            if (!openScroll) return;
            openScroll = false;
            setTime = setTimeout(() => {
                openScroll = true;
            }, time);
            
            callback.complete && callback.complete();
            if (e.wheelDelta) { // 默认
                if (e.wheelDelta > detail) callback.top && callback.top(); // 当滑轮向上滚动时
                if (e.wheelDelta < -detail) callback.bottom && callback.bottom(); // 当滑轮向下滚动时
            } else if (e.detail) { // Firefox兼容
                if (e.detail > detail) callback.bottom && callback.bottom(); // 当滑轮向上滚动时
                if (e.detail < -detail) callback.top && callback.top(); // 当滑轮向下滚动时
            }
        });
    }
    
    /**
     * 监听长按
     * @param {$} $dom Jquery节点
     * @param {function} callback
     * @param {number} time
     */
    public static press($dom: $, callback: Function, time: number = 500): void {
        const _this = this;
        
        let setTime: any = null;
        
        const startCallback = (e: Event) => {
                setTime = setTimeout(() => {
                    clearTimeout(setTime);
                    callback();
                }, 500);
            },
            endCallback = (e: Event) => {
                clearTimeout(setTime);
            };
        
        if (_this.agent.client() === "PC") {
            $dom.bind('mousedown', startCallback);
            $dom.bind('mouseup', endCallback);
        } else {
            $dom.bind('touchstart', startCallback);
            $dom.bind('touchend', endCallback);
        }
    }
    
    /**
     * 内链跳转保留参数
     */
    public static innerChainSaveParam(): void {
        const _this = this,
            reg = {
                void: 'void(0)',
                http: 'http://',
                https: 'https://'
            },
            $aList = $('a');
        
        for (let i = 0, n = $aList.length; i < n; i++) {
            const a = $aList[i],
                $a = $(a),
                href = $a.attr('href');
            
            if (href.indexOf(reg.void) !== -1) return; // 忽略非跳转链接
            if ((href.indexOf(reg.http) > -1 ||
                href.indexOf(reg.https) > -1) &&
                href.indexOf(W.location.hostname) === -1) { // 忽略外链
                return;
            }
            
            $a.click(() => {
                const hash = href.split('#');
                
                let src = '';
                
                if (href.length > 1) {
                    src = hash[0] + W.location.search + '#' + hash[1];
                } else {
                    src = hash[0] + W.location.search;
                }
                
                $a.attr('href', src);
            });
        }
    }
    
    /**
     * 禁用Console
     * @param {'log'|'assert'|'warn'|'error'} type 类型
     */
    public static disableConsole(type: 'log' | 'assert' | 'warn' | 'error'): void {
        const _this = this;
        
        console[type] = () => {
            return;
        };
    }
}
