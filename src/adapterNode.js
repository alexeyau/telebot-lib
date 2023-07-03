const { setStorageItem, getStorageItem } = require("./services/fileStorage.js");
const {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} = require("./services/telegramAPINode.js");

function adapterNode(BotClass, initSettings) {
  return new BotClass({
    ...initSettings,
    setStorageItem,
    getStorageItem,
    saveProcessedMessageId: (botName, mId) => {
      const botData = JSON.parse(getStorageItem(botName) || '{}');
      const nextBotData = JSON.stringify({
        ...botData,
        processedUpdatesIds: [...(botData.processedUpdatesIds || []), mId],
      });
      setStorageItem(botName, nextBotData);
    },
    getProcessedMessagesIds: (botName) => {
      const botData = JSON.parse(getStorageItem(botName) || '{}');
      return botData.processedUpdatesIds || [];
    },
    getTelegramMessagesAsync: async (token, lastUpdateId) => {
      return getTelegramMessages(token, lastUpdateId).then((readyData) => {
        console.log(' g-> ', readyData);
        return readyData.result;
      });
    },
    sendTelegramMessageAsync: async (token, userId, messageText) => {
      return sendTelegramMessage(token, {
        chat_id: userId,
        text: messageText,
      });
    },
  });
}

module.exports = {
  adapterNode,
};