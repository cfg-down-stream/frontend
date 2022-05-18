import { useReducer } from "react";

function Reducer(state, action) {
  switch (action.type) {
    case "SET_API_STATE":
      return {
        apiData: action.payload,
      };
    default:
      return state;
  }
}

export default Reducer;
