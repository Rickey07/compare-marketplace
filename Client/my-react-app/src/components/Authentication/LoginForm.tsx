import Inputwrapper from "../FormFields/Inputwrapper";
import "./loginForm.css";
import GoogleButton from "react-google-button";
import Button from "../Buttons/Button";
import formValidator from "../../helpers/formValidator";
import { useState } from "react";

const LoginForm = () => {
  const [loginDetails,setLoginDetails] = useState({
    email:"",
    password:"",
    errors: {
      email: false,
      password: false,
    }
  })
  const handleInputChange = (e: {target:HTMLInputElement}) => {
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
  };

  const LoginUser = (): void => {
    const {valid,userDetails} = formValidator({...loginDetails})
    if(!valid) {
      setLoginDetails({...loginDetails , errors:{...userDetails.errors}})
    }
  };

  const signUpButtonText = "Sign In";
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
        <Button text={signUpButtonText} handleClick={LoginUser} />
        <h4 className="text-center">OR </h4>
        <GoogleButton label="Sign In with Google" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default LoginForm;
