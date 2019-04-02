import axios from "axios";
import { GET_ERRORS, CREATE_GROUP } from "./types";

export const createGroup = (name, members) => dispatch => {
  let data = {
    members: members,
    name: name
  };
  axios
    .post("/group/create", data)
    .then(arg => {
      let grps = JSON.parse(localStorage.getItem("userGrp"));
      grps.push(arg.data.group);
      localStorage.setItem("userGrp", JSON.stringify(grps));
      console.log("group created");
      dispatch({
        type: CREATE_GROUP,
        payload: grps
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
