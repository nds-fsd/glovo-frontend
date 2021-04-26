export const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item !== 'undefined') {
    return JSON.parse(item);
  }
  return null;
};

export const setStorageObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.token;
  }
  return undefined;
};
export const getUserSession = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.user;
  }
  return undefined;
};

export const setSessionUser = (sessionData) => {
  setStorageObject('user-session', sessionData);
};

export const removeSesion = () => {
  deleteStorageObject('user-session');
};
