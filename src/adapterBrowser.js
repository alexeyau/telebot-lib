import {
    getTelegramBotName,
    getTelegramMessages,
    sendTelegramMessage,
  } from "./services/telegramAPI.js"
  import { setStorageItem, getStorageItem } from "./services/localStorage.js";

 export function adapterBrowser(BotClass, initSettings) {
  return new BotClass({
    ...initSettings,
    setStorageItem,
    getStorageItem,
    getTelegramMessages,
    sendTelegramMessage,
  });
}