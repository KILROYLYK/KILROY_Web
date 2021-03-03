# JavaScript

--------------------
## 基础知识
* 动态类型语言，具有隐式类型转换的功能
```
* 单线程：有且只有一个主线程来处理所有的任务
* 非阻塞：不停止，一直在处理
* 执行栈：执行同步任务，调用一个方法的时候，会生成一个与这个方法相对应的执行环境（包含作用域、对象和参数）
* 事件队列：执行异步任务（Ajax，SetTime）
* 作用域：一段程序代码中所用到的名字并不总是有效/可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域
```

---
### 运行流程
```
* 主线程运行的时候会生成堆（heap）和栈（stack）
* js从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中
* 当程序调用外部的API时，比如ajax、setTimeout等，会将此类异步任务挂起，继续执行执行栈中的任务，等异步任务返回结果后，再按照执行顺序排列到事件队列中
* 主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务排列到事件队列中
* 主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个过程是循环往复的，这个过程被称为"Event Loop 事件循环"
```

---
### 存储方法
```
* 底层存储的数据的数据结构都是数组
* 栈和堆既是数据结构也是内存管理方式
* 栈（stack）：线性表，静态分配和动态分配，由系统自动分配释放，效率高（地址由高到低，由小到大）
* 堆（heap）：完全二叉树，动态分配，优先使用释放内存，由程序员控制，容易产生内存泄漏，效率低（地址由低到高，不存在大小关系）
* 原始值：存储在栈中的简单数据段，也就是说，它们的值直接存储在变量访问的位置
* 引用值：存储在堆中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处
```

---
### 字段

#### 关键字
* 具有功能，不能用作变量名或函数名
```
void // 空
null // 空值
debugger // 代码断点
var // 声明变量
const // 声明不变的变量
let // 声明可变的变量
funcition // 函数
class // 类
extends // 继承
super // 调用父类的构造函数
static // 静态属性
async // 声明异步函数
await // 等待异步函数
new // 实例化
if // 如果
else // 否则
for // 循环
in // 在...中
do // 执行...
while // 循环
switch // 开关
case // 例
default // 默认例
break // 中断循环
continue // 中断一次迭代
return // 中断函数
this // 当前作用域的顶级对象
with // 设定作用域的顶级对象（性能杀手）
try // 尝试执行
catch // 捕获错误并执行
throw // 抛出错误
delete // 删除对象属性
finally // 最后
typeof // 获取类型
instanceof // 检测原型
import // 引入
export // 出口
```

#### 保留字
* 未来可能具有功能，不能用作变量名或函数名
```
abstract // 抽象
boolean // 布尔值
byte // 字节
char // 烧焦
double // 双
enum // 枚举
final // 最后
float // 浮动
goto // 去
implements // 实施
int // 整型
interface // 接口
long // 长
native // 本机
package // 包
private // 私人的
protected // 受保护的
public // 上市
short // 短
synchronized // 已同步
throws // 抛出
transient // 短暂的
volatile // 易挥发的
```

---
### 数据类型

#### 简单（基本）数据类型
||||||
|:---|:---|:---|:---|:---|
| Undefined | Null | Boolean | Number | String |
| Symbol | BigInt |

#### 复杂（引用）数据类型
||||
|:---|:---|:---|
| Array | Object | Function |

---
### 方式
```
* 遍历：循环
** for、for-in、for-of
** while、do-while
** a.sort
** a.forEach、a.map、a.every、a.some、a.filter
** a.reduce、a.reduceRight
** a.find、a.findIndex
** a.flatMap
* 递归：调用自身的函数
* 双指针：快慢指针（相同方向），对撞指针（相反方向）
* 字典：以键-值对形式存储数据的数据结构，在JS中就是Array
* 队列：只允许在表的前端删除，在表的后端插入
* 链表：（单向链表、双向链表、单向循环链表、双向循环链表）通过指针将节点连接，是非连续的动态内存空间，查找比数组慢，但是添加和删除比数组快
```

---
### 语法
```
`` 标记模板字面量 // 第一个参数的值总是包含字符串的数组，其余的参数获取的是传递的表达式的值
#* 私有变量 // class中声明属性专用
()=>{} 箭头函数（Lambda） // 没有prototype，不可以使用new，this是派生而来的，上下文定义时的this
*=>* 简写箭头函数 // 只返回一个值不必编写花括号，如果返回一个对象，必须在圆括号之内编写，否则不会返回任何值
a[b] 索引器 // 元素查找器

// 操作符
var 变量创建器 // 会变量提升，会初始化，全局或整个函数块，可重复声明
let 可变变量创建器 // 会变量提升，块级作用域变量，不可重复声明
const 不可变变量创建器 // 会变量提升，块级作用域变量，不可重复声明，本身不可改，但内部的元素或属性可改
void * // 快速返回undefined
continue 继续 // 中断循环的一个迭代，继续后续循环
break 打断 // 中断循环，继续后续代码
return 返回 // 中断当前代码
async function 异步函数 // 返回Promise
await 等待操作符 // 等待Promise
```

---
### 运算符
```
a=b 赋值运算符 // 变量分配至另一个变量时，只是复制操作，对象赋值是复制引用
...[] 扩展运算符 // 展开语法，将一个数组转为用逗号分隔的参数序列，只能放置最后
[a,b] = [c,d] 解构赋值 // 可以将属性/值从对象/数组中取出,赋值给其他变量
() 圆括号运算符 // 优先计算
a?b:c 条件运算符 // 唯一的三元运算符，如果a为真，则执行b，否则执行c
a,b 逗号操作符 // 对它的每个操作数求值（从左到右），并返回最后一个操作数的值

// 算术运算符
+|-|*|/ // 基础运算会尝试将Boolean隐式转换为Number，+号转换失败则转换为String
% 求余 // 求余运算符返回n1对n2的模（n1/n2的整型余数）
** 幂 // 幂运算符返回n1做底数，n2做指数的乘方
++/-- 递增/递减 // 当前值加1/减1，分前置运算和后置运算

// 比较运算符
== 相等
=== 严格相等
!= 不等
!== 严格不相等
> 大于
>= 大于等于
< 小于
<= 小于等于

// 逻辑运算符
a&&b 逻辑与 // a真则返回b
a||b 逻辑或 // a假则返回b
!a 逻辑非 // a真则假，a假则真
a?.b 可选链操作符 // a中有b时返回b，否则返回undefined
a??b 空值合并操作符 // a为null/undefined则返回b

// 按位运算符
* 转换为32位比特序列进行运算（二进制数）
& 与 // 都真则真
| 或 // 有真则真（n|0，可以用来取整）
^ 异或 //只有一个真则真
~ 非 // 真则假，假则真（~~对于正数，它向下取整；对于负数，向上取整）
<< 左移 // 有符号，自动丢弃被移出位
>> 右移 // 有符号，自动丢弃被移出位
>>> 无符号右移 // 自动丢弃被移出位
```

---
### 函数
```
setTimeout() // 等待s执行一次，返回一个唯一Number类型的id，第3个及之后的参数与当函数参数使用
clearTimeout() //返回undefined
setInterval() // 每隔s执行一次，返回一个唯一Number类型的id，第3个及之后的参数与当函数参数使用
clearInterval() // 返回undefined
requestAnimationFrame() // 根据屏幕刷新率执行，一般是60帧（次/秒）
eval() // 将传入的字符串当做JavaScript代码进行执行
uneval() // 创建一个代表对象的源代码的字符串
isFinite() // 判断被传入的参数值是否为一个有限数值
isNaN() // 检查是否是非数字值
parseFloat() // 解析一个参数（必要时先转换为字符串）并返回一个浮点数
parseInt() // 将一个字符串转换为进制的整数，进制为介于2-36之间的数
decodeURI() // 创建或其它流程得到的统一资源标识符（URI）
```

---
### 复杂度
```
* 大O表示法
* 时间复杂度：T(n) = O(f(n))，执行时间根据数据规模增长的一个趋势
* 空间复杂度：S(n) = O(f(n))，占用内存根据数据规模增长的一个趋势
```

--------------------
## 内置对象

---
### 数据类型对象

#### Undefined 未定义
* 一个声明未定义的变量的初始值，或没有实际参数的形式参数

#### Null 空值
* 特指对象的值未设置

#### Boolean 布尔
* 构造器：new Boolean(*)
* 只有true|false 
```
// 实例
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
```

#### Number 数字
* 构造器：new Number(*)
* 记录数字共64bit，1bit的符号位，11bit的指数部分，以及52bit的小数部分0
```
// 静态
.NaN // 非数字对象
.EPSILON // 最小间隔（2.220446049250313e-16）
.MAX_SAFE_INTEGER // 最大的安全整数（9007199254740991）
.MIN_SAFE_INTEGER // 最小的安全整数（-9007199254740991）
.MAX_VALUE // 最大数（1.7976931348623157e+308）
.MIN_VALUE // 最小数 (5e-324)
.POSITIVE_INFINITY // 正无穷
.NEGATIVE_INFINITY // 负无穷
.isNaN(n) // 判断是否是NaN
.isFinite(n) // 判断是否是有限数
.parseInt(n) // 返回整数
.parseFloat(n) // 返回带小数的数
.isInteger(n) // 判断是否是整数
.isSafeInteger(n) // 判断是否是安全整数

// 实例
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
.toFixed(n) // 返回n位小数的字符串
.toExponential(n) // 返回n位小数的指数形式的字符串
.toPrecision(n) // 返回n位小数或指数符号表示指定精度的字符串
.toLocaleString(s（语言代码：zh-CN）) // 根据地区返回转义后的字符串
```

#### String 字符
* 构造器：new String(*)
```
// 静态
String.raw(*) // 通过模板字符串创建字符串（忽略转义）
String.fromCharCode(UTF16) // 返回由指定的UTF-16代码单元序列创建的字符串
String.fromCodePoint(0x******) // 根据码点返回对应字符

// 实例
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
.charAt(n) // 返回特定位置字符
.charCodeAt(n) // 返回Unicode的值
.codePointAt(n) // 返回UTF16编码的值
.concat(...) // 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回
.startsWith(s) // 判断是否以参数开始
.endsWith(s) // 判断是否以参数结尾
.padStart(s) // 向字符串开始添加字符，使字符串达到指定的长度
.padEnd(s) // 向字符串结束添加字符，使字符串达到指定的长度
.includes(s) // 判断是否包含参数
.indexOf(s) // 返回首个参数位置，没有返回-1
.lastIndexOf(s) // 返回末尾首个参数位置，没有返回-1
.localeCompare(s) // 返回排序（1前|-1后|0相同）
.match(r) // 根据正则返回内容数组[字符串,位置,原始字符串,组]
.matchAll(r) // 根据正则返回所有匹配项
.normalize(Unicode) // 返回Unicode标准化值
.repeat(n) // n次拼接字符串
.replace(s|r) // 字符串或正则匹配并替换
.search(s|r) // 字符串或正则匹配并返回下标（n|-1）
.split(s) // 分割字符串，返回数组
.slice(startN,endN) // 提取字符串（不改变原字符串）
.substring(startN,endN) // 根据开始位置和结束位置返回字符串
.substr(startN,lengthN) // 根据开始位置和长度返回字符串
.toLowerCase() // 转换小写
.toUpperCase() // 转换大写
.toLocaleLowerCase() // 根据地区转换成小写
.toLocaleUpperCase() // 根据地区转换成大写
.trim() // 去除前后空格
.trimStart()|.trimLight() // 删除字符串开始的空格，返回新字符串
.trimEnd()|.trimRight() // 删除字符串结束的空格，返回新字符串
[symbol.iterator]()
```

#### Symbol 符号
* 构造器：Symbol(*)
* 基本数据类型，每个从Symbol()返回的symbol值都是唯一的
* symbol能作为对象属性的标识符，当key时不可枚举
```
// 静态
.hasInstance // 判断是否为某构造器的实例
.isConcatSpreadable // 用于配置某对象作为参数时是否展开其数组元素
.iterator // 定义默认的迭代器，该迭代器可以被for(of)循环
.asyncIterator // 定义默认的迭代器，该迭代器可以被forawait(of)循环
.match // 定义默认的迭代器，匹配的是正则表达式
.matchAll // 定义默认的迭代器，根据字符串生成正则表达式的匹配项
.replace // 定义默认的迭代器，当一个字符串替换所匹配字符串时所调用的方法
.search // 定义默认的迭代器，这个方法接受用户输入的正则表达式
.species // 定义默认的迭代器，其被构造函数用以创建派生对象
.split // 定义默认的迭代器，指向一个正则表达式的索引处分割字符串的方法
.toPrimitive // 定义默认的迭代器，返回undefined|null
.toStringTag // 定义默认的迭代器，返回字符串
.unscopables // 指用于指定对象值，其对象自身和继承的从关联对象的with环境绑定中排除的属性名称
.for(k) // 会根据给定的键key，来从运行时的symbol注册表中找到对应的symbol，找不到则新建
.keyFor(symbol) // 用来获取symbol注册表中与某个symbol关联的键

// 实例
.description // 返回可选描述的字符串
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
[symbol.toPrimitive]()
```

#### BigInt 整数
* 构造器：BigInt(s|n)
* 基本数据类型，范围更大的整数值
* 数字结尾添加n也可以创建BigInt
```
// 静态
.asIntN() // 将值转换为一个-2width-1与2width-1-1之间的有符号整数
.asUintN() // 将值转换为一个0和2width-1之间的无符号整数

// 实例
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
.toLocaleString(s（语言代码：zh-CN）) // 根据地区返回转义后的字符串
```

#### Array 数组
* 构造器：new Array(*)
```
// 静态
.isArray(*) // 判断是否是数组
.from(*) // 将类似数组的对象或可遍历对象转为数组
.of(*) // 根据1组参数来创建数组

// 实例
.length // 返回元素个数，总是大于数组最高项的下标
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
.toLocaleString(s（语言代码：zh-CN）...) // 根据地区返回转义后的字符串
.concat(a) // 合并，返回新数组
.copyWithin(n,startN,endN) // 把数组开始到结束的部分复制到n上
.entries() // 返回所有键值对的可迭代对象
.forEach(function(v,i,a)) // 遍历
.map(function(v,i,a)) // 遍历并执行回调，返回所有结果生成的数组
.every(function(v,i,a)) // 遍历并判断是否每个都满足需求
.some(function(v,i,a)) // 遍历并判断是否有1个满足需求
.filter(function(v,i,a)) // 遍历并将筛选出的元素组成新数组
.reduce(function(初始值,当前值,i,a)) // 从左到右遍历并将结果传入下1次回调中，第一个参数默认为累加器 
.reduceRight(function(初始值,当前值,i,a)) // 从右到左遍历并将结果传入下1次回调中，最后一个参数默认为累加器
.find(function(v)) // 遍历并返回第1个满足条件的元素，找不到返回undefined
.findIndex(function(v)）) // 遍历并返回第1个满足条件的元素的索引，找不到返回-1
.fill(*,startN,endN) // 将内部指定区间的所有元素的值都替换成某个固定的值
.flat() // 扁平化数组
.flatMap() // 先遍历，扁平化结果
.includes(*) // 判断是否包含元素
.indexOf() // 找到一个给定元素的第一个索引，如果不存在，则返回-1
.lastIndexOf() // 找到最后一个给定元素的第一个索引，如果不存在，则返回-1
.join(...) // 拼接所有子元素为字符串
.keys() // 返回所有key的可迭代对象
.values() // 返回所有value的可迭代对象
.unshift(*) // 增加到起首
.push(*) // 增加到末尾（返回长度）
.shift() // 删除起首
.pop() // 删除末尾
.sort(function(a,b)) // 根据Unicode或者回调排序
.reverse() // 倒序
.splice(startN,lengthN) // 删除若干元素
.slice(startN,lengthN) // 截取复制（无关联）
[symbol.species]
```

#### Object 对象
* 构造器：new Object(*)
* 对象默认并不是可迭代的
* 对象键自动转换为字符串，当对象自动转换为字符串化时，它变成了[Object object]
* 当设置两个对象彼此相等时，它们会通过引用进行交互
* 所有对象key都是字符串，除非对象是Symbol
* 除了基本对象（未实例化），所有对象都有原型
* 原型链终点：Object.prototype.proto === null
* 克隆对象：JSON.parse(JSON.stringify(o))（只能复制可枚举属性）
```
// 静态
.assign(o...) // 把若干对象合并到第1个对象,只有第1个对象改变，并只返回第1个
.create(o) // 使用指定的原型对象和属性创建1个新对象
.defineProperty(o,k,a) // 添加属性（默认为不可枚举）
.defineProperties(o,o) // 添加属性组
.entries(o) // 返回给定对象自身可枚举属性数组，二维数组
.fromEntries(a) //把键值对列表转换为一个对象
.getOwnPropertyDescriptor(o,k) // 返回某个属性的描述对象
.getOwnPropertyDescriptors(o) // 返回所有自身属性
.getOwnPropertyNames(o) // 获取所有属性名
.getOwnPropertySymbols(o) // 获取所有Symbol属性的数组
.setPrototypeOf(o) // 设置原型
.getPrototypeOf(o) // 获取原型
.is(*,*) // 比较，所有NaN值都相等（这与==和===不同）
.keys(o) // 返回可枚举属性名数组
.values(o) // 返回可枚举属性值数组
.isExtensible(o) // 判断对象是否可拓展
.preventExtensions(o) // 禁止拓展，无法新增
.isFrozen(o) // 判断是否冻结
.freeze(o) // 冻结，无法增删改
.isSealed(o) // 判断是否密封
.seal(o) // 密封，无法增删

// 实例
.constructor // 返回创建实例的引用
.toString() // 返回结果的字符串形式
.valueOf() // 返回结果
.isPrototypeOf(o) // 判断是否存在于另1个对象的原型链上
.hasOwnProperty() // 判断是否含有指定非原型链的属性
.propertyIsEnumerable() // 判断指定属性是否可以枚举
.toLocaleString() // 返回一个该对象的字符串表示
delete .* // 删除对象的某个属性
```

#### Function 函数
* 构造器：new Function(s...)
* Parameters 形参（显式参数）：在函数定义时列出，没有指定数据类型
* Arguments 实参（隐式参数）：在函数调用时传递给函数真正的值，类数组对象，可用.arguments获取
* 函数传参，普通参数都是值传递的，而对象是引用传递
```
// 实例
.name // 返回一个函数声明的名称
.prototype // 存储原型对象，不可被修改
.length // 函数的形参个数
.toString() // 返回一个表示当前函数源代码的字符串
.bind(this,*...) // 创建一个新函数，拓展作用域，并传入若干个参数
.call(this,*...) // 拓展作用域，并传入若干个参数，然后执行
.apply(this,a) // 拓展作用域，并传入一个参数数组，然后执行
```

---
### 标准对象

#### Math 算法
* 不是一个函数对象，包含一些数学常数属性和数学函数方法
```
// 静态
.E // 欧拉常数（2.718281828459045）
.LN2 // 2的自然对数（0.6931471805599453）
.LN10 // 10的自然对数（2.302585092994046）
.LOG2E // 2为底E的对数（1.4426950408889634）
.LOG10E // 10为底E的对数（0.4342944819032518）
.PI // 圆周率（3.141592653589793）
.SQRT1_2 // 1/2的平方根（0.7071067811865476）
.SQRT2 // 2的平方根（1.4142135623730951）
.exp() // 欧拉值
.abs() // 绝对值
.round() // 四舍五入
.ceil() // 向上取整
.floor() // 向下取整
.sin() // 正弦值
.cos() // 余弦值
.tan() // 正切值
.asin() // 反正弦值
.acos() // 反余弦值
.atan() // 反正切值
.atan2() // x/y的反正切值
.abs() // 绝对值
.sqrt() // 平方根
.pow(x,y) // x的y次幂
.random() // 随机数
.max(a) // 判断最大值
.min(a) // 判断最小值
.trunc() // 取整 
.expm1() // 欧拉值-1
.clz32() // 32位整数的前导零的数
.cbrt() // 立方根
.sinh() // 双曲正弦值
.cosh() // 双曲余弦值
.tanh() // 双曲正切值
.asinh() // 反双曲正弦值
.acosh() // 反双曲余弦值
.atanh() // 反双曲正切值
.fround() // 最接近的单精度浮点型
.hypot() // 若干参数平方和的平方根
.imul() // 32位整数乘法
.log1p() // 1+n的自然对数
.log2() // 2为底数的对数
.log10() // 10为底数的对数
.sign() // 符号函数,判定正负数还是0
```

#### Date 日期
* 构造器：new Date(year,monthIndex,day,hours,minutes,seconds,milliseconds)
* 呈现时间中的某个时刻
```
// 静态
.now() // 获取当前时间戳
.parse() // 解析时间字符串1993-07-23T00:00:00,返回时间戳
.UTC() // 获取根据时区换算后的时间戳

// 实例
.toString() // 获取完整时间（Wed Oct 09 2019 18:34:02 GMT+0800 (中国标准时间)）
.valueOf() // 获取时间戳
.setTime() // 设置时间
.setFullYear() // 设置年
.setMonth() // 设置月
.setDate() // 设置天
.setHours() // 设置小时
.setMinutes() // 设置分钟
.setSeconds() // 设置秒
.setMilliseconds() // 设置毫秒
.setUTCFullYear() // 设置世界时年
.setUTCMonth() // 设置世界时月
.setUTCDate() // 设置世界时天
.setUTCHours() // 设置世界时小时
.setUTCMinutes() // 设置世界时分钟
.setUTCSeconds() // 设置世界时秒
.setUTCMilliseconds() // 设置世界时毫秒
.getTime() // 获取时间戳
.getTimezoneOffset() // 获取当前时区的时区偏移（分钟）
.getFullYear() // 获取年（4位,不足补零）
.getMonth() // 获取月（0-11，比实际小1）
.getDate() // 获取天（1-31）
.getDay() // 获取星期（1-7）
.getHours() // 获取小时（0-23）
.getMinutes() // 获取分钟（0-59）
.getSeconds() // 获取秒钟（0-59）
.getMilliseconds() // 获取毫秒数（0-999)
.getUTCFullYear() // 获取世界时年（4位,不足补零）
.getUTCMonth() // 获取世界时月（0-11，比实际小1）
.getUTCDate() // 获取世界时天（1-31）
.getUTCDay() // 获取世界时星期（1-7）
.getUTCHours() // 获取世界时小时（0-23）
.getUTCMinutes() // 获取世界时分钟（0-59）
.getUTCSeconds() // 获取世界时秒钟（0-59）
.getUTCMilliseconds() // 获取毫秒数（0-999)
.toDateString() // 获取日期（Wed Oct 09 2019）
.toTimeString() // 获取时间（18:34:02 GMT+0800 (中国标准时间)）
.toUTCString() // 获取世界时时间（Wed, 09 Oct 2019 10:37:56 GMT）
.toLocaleString() // 获取根据地区转换的完整时间（2019/10/9 下午6:32:30）
.toLocaleDateString() // 获取根据地区转换的日期（2019/10/9）
.toLocaleTimeString()// 获取根据地区转换的时间（下午6:32:30）
.toISOString() // 获取ISO字符串（2019-10-09T10:27:59.903Z)
.toJSON() // 获取ISO字符串（2019-10-09T10:27:59.903Z)
[symbol.toPrimitive]
```

#### RegExp 正则
* 构造器：new RegExp()
* 用于将文本与一个模式匹配
```
// 静态
.$1-$9 // 包含括号子串匹配的正则表达式的静态和只读属性
.lastIndex // 指定下一次匹配的起始索引
.input|$_ // 正则表达式所匹配的字符串
.lastMatch|$& // 最后匹配到的字符串
.lastParen|$+ // 匹配到的最后一个子串
.leftContext|$` // 最新匹配的左侧子串
.rightContext|$' // 最新匹配的右侧子串
[symbol.species] // 返回正则的构造器

// 实例
.flags // 返回一个字符串，由当前正则表达式对象的标志组成
.source // 返回一个值为当前正则表达式对象的模式文本的字符串
.global // 是否在使用g（全局查找）
.ignoreCase // 是否在使用i（不区分大小写）
.multiline // 是否在使用m（实现多行，每个换行符之后就是开始）
.dotAll // 是否在使用s（匹配任何空白字符，包括空格、制表符、换页符等等）
.unicode // 是否在使用u（只匹配最近的一个字符串，不重复匹配）
.sticky // 搜索是否具有粘性
.exec(s) // 一个指定字符串中执行一个搜索匹配
.test(s) // 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配
.toString() // 返回一个表示该正则表达式的字符串
[symbol.match]()
[symbol.matchAll]()
[symbol.replace]()
[symbol.search]()
[symbol.split]()
```

#### Map 地图
* 构造器：new Map()
* 键值对的集合（Hash结构），键可以使用各种类型的值
```
// 实例
.size // 返回元素的个数
.set() // 设置元素
.get() // 获取元素
.has() // 该值是否为成员
.delete() // 删除元素
.clear() // 清除所有成员
.keys() // 返回一个Iterator，包含按顺序插入Map对象中每个元素的key
.values() // 返回一个Iterator，包含按顺序插入Map对象中每个元素的value
.entries() // 返回一个新的迭代器对象
.forEach() // 会以插入顺序对Map对象中的每一个键值对执行一次参数中提供的回调函数
[symbol.species]
[symbol.toStringTag]
[symbol.iterator]()
```

#### WeakMap 弱地图
* 构造器：new WeakMap()
* 唯一的区别是它只接受对象作为键名（null除外），而且键名所指向的对象不计入垃圾回收机制
```
.set() // 设置元素
.get() // 获取元素
.has() // 是否含有元素
.delete() // 移出元素
```

#### Set 设置
* 构造器：new Set()
* 类似于数组，对象是独一无二的值的集合，返回是对象
```
// 实例
.size // 返回元素的个数
.add() // 添加元素
.has() // 该值是否为成员
.delete() // 删除元素，返回一个布尔值，表示删除是否成功
.clear() // 清除所有成员
.values() // 返回一个Iterator，该对象按照原Set元素的插入顺序返回其所有元素
.entries() // 返回一个新的迭代器对象
.forEach() // 会根据集合中元素的插入顺序，依次执行提供的回调函数
[symbol.species]
[symbol.iterator]()
```

#### WeakSet 弱设置
* 构造器：new WeakSet()
* 成员只能是对象，而不能是其他类型的值
* 对象都是弱引用，不计入垃圾回收机制
```
.add() // 添加元素
.has() // 是否含有元素
.delete() // 移除元素
```

#### Promise 约定
* 构造器：new Promise()
* 表示一个异步操作的最终完成 (或失败), 及其结果值
```
// 静态
.all() // 全部完成时调用
.allSettled() // 全部完成时调用，并带有一个对应promise结果的数组
.any() // 任何一个完成时调用
.race() // 有一个完成或失败时调用
.resolve() // 完成
.reject() // 失败

// 实例
.then() // 继续执行
.catch() // 报错执行
.finally() // 只要完成时就调用
```

#### Generator 状态机
* 构造器：function* (){yield '';}
* 执行会返回一个遍历器对象，可以依次遍历内部的每一个状态
```
.next() // 获取下一个状态和是否结束
.throw() // 抛出错误
.return() // 可以返回给定的值，并且终结遍历
```

#### Iterator 迭代器
* 构造器：Iterator()
* 返回一个对象，它实现了遗留的迭代协议，并且迭代了一个对象的可枚举属性
```
// 实例
.next() // 获取下一个值
```

#### Intl 国际化
* 是ECMAScript国际化API的一个命名空间
* 提供了精确的字符串对比、数字格式化，和日期时间格式化
```
// 静态
.Collator // 用于启用对语言敏感的字符串比较的对象
.DateTimeFormat // 用于启用语言敏感的日期和时间格式的对象的构造函数
.ListFormat // 启用语言敏感列表格式的对象的构造方法
.NumberFormat // 用于启用语言敏感数字格式的对象的构造函数
.PluralRules // 用于启用多种敏感格式和多种语言语言规则的对象的构造函数
.RelativeTimeFormat // 启用语言敏感的相对时间格式的对象的构造方法
.getCanonicalLocales() // 返回规范区域名称
```

---
### 反射对象

#### Reflect 反应
* 替代Object内明显属于语言内部的方法
```
// 静态
.construct(target,args) // 相当于运行 new target(...args)
.apply(target,thisArg,args) // 通过指定的参数列表发起对目标(target)函数的调用
.get(target,name,receiver) // 读取属性
.set(target,name,value,receiver) // 设置属性
.has(target,name) // 判断是否存在此属性
.getPrototypeOf(target) // 获取原型
.setPrototypeOf(target, prototype) // 设置原型
.ownKeys(target) // 返回一个由目标对象自身的属性键组成的数组
.getOwnPropertyDescriptor(target,name) // 返回所有自身属性
.preventExtensions(target) // 禁止拓展
.isExtensible(target) // 判断是否可拓展
.defineProperty(target,name,desc) // 等同于Object.defineProperty()方法，唯一不同是返回Boolean值
.deleteProperty(target,name) // 用于删除属性，类似于delete
```

#### Proxy 代理
* 构造器：new Proxy(target,handler)
* 元编程：用于修改target的某些操作的默认行为，等同于在语言层面做出修改
```
// Handler支持的操作
construct(target,args)
apply(target,object,args)
get(target,propKey,receiver) 
set(target,propKey,value,receiver) 
has(target,propKey)
getPrototypeOf(target)
setPrototypeOf(target,proto)
ownKeys(target)
getOwnPropertyDescriptor(target,propKey)
defineProperty(target,propKey,propDesc)
preventExtensions(target)
isExtensible(target)
deleteProperty(target,propKey)
```

---
### 错误对象

#### Error 错误
```
// 实例
.fileName // 引发此错误的文件的路径
.columnNumber // 引发此错误的文件行中的列号
.lineNumber // 抛出错误的代码在其源文件中所在的行号
.message // 有关错误信息
.name // 表示error类型的名称
.stack // 返回原始的全局作用域调用
.toString() // 返回一个错误对象的字符串表示
.toSource() // 返回可以计算出到相同错误的代码
```

#### AggregateError 汇总错误
* 多个错误​​包装在一个错误中

#### EvalError 评估错误
* eval函数的错误

#### RangeError 范围错误
* 当一个值不在其所允许的范围或者集合中

#### InternalError 引擎错误
* 引擎内部的错误

---
### 结构化数据对象

#### JSON 数据
* JavaScript不是JSON，JSON也不是JavaScript（{[]}|[{[]},{[]}]）
```
// 静态
JSON.parse() // 字符串转Json
JSON.stringify() // Json转字符串（第2个参数可以选择替换或选择输出部分属性）
```

#### ArrayBuffer 数据缓冲区
* 构造器：new ArrayBuffer()
* 用来表示通用的、固定长度的原始二进制数据缓冲区
```
// 静态
.isView() // 判断传入的参数值是否是一种ArrayBuffer视图
[symbol.species]

// 实例
.byteLength // 获取字节长度
.slice(startN,endN) // 截取
```

#### SharedArrayBuffer 共享阵列缓冲区
* 构造器：new SharedArrayBuffer()
* 表示一个通用的，固定长度的原始二进制数据缓冲区
* 类似于ArrayBuffer对象，都可以用来在共享内存上创建视图
* 与ArrayBuffer不同的是，SharedArrayBuffer不能被分离
```
// 实例
.byteLength // 表示以字节为单位的一个SharedArrayBuffer的长度
.slice(startN,endN) // 截取
```

#### DataView 数据视图
* 构造器：new DataView()
* 可以从二进制ArrayBuffer中读写多种数值类型的底层接口，使用时不用考虑不同平台的字节序问题
```
// 实例
.buffer // 描述了在构造时被DataView引用的ArrayBuffer
.byteLength // 描述了视图从它的ArrayBuffer开始的字节长度
.byteOffset // 描述了从ArrayBuffer开始的字节偏移量
.getBigInt64() // 获取有符号64位整数
.getBigUint64() // 获取无符号64位整数
.getInt8() // 获取8位整数
.getInt16() // 获取16位整数
.getInt32() // 获取32位整数
.getFloat32() // 获取32位浮点数
.getFloat64() // 获取64位浮点数
.getUint8() // 获取无符号的8-bit整数
.getUint16() // 获取无符号的16-bit整数
.getUint32() // 获取无符号的32-bit整数
.setBigInt64() // 设置有符号64位整数
.setBigUint64() // 设置无符号64位整数
.setInt8() // 设置8位整数
.setInt16() // 设置16位整数
.setInt32() // 设置32位整数
.setFloat32() // 设置32位浮点数
.setFloat64() // 设置64位浮点数
.setUint8() // 设置无符号的8-bit整数
.setUint16() // 设置无符号的8-bit整数
.setUint32() // 设置无符号的8-bit整数
```

#### Atomics 原子
* 提供了一组静态方法用来对SharedArrayBuffer进行原子操作
```
// 静态
.add() // 将指定位置上的数组元素与给定的值相加，并返回相加前该元素的值
.and() // 将指定位置上的数组元素与给定的值相与，并返回与操作前该元素的值。
.compareExchange() // 如果数组中指定的元素与给定的值相等，则将其更新为新的值，并返回该元素原先的值。
.exchange() // 将数组中指定的元素更新为给定的值，并返回该元素更新前的值。
.load() // 返回数组中指定元素的值。
.or() // 将指定位置上的数组元素与给定的值相或，并返回或操作前该元素的值。
.store() // 将数组中指定的元素设置为给定的值，并返回该值。
.sub() // 将指定位置上的数组元素与给定的值相减，并返回相减前该元素的值。
.xor() // 将指定位置上的数组元素与给定的值相异或，并返回异或操作前该元素的值。
.wait() // 检测数组中某个指定位置上的值是否仍然是给定值
.wake() // 唤醒等待队列中正在数组指定位置的元素上等待的线程。返回值为成功唤醒的线程数量。
.isLockFree(size) // 可以用来检测当前系统是否支持硬件级的原子操作
```

---
### TypedArray 二进制数组
|||||
|:---|:---|:---|:---|
| Int8Array | Int16Array | Int32Array | BigInt64Array |
| Uint8Array | Uint16Array | Uint32Array | BigUint64Array |
| Float32Array | Float64Array |

--------------------
## 浏览器对象

---
### Bom 浏览器对象模型（Browser Object Model）

#### Window 窗口
```
.name // 设置或获取窗口名称
.length // 框架数量
.status // 状态栏
.defaultStatus // 设置或获取窗口状态栏内容
.self // 当前窗口
.parent // 父窗口
.top // 顶层父窗口
.opener // 创建此窗口的引用
.closed // 判断窗口是否被关闭
.innerWidth // 显示区域宽度
.innerHeight // 显示区域高度
.outerWidth // 窗口的外部宽度，包含工具条与滚动条
.outerHeight // 窗口的外部高度，包含工具条与滚动条
.pageXOffset // 相对于窗口显示区左上角的X值
.pageYOffset // 相对于窗口显示区左上角的Y值
.screenX // 相对于屏幕窗口的X值
.screenY // 相对于屏幕窗口的Y值
.screenTop // 相对于屏幕窗口的Y值
.screenLeft // 相对于屏幕窗口的X值
.open() // 打开窗口
.stop() // 停止加载
.close() // 关闭浏览器
.moveBy() // 窗口移动指定像素
.moveTo() // 窗口移动到指定位置
.resizeBy() // 调整窗口尺寸
.resizeTo() // 调整窗口到指定尺寸
.scrollBy() // 滚动指定像素
.scrollTo() // 滚动到指定位置
.print() // 打印当前窗口内容
.alert() // 警告弹窗
.confirm() // 确认弹窗，返回true|false
.prompt() // 输入弹窗，返回value
.btoa() // 加密Base64
.atob() // 解码Base64
.focus() // 获取焦点
.blur() // 移出焦点
.getSelection() // 获取Selection对象，表示用户选择的文本范围或光标的当前位置
.getComputedStyle() // 获取指定元素的CSS样式，返回一个对象
.matchMedia() // 媒体查询
```

#### Frames 框架
```
frames[n].location // 获取src
```

#### Navigator 导航
```
.appName // 浏览器名称（Netscape）
.appCodeName // 浏览器代码名（Mozilla）
.appVersion // 浏览器平台和版本
.userAgent // 客户机发送服务器的user-agent头部的值
.platform // 操作系统平台（MacIntel）
.cookieEnabled // 浏览器是否启用Cookie
.javaEnabled() // 浏览器是否启用Java
```
  
#### Screen 屏幕
```
.width // 宽度
.height // 高度
.availWidth // 宽度（不包括任务栏）
.availHeight // 高度（不包括任务栏）
.pixelDepth // 分辨率
.colorDepth // 比特深度
```

#### History 历史
```
.length // 历史总数
.go() // 加载某个历史
.back() // 上一页
.forward() // 下一页
```

#### Location 本地
```
.href // 获取或设置URL
.protocol // 协议
.origin // 域名（带协议带端口）
.host // 域名（不带协议带端口）
.hostname // 域名（不带协议和端口）
.port // 端口
.pathname // 路径
.search // 参数
.hash // 锚
.assign() // 载入
.reload() // 刷新
.replace() // 替换（会覆盖当前页面信息，包括历史记录等）
```

#### Storage 存储
* localStorage 本地存储（长久保存，没有过期时间，需手动清除）
* sessionStorage 会话存储（关闭窗口或标签页清除）
```
.length // 数据个数
.setItem(key,value) // 设置
.getItem(key) // 获取
.removeItem(key) // 删除
.clear() // 清除
```

#### Console 调试
```
.info() // 输出信息
.log() // 输出信息
.assert(boo,str) // 判断
.error() // 错误
.warn() // 警告
.count() // 计数
.group() // 开始分组
.groupEnd() // 分组结束
.groupCollapsed() // 信息分组
.table() // 表格化
.clear() // 清除控制台
.time() // 开始计时
.timeEnd() // 结束计时
.trace() // 显示当前方法在堆栈中的路径
```

#### Ajax 请求
* XMLHttpRequest 请求对象，老版本使用ActiveXObject
```
.responseText // 字符串形式的响应数据
.responseXML // XML形式的响应数据
.open(method,url,async) // 规定请求的类型、URL 以及是否异步处理请求
.send() // 将请求发送到服务器
```

#### Canvas 画布
* getContext绘制对象
```
.fillStyle // 填充颜色
.strokeStyle // 画笔
.shadowColor // 阴影颜色
.shadowBlur // 阴影的模糊级别
.shadowOffsetX // 阴影距形状的水平距离
.shadowOffsetY // 阴影距形状的垂直距离
```

---
### Dom 文档对象模型（Document Object Model）

#### Document 文档
* 继承元素对象的所有属性和方法
```
document.title // 文档标题
document.URL // 完整URL
document.baseURI // 基础URL
document.documentURI // 设置或返回URL
document.domain // 域名
document.doctype // 文档类型（html,php）
document.inputEncoding // 文档编码方式（UTF-8）
document.readyState // 文档状态
document.lastModified // 最后修改时间
document.referrer // 跳转前的URL
document.activeElement // 焦点元素
document.strictErrorChecking // 设置或返回是否检查错误
document.open() // 打开输出流,收集write和writeln
document.close() // 关闭输出流
document.importNode() // 复制dom到该文档
document.adoptNode() // 剪切dom到该文档
document.anchors // Anchor对象的引用
document.cookie // 设置或获取cookie
document.documentMode // 获取浏览器渲染模式（IE）
document.documentElement // 文档根元素
document.body // body元素
document.embeds // 获取Embed集合
document.forms // 获取Form集合
document.images // 获取Image集合
document.links // 获取Area和Link集合
document.scripts // 获取JS集合
document.createAttribute() // 创建属性
document.createDocumentFragment() // 创建DocumentFragment对象
document.createComment() // 创建注释元素
document.createTextNode() // 创建文本元素
document.createElement() // 创建元素元素
document.getElementById() // 根据ID获取元素
document.getElementsByTagName() // 根据标签获取元素
document.getElementsByName() // 根据Name获取元素
document.getElementsByClassName() // 根据Class获取元素
document.querySelector() // 获取第一个符合CSS选择器的元素
document.querySelectorAll() // 获取所有符合CSS选择器的元素
document.implementation // 获取处理该文档的DOMImplementation对象
document.normalize() // 删除空文本元素，并连接相邻元素
document.addEventListener() // 添加句柄
document.removeEventListener() // 移除句柄
document.write() // 写入
document.writeln() // 写入并加入换行符
```

#### Element 元素
```
element.title // 设置或获取Title
element.nodeName // 获取元素标记名（大写）
element.nodeType // 获取元素类型
element.nodeValue // 获取元素值
element.tagName // 设置或返回标签顺序
element.tabIndex // 设置或返回标签顺序
element.lang // 设置或返回语言
element.style // 设置或返回样式
element.innerHTML // 设置或返回内容
element.textContent // 设置或返回元素和内容
element.id // 获取ID
element.classList // 获取Class
element.className // 设置或返回Class
element.attributes // 获取属性
element.getAttribute() // 获取属性
element.getAttributeNode() // 获取指定属性
element.setAttribute() // 添加或修改属性
element.setAttributeNode() // 添加或修改属性
element.removeAttribute() // 删除属性
element.removeAttributeNode() // 删除属性并返回移除后的节点
element.hasAttribute() // 判断是否含有指定属性
element.hasAttributes() // 判断是否含有指定属性列表
element.hasChildNodes() // 判断是否还有子元素
element.isContentEditable() // 判断是否可编辑
element.contentEditable // 设置或返回是否可编辑
element.isDefaultNamespace() // 判断是否有命名空间
element.namespaceURI // 设置或返回命名空间
element.isSupported() // 判断是否支持指定特征
element.clientWidth // 宽度（不带边和边距）
element.clientHeight // 高度（不带边和边距）
element.offsetWidth // 宽度（带边，不带边距）
element.offsetHeight // 高度（带边，不带边距）
element.offsetParent // 元素的偏移fu容器
element.offsetTop // Y偏移
element.offsetLeft // X偏移
element.scrollWidth // 宽度（带滚动隐藏部分）
element.scrollHeight // 高度（带滚动隐藏部分）
element.scrollTop // 滚动条和顶部距离
element.scrollLeft // 滚动条和左侧距离
element.ownerDocument // 根元素
element.parentNode // 父元素
element.children // 获取子元素
element.childNodes // 获取子元素（带文案）
element.firstChild // 获取第一个子元素
element.lastChild // 获取最后一个元素
element.previousSibling // 获取之前兄弟元素集合
element.previousElementSibling // 获取指定元素的上一个兄弟元素
element.nextSibling // 获取之后兄弟元素集合
element.nextElementSibling // 获取指定元素的下一个兄弟元素
element.getElementsByClassName() // 根据Class获取子元素
element.getElementsByTagName() // 根据Tag获取子元素
element.querySelector() // 根据css选择器获取第一个子元素
element.querySelectorAll() // 根据css选择器获取全部子元素
element.insertBefore() // 起始添加元素
element.append() // 结尾添加多个节点或字符串
element.appendChild() // 结尾添加元素
element.remove() // 删除元素
element.removeChild() // 删除一个子元素
element.replaceChild() // 替换一个子元素
element.accessKey // 设置或返回快捷键
element.cloneNode() // 复制元素，与原元素脱离关系
element.dir // 设置或返回文本方向
element.isEqualNode() // 比较两个元素是否相等
element.compareDocumentPosition() // 比较两个元素的文档位置
element.isSameNode() // 检查两个元素的相同元素
element.normalize() // 合并文案
element.focus() // 获取焦点
element.hasFocus() // 判断是否有焦点
element.addEventListener() // 添加句柄
element.removeEventListener() // 删除句柄
element.toString() // 元素转字符串
```

#### Style 样式对象
```
element.style.cssText // 设置或获取文本
element.style.length // 长度
element.style.parentRule // 获取选择器和样式
element.style.item(key) // 根据key获取css的属性值
element.style.setProperty() // 新建或修改属性
element.style.removeProperty() // 移除属性
element.style.getPropertyValue() // 获取指定Value
element.style.getPropertyPriority() // 判断是否设置important
```

#### Attributes 属性对象
```
element.attributes[].specified // 判断是否有设置属性
element.attributes[].name // 返回属性名称
element.attributes[].value // 设置或返回属性值
element.attributes.item() // 从节点列表中获取的指定索引号的节点
element.attributes.setNamedItem() // 设置属性
element.attributes.getNamedItem() // 从节点列表中获取的指定属性的节点
element.attributes.removeNamedItem() // 从节点列表中删除指定索引号的节点
```

#### Event 事件对象
```
event.target // 触发事件的元素
event.currentTarget // 事件监听器触发事件的元素
event.type // 当前对象的事件名称
event.timeStamp // 事件生成的日期和时间
event.bubbles // 判断是否是冒泡
event.cancelable // 判断是否可以取消默认事件
event.initEvent()    // 初始化Event对象的属性
event.preventDefault() // 禁止默认事件
event.stopPropagation() // 禁止事件冒泡
element.createEvent() // 创建时间处理程序
element.handleEvent() // 注册事件处理程序

##### Base 基础事件
element.onload // 页面或图片加载完成
element.onpageshow // 用户访问
element.onbeforeunload // 离开页面（刷新或关闭）
element.onunload // 退出页面
element.onpagehide // 跳转页面时
element.onhashchange // 锚链接改变
element.onresize // 调整尺寸
element.onscroll // 滚动
element.onabort // 图像加载中断
element.onerror // 文档或图像加载错误
element.ononline // 浏览器在线工作
element.onoffline // 浏览器离线工作

##### Mouse 鼠标事件
event.button // 被点击的鼠标按钮
event.clientX // 鼠标浏览器内的X轴
event.clientY // 鼠标浏览器内的Y轴
event.screenX // 鼠标显示器内的X轴
event.screenY // 鼠标显示器内的Y轴
event.initMouseEvent() // 初始化鼠标
element.onclick // 单击句柄
element.ondblclick // 双击句柄
element.oncontextmenu // 右键菜单句柄
element.onmousedown // 按下
element.onmouseup // 释放
element.onmousemove // 移动
element.onmouseover // 移入
element.onmouseout // 移出
element.onmouseenter // 移入（不支持冒泡，不包含子元素的区域）
element.onmouseleave // 移出（不支持冒泡，不包含子元素的区域）
element.onwheel // 滚轮滚动时

##### Keyboard 键盘事件
event.shiftKey // 判断Shift是否按下
event.ctrlKey // 判断Ctrl是否按下
event.altKey // 判断Alt是否按下
event.metaKey // 判断Meta是否按下
event.Location // 按钮在设备上的位置
event.key // 按钮标识符
event.charCode // 按钮字符代码
event.which // 按钮字符代码
event.relatedTarget // 事件目标节点
event.initKeyboardEvent() // 初始化键盘
element.onkeydown // 按下
element.onkeyup // 释放
element.onkeypress // 按下并释放

##### Form 表单事件
element.onfocusin // 即将获取焦点
element.onfocus // 获取焦点
element.onfocusout // 即将失去焦点
element.onblur // 失去焦点
element.oninput // 输入时
element.onchange // 内容发生改变
element.onreset // 重置
element.onsearch // 搜索（type="search"）
element.onselect // 选取文本
element.onsubmit // 提交

##### Clipboard 剪贴板事件
element.oncopy // 拷贝内容
element.oncut // 剪切内容
element.onpaste // 粘贴内容

##### Printer 打印事件
element.onafterprint // 打开和关闭
element.onbeforeprint // 即将开始打印

##### Drag 拖动事件
element.ondragstart // 开始拖动
element.ondrag // 正在拖动
element.ondragend // 完成拖动
element.ondragenter // 拖动进入放置目标
element.ondragleave // 拖动移出放置目标
element.ondragover // 拖动在放置目标上
element.ondrop // 在放置目标上释放

##### Media 多媒体事件
element.onloadstart // 加载开始
element.onloadedmetadata // 元数据
element.onstalled // 媒体数据不可用
element.onsuspend // 媒体数据终止
element.onprogress // 下载时
element.onplay // 播放
element.onplaying // 暂停后播放
element.onpause // 暂停
element.oncanplay // 开始播放音视频
element.onseeking // 开始定位播放进度
element.onseeked // 重新定位播放进度
element.ontimeupdate // 当前播放位置发生改变
element.onloadeddata // 加载当前帧
element.onwaiting // 播放下一帧需要缓存
element.oncanplaythrough // 可以正常播放且无需停顿和缓冲
element.ondurationchange // 时长发生变化
element.onratechange // 播放速度发生改变
element.onabort // 加载失败
element.onerror // 加载错误
element.onended // 播放结束
element.onvolumechange    // 音量发生改变

##### Animation 动画事件
element.animationstart // CSSAnimation开始
element.animationend // CSSAnimation结束
element.animationiteration // CSSAnimation重复播放

##### Transition 过渡事件
element.transitionend // CSSTransform完成
```

--------------------
## Node 服务器对象

---
### 目录
```
__dirname // 当前模块的目录名称，非全局变量
__filename // 当前模块的文件名，非全局变量
```

---
### 函数
```
require()
queueMicrotask()
setTimeout()
clearTimeout()
setInterval()
clearInterval()
setImmediate()
clearImmediate()
```

---
### 对象

#### Global 全局名称空间对象
* 顶级范围不是全局范围

#### Process 进程
* 提供有关当前Node.js过程的信息和控制
* 事件、退出状态码
```
// 静态
.version // 一个编译属性
.versions // 一个属性
.pid // 当前进程的PID
.title // 获取/设置显示的进程名
.arch // 当前CPU的架构
.platform // 运行程序所在的平台系统
.mainModule // require.main的备选方法
.config // 一个包含用来编译当前node执行文件的javascript配置选项的对象
.stdout // 一个WritableStream执向stdout(fd1)
.stderr // 一个指向stderr(fd2)的可写流
.stdin // 一个指向stdin(fd0)的可读流
.argv // 包含命令行参数的数组
.env // 包含用户环境的对象
.exitCode // 进程退出时的代码
.execPath // 开启当前进程的执行文件的绝对路径
.execArgv // 启动进程所需的node命令行参数
.memoryUsage() // 描述了Node进程所用的内存状况
.nextTick() // 一旦当前事件循环结束，调用回到函数
.umask() // 设置或读取进程文件的掩码
.uptime() // 返回Node已经运行的秒数
.hrtime() // 返回当前进程的高分辨时间
.kill() // 发送信号给进程
.abort() // 这将导致node触发abort事件
.chdir() // 改变当前工作进程的目录，如果操作失败抛出异常
.cwd() // 返回当前进程的工作目录
.exit() // 使用指定的code结束进程
.setgroups() // 设置进程的群组ID
.getgroups() // 返回进程的群组iD数组
.initgroups() // 读取/etc/group，并初始化群组访问列表，使用成员所在的所有群组
.setgid() // 设置进程的群组标识（仅在POSIX平台上可用）
.getgid() // 获取进程的群组标识（仅在POSIX平台上可用）
.setuid() // 设置进程的用户标识（仅在POSIX平台上可用）
.getuid() // 获取进程的用户标识（仅在POSIX平台上可用）
```

#### Module 模块
* 模块局部变量
```
// 静态
.exports // 代表当前模块的对象的引用
.require(id) // 返回已经解析的module.exports
.id // 模块的标识符
.filename // 模块完全解析的文件名
.loaded // 模块是已经加载完毕，还是在加载中
.parent // 引入这个模块的模块
.children // 由这个模块引入的模块
```

#### Exports 输出
* 与module.exports相同
* 文件级范围内可用
* 如果将新值分配给exports，则它不再绑定到module.exports

#### Console 控制台
* 调试控制台，输出目标是终端或文件
```
// 静态
.log // 日志
.info // 信息
.error // 错误
.warn // 警告
.dir // 显示一个对象的所有属性和方法
.time // 标记一个时间点
.timeEnd // 计时器结束的时候
.trace // 输出当前位置的栈
.assert // 和assert.ok()类似
```

--------------------
## ECMAScript版本

---
### ES2015（ES6）
```
const 和 let
变量解构赋值
基础对象（String、Number、Array、Object）扩展
Symbol 符号对象
Proxy 代理对象
Reflect 反应对象
TypedArray 二进制数组
Set 和 WeakSet 无重复值集合
Map 和 WeakMap 键无要求集合
Iterator 遍历器
Generator 遍历器函数
Promise 约定对象
Async 和 Await 函数
Class 类
Module 模块化
Decorator 修饰器
```

---
### ES2016（ES7）
```
Array.prototype.includes() // 判断数组是否包含子元素，可以识别NaN
** 指数运算
?. 可选链操作符 // 可以按照操作符之前的属性是否有效，链式读取对象的属性或者使整个对象链返回 undefined
```

---
### ES2017（ES8）
```
String.prototype.padStart() // 向字符串开始添加字符，使字符串达到指定的长度
String.prototype.padEnd() // 向字符串结束添加字符，使字符串达到指定的长度
Object.values() // 获取包含所有对象自身的属性值数组
Object.entries() // 获取包含所有对象自身属性的数组
Object.getOwnPropertyDescriptors() // 获取对象的所有自有（非继承的）属性描述符
SharedArrayBuffer // 共享内存和Atomics 
允许使用参数尾随逗号
```

---
### ES2018（ES9）
```
Promise.prototype.finally() // 异步完成回调
async/await // 同步/等待，配合Promise使用
Lookahead // 先行断言（正向断言正则匹配）
Lookbehind // 后行断言（反向断言正则匹配）
/*/s 正则匹配除回车外的单字符
解构新增 ...props 收集剩余参数 必须放在参数最后
异步迭代 for await () {}
```

---
### ES2019（ES10）
```
String.prototype.trimStart() // 删除字符串开始的空格，返回新字符串
String.prototype.trimEnd() // 删除字符串结束的空格，返回新字符串
Array.prototype.flat() // 扁平化多维数组
Array.prototype.flatMap() // 扁平化多维数组
Function.prototype.toString() // 可以获取函数完整字符串形式
Symbol.prototype.description // 获取描述
Object.fromEntries() // 数组转为对象
try{}catch(){} // 省略catch的()
支持直接处理未转义(\u****)字符串
优化JSON.stringify的输出
```

---
### ES2020（ES11）
```
String.prototype.matchAll() // 获取所有匹配项
Promise.allSettled() // 跟踪所有settle的promise
import().then().catch() // 动态加载模块
&& 可选链
```

---
### ES2021（ES12）
```
do表达式
throw 表达式
函数的部分执行
管道运算符
数值分隔符 1_000
Math.signbit() // 判断正负
双冒号运算符
Realm API
#! 命令
import.meta
```
