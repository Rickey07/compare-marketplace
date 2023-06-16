import Inputwrapper from "../FormFields/Inputwrapper";
import GoogleButton from "react-google-button";
import Button from "../Buttons/Button";
import formValidator from "../../helpers/formValidator";
import { useState } from "react";

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

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: errorFields,
  });

  const signUpButtonText = "Sign Up";

  const handleChange = (e: { target: HTMLInputElement }): void => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const LoginUser = (): void => {
    const { valid, userDetails } = formValidator(signUpDetails);
    setSignUpDetails({ ...signUpDetails, errors: userDetails.errors });
  };

  return (
    <div className="signup-form-div">
      <form className={"signup-actual-form"}>
        <Inputwrapper
          label="name"
          labelName={"Full Name"}
          inputType="text"
          placeholder="Enter Your Name"
          error={signUpDetails.errors.name}
          errorText="Full Name Must be of at least 7 characters"
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
        <Button text={signUpButtonText} handleClick={LoginUser} />
        <h4 className="text-center">OR </h4>
        <GoogleButton label="Sign In with Google" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default SignUpForm;
