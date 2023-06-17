import { useReducer } from "react";
import { authContext } from "./authContext";
import { authReducer } from "../../Reducer/Auth./auth";
import { userDetails, loginDetails, AuthContextValue } from "../../models";
import { toast } from "react-hot-toast";
import { AuthActions } from "../../Reducer/Auth./authActions";
import axios from "axios";

const initialState: userDetails = {
  name: "",
  email: "",
  token: "",
};

export const AuthContextProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const loginUser = async (loginDetails: loginDetails): Promise<any> => {
    const url = import.meta.env.VITE_APP_API_BASE_URL + "/signIn";
    try {
      const response = await axios.post(url, loginDetails);
      const { data } = response;
      toast.success(data?.message)
      authDispatch({ type: AuthActions.SET_USER_DETAILS, payload: data?.data });
     console.log(authState)
    } catch (error: any) {
      const { response } = error;
      const { data } = response;
      if (!data?.success) {
        toast.error(data?.message);
      }
    }
  };

  const contextValue: AuthContextValue = {
    authState,
    loginUser,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};
