import { useState } from "react";
import Illustration from "../../assets/LogoInfo.jpg";
import "./Login.css";
import LoginForm from "../../components/Authentication/LoginForm";
import SignUpForm from "../../components/Authentication/SignUpForm";
import Searchbar from "../../components/Searchbar/Searchbar";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Login");

  const handleTabChange = (): void => {
    setActiveTab(activeTab === "Login" ? "Register" : "Login");
  };


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
            {activeTab === "Login" ? <LoginForm /> : <SignUpForm/>}
          </div>
        </div>
      </div>
      <Searchbar/>
    </div>
  );
};

export default Login;
