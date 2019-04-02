import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import groupReducer from "./groupReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  group: groupReducer
});
