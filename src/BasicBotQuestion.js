import BasicBot from './BasicBot.js';

class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
  }

  async _sendResponse(update) {
    if (!this.getStorageItem('questionBot01')) {
      this.setStorageItem(
        'questionBot01',
        {
          users: {
            [update.message.chat.id]: {
              name: update.message.chat.first_name,
              numberOfQuestions: 0,
              answers: [],
            },
          },
          processedUpdatesIds: [],
        },
      );
    }

    const isTextCurrectAnswer =
      update.message?.text === '1' ||
      update.message?.text === '2' ||
      update.message?.text === '3' ||
      update.message?.text === '4';
    const isTextStart = update.message?.text === '/start';
    const questionsList = this.getStorageItem('listOfQuestions');
    const users = this.getStorageItem('questionBot01');
    const isCurrentQuestionFirst =
      Number(users['users'][update.message.chat.id].numberOfQuestions) === 0;
    const localUser = users;
    const isCurrentUser = Object.keys(users).find(
      (item) => item.name == update.message.chat.first_name,
    );

    if (users['users']) {
      if (isCurrentUser) {
        users['users'][update.message.chat.id] = {
          name: update.message.chat.first_name,
          numberOfQuestions: 0,
          answers: [],
        };
        this.setStorageItem('questionBot01', users);
      }
    }

    if (!isTextStart && !isTextCurrectAnswer) {
      if (isCurrentQuestionFirst) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Привет, это бот-опросник, для начала введите "/start"',
        );
        this._onSend(update);
        return;
      }
      this.sendTelegramMessageAsync(update.message?.from.id, 'Ответ некорректный');
      this._onSend(update);
      return;
    }

    if (isTextStart) {
      if (!isCurrentQuestionFirst) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Привет, видимо вы ответили не на все вопросы, продолжим,' +
            questionsList[users['users'][update.message.chat.id].numberOfQuestions].question,
        );
        this._onSend(update);
        return;
      }
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          questionsList[users['users'][update.message.chat.id].numberOfQuestions].question +
          ' в ответе нужно указать только букву ответа',
      );
      this._onSend(update);
      return;
    }

    localUser['users'][update.message.chat.id].numberOfQuestions++;
    this.setStorageItem('questionBot01', localUser);

    if (Number(users['users'][update.message.chat.id].numberOfQuestions) >= questionsList.length) {
      localUser['users'][update.message.chat.id].numberOfQuestions = 0;
      this.setStorageItem('questionBot01', localUser);
      this.sendTelegramMessageAsync(update.message?.from.id, 'Отлично, вы ответили на все вопросы');
      let local = this.getStorageItem('questionBot01');
      if(local['users'][update.message.chat.id]['answers'].length < questionsList.length) {
        local['users'][update.message.chat.id]['answers'].push(update.message?.text);
      };
      local['users'][update.message.chat.id].numberOfQuestions = 0;
      this.setStorageItem('questionBot01', local);
      this._onSend(update);
      return;
    }

    this.sendTelegramMessageAsync(
      update.message?.from.id,
      'Хорошо, вот следующий вопрос:\n' +
        questionsList[users['users'][update.message.chat.id].numberOfQuestions].question,
    );
    this._onSend(update);

    let local = this.getStorageItem('questionBot01');
    if(local['users'][update.message.chat.id]['answers'].length < questionsList.length) {
      local['users'][update.message.chat.id]['answers'].push(update.message?.text);
    };
    this.setStorageItem('questionBot01', local);
  }
}

export default BasicBotQuestion