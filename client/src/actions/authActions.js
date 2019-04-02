import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LOGIN_DATA
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      const { token, user, userAll, userGrp } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("isUser", JSON.stringify(user));
      localStorage.setItem("userAll", JSON.stringify(userAll));
      localStorage.setItem("userGrp", JSON.stringify(userGrp));
      dispatch({
        type: LOGIN_DATA,
        payload: res.data
      });
      // Set token to Auth header
      setAuthToken(token);

      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.message || err.response.data
      });
    });
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setDataLogin = itm => dispatch => {
  const user = JSON.parse(localStorage.getItem("isUser"));

  const userAll = JSON.parse(
    localStorage.getItem("userAll", JSON.stringify(userAll))
  );
  const userGrp = JSON.parse(
    localStorage.getItem("userGrp", JSON.stringify(userGrp))
  );

  if (user != null && user != {}) {
    dispatch({ type: "LOGIN_DATA", payload: { user, userAll, userGrp } });
  }
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = (history, v) => dispatch => {
  history.push("/login");

  localStorage.removeItem("jwtToken");
  localStorage.removeItem("isUser");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
