import Inputwrapper from "../FormFields/Inputwrapper";
import GoogleButton from "react-google-button";
import Button from "../Buttons/Button";

const SignUpForm = () => {

  const signUpButtonText = "Sign Up"

  const handleChange = ():void => {
    console.log("working")
  }
  
  const LoginUser = ():void => {
    alert("Success")
  }
 
  return (
    <div className="signup-form-div">
      <form className={"signup-actual-form"}>
        <Inputwrapper
          label="Full Name"
          inputType="text"
          placeholder="Enter Your Name"
          errorText="Full Name Must be of at least 7 characters"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Email"
          inputType="email"
          placeholder="Enter Your Email"
          errorText="Please Enter a Valid Email"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Password"
          inputType="password"
          placeholder="Enter Your Password"
          errorText="Password should include 1 smallcase,capital and special character"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Confirm Password"
          inputType="password"
          placeholder="Confirm Your Password"
          errorText="Passsword Doesn't Match"
          handleChange={handleChange}
        />
      </form>
      <div className="buttons-container">
            <Button text={signUpButtonText} handleClick={LoginUser} />
            <h4 className="text-center">OR </h4>
            <GoogleButton
              label="Sign In with Google"
              style={{ width: "100%" }}
            />
          </div>
    </div>
  );
};

export default SignUpForm;
