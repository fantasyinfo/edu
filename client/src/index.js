import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";

export const DepartmentContext = React.createContext();

ReactDOM.render(
  <DepartmentContext.Provider value={{}}>
    <App />
  </DepartmentContext.Provider>,
  document.getElementById("root")
);
