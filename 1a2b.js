class OneA2BGame {
    constructor() {
        this.games = {};  // 存储玩家的游戏信息
    }

    // 启动游戏
    startGame(userId) {
        if (this.games[userId]) {
            return "你已经开始了游戏，请继续猜测！";
        }

        // 生成四位数的谜底
        const secret = this.generateSecretNumber();
        this.games[userId] = {
            secret: secret,
            attempts: 0
        };

        return "游戏开始！请猜一个四位数的数字。";
    }

    // 结束游戏
    endGame(userId) {
        if (!this.games[userId]) {
            return "你还没有开始游戏，无法结束！";
        }

        delete this.games[userId];
        return "游戏已结束。感谢参与！";
    }

    // 显示帮助
    showHelp() {
        return "欢迎来到 1A2B 游戏！\n" +
               "指令说明：\n" +
               "1. `start`：开始一个新的游戏。\n" +
               "2. `end`：结束当前的游戏。\n" +
               "3. `guess <四位数>`：猜测一个四位数的数字，系统会给出反馈。\n" +
               "4. `help`：查看帮助信息。";
    }

    // 猜测并给出反馈
    guessNumber(userId, guess) {
        if (!this.games[userId]) {
            return "你还没有开始游戏！使用 'start' 开始一个新游戏。";
        }

        if (!/^\d{4}$/.test(guess)) {
            return "请输入一个四位数的数字！";
        }

        const game = this.games[userId];
        const secret = game.secret;
        const result = this.evaluateGuess(guess, secret);
        game.attempts++;

        if (result.A === 4) {
            delete this.games[userId];
            return `恭喜你！猜对了，谜底是 ${secret}，你总共猜了 ${game.attempts} 次！`;
        }

        return `猜测结果：${result.A}A${result.B}B。继续猜吧！`;
    }

    // 生成四位数的谜底
    generateSecretNumber() {
        const digits = [...Array(10).keys()];
        for (let i = 0; i < digits.length; i++) {
            const j = Math.floor(Math.random() * digits.length);
            [digits[i], digits[j]] = [digits[j], digits[i]];  // 随机打乱数字
        }
        return digits.slice(0, 4).join('');
    }

    // 评估猜测与谜底的匹配情况
    evaluateGuess(guess, secret) {
        let A = 0, B = 0;
        const secretArray = secret.split('');
        const guessArray = guess.split('');

        // 计算 A
        for (let i = 0; i < 4; i++) {
            if (guessArray[i] === secretArray[i]) {
                A++;
                secretArray[i] = null;  // 移除已经匹配的数字
            }
        }

        // 计算 B
        for (let i = 0; i < 4; i++) {
            if (guessArray[i] !== secretArray[i] && secretArray.includes(guessArray[i])) {
                B++;
                const index = secretArray.indexOf(guessArray[i]);
                secretArray[index] = null;  // 防止重复计算
            }
        }

        return { A, B };
    }
}

const gameInstance = new OneA2BGame();

// 处理命令
const commands = {
    start: (userId) => gameInstance.startGame(userId),
    end: (userId) => gameInstance.endGame(userId),
    help: () => gameInstance.showHelp(),
    guess: (userId, guess) => gameInstance.guessNumber(userId, guess)
};

module.exports = commands;
