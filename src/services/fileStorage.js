import fs from 'fs';

const getStorageObj = (filePath) => {
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

const getStorageItem = (key, filePath) => {
  const storData = getStorageObj(filePath);
  console.log("--------------------", typeof(storData?.[key]))
  console.log("++++++++++++++++++++", key)
  console.log("====================", storData?.[key])
  return storData?.[key];
};

const setStorageItem = (key, value, filePath) => {
  const storData = getStorageObj(filePath) || {};
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

const clearStorage = (filePath) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({}));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export {
  getStorageItem,
  setStorageItem,
  clearStorage,
};