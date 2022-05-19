import { useReducer } from "react";

function Reducer(state, action) {
  switch (action.type) {
    case "SET_API_IDS_STATE":
      return {
        apiIds: action.payload,
      };
    case "SET_SEARCH_IDS_STATE":
      return {
        apiSearchIds: action.payload,
      };
    default:
      return state;
  }
}

export default Reducer;
