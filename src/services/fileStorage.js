const fs = require('fs');
const path = require('path');

const filePath = path.dirname(__filename) + '/_storage/simpleStorage.json';

const getStorageObj = () => {
  try {
    const fd = fs.readFileSync(filePath, 'utf-8');
    if (!fd) {
      return  null;
    }
    const fdData = JSON.parse(fd);
    return fdData;
  } catch (err) {
    console.error(err)
    return null;
  }
};

const getStorageItem = (key) => {
  const storData = getStorageObj();
  return storData?.[key];
};

const setStorageItem = (key, value) => {
  const storData = getStorageObj() || {};
  const nextData = {
    ...storData,
    [key]: value,
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(nextData));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const clearStorage = () => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({}));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  getStorageItem,
  setStorageItem,
  clearStorage,
};