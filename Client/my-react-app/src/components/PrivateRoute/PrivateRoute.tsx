import React from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import getCookie from "../../helpers/getCookie";

type reactComponent = {
  children: React.ReactElement;
};

const isAuthenticated = (): boolean => {
  const cookie = getCookie("userDetails");
  return cookie === "" ? false : true;
};

const PrivateRoute = ({ children }: reactComponent) => {
  if (!isAuthenticated()) {
    toast.error("Please Login!")
    return <Navigate to={"/"}/>
  }
  return children
};

export default PrivateRoute;
