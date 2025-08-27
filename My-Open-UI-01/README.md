# VibeChat UI - 聊天应用界面

## 项目概述

这是一个现代化的聊天应用界面设计，采用玻璃态（Glassmorphism）设计风格，参考了 auth-app 项目的颜色样式特点。

## 设计特点

### 颜色方案
- **背景**: 使用与 auth-app 相同的背景图片和样式
- **主色调**: 白色文字配合黑色半透明背景
- **玻璃效果**: `rgba(0, 0, 0, 0.4)` 背景配合 `backdrop-filter: blur(20px)`
- **按钮**: `rgba(255, 255, 255, 0.2)` 背景配合悬停效果

### 手机框架
- **尺寸**: 375x812px（iPhone 12/13/14 标准尺寸）
- **圆角**: 2.5rem 外框，2rem 内屏
- **阴影**: 多层阴影效果增强立体感

### 字体
- **主字体**: Inter
- **标题字体**: Plus Jakarta Sans
- **响应式**: 支持不同字重（300-800）

## 页面列表

1. **01-welcome.html** - 欢迎页面
2. **02-login.html** - 登录页面
3. **03-home.html** - 首页（聊天列表）
4. **04-chat.html** - 聊天对话页面
5. **05-calls.html** - 通话页面
6. **06-contacts.html** - 联系人页面
7. **07-new-chat.html** - 新建聊天页面
8. **08-search.html** - 搜索页面
9. **09-video-call.html** - 视频通话页面
10. **09-voice-call.html** - 语音通话页面
11. **10-settings.html** - 设置页面
12. **11-profile.html** - 个人资料页面
13. **12-notifications.html** - 通知页面
14. **13-groups.html** - 群组页面
15. **14-group-chat.html** - 群聊页面
16. **15-media-gallery.html** - 媒体库页面
17. **16-stories.html** - 故事页面
18. **17-friends.html** - 好友页面
19. **18-moments.html** - 动态页面
20. **19-discover.html** - 发现页面
21. **20-game-center.html** - 游戏中心页面

## 样式文件

### glass-styles.css
包含所有玻璃态样式的核心文件，包括：
- 基础布局样式
- 玻璃效果类
- 动画效果
- 响应式设计
- 颜色变量

## 技术栈

- **HTML5**: 语义化标签
- **CSS3**: 现代CSS特性（Grid、Flexbox、Backdrop-filter）
- **Tailwind CSS**: 实用优先的CSS框架
- **JavaScript**: 交互功能（可选）

## 浏览器支持

- Chrome 76+
- Firefox 70+
- Safari 13.1+
- Edge 79+

## 使用方法

1. 直接在浏览器中打开任意HTML文件
2. 所有页面都采用响应式设计，适配移动设备
3. 样式文件会自动加载，无需额外配置

## 更新日志

### v2.0.0 (当前版本)
- ✅ 采用 auth-app 项目的颜色样式风格
- ✅ 统一背景图片和玻璃效果
- ✅ 更新按钮样式为 `btn-primary` 类
- ✅ 优化导航栏样式
- ✅ 改进文本颜色类名
- ✅ 增强悬停和过渡效果

### v1.0.0
- 初始版本发布
- 基础玻璃态设计
- 20个页面完成

## 开发说明

所有页面都遵循相同的设计规范：
- 统一的手机框架尺寸
- 一致的玻璃效果
- 相同的颜色方案
- 统一的交互反馈

## 许可证

MIT License
