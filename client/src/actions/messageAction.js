import axios from "axios";
import { GET_ERRORS, MSG_HIST } from "./types";

export const sendMesage = (msg, sender, receiver, grpId, cb) => dispatch => {
  if (!grpId) grpId = null;
  axios
    .post("/messages/send", { message: msg, sender, receiver, grpId })
    .then(arg => {
      console.log("msg created");
      cb();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getMesage = (receiverId, senderId, cb) => dispatch => {
  axios
    .post("/messages/get", { email: receiverId, senderEmail: senderId })
    .then(arg => {
      console.log("msg created");
      dispatch({
        type: MSG_HIST,
        payload: arg.data.msg
      });
      cb(arg.data.msg);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
