export const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

module.exports = {
  getStorageItem,
  setStorageItem,
};