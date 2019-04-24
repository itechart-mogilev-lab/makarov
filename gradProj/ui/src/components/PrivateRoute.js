import React from "react";
import { Route } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn"

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <NotLoggedIn/>
    }
  />
);

export default PrivateRoute;