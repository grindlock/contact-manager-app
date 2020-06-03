import React from "react";
import { Route } from "react-router-dom";
import { Button } from "react-bootstrap";

const RouteButton = (props) => {
return(
<Route
  path={props.href}
  exact
  children={({match, history, response})=>
  <Button
  onClick={e=> history.push(e.currentTarget.getAttribute("href"))}
  activehref='null'
  {...props}>{ props.children }</Button>}
  />);
};

export { RouteButton };
