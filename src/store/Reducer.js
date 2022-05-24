import { useReducer } from "react";

function Reducer(state, action) {
  if (action.type === "SET_API_IDS_STATE") {
    return { ...state, apiIds: action.payload };
  } else if (action.type === "SET_SEARCH_IDS_STATE") {
    return { ...state, apiSearchIds: action.payload };
  } else if (action.type === "SET_USER_INFO") {
    return { ...state, id: action.id, name: action.name };
  } else {
    return state;
  }
}

export default Reducer;
