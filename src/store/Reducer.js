import { useReducer } from "react";

function Reducer(state, action) {
  if (action.type === "SET_API_IDS_STATE") {
    return { ...state, apiIds: action.payload };
  } else if (action.type === "SET_SEARCH_IDS_STATE") {
    return { ...state, apiSearchIds: action.payload };
  } else {
    return state;
  }
}

export default Reducer;

// const store = createStore((state, action) => {
//   // reducer
//     if (action.type === "increment") {
//         return { counter: state.counter + 1, msg: state.msg }
//     } else if (action.type === "reset") {
//       return { counter: 0, msg: state.msg }
//     } else if (action.type === "setMessage") {
//       return { counter: state.counter, msg: action.payload }
//     } else {
//       return state;
//     }
//   },
//   // store initial object
//   { counter: 0, msg: "" }

// function Reducer(state, action) {
//   switch (action.type) {
//     case "SET_API_IDS_STATE":
//       return {
//         apiIds: action.payload,
//       };
//     case "SET_SEARCH_IDS_STATE":
//       return {
//         apiSearchIds: action.payload,
//       };
//     default:
//       return state;
//   }
// }
