import { useReducer } from "react";
import { authContext } from "./authContext";
import { authReducer } from "../../Reducer/Auth./auth";
import { userDetails, AuthContextValue } from "../../models";
import getCookie from "../../helpers/getCookie";
import { AuthActions } from "../../Reducer/Auth./authActions";

const userDetailString: string = getCookie("userDetails");
const initialState: userDetails = JSON.parse(userDetailString) === null ? {name:"",email:"",token:""} : JSON.parse(userDetailString);

export const AuthContextProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const setLoginUserDetails = (userDetails: userDetails): void => {
    authDispatch({ type: AuthActions.SET_USER_DETAILS, payload: userDetails });
  };

  const contextValue: AuthContextValue = {
    authState,
    setLoginUserDetails,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};
