import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) =>{
  return(<Route
    {...rest}
    render={props =>
      !cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect to="/login" />}
  />);
};

export { UnauthenticatedRoute };
