export const getStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};