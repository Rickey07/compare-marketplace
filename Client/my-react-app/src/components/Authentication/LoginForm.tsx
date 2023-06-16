import Inputwrapper from "../FormFields/Inputwrapper";
import "./loginForm.css";

const LoginForm = () => {

  const handleInputChange = (e:any) => {
    console.log(e.target.value)
  }
  return (
    <div className="login-form-div">
      <form className="login-form-actual">
        <Inputwrapper inputType="email" label="Email" placeholder="Enter your email" handleChange={handleInputChange}/>
        <Inputwrapper inputType="password" label="Password" placeholder="Enter Password" handleChange={handleInputChange}/>
      </form>
    </div>
  );
};

export default LoginForm;
