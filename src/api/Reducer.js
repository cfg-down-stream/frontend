import { useReducer } from "react";

function Reducer(state, action) {
  switch (action.type) {
    case "SET_API_STATE":
      return {
        apiResultsArray: action.payload,
      };
    default:
      return state;
  }
}

export default Reducer;
