import Inputwrapper from "../FormFields/Inputwrapper";
import { googleLoginCreds } from "../../models";
import setCookie from "../../helpers/setCookie";
import Button from "../Buttons/Button";
import formValidator from "../../helpers/formValidator";
import { APP_CONFIGS } from "../../models";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import useAuthContext from "../../context/Auth/useAuthContext";
import { useNavigate } from "react-router-dom";

type errors = {
  name?: boolean;
  email: boolean;
  password: boolean;
  confirmPassword?: boolean;
};

const SignUpForm = () => {
  const errorFields: errors = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors:errorFields
  }

  const [signUpDetails, setSignUpDetails] = useState(initialState);
  const [loading,setLoading] = useState(false)
  const contextValue = useAuthContext();
  const navigate = useNavigate();

  const signUpButtonText = loading ? "Processing..." : "Sign Up";

  const handleChange = (e: { target: HTMLInputElement }): void => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const LoginUser = async (): Promise<void> => {
    const { valid, userDetails } = formValidator(signUpDetails);
    if(!valid) {
      setSignUpDetails({ ...signUpDetails, errors: userDetails.errors });
    } else {
      try {
        setLoading(true)
        const url = APP_CONFIGS.API_BASE_URL + '/register'
        const signUpData = {
          name:signUpDetails?.name,
          email:signUpDetails?.email,
          password:signUpDetails?.password
        }
        const response = await axios.post(url,signUpData);
        const {data}  = response
        setSignUpDetails(initialState)
        toast.success(data.message) 
      } catch (error:any) {
        toast.error(error.message)
      }
      setLoading(false)
    }
   
  };

  const loginWithGoogle = async (data:googleLoginCreds):Promise<void> => {
    try {
      setLoading(true)
      const url = import.meta.env.VITE_APP_API_BASE_URL + "/signInWithGoogle";
      const response = await axios.post(url,data)
      if(response?.data?.success) {
        contextValue?.setLoginUserDetails(response?.data?.data)
        setCookie("userDetails", JSON.stringify(response?.data?.data), 4);
        toast.success(response?.data?.message)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error("Some Unknown Error Occured")
    }
  }

  return (
    <div className="signup-form-div">
      <form className={"signup-actual-form"}>
        <Inputwrapper
          label="name"
          labelName={"Full Name"}
          inputType="text"
          placeholder="Enter Your Name"
          error={signUpDetails.errors.name}
          errorText="Full Name Must be of at least 4 characters"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="email"
          labelName="Email"
          inputType="email"
          placeholder="Enter Your Email"
          error={signUpDetails.errors.email}
          errorText="Please Enter a Valid Email"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="password"
          labelName="Password"
          inputType="password"
          placeholder="Enter Your Password"
          error={signUpDetails.errors.password}
          errorText="Password should include 1 smallcase,capital and special character"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="confirmPassword"
          labelName="Confirm Password"
          inputType="password"
          placeholder="Confirm Your Password"
          error={signUpDetails.errors.confirmPassword}
          errorText="Passsword Doesn't Match"
          handleChange={handleChange}
        />
      </form>
      <div className="buttons-container">
        <Button text={signUpButtonText} isLoading={loading} handleClick={LoginUser} />
        <h4 className="text-center">OR </h4>
       <GoogleLogin onSuccess={(credentials) => {
        loginWithGoogle(credentials)
       }} 
       onError={() => {
        toast.error("Some Unknown Error Occured!")
       }}
       size={"large"} useOneTap/>
      </div>
    </div>
  );
};

export default SignUpForm;
