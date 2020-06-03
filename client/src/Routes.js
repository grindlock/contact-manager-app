import React from "react";
import { Route, Switch } from "react-router-dom";
import  AppliedRoute  from './Components/AppliedRoute';
import { AuthenticatedRoute, UnauthenticatedRoute} from './Components';
import { Intro, Login, AccessScreen, ContactSearch } from './Pages';

const Routes = ({ childProps }) => {
  return(
    <Switch>
      <AppliedRoute path="/" exact component={Intro} props={ childProps }/>
      <UnauthenticatedRoute path="/login" exact component={ Login } props={ childProps }/>
      <UnauthenticatedRoute path="/register" exact component={ AccessScreen } props={ childProps }/>
      <AuthenticatedRoute path="/dashboard" exact component={ContactSearch} props={ childProps }/>
      {/*<Route component={} />*/}
    </Switch>
  );
};
export { Routes };
