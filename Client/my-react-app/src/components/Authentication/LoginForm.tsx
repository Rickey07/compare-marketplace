import Inputwrapper from "../FormFields/Inputwrapper";
import "./loginForm.css";
import GoogleButton from "react-google-button";
import Button from "../Buttons/Button";

const LoginForm = () => {
  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };

  const LoginUser = (): void => {
    alert("Success");
  };

  const signUpButtonText = "Sign In";
  return (
    <div className="login-form-div">
      <form className="login-form-actual">
        <Inputwrapper
          inputType="email"
          label="Email"
          placeholder="Enter your email"
          handleChange={handleInputChange}
        />
        <Inputwrapper
          inputType="password"
          label="Password"
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
