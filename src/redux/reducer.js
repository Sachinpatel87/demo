import { type } from "@testing-library/user-event/dist/type";
import * as types from "./actionType";
const initialState = {
  users: [],
  user: {},
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.DELETE_USER:
    case types.ADD_USER:
      return {
        ...state,
        loading: false,
      };
    case type.GET_SINGLE_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default usersReducers;
