# 1A2B 游戏插件 for TRSS-Yunzai

## 介绍
这是一个简单的 1A2B 数字猜谜游戏插件，支持开始游戏、结束游戏和查看帮助。

## 安装
```bash
git clone https://github.com/dr-190/yunzai-1a2bgame.git
```
**镜像下载（国内推荐）**
```bash
git clone https://wget.la/https://github.com/dr-190/yunzai-1a2bgame.git
```

**文件夹名要改为：`1a2b`**
或者修改 `1a2b.js` 文件的第3行中的`1a2b`为你所在文件夹名
```JavaScript
const GAME_STATE_FILE = './plugins/1a2b/game_state.json';
```
假如我的插件放在：
plugins<br>
└── 1a2bgame<br>
    └── 1a2b.js
则改为：
```JavaScript
const GAME_STATE_FILE = './plugins/1a2bgame/game_state.json';
```

## 使用方法

### 指令说明
- `start`：开始一个新的游戏。
- `end`：结束当前的游戏。
- `guess <四位数>`：猜测一个四位数的数字，系统会给出反馈。
- `help`：查看帮助信息。

### 游戏规则
- 1A：数字和位置都对。
- 1B：数字对但位置错。

## 示例
- 输入 `start` 开始游戏。
- 输入 `1234` 猜测数字。
- 系统会返回类似 `1A2B` 的结果，表示 1 个数字位置对，2 个数字位置错。
