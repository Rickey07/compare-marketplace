import Inputwrapper from "../FormFields/Inputwrapper";

const SignUpForm = () => {
  const handleChange = (): void => {
    alert("handleChangeClicked");
  };
  return (
    <div className="signup-form-div">
      <form className={"signup-actual-form"}>
        <Inputwrapper
          label="Full Name"
          inputType="text"
          placeholder="Enter Your Name"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Email"
          inputType="email"
          placeholder="Enter Your Email"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Password"
          inputType="password"
          placeholder="Enter Your Password"
          handleChange={handleChange}
        />
        <Inputwrapper
          label="Confirm Password"
          inputType="password"
          placeholder="Confirm Your Password"
          handleChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
