import React from "react";
import { Navigate } from "react-router-dom";

const withAuthProtection = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuthProtection;
