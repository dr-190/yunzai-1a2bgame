# 1A2B 游戏插件 for TRSS-Yunzai

## 介绍
这是一个简单的 1A2B 数字猜谜游戏插件，支持开始游戏、结束游戏、猜测数字以及查看帮助信息。

## 安装

```bash
git clone https://github.com/dr-190/yunzai-1a2bgame.git
```

**镜像下载（国内推荐）**
```bash
git clone https://wget.la/https://github.com/dr-190/yunzai-1a2bgame.git
```

**文件夹名要改为：`1a2b`**  
或者修改 `1a2b.js` 文件的第 3 行中的 `1a2b` 为你所在文件夹名：
```JavaScript
const GAME_STATE_FILE = './plugins/1a2b/game_state.json';
```
例如，如果你的插件文件夹为：
```
plugins
└── 1a2bgame
    └── 1a2b.js
```
则需要修改为：
```JavaScript
const GAME_STATE_FILE = './plugins/1a2bgame/game_state.json';
```

## 使用方法

### 指令说明
- `1a2b 开始游戏`：开始一个新的游戏。
- `1a2b 结束游戏`：结束当前游戏。
- `1a2b <四位数>`：猜测一个四位数的数字，系统会返回 `xAyB` 形式的反馈，表示猜测结果。
- `1a2b`：查看帮助信息，了解如何玩游戏。

### 游戏规则
- `1A`：数字和位置都对。
- `1B`：数字对但位置错。

### 游戏流程
1. **开始游戏**：输入 `1a2b 开始游戏` 开始新游戏。
2. **猜测数字**：输入一个四位数字（不重复）进行猜测，系统会根据你的猜测返回反馈，格式为 `xAyB`，例如 `1A2B`。
3. **结束游戏**：输入 `1a2b 结束游戏` 结束当前游戏。
4. **查看帮助**：输入 `1a2b` 获取游戏规则和指令帮助。

### 示例
- 输入 `1a2b 开始游戏` 开始游戏。
- 输入 `1234` 猜测数字。
- 系统会返回类似 `1A2B` 的结果，表示 1 个数字位置正确，2 个数字存在但位置错误。

## 其他说明

- 游戏的状态会保存在 `game_state.json` 文件中，确保插件目录有读写权限。
- 插件支持多用户，可以为每个用户单独保存游戏进度。

## 许可证

MIT License.
