import { CREATE_GROUP, MSG_HIST } from "../actions/types";
const initialState = {
  userGrp: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        userGrp: action.payload
      };
    case MSG_HIST:
      return {
        ...state,
        msgHist: action.payload
      };
    default:
      return state;
  }
}
