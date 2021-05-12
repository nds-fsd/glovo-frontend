import {
  CANCEL_DELETE,
  CHANGE_TAB,
  CREATE_RESTAURANT,
  DELETE_RESTAURANT,
  STOP_CREATING,
} from './types';

export const backOfficeReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_TAB:
      newState.selectedTab = action.payload;
      return newState;
    case CREATE_RESTAURANT:
      newState.createRestaurant = true;
      return newState;
    case STOP_CREATING:
      newState.createRestaurant = false;
      return newState;
    case DELETE_RESTAURANT:
      newState.deleteRestaurantModal = true;
      newState.deletableRestaurant = action.payload;
      return newState;
    case CANCEL_DELETE:
      newState.deleteRestaurantModal = false;
      newState.deletableRestaurant = '';
      return newState;
    default:
      return newState;
  }
};
