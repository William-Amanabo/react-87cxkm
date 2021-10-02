import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../store/useStore";

const AuthRoute = ({ children }) => {
  // eslint-disable-next-line no-unused-expressions
  const { authenticated } = useStore();
  if(!authenticated) alert("You are not Login !")
  return (
    
    <Route
      render={(props) =>
        authenticated === true ? <Redirect to="/login" /> : children
      }
    />
  );
};

export default AuthRoute