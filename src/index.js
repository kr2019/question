import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import Test from "./test";
//import ReactCalendarBase from "./ReactCalendarBase";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";

//ReactDOM.render(<ReactCalendarBase />, document.querySelector("#root"));

ReactDOM.render(
  <BrowserRouter>
    <Test />
  </BrowserRouter>,
  document.querySelector("#root")
);