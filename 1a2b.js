import fs from 'fs'

const GAME_STATE_FILE = './plugins/1a2b/game_state.json';  //这里“1a2b”要修改成你插件所在的文件夹名

function loadGameState() {
  if (fs.existsSync(GAME_STATE_FILE)) {
    return JSON.parse(fs.readFileSync(GAME_STATE_FILE, 'utf-8'));
  }
  return {};
}

function saveGameState(state) {
  fs.writeFileSync(GAME_STATE_FILE, JSON.stringify(state, null, 2));
}

function generateNumber() {
  let digits = '0123456789'.split('');
  let result = '';
  while (result.length < 4) {
    let idx = Math.floor(Math.random() * digits.length);
    result += digits[idx];
    digits.splice(idx, 1);
  }
  return result;
}

function calculateAB(target, guess) {
  let A = 0, B = 0;
  for (let i = 0; i < 4; i++) {
    if (target[i] === guess[i]) {
      A++;
    } else if (target.includes(guess[i])) {
      B++;
    }
  }
  return `${A}A${B}B`;
}

export class A1B2Game extends plugin {
  constructor() {
    super({
      name: '1A2B游戏',
      dsc: '1A2B猜数字游戏',
      event: 'message',
      priority: 50,
      rule: [
        { reg: '^[/#]?1a2b 开始游戏$', fnc: 'startGame' },
        { reg: '^[/#]?1a2b 结束游戏$', fnc: 'endGame' },
        { reg: '^[/#]?1a2b$', fnc: 'gameHelp' },
        { reg: '^[/#]?1a2b\\s+(\\d{4})$', fnc: 'makeGuess' },
        { reg: '^[/#]?(\\d{4})$', fnc: 'makeGuess' }
      ]
    });
    this.gameState = loadGameState();
  }

  async startGame(e) {
    let userId = e.user_id;
    if (this.gameState[userId]) {
      e.reply('你已经在游戏中，请先完成或结束当前游戏。');
      return;
    }
    this.gameState[userId] = { number: generateNumber(), attempts: 0, history: [] };
    saveGameState(this.gameState);
    e.reply('游戏开始！请猜一个4位不重复的数字。');
  }

  async endGame(e) {
    let userId = e.user_id;
    if (!this.gameState[userId]) {
      e.reply('你当前没有进行中的游戏。');
      return;
    }
    delete this.gameState[userId];
    saveGameState(this.gameState);
    e.reply('游戏已结束。');
  }

  async gameHelp(e) {
    e.reply('1A2B游戏玩法：\n1a2b 开始游戏 - 开始新游戏\n1a2b 结束游戏 - 结束当前游戏\n1a2b 1234 - 猜一个4位不重复的数字\n每次猜测都会返回 xAyB，例如 1A2B 表示 1 个数字位置正确，2 个数字存在但位置错误。');
  }

  async makeGuess(e) {
    let userId = e.user_id;
    if (!this.gameState[userId]) {
      e.reply('你还没有开始游戏，请发送 “1a2b 开始游戏” 来开始。');
      return;
    }

    let guessMatch = e.msg.match(/^[/#]?1a2b\s+(\d{4})$/) || e.msg.match(/^[/#]?(\d{4})$/);
    if (!guessMatch) return;

    let guess = guessMatch[1];

    if (new Set(guess).size !== 4) {
      e.reply('请输入4个不重复的数字！');
      return;
    }

    let target = this.gameState[userId].number;
    let result = calculateAB(target, guess);
    this.gameState[userId].attempts++;
    this.gameState[userId].history.push({ attempt: this.gameState[userId].attempts, guess, result });
    saveGameState(this.gameState);

    if (result === '4A0B') {
      let attempts = this.gameState[userId].attempts;
      delete this.gameState[userId];
      saveGameState(this.gameState);
      e.reply(`恭喜你猜对了！数字是 ${target}，共尝试 ${attempts} 次。`);
    } else {
      let historyStr = this.gameState[userId].history.map(h => `${h.attempt}--${h.guess}--${h.result}`).join('\n');
      e.reply(`${result}\n${historyStr}`);
    }
  }
}
