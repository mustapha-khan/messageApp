import { SET_CURRENT_USER, USER_LOADING, LOGIN_DATA } from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  user: null,
  userAll: null,
  userGrp: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
        // user: action.payload
      };
    case LOGIN_DATA:
      return {
        ...state,
        user: action.payload.user,
        userAll: action.payload.userAll,
        userGrp: action.payload.userGrp
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
