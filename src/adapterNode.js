const { setStorageItem, getStorageItem } = require("./services/fileStorage.js");

function adapterBrowser(BotClass, initSettings) {
  return new BotClass({
    ...initSettings,
    setStorageItem,
    getStorageItem,
  });
}

module.exports = {
  adapterBrowser,
};