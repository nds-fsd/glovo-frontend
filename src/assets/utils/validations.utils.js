export const isRequired = (text) => !!text;
export const minLength = (text) => {
  if (text.length < 5) {
    return false;
  }
  return true;
};
