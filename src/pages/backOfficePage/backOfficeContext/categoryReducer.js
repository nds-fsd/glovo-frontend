import {
  CANCEL_DELETE,
  EDIT_CATEGORY,
  CANCEL_EDIT,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
} from './types';

export const categoryReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_CATEGORY:
      newState.editModal = true;
      return newState;
    case EDIT_CATEGORY:
      newState.editModal = true;
      newState.category = action.payload;
      return newState;
    case CANCEL_EDIT:
      newState.editModal = false;
      newState.category = {};
      return newState;
    case DELETE_CATEGORY:
      newState.deleteModal = true;
      newState.category = action.payload;
      return newState;
    case CANCEL_DELETE:
      newState.deleteModal = false;
      newState.category = {};
      return newState;
    default:
      return newState;
  }
};
