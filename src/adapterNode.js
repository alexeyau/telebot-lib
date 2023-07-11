import { setStorageItem, getStorageItem } from "./services/fileStorage.js"
import {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} from "./services/telegramAPINode.js"

export function adapterNode(BotClass, initSettings) {
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
      setStorageItem(botName, nextBotData, initSettings.fileStoragePath);
    },
    getProcessedMessagesIds: (botName) => {
      const botData = JSON.parse(getStorageItem(botName, initSettings.fileStoragePath) || '{}');
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

// module.exports = {
//   adapterNode,
// };