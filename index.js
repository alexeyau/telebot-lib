// const BasicBot = require('./src/BasicBot.js');
// const { adapterBrowser } = require('./src/adapterBrowser.js');
// const { adapterNode } = require('./src/adapterNode.js');

import BasicBot from './src/BasicBot.js'
import { adapterBrowser } from './src/adapterBrowser.js'
import { adapterNode } from './src/adapterNode.js'

// module.exports = {
//   BasicBot: BasicBot,
//   adapterBrowser,
//   adapterNode,
// };

export {
    BasicBot,
    adapterBrowser,
    adapterNode,
  };