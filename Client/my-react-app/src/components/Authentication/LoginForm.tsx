import Inputwrapper from "../FormFields/Inputwrapper";
import "./loginForm.css";
import GoogleButton from "react-google-button";
import Button from "../Buttons/Button";
import formValidator from "../../helpers/formValidator";
import setCookie from "../../helpers/setCookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthContext from "../../context/Auth/useAuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    errors: {
      email: false,
      password: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const contextValue = useAuthContext();
  const navigate = useNavigate()

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.name ==="email" ? e.target.value?.toLowerCase() : e.target.value });
  };


  const LoginUser = async (): Promise<void> => {
    const { valid, userDetails } = formValidator({ ...loginDetails });
    if (!valid) {
      setLoginDetails({ ...loginDetails, errors: { ...userDetails.errors } });
    } else {
      try {
        setLoading(true)
        const url = import.meta.env.VITE_APP_API_BASE_URL + "/signIn";
        const response = await axios.post(url, loginDetails);
        const { data } = response;
        toast.success(data?.message);
        if(data?.success) {
          contextValue?.setLoginUserDetails(data?.data);
          setCookie("userDetails",JSON.stringify(data?.data),4)
          navigate("/dashboard")
        }
      } catch (error:any) {
        const { response } = error;
        const { data } = response;
        if (!data?.success) {
          toast.error(data?.message);
        }
      }
      setLoading(false)
    }
  };

  const signUpButtonText = loading ? "Signing In..." : "Sign In";
  return (
    <div className="login-form-div">
      <form className="login-form-actual">
        <Inputwrapper
          inputType="email"
          labelName="Email"
          label="email"
          error={loginDetails.errors.email}
          errorText={"Invalid Email"}
          placeholder="Enter your email"
          handleChange={handleInputChange}
        />
        <Inputwrapper
          inputType="password"
          labelName="Password"
          error={loginDetails.errors.password}
          errorText={"Password Must Contain"}
          label="password"
          placeholder="Enter Password"
          handleChange={handleInputChange}
        />
      </form>
      <div className="buttons-container">
        <Button text={signUpButtonText} isLoading={loading} handleClick={LoginUser} />
        <h4 className="text-center">OR </h4>
        <GoogleButton label="Sign In with Google" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default LoginForm;
