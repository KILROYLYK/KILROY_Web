"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var jquery_1 = __importDefault(require("/usr/local/lib/node_modules/jquery"));
var W = window, D = document, $W = jquery_1.default(W);
/**
 * 函数
 */
var FN = /** @class */ (function () {
    function FN() {
    }
    /**
     * 获取数据类型
     * @param {*} param 参数
     * @return {string} 数据类型
     */
    FN.getType = function (param) {
        var _this = this;
        return Object.prototype.toString.call(param).slice(8, -1);
    };
    /**
     * 获取当前Rem
     * @return {number} rem
     */
    FN.getRem = function () {
        var _this = this, reg = /px/g, size = jquery_1.default('html').css('font-size');
        return Number(size.replace(reg, ''));
    };
    /**
     * 记忆函数
     * @param {function} callback 回调
     * @return {function} 记忆函数
     */
    FN.cached = function (callback) {
        var _this = this;
        var cache = null;
        return function (param) {
            !cache && (cache = callback(param));
            return cache;
        };
    };
    /**
     * 监听屏幕变化
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     */
    FN.resize = function (callback, time) {
        if (time === void 0) { time = 150; }
        var _this = this, resize = function () {
            if (setTime)
                clearTimeout(setTime);
            setTime = setTimeout(callback, time);
        };
        var setTime = null;
        resize();
        $W.bind('pageshow', function (e) {
            if (e.persisted)
                resize();
        }); // 屏幕显示
        $W.bind('resize', resize); // 屏幕尺寸变化
        'onorientationchange' in W && $W.bind('orientationchange', resize); // 屏幕旋转
    };
    /**
     * 监听陀螺仪
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     */
    FN.gyroscope = function (callback, time) {
        if (time === void 0) { time = 50; }
        var _this = this;
        var openGyroscope = true, setTime = null;
        'DeviceOrientation' in W && $W.bind('deviceorientation', function (e) {
            if (!openGyroscope)
                return;
            openGyroscope = false;
            setTime = setTimeout(function () {
                openGyroscope = true;
            }, time);
            callback({
                absolute: e.absolute,
                alpha: parseInt(String(e.alpha), 10),
                beta: parseInt(String(e.beta), 10),
                gamma: parseInt(String(e.gamma), 10)
            });
        });
    };
    /**
     * 监听滑轮事件
     * @param {$} $dom Jquery节点
     * @param {*} callback 回调
     * @param {number} time 间隔时间
     */
    FN.scroll = function ($dom, callback, time) {
        if (callback === void 0) { callback = {}; }
        if (time === void 0) { time = 50; }
        var _this = this, detail = _this.agent.system() === 'Mac' ? 30 : 0; // Mac兼容,降低灵敏度
        var openScroll = true, setTime = null;
        $dom.bind(_this.agent.browser() === 'Firefox' ? 'DOMMouseScroll' : 'mousewheel', function (e) {
            if (!openScroll)
                return;
            openScroll = false;
            setTime = setTimeout(function () {
                openScroll = true;
            }, time);
            callback.complete && callback.complete();
            if (e.wheelDelta) { // 默认
                if (e.wheelDelta > detail)
                    callback.top && callback.top(); // 当滑轮向上滚动时
                if (e.wheelDelta < -detail)
                    callback.bottom && callback.bottom(); // 当滑轮向下滚动时
            }
            else if (e.detail) { // Firefox兼容
                if (e.detail > detail)
                    callback.bottom && callback.bottom(); // 当滑轮向上滚动时
                if (e.detail < -detail)
                    callback.top && callback.top(); // 当滑轮向下滚动时
            }
        });
    };
    /**
     * 监听长按
     * @param {$} $dom Jquery节点
     * @param {function} callback
     * @param {number} time
     */
    FN.press = function ($dom, callback, time) {
        if (time === void 0) { time = 500; }
        var _this = this;
        var setTime = null;
        var startCallback = function (e) {
            setTime = setTimeout(function () {
                clearTimeout(setTime);
                callback();
            }, 500);
        }, endCallback = function (e) {
            clearTimeout(setTime);
        };
        if (_this.agent.client() === "PC") {
            $dom.bind('mousedown', startCallback);
            $dom.bind('mouseup', endCallback);
        }
        else {
            $dom.bind('touchstart', startCallback);
            $dom.bind('touchend', endCallback);
        }
    };
    /**
     * 内链跳转保留参数
     */
    FN.innerChainSaveParam = function () {
        var _this = this, reg = {
            void: 'void(0)',
            http: 'http://',
            https: 'https://'
        }, $aList = jquery_1.default('a');
        var _loop_1 = function (i, n) {
            var a = $aList[i], $a = jquery_1.default(a), href = $a.attr('href');
            if (href.indexOf(reg.void) !== -1)
                return { value: void 0 }; // 忽略非跳转链接
            if ((href.indexOf(reg.http) > -1 ||
                href.indexOf(reg.https) > -1) &&
                href.indexOf(W.location.hostname) === -1) { // 忽略外链
                return { value: void 0 };
            }
            $a.click(function () {
                var hash = href.split('#');
                var src = '';
                if (href.length > 1) {
                    src = hash[0] + W.location.search + '#' + hash[1];
                }
                else {
                    src = hash[0] + W.location.search;
                }
                $a.attr('href', src);
            });
        };
        for (var i = 0, n = $aList.length; i < n; i++) {
            var state_1 = _loop_1(i, n);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    /**
     * 禁用Console
     * @param {'log'|'assert'|'warn'|'error'} type 类型
     */
    FN.disableConsole = function (type) {
        var _this = this;
        console[type] = function () {
            return;
        };
    };
    FN.calc = {
        /**
         * 加法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        add: function (n1, n2, decimal) {
            var _this = FN, arg1 = n1.toString(), arg2 = n2.toString(), arg1Arr = arg1.split('.'), arg2Arr = arg2.split('.'), d1 = arg1Arr.length === 2 ? arg1Arr[1] : '', d2 = arg2Arr.length === 2 ? arg2Arr[1] : '', maxLen = Math.max(d1.length, d2.length), m = Math.pow(10, maxLen), result = Number(((n1 * m + n2 * m) / m).toFixed(maxLen));
            return Number(result.toFixed(decimal));
        },
        /**
         * 减法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        sub: function (n1, n2, decimal) {
            var _this = FN;
            return _this.calc.add(n1, -Number(n2), decimal);
        },
        /**
         * 乘法
         * @param {number} n1 数字1
         * @param {number} n2 数字2
         * @param {number} decimal 小数位数
         * @return {number} 结果
         */
        mul: function (n1, n2, decimal) {
            var _this = FN, r1 = n1.toString(), r2 = n2.toString(), m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) +
                (r2.split('.')[1] ? r2.split('.')[1].length : 0), result = Number(r1.replace('.', '')) *
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
        div: function (n1, n2, decimal) {
            var _this = FN, r1 = n1.toString(), r2 = n2.toString(), m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) -
                (r1.split('.')[1] ? r1.split('.')[1].length : 0), result = Number(r1.replace('.', '')) /
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
        random: function (r1, r2) {
            var _this = FN;
            return Math.floor(Math.random() * (r2 - r1 + 1) + r1);
        },
        /**
         * 获取概率下标
         * @param {ProbabilityConfig[]} range 范围数组
         * @return {number|null} 返回随机数
         */
        probability: function (range) {
            var _this = FN, random = Math.random();
            for (var i = 0, n = range.length; i < n; i++) {
                if (random >= range[i].min && (range[i].max === 1 ? random <= 1 : random < range[i].max))
                    return i;
            }
            return null;
        },
        /**
         * 初始化概率数组
         * @param {string} name 概率值名称
         * @param {any[]} data 数据数组
         * @return {ProbabilityConfig[]} 概率数组
         */
        initProbability: function (name, data) {
            var _this = FN, list = [];
            var max = 0, probability = 0;
            data.forEach(function (v, i, a) {
                max += v[name];
            });
            data.forEach(function (v, i, a) {
                var range = v[name] / max;
                list.push({
                    min: probability,
                    max: probability + range
                });
                probability += range;
            });
            return list;
        }
    };
    FN.agent = {
        /**
         * 客户端
         * @return {string} 返回客户端信息
         */
        client: function () {
            var _this = FN, reg = {
                pc: /Windows|Mac|Linux/i,
                mobile: /Mobile|Android|webOS|Windows Phone|BlackBerry|SymbianOS|\(i[^;]+;( U;)? CPU.+Mac OS X/i
            }, agent = W.navigator.userAgent.toLowerCase();
            if (reg.mobile.test(agent)) { // Mobile
                return 'Mobile';
            }
            else if (reg.pc.test(agent)) { // PC
                return 'PC';
            }
            console.log('未知平台：' + agent);
            return agent;
        },
        /**
         * 系统
         * @return {string} 返回系统信息
         */
        system: function () {
            var _this = FN, agent = W.navigator.userAgent.toLowerCase();
            if ((/Android/i).test(agent) || (/Adr/i).test(agent)) {
                return 'Android';
            }
            else if ((/\(i[^;]+;( U;)? CPU.+Mac OS X/i).test(agent)) {
                return 'iOS';
            }
            else if ((/BlackBerry/i).test(agent)) {
                return 'BlackBerry';
            }
            else if ((/SymbianOS/i).test(agent)) {
                return 'SymbianOS';
            }
            else if ((/Windows/i).test(agent)) {
                return 'Windows';
            }
            else if ((/Mac/i).test(agent)) {
                return 'Mac';
            }
            else if ((/Linux/i).test(agent)) {
                return 'Linux';
            }
            console.log('未知系统：' + agent);
            return agent;
        },
        /**
         * 浏览器
         * @return {string} 返回浏览器信息
         */
        browser: function () {
            var _this = FN, agent = W.navigator.userAgent.toLowerCase();
            if ((/Huawei/i).test(agent)) {
                // Huawei 特殊判断
                if ((/MicroMessenger/i).test(agent)) {
                    return 'WeChat';
                }
                else if ((/pixel|statusbar/i).test(agent)) {
                    return 'HuaWei';
                }
                else {
                    return 'QQBrowser';
                }
            }
            else if ((/MQQBrowser/i).test(agent)) {
                return 'QQBrowser';
            }
            else if ((/QQ/i).test(agent)) {
                return 'QQ';
            }
            else if ((/MicroMessenger/i).test(agent)) {
                return 'WeChat';
            }
            else if ((/WeiBo/).test(agent)) {
                return 'WeiBo';
            }
            else if ((/Chrome/i).test(agent)) {
                return 'Chrome';
            }
            else if ((/Firefox/i).test(agent)) {
                return 'Firefox';
            }
            else if ((/Safari/i).test(agent)) {
                return 'Safari';
            }
            else if ((/Edge/i).test(agent)) {
                return 'Edge';
            }
            else if (W.ActiveXObject || 'ActiveXObject' in W) {
                return 'IE';
            }
            console.log('未知浏览器：' + agent);
            return agent;
        }
    };
    FN.cookie = {
        /**
         * 设置Cookie
         * @param {string} name 名称
         * @param {string} value 值
         * @param {number} day 天数
         * @param {string} domain 域名
         */
        set: function (name, value, day, domain) {
            if (day === void 0) { day = 0; }
            if (domain === void 0) { domain = '/'; }
            var _this = FN;
            var time = '';
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
        get: function (name) {
            var _this = FN, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'), value = D.cookie.match(reg);
            if (value !== null)
                return decodeURIComponent(value[2]);
            else
                return null;
        },
        /**
         * 删除Cookie
         * @param {string} name 名称
         * @param {string} domain 域名
         */
        del: function (name, domain) {
            if (domain === void 0) { domain = '/'; }
            var _this = FN, exp = new Date(), value = _this.cookie.get(name);
            exp.setTime(exp.getTime() - 1);
            if (value !== null)
                D.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=' + domain;
        }
    };
    FN.url = {
        /**
         * 参数化
         * @param {*} o 对象
         * @param {boolean} hasQuestion 是否添加？
         * @return {string} 参数
         */
        toParam: function (o, hasQuestion) {
            if (hasQuestion === void 0) { hasQuestion = false; }
            var _this = FN;
            var param = '';
            for (var key in o)
                param += (param === '' ? '' : '&') + key + '=' + o[key];
            return hasQuestion ? '?' + param : param;
        },
        /**
         * 获取参数值
         * @param {string} name Url参数的key
         * @param {string} url Url
         * @return {string|null} 返回Url参数的value
         */
        getParam: function (name, url) {
            if (url === void 0) { url = W.location.search.substr(1); }
            var _this = FN, reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i');
            var param = null;
            if ((/\?/i).test(url))
                url = url.split('?')[1];
            param = url.match(reg);
            if (param)
                return decodeURIComponent(param[2]);
            else
                return null;
        },
        /**
         * 获取全部参数值
         * @param {string} url Url
         * @return {array|null} 返回Url参数数组
         */
        getAllParam: function (url) {
            if (url === void 0) { url = W.location.search.substr(1); }
            var _this = FN, param = {};
            var u = '';
            if (!url)
                return param;
            if ((/\?/i).test(url))
                u = url.split('?')[1];
            if (!u)
                return param;
            u = u.split('&');
            _this.array.traversing(u, function (key, value) {
                var p = value.split('=');
                if (p[0])
                    param[p[0]] = decodeURIComponent(p[1]);
            });
            return param;
        },
        /**
         * 添加或修改参数
         * @param {*} o 参数一维对象
         * @param {string} url Url字符串
         * @return {string} 返回Url
         */
        addParam: function (o, url) {
            if (url === void 0) { url = W.location.href; }
            var _this = FN, href = url.split('?')[0] || '', hash = url.split('#')[1] || '';
            var search = url.split('?')[1] || '', param = '';
            if (Object.keys(o).length === 0)
                return url;
            if (hash)
                search = search.replace('#' + hash, '');
            _this.object.traversing(o, function (key, value) {
                var reg = new RegExp('(^|\\?|&)' + key + '=([^&]*)(&|$)', 'i');
                var hasParam = '';
                if (search)
                    hasParam = search.match(reg);
                if (hasParam)
                    search = search.replace(hasParam[0], '');
                if (param !== '')
                    param += '&';
                param += key + '=' + value;
            });
            if (search) {
                if (search[0] === '&') {
                    search = '?' + param + search;
                }
                else {
                    search = '?' + param + '&' + search;
                }
            }
            else {
                search = '?' + param;
            }
            if (hash)
                search += '#' + hash;
            return href + search;
        },
        /**
         * 删除参数
         * @param {array} array 参数数组
         * @param {string} url Url字符串
         * @return {string} 返回Url
         */
        delParam: function (array, url) {
            if (url === void 0) { url = W.location.href; }
            var _this = FN, href = url.split('?')[0] || '', hash = url.split('#')[1] || '';
            var search = url.split('?')[1] || '';
            if (array.length === 0)
                return url;
            if (hash)
                search = search.replace('#' + hash, '');
            _this.array.traversing(array, function (key, value) {
                var reg = new RegExp('(^|\\?|&)' + value + '=([^&]*)(&|$)', 'i');
                var hasParam = '';
                if (search)
                    hasParam = search.match(reg);
                if (hasParam)
                    search = search.replace(hasParam[0], '');
            });
            if (search)
                search = '?' + search;
            if (hash)
                search += '#' + hash;
            return href + search;
        },
        /**
         * 获取哈希值
         * @return {string} 返回Url的hash值
         */
        getHash: function () {
            var _this = FN, hash = decodeURIComponent(W.location.hash);
            return hash.substring(1, hash.length);
        }
    };
    FN.array = {
        /**
         * 遍历
         * @param {array} array 数组
         * @param {function} callback 回调
         */
        traversing: function (array, callback) {
            var _this = FN;
            for (var i = 0, n = array.length; i < n; i++)
                callback(i, array[i]);
        },
        /**
         * 排序
         * @param {array} array 数组
         * @param {string} name 根据属性名称排序（只对对象数组有效）
         * @return {array} 返回排序后数组
         */
        sort: function (array, name) {
            var _this = FN;
            if (array.length === 0)
                return [];
            if (!(array[0] instanceof Object) || !name)
                return array.sort(); // 非对象数组
            return array.sort(function (x, y) {
                return x[name] > y[name] ? 1 : -1;
            });
        },
        /**
         * 乱序
         * @param {array} array 数组
         * @return {array} 返回乱序后数组
         */
        random: function (array) {
            var _this = FN;
            return array.sort(function (x, y) {
                return Math.random() > 0.5 ? -1 : 1;
            });
        },
        /**
         * 去重
         * @param {array} array 数组
         * @return {array} 新数组
         */
        uniq: function (array) {
            var _this = FN, newArray = [], length = array.length;
            for (var i = 0; i < length; i++) {
                for (var j = i + 1; j < length; j++) {
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
    FN.object = {
        /**
         * 遍历
         * @param {*} o 对象
         * @param {function} callback 回调
         */
        traversing: function (o, callback) {
            var _this = FN;
            for (var key in o)
                callback(key, o[key]);
        },
        /**
         * 排序
         * @param {*} o 对象
         * @return {*} 返回排序后对象
         */
        sort: function (o) {
            var _this = FN, newObject = {};
            Object.keys(o).sort()
                .forEach(function (key) {
                newObject[key] = o[key];
            });
            return newObject;
        },
        /**
         * 复制
         * @param {*} o 对象
         * @return {*} 新建的对象
         */
        copy: function (o) {
            var _this = FN;
            return JSON.parse(JSON.stringify(o));
        },
        /**
         * 数组化
         * 将可枚举属性转为数组
         * @param {*} o 对象
         * @return {{key:string,value:*}[]} 由key和value组成的数组
         */
        toArray: function (o) {
            var _this = FN, newArray = [];
            Object.keys(o).forEach(function (v) {
                newArray.push({ key: v, value: o[v] });
            });
            return newArray;
        }
    };
    FN.time = {
        /**
         * 获取时间戳
         * @param {number|string} time 标准时间
         * @return {number} 时间戳
         */
        getStamp: function (time) {
            if (time === void 0) { time = ''; }
            var _this = FN;
            return Date.parse((time !== '' ? new Date(time) : new Date()).toString()) / 1000;
        },
        /**
         * 获取时间
         * @param {number|string} time 标准时间
         * @return {string} 返回时间字符串
         */
        getFormat: function (time) {
            if (time === void 0) { time = ''; }
            var _this = FN;
            var t = null;
            if (time) {
                t = new Date(time);
            }
            else {
                t = new Date();
            }
            var year = t.getFullYear();
            var month = (t.getMonth() + 1).toString(), date = t.getDate().toString(), hour = t.getHours().toString(), minute = t.getMinutes().toString();
            if (month.length < 2)
                month = '0' + month;
            if (date.length < 2)
                date = '0' + date;
            if (hour.length < 2)
                hour = '0' + hour;
            if (minute.length < 2)
                minute = '0' + minute;
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
        }
    };
    FN.dom = {
        /**
         * 判断是否含有Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         * @return {boolean} 是否含有Class
         */
        hasClass: function (element, name) {
            var _this = FN, reg = /\s/g, // 查询全局空字符串
            className = name || '';
            if (className.replace(reg, '').length === 0)
                return false;
            return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
        },
        /**
         * 添加Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         */
        addClass: function (element, name) {
            var _this = FN;
            if (_this.dom.hasClass(element, name))
                return;
            element.className = element.className === '' ? name : element.className + ' ' + name;
        },
        /**
         * 删除Class
         * @param {HTMLElement} element 元素
         * @param {string} name 类名
         */
        removeClass: function (element, name) {
            var _this = FN, reg1 = /[\t\r\n]/g, // 查询空格
            reg2 = /^\s+|\s+$/g; // 查询空格
            if (!_this.dom.hasClass(element, name))
                return;
            var newClass = ' ' + element.className.replace(reg1, '') + ' ';
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
        setTransform: function ($dom, style) {
            var _this = FN;
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
        getTransform: function ($dom) {
            var _this = FN, reg = /[^0-9\-,]/g, matrix = $dom.css('transform').replace(reg, '').split(',');
            return {
                x: parseFloat(matrix[4]) || 0,
                y: parseFloat(matrix[5]) || 0
            };
        }
    };
    FN.image = {
        /**
         * 判断是否是图片
         * @param {string} name 图片名称
         * @return {boolean} 是否是图片
         */
        is: function (name) {
            var _this = FN, reg = /^.+(\.jpg|\.jpeg|\.png)$/i;
            return reg.test(name);
        },
        /**
         * 获取图片尺寸
         * @param {string} src 资源地址
         * @param {Function} callback 回调
         */
        size: function (src, callback) {
            var _this = FN, image = new Image();
            image.onload = function () {
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
        get: function (src, callback, size) {
            if (size === void 0) { size = 0; }
            var _this = FN, image = new Image(), canvas = D.createElement('canvas'), context = canvas.getContext('2d');
            image.crossOrigin = '*';
            image.onload = function () {
                var width = image.width, height = image.height, ratio = 0;
                if (size > 0) {
                    ratio = width / height;
                    if (width > height) {
                        width = size;
                        height = width / ratio;
                    }
                    else if (width < height) {
                        height = size;
                        width = height * ratio;
                    }
                    else {
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
    FN.file = {
        /**
         * 获取文件Base64
         * @param {File|Blob} file 文件
         * @param {Function} callback 回调
         */
        get: function (file, callback) {
            var _this = FN, reader = new FileReader();
            reader.onload = function (e) {
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
        createFile: function (src, name) {
            var json = src.split(','), type = json[0].match(/:(.*?);/)[1], content = atob(json[1]), data = new Uint8Array(content.length);
            var n = content.length;
            while (n--)
                data[n] = content.charCodeAt(n);
            return new File([data], name, { type: type });
        },
        /**
         * 创建文件
         * @param {string} src 资源地址
         * @return {Blob} 文件对象
         */
        createBlob: function (src) {
            var json = src.split(','), type = json[0].match(/:(.*?);/)[1], content = atob(json[1]), data = new Uint8Array(content.length);
            for (var i = 0, n = content.length; i < n; i++)
                data[i] = content.charCodeAt(i);
            return new Blob([data], { type: type });
        }
    };
    return FN;
}());
exports.default = FN;
//# sourceMappingURL=function.js.map