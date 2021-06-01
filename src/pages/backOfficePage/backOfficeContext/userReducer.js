import { CANCEL_DELETE, CHANGE_ROLE, CANCEL_EDIT, DELETE_USER } from './types';

export const userReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_ROLE:
      newState.editModal = true;
      newState.user = action.payload;
      return newState;
    case CANCEL_EDIT:
      newState.editModal = false;
      newState.user = {};
      return newState;
    case DELETE_USER:
      newState.deleteModal = true;
      newState.user = action.payload;
      return newState;
    case CANCEL_DELETE:
      newState.deleteModal = false;
      newState.user = {};
      return newState;
    default:
      return newState;
  }
};
