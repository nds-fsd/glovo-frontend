import {
  CANCEL_DELETE,
  CHANGE_TAB,
  CREATE_RESTAURANT,
  DELETE_RESTAURANT,
  SELECT_RESTAURANT,
  STOP_CREATING,
  VIEW_MENU,
  VIEW_RESTAURANT,
  CREATE_COURSE,
  STOP_CREATE_COURSE,
  VIEW_DISHES,
  BACK_TO_COURSES,
  EDIT_COURSE,
  DELETE_COURSE,
  DELETE_DISH,
  CREATE_DISH,
  EDIT_DISH,
  STOP_CREATE_DISH,
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
      newState.deletableCourse = '';
      return newState;
    case VIEW_MENU:
      newState.viewMenu = true;
      newState.selectedRestaurant = action.payload;
      return newState;
    case VIEW_RESTAURANT:
      newState.viewMenu = false;
      newState.viewDishes = false;
      newState.selectedRestaurant = '';
      newState.selectedCourse = { name: '', id: '' };
      return newState;
    case SELECT_RESTAURANT:
      newState.selectedRestaurant = action.payload;
      return newState;
    case CREATE_COURSE:
      newState.createCourse = true;
      return newState;
    case STOP_CREATE_COURSE:
      newState.createCourse = false;
      newState.selectedCourse = { name: '', id: '' };
      return newState;
    case BACK_TO_COURSES:
      newState.selectedCourse = { name: '', id: '' };
      newState.viewDishes = false;
      newState.viewMenu = true;
      return newState;
    case EDIT_COURSE:
      newState.selectedCourse = action.payload;
      newState.createCourse = true;
      return newState;
    case DELETE_COURSE:
      newState.deleteRestaurantModal = true;
      newState.deletableCourse = action.payload;
      return newState;
    case VIEW_DISHES:
      newState.selectedCourse = action.payload;
      newState.viewDishes = true;
      newState.viewMenu = false;
      return newState;
    case DELETE_DISH:
      newState.deleteRestaurantModal = true;
      newState.deletableDish = action.payload;
      return newState;
    case CREATE_DISH:
      newState.createDish = true;
      return newState;
    case EDIT_DISH:
      newState.selectedDish = action.payload;
      newState.createDish = true;
      return newState;
    case STOP_CREATE_DISH:
      newState.createDish = false;
      newState.selectedDish = { name: '', id: '' };
      return newState;
    default:
      return newState;
  }
};
