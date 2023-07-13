import https from 'https'
const HOSTNAME = 'api.telegram.org';

function getData(path) {
  const promise = new Promise(function(resolve, reject) {
    console.log(' before request -> ', path);
    https.get(
      'https://' + HOSTNAME + path,
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        res.on('end', () => {
          const resultData = JSON.parse(data);
          if (resultData.ok) {
            resolve(resultData);
          } else {
            reject();
          }
        });

        res.on('error', (err) => {
          reject(err);
        });
      },
    );
  })

  return promise;
}

function postData(path, dataObj) {
  const options = {
    hostname: HOSTNAME,
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const promise = new Promise(function(resolve, reject) {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        console.log(' it works> ', chunk);
        data += chunk;
      });
      res.on('end', () => {
        console.log(' end> ', typeof data, data, '<');
        const resultData = JSON.parse(data);
        if (resultData.ok) {
          resolve(resultData);
        } else {
          reject();
        };
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.write(JSON.stringify(dataObj));
    req.end();

  });
  return promise;
}

export const getTelegramBotName = (token) => {
  const path = `/bot${token}/getMe`;
  return getData(path);
};

export const getTelegramMessages = (token, lastUpdateId) => {
  const path = `/bot${token}/getUpdates?limit=20&offset=${lastUpdateId || 0}`;
  return getData(path);
};

export const sendTelegramMessage = (token, data) => {
  console.log("DATA", data)
  const path = `/bot${token}/sendMessage`;
  return postData(path, data);
};
