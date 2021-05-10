/*eslint-disable */
const reduce = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_CATEGORIES':
      return { categories: action.payload, ...state };
    case 'set_name':
      newState.name = action.name;
      return newState;
  }
};
