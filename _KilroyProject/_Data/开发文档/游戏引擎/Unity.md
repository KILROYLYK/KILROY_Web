# Unity

--------------------
## 生命周期
```
Reset() 组件重设为默认值时（只用于编辑状态）
Awake() 脚本组件载入时 （调用一次）
OnEnable() 是在游戏对象可以调用时调用
Start()第一个Update发生之前 （调用一次）
FixedUpdate() 固定时间调用，常用于物理相关的计算，比如对Rigidbody的操作
Update()大部分游戏行为代码被执行的地方，除了物理代码
LateUpdate() 每帧Update调用之后
OnGUI() 绘制GUI时调用
OnDisable() 当对象设置为不可用时
OnDestroy()组件销毁时调用
```

--------------------
## Api

---
### UnityEngine 引擎
Classes 类
Interfaces 接口
Enumerations 枚举
Attributes 属性
Assemblies 装配
```
Accessibility 无障碍
AI 人工智能
Analytics 分析
Animations 动画
Assertions 断言
Audio 音频
CrashReportHandler 崩溃报告处理程序
Diagnostics 诊断学
Events 事件
Experimental 实验性的
LowLevel 低级
Networking 网络
ParticleSystemJobs 粒子系统作业
Playables 可玩游戏
PlayerLoop 播放器环路
Profiling 分析
Rendering 致使
SceneManagement 场景管理
Scripting 编写脚本
SearchService 搜索服务
Serialization 序列化
SocialPlatforms 社会平台
Sprites 精灵
SubsystemsImplementation 子系统实现
TestTools 测试工具
TextCore 文本核心
Tilemaps 波浪图
Video 视频
Windows 窗口
Jobs 乔布斯
Lumin 鲁明
Android 安卓移动端
iOS 苹果移动端
Apple 苹果公司
tvOS tvOS公司
U2D U2D系列
UIElements UIElements公司
VFX VFX公司
WSA WSA公司
XR XR公司
```

---
### UnityEditor 编辑器

---
### Unity 团结

---
### Other 其他
