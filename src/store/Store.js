import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  apiIds: null,
  apiSearchIds: null,
  id: null,
  name: "Stranger",
};

function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export const Context = createContext(initialState);
export default Store;
