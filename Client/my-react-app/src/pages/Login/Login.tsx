import { useState } from "react";
import Illustration from "../../assets/LogoInfo.jpg";
import "./Login.css";
import LoginForm from "../../components/Authentication/LoginForm";
import Button from "../../components/Buttons/Button";
import GoogleButton from "react-google-button";
import SignUpForm from "../../components/Authentication/SignUpForm";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Login");

  const handleTabChange = (): void => {
    setActiveTab(activeTab === "Login" ? "Register" : "Login");
  };

  const LoginUser = () => {
    alert("Hello world");
  };

  const signUpButtonText = activeTab === "Login" ? "Sign In" : "Sign Up";

  return (
    <div className="main-login-page-container">
      <div className="image-container">
        <img src={Illustration} alt={"Logo"}></img>
      </div>
      <div className="login-form-container">
        <div className="main-form-card">
          <div className="tabs-container" onClick={handleTabChange}>
            <span className={activeTab === "Login" ? "active-tab" : ""}>
              Login
            </span>
            <span className={activeTab === "Register" ? "active-tab" : ""}>
              Register
            </span>
          </div>
          <h2 className="text-center login-heading">{activeTab}</h2>
          <div className="form-body-container">
            {activeTab === "Login" ? <LoginForm /> : <SignUpForm />}
          </div>
          <div className="buttons-container">
            <Button text={signUpButtonText} handleClick={LoginUser} />
            <h4 className="text-center">OR </h4>
            <GoogleButton
              label="Sign In with Google"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
