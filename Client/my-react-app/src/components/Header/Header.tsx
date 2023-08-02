import "./header.css";
import Logo from "../../assets/Logo1.png";
import { GitHub } from "react-feather";
import { GrLogout } from "react-icons/gr";
import useAuthContext from "../../context/Auth/useAuthContext";
import clearCookie from "../../helpers/clearCookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  const contextValue = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCookie("userDetails");
    navigate("/");
    contextValue?.setLoginUserDetails({ name: "", email: "", token: "" });
    toast.success("Logout Successfull!");
  };

  const redirect = () => {
    window.open('https://github.com/Rickey07',"_blank")
  }

  return (
    <header className="header" id="header">
      <nav className="nav-bar">
        <div className="title-container">
          <div className="image-container">
            <img src={Logo} alt={"Logo"} className={"logo"}></img>
          </div>
          <h1 className="app-heading">CompareHub</h1>
        </div>
        <div className="nav-icons-container">
          {contextValue?.authState?.token !== "" && (
            <GrLogout size={40} cursor={"pointer"} onClick={handleLogout} />
          )}
          <GitHub size={40} cursor={"pointer"} onClick={redirect}/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
