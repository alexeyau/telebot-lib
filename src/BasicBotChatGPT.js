import BasicBot from './BasicBot.js';

export class BasicBotChatGPT extends BasicBot {
  constructor(initSettings) {
    super(initSettings);

    const { chatGPTKey } = initSettings;

    this.chatGPTKey = chatGPTKey;
  }

  async _sendResponse(update) {
    const answer = await this._askChatGPT(update);
    await this.sendTelegramMessageAsync(update.message?.from.id, answer);
    this._onSend(update);
  }

  async _askChatGPT(update) {
    if (!this.chatGPTKey?.length > 0) {
      return 'No ChatGPT key';
    }

    const question = `Напиши, пожалуйста, четверостишие на английском
      со словом ${update.message?.text},
      с использованием лексики уровня A2.
      В ответе покажи только стихи.`;

    const gptUrl = 'https://api.openai.com/v1/engines/text-davinci-003/generate';
    //const gptUrl = 'https://api.openai.com/v1/engines/davinci/completions';

    return fetch(gptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.chatGPTKey,
      },
      body: JSON.stringify({
        best_of: 1,
        context: question,
        temperature: 1,
        completions: 1,
        top_p: 0.5,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        logprobs: 0,
        stream: false,
        length: 500 + question.length,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const responseText = data.data[0].text.join('').replace(question, '').trim();
        console.log(' >gtp> ', responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
        return 'Sorry, error';
      });
  }
}

export default BasicBotChatGPT
