const { setStorageItem, getStorageItem } = require("./services/localStorage.js");
const {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} = require("./services/telegramAPI.js");

function adapterBrowser(BotClass, initSettings) {
  return new BotClass({
    ...initSettings,
    setStorageItem,
    getStorageItem,
    saveProcessedMessageId: (mId) => {
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
  adapterBrowser,
};