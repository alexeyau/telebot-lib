export const getTelegramBotName = (token) => {
  return fetch(`https://api.telegram.org/bot${token}/getMe`).then((data) => {
    return data.json();
  });
};

export const getTelegramMessages = (token, lastUpdateId) => {
  return fetch(
    `https://api.telegram.org/bot${token}/getUpdates?limit=20&offset=${lastUpdateId || 0}`,
  ).then((data) => {
    return data.json();
  });
};

export const sendTelegramMessage = (token, data) => {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
};
