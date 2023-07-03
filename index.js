const { BasicBot } = require('./src/BasicBot.js');
const { adapterBrowser } = require('./src/adapterBrowser.js');
const { adapterNode } = require('./src/adapterNode.js');

module.exports = {
  BasicBot,
  adapterBrowser,
  adapterNode,
};