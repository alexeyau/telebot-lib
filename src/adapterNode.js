import { setStorageItem, getStorageItem } from "./services/fileStorage.js"
import {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} from "./services/telegramAPINode.js"

export function adapterNode(BotClass, initSettings) {
  return new BotClass({
    ...initSettings,
    setStorageItem: function(key, value) {
      return setStorageItem(key, value, initSettings.fileStoragePath)
    },
    getStorageItem: function(key) {
      return getStorageItem(key, initSettings.fileStoragePath)
    },
    saveProcessedMessageId: (botName, mId) => {
      const botData = JSON.parse(getStorageItem(botName) || '{}');
      const nextBotData = JSON.stringify({
        ...botData,
        processedUpdatesIds: [...(botData.processedUpdatesIds || []), mId],
      });
      setStorageItem(botName, nextBotData, initSettings.fileStoragePath);
    },
    getProcessedMessagesIds: (botName) => {
      const botData = JSON.parse(getStorageItem(botName, initSettings.fileStoragePath) || '{}');
      return botData.processedUpdatesIds || [];
    },
    getTelegramMessages: async (token, lastUpdateId) => {
      return getTelegramMessages(token, lastUpdateId).then((readyData) => {
        console.log(' g-> ', readyData);
        return readyData;
      });
    },
    sendTelegramMessage: async (token, dataObj) => {
      return sendTelegramMessage(token, dataObj);
    },
  });
}