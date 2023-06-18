import "./inputwrapper.css";
import { Eye, EyeOff } from "react-feather";
import { useState } from "react";

interface inputProps {
  inputType: string;
  label: string;
  placeholder: string;
  passwoordVisible?: boolean;
  error?: boolean;
  errorText?: string;
  labelName?: string;
  handleChange(e: any): void;
}

const Inputwrapper = ({
  inputType,
  label,
  placeholder,
  error,
  errorText,
  labelName,
  handleChange,
}: inputProps) => {
  // State For Password Visible
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Method For Showing the password and hiding it
  const onPasswordIconClick = (): void => {
    const ele = document.getElementById(label);
    const currentType =
      ele?.getAttribute("type") === "password" ? "text" : "password";
    ele?.setAttribute("type", currentType);
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <div className="form-field-container">
        <div className="main-input-container">
        <label htmlFor={label}>{labelName} </label>
        <input
          type={inputType}
          className={"input-text"}
          placeholder={placeholder}
          name={label}
          id={label}
          onChange={handleChange}
        ></input>
        {/* only Load if type of input is password  */}
        {inputType === "password" && (
          <div className="input-icon-container" onClick={onPasswordIconClick}>
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
        </div>
        {error && <span className="error-text">{errorText}</span>}
      </div>
    </>
  );
};

export default Inputwrapper;
