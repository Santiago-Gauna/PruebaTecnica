import React from "react";
import { Outlet } from "react-router-dom";
import Error404 from "./Error404";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Error404 />;
  }

  return <Outlet />;
};

export default PrivateRoute;
