class BasicBot {
  static settings = {
    intervalTime: 10000,
    botName: 'simpleBot',
  };

  static isProcessed(id, processedIdArr) {
    return processedIdArr.includes(id);
  }

  constructor(initSettings) {
    const {
      onSendCallback,
      saveProcessedMessageId,
      getProcessedMessagesIds,
      getTelegramMessagesAsync,
      sendTelegramMessageAsync,
      getStorageItem,
      setStorageItem,
      botName,
      token,
    } = initSettings;

    this.settings = {
      test1: '1234',
      test2: '1235',
    };

    this.onSendCallback = onSendCallback;
    this.saveProcessedMessageId = saveProcessedMessageId;
    this.getProcessedMessagesIds = getProcessedMessagesIds;
    this.getTelegramMessagesAsync = getTelegramMessagesAsync;
    this.sendTelegramMessageAsync = sendTelegramMessageAsync;
    this.getStorageItem = getStorageItem;
    this.setStorageItem = setStorageItem;
    this.token = token;

    this._processedIds = [];
    this._interval = null;
    this.botName = botName || BasicBot.settings.botName;
  }

  _doWork = async () => {
    console.log(' tic/tac > ', new Date());
    try {
      this._processedIds = this.getProcessedMessagesIds(this.botName);

      const lastUpdateId = this._processedIds[this._processedIds.length - 1];
      const updates = await this.getTelegramMessagesAsync(this.token, lastUpdateId + 1);
      console.log(' > updates: ', updates);
      let arr = [];
      const users = JSON.parse(this.getStorageItem('activeUsers') || '[]');
      if (users) {
        arr = users;
      }
      updates.forEach((item) => {
        arr.push(item.message.chat.first_name);
      });
      let answer = arr
        .filter((name, index) => {
          return arr.indexOf(name) === index;
        })
        .sort();
      this.setStorageItem('activeUsers', JSON.stringify(answer));

      updates
        .filter(
          (update) => update.message && !BasicBot.isProcessed(update.update_id, this._processedIds),
        )
        .forEach((update) => this._sendResponse(update));
    } catch (e) {
      console.log(e);
    }
  };

  async _sendResponse(update) {
    let answer = this.settings.greeting || 'hi!';
    if (update.message?.text === '/start') {
      answer = 'vot du yu vont?';
    }
    await this.sendTelegramMessageAsync(this.token, update.message?.from.id, answer);
    this._onSend(update);
  }

  start() {
    this.interval = setInterval(
      this._doWork,
      this.settings.intervalTime || BasicBot.settings.intervalTime,
    );
  }

  stop() {
    clearInterval(this.interval);
  }

  _onSend(update) {
    if (this.onSendCallback) {
      this.onSendCallback(update.message);
    }
    this.saveProcessedMessageId(this.botName, update.update_id);
  }
}

module.exports = {
  BasicBot,
};