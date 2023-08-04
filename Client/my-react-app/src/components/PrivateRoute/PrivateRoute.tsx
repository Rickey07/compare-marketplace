import React from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/isAuthenticated";

type reactComponent = {
  children: React.ReactElement;
};


const PrivateRoute = ({ children }: reactComponent) => {
  if (!isAuthenticated()) {
    toast.error("Please Login!")
    return <Navigate to={"/"}/>
  }
  return children
};

export default PrivateRoute;
