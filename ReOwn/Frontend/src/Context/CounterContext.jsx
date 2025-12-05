// counterContext.jsx

import { createContext, useState } from "react";
export let CounterContext = createContext();

export default function CounterContextProvider() {
  const [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(Math.random());
  }

  return (
    <CounterContext.Provider
      value={{ counter, changeCounter }} >
    </CounterContext.Provider>
  );

}