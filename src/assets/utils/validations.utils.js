export const isRequired = (text) => !!text;
export const minLength = (text) => {
  if (text.length < 5) {
    return false;
  }
  return true;
};

export const isNumber = (value) => {
  const isNumberRegex = /^-?\d+\.?\d*$/;
  if (!isNumberRegex.test(value)) {
    return false;
  }
  return true;
};

export const numLength = (string) => {
  const numLengthRegex = /^\d{5}$/;
  if (!numLengthRegex.test(string)) {
    return false;
  }
  return true;
};
