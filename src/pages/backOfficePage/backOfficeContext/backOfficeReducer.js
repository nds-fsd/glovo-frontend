import {
  CANCEL_DELETE,
  CHANGE_TAB,
  CREATE_RESTAURANT,
  DELETE_RESTAURANT,
  DESELECT_RESTAURANT,
  SELECT_RESTAURANT,
  STOP_CREATING,
  VIEW_MENU,
  VIEW_RESTAURANT,
  CREATE_COURSE,
  STOP_CREATE_COURSE,
  VIEW_DISHES,
  BACK_TO_COURSES,
  EDIT_COURSE,
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
    case VIEW_MENU:
      newState.viewMenu = true;
      return newState;
    case VIEW_RESTAURANT:
      newState.viewMenu = false;
      return newState;
    case SELECT_RESTAURANT:
      newState.selectedRestaurant = action.payload;
      return newState;
    case DESELECT_RESTAURANT:
      newState.selectedRestaurant = '';
      return newState;
    case CREATE_COURSE:
      newState.createCourse = true;
      return newState;
    case STOP_CREATE_COURSE:
      newState.createCourse = false;
      newState.selectedCourse = { name: '', id: '' };
      return newState;
    case VIEW_DISHES:
      newState.selectedCourse = action.payload;
      newState.viewDishes = true;
      return newState;
    case BACK_TO_COURSES:
      newState.selectedCourse = { name: '', id: '' };
      newState.viewDishes = false;
      return newState;
    case EDIT_COURSE:
      newState.selectedCourse = action.payload;
      newState.createCourse = true;
      return newState;
    default:
      return newState;
  }
};
