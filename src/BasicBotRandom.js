import BasicBot from './BasicBot.js';

class BasicBotRandom extends BasicBot {
  async _sendResponse(update) {
    let answer = Math.floor(100 * Math.random());
    await this.sendTelegramMessageAsync(update.message?.from.id, answer);
    this._onSend(update);
  }
}

export default BasicBotRandom;